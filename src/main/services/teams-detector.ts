/**
 * Teams Morph - Teams Detector Service
 * 
 * Detects Microsoft Teams installation and version on Windows.
 * Checks multiple locations as Teams can be installed in different ways.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import type { TeamsInfo, TeamsVariant, IntegrationStatus } from '../../shared/types/teams';
import { DEFAULT_INTEGRATION_STATUS } from '../../shared/types/teams';
import { checkIntegrationCapabilities } from './integration-service';

const execAsync = promisify(exec);

/**
 * Cached Teams info (refreshed on detect)
 */
let cachedTeamsInfo: TeamsInfo | null = null;

/**
 * Get cached Teams info (may be stale)
 */
export function getCachedTeamsInfo(): TeamsInfo | null {
  return cachedTeamsInfo;
}

/**
 * Detect Microsoft Teams installation
 */
export async function detectTeams(): Promise<TeamsInfo> {
  const now = new Date().toISOString();
  
  try {
    // Try to detect New Teams first (more common now)
    const newTeamsInfo = await detectNewTeams();
    if (newTeamsInfo.isInstalled) {
      cachedTeamsInfo = {
        isInstalled: newTeamsInfo.isInstalled,
        version: newTeamsInfo.version,
        installPath: newTeamsInfo.installPath,
        variant: newTeamsInfo.variant || 'new',
        lastChecked: now,
        integrationStatus: buildIntegrationStatus(newTeamsInfo),
      };
      return cachedTeamsInfo;
    }
    
    // Try to detect Classic Teams
    const classicTeamsInfo = await detectClassicTeams();
    if (classicTeamsInfo.isInstalled) {
      cachedTeamsInfo = {
        isInstalled: classicTeamsInfo.isInstalled,
        version: classicTeamsInfo.version,
        installPath: classicTeamsInfo.installPath,
        variant: classicTeamsInfo.variant || 'classic',
        lastChecked: now,
        integrationStatus: buildIntegrationStatus(classicTeamsInfo),
      };
      return cachedTeamsInfo;
    }
    
    // Teams not found
    cachedTeamsInfo = {
      isInstalled: false,
      variant: 'unknown',
      lastChecked: now,
      integrationStatus: {
        ...DEFAULT_INTEGRATION_STATUS,
        limitations: [
          'Microsoft Teams is not installed',
          ...DEFAULT_INTEGRATION_STATUS.limitations,
        ],
      },
    };
    return cachedTeamsInfo;
    
  } catch (error) {
    console.error('Error detecting Teams:', error);
    
    cachedTeamsInfo = {
      isInstalled: false,
      variant: 'unknown',
      lastChecked: now,
      integrationStatus: {
        ...DEFAULT_INTEGRATION_STATUS,
        limitations: [
          'Error detecting Teams installation',
          ...DEFAULT_INTEGRATION_STATUS.limitations,
        ],
      },
    };
    return cachedTeamsInfo;
  }
}

/**
 * Detect New Teams (MS Store / Modern version)
 */
async function detectNewTeams(): Promise<Partial<TeamsInfo>> {
  const localAppData = process.env.LOCALAPPDATA || '';
  const programFiles = process.env.ProgramFiles || 'C:\\Program Files';
  
  // Check common New Teams locations
  const possiblePaths = [
    // Store app location
    path.join(localAppData, 'Packages'),
    // WindowsApps location
    path.join(programFiles, 'WindowsApps'),
  ];
  
  try {
    // Check for running process first (most reliable)
    const { stdout } = await execAsync('tasklist /FI "IMAGENAME eq ms-teams.exe" /FO CSV /NH');
    if (stdout.toLowerCase().includes('ms-teams.exe')) {
      // Get version from file if possible
      const version = await getNewTeamsVersion();
      return {
        isInstalled: true,
        version: version || 'Unknown',
        variant: 'new' as TeamsVariant,
      };
    }
    
    // Check for MSTeams package in Packages folder
    const packagesPath = path.join(localAppData, 'Packages');
    try {
      const packages = await fs.readdir(packagesPath);
      const teamsPackage = packages.find(p => p.startsWith('MSTeams_'));
      
      if (teamsPackage) {
        return {
          isInstalled: true,
          installPath: path.join(packagesPath, teamsPackage),
          version: extractVersionFromPackage(teamsPackage),
          variant: 'new' as TeamsVariant,
        };
      }
    } catch {
      // Packages folder not accessible
    }
    
    return { isInstalled: false };
  } catch {
    return { isInstalled: false };
  }
}

