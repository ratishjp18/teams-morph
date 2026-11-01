/**
 * Teams Morph - Microsoft Teams Type Definitions
 * 
 * These types define structures for Teams detection and integration.
 */

/**
 * Microsoft Teams variant type
 * - 'new': New Teams (MS Store / modern version)
 * - 'classic': Classic Teams (standalone installer)
 * - 'unknown': Could not determine variant
 */
export type TeamsVariant = 'new' | 'classic' | 'unknown';

/**
 * Integration method status
 */
export type IntegrationMethodStatus = 'supported' | 'experimental' | 'unsupported';

/**
 * Available integration methods
 */
export type IntegrationMethodType = 'none' | 'experimental';

/**
 * Integration status details
 */
export interface IntegrationStatus {
  /** Whether themes can be applied to Teams */
  canApplyTheme: boolean;
  /** Current integration method being used */
  method: IntegrationMethodType;
  /** List of features that are limited or unavailable */
  limitations: string[];
  /** List of features that are supported */
  supportedFeatures: string[];
  /** Additional notes about integration */
  notes?: string;
}

/**
 * Microsoft Teams installation information
 */
export interface TeamsInfo {
  /** Whether Teams is installed on this system */
  isInstalled: boolean;
  /** Teams version string (e.g., "24.0.100.1234") */
  version?: string;
  /** Installation path on the file system */
  installPath?: string;
  /** Which variant of Teams is installed */
  variant: TeamsVariant;
  /** Current integration capabilities */
  integrationStatus: IntegrationStatus;
  /** Last time Teams info was checked */
  lastChecked: string;
}

/**
 * Result of attempting to apply a theme
 */
export interface IntegrationResult {
  /** Whether the operation succeeded */
  success: boolean;
  /** Human-readable message about the result */
  message: string;
  /** Method used for integration */
  method: IntegrationMethodType;
  /** Any warnings to show the user */
  warnings?: string[];
  /** Error details if failed */
  error?: string;
}

/**
 * Integration method interface for extensibility
 */
export interface IntegrationMethod {
  /** Unique identifier for this method */
  id: string;
  /** Display name */
  name: string;
  /** Current status */
  status: IntegrationMethodStatus;
  /** Teams versions this method supports */
  teamsVersions: string[];
  /** Description of how this method works */
  description: string;
  /** Warnings to show users before using */
  warnings: string[];
}

/**
 * Teams process information
 */
export interface TeamsProcess {
  /** Process ID */
  pid: number;
  /** Process name */
  name: string;
  /** Whether the process is running */
  running: boolean;
}

/**
 * Default integration status when Teams is not detected
 */
export const DEFAULT_INTEGRATION_STATUS: IntegrationStatus = {
  canApplyTheme: false,
  method: 'none',
  limitations: [
    'Microsoft Teams does not officially support third-party theme customization',
    'Theme changes can only be previewed within Teams Morph',
    'Themes are saved locally for potential future integration methods',
  ],
  supportedFeatures: [
    'Theme creation and customization',
    'Live preview within Teams Morph',
    'Theme import/export',
    'Local theme storage',
  ],
  notes: 'Teams Morph provides a complete theme editing experience. While direct Teams integration is not currently available, your themes are saved and ready for any future integration methods that may become available.',
};

/**
 * Default Teams info when not detected
 */
export const DEFAULT_TEAMS_INFO: TeamsInfo = {
  isInstalled: false,
  variant: 'unknown',
  integrationStatus: DEFAULT_INTEGRATION_STATUS,
  lastChecked: new Date().toISOString(),
};