/**
 * Detect Classic Teams (Standalone installer)
 */
async function detectClassicTeams(): Promise<Partial<TeamsInfo>> {
  const localAppData = process.env.LOCALAPPDATA || '';
  const teamsPath = path.join(localAppData, 'Microsoft', 'Teams');
  
  try {
    // Check if Teams folder exists
    await fs.access(teamsPath);
    
    // Check for running process
    const { stdout } = await execAsync('tasklist /FI "IMAGENAME eq Teams.exe" /FO CSV /NH');
    const isRunning = stdout.toLowerCase().includes('teams.exe');
    
    // Try to get version from update.exe or settings
    const version = await getClassicTeamsVersion(teamsPath);
    
    return {
      isInstalled: true,
      installPath: teamsPath,
      version: version || 'Unknown',
      variant: 'classic' as TeamsVariant,
    };
  } catch {
    return { isInstalled: false };
  }
}

/**
 * Get New Teams version
 */
async function getNewTeamsVersion(): Promise<string | null> {
  try {
    // Try PowerShell to get app version
    const { stdout } = await execAsync(
      'powershell -command "Get-AppxPackage -Name MSTeams | Select-Object -ExpandProperty Version"'
    );
    const version = stdout.trim();
    return version || null;
  } catch {
    return null;
  }
}

/**
 * Get Classic Teams version from installation
 */
async function getClassicTeamsVersion(teamsPath: string): Promise<string | null> {
  try {
    // Check settings.json for version
    const settingsPath = path.join(teamsPath, 'settings.json');
    const settings = await fs.readFile(settingsPath, 'utf-8');
    const parsed = JSON.parse(settings);
    if (parsed.version) {
      return parsed.version;
    }
  } catch {
    // Settings file not found or invalid
  }
  
  try {
    // Try to get version from current folder
    const currentPath = path.join(teamsPath, 'current');
    const files = await fs.readdir(currentPath);
    // Version might be in folder name
    const versionFolder = files.find(f => /^\d+\.\d+\.\d+/.test(f));
    if (versionFolder) {
      return versionFolder.split('.').slice(0, 3).join('.');
    }
  } catch {
    // Current folder not found
  }
  
  return null;
}

/**
 * Extract version from package folder name
 */
function extractVersionFromPackage(packageName: string): string {
  // Package names look like: MSTeams_24.10.0.0_x64__8wekyb3d8bbwe
  const match = packageName.match(/_(\d+\.\d+\.\d+\.\d+)_/);
  return match ? match[1] : 'Unknown';
}

/**
 * Build integration status based on detected Teams info
 */
function buildIntegrationStatus(teamsInfo: Partial<TeamsInfo>): IntegrationStatus {
  const capabilities = checkIntegrationCapabilities();
  
  return {
    canApplyTheme: capabilities.canApply,
    method: capabilities.method,
    limitations: [
      ...DEFAULT_INTEGRATION_STATUS.limitations,
      teamsInfo.variant === 'new'
        ? 'New Teams uses WebView2 with additional security restrictions'
        : 'Classic Teams files are signed and protected',
    ],
    supportedFeatures: DEFAULT_INTEGRATION_STATUS.supportedFeatures,
    notes: `Detected: ${teamsInfo.variant === 'new' ? 'New' : 'Classic'} Teams ${teamsInfo.version || ''}. ${DEFAULT_INTEGRATION_STATUS.notes}`,
  };
}

/**
 * Check if Teams is currently running
 */
export async function isTeamsRunning(): Promise<boolean> {
  try {
    const { stdout: newTeams } = await execAsync('tasklist /FI "IMAGENAME eq ms-teams.exe" /FO CSV /NH');
    if (newTeams.toLowerCase().includes('ms-teams.exe')) {
      return true;
    }
    
    const { stdout: classicTeams } = await execAsync('tasklist /FI "IMAGENAME eq Teams.exe" /FO CSV /NH');
    return classicTeams.toLowerCase().includes('teams.exe');
  } catch {
    return false;
  }
}
