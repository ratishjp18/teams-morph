/**
 * Teams Morph - Teams IPC Handlers
 * 
 * Handles all Microsoft Teams-related IPC communication.
 */

import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../shared/types/ipc';
import type {
  DetectTeamsResponse,
  ApplyThemeRequest,
  ApplyThemeResponse,
} from '../../shared/types/ipc';
import { detectTeams, getCachedTeamsInfo } from '../services/teams-detector';
import { applyThemeToTeams } from '../services/integration-service';

/**
 * Set up Teams-related IPC handlers
 */
export function setupTeamsHandlers(): void {
  // Detect Teams installation
  ipcMain.handle(
    IPC_CHANNELS.TEAMS_DETECT,
    async (): Promise<DetectTeamsResponse> => {
      try {
        const teamsInfo = await detectTeams();
        return { teamsInfo };
      } catch (error) {
        console.error('Error detecting Teams:', error);
        return {
          teamsInfo: {
            isInstalled: false,
            variant: 'unknown',
            integrationStatus: {
              canApplyTheme: false,
              method: 'none',
              limitations: ['Error detecting Teams installation'],
              supportedFeatures: [],
            },
            lastChecked: new Date().toISOString(),
          },
        };
      }
    }
  );

  // Get cached Teams status
  ipcMain.handle(
    IPC_CHANNELS.TEAMS_GET_STATUS,
    async (): Promise<DetectTeamsResponse> => {
      try {
        const teamsInfo = getCachedTeamsInfo() || await detectTeams();
        return { teamsInfo };
      } catch (error) {
        console.error('Error getting Teams status:', error);
        return {
          teamsInfo: {
            isInstalled: false,
            variant: 'unknown',
            integrationStatus: {
              canApplyTheme: false,
              method: 'none',
              limitations: ['Error getting Teams status'],
              supportedFeatures: [],
            },
            lastChecked: new Date().toISOString(),
          },
        };
      }
    }
  );

  // Apply theme to Teams
  ipcMain.handle(
    IPC_CHANNELS.TEAMS_APPLY_THEME,
    async (_, { theme }: ApplyThemeRequest): Promise<ApplyThemeResponse> => {
      try {
        const result = await applyThemeToTeams(theme);
        return { result };
      } catch (error) {
        console.error('Error applying theme:', error);
        return {
          result: {
            success: false,
            message: 'Failed to apply theme',
            method: 'none',
            error: String(error),
          },
        };
      }
    }
  );

  // Check integration capabilities
  ipcMain.handle(
    IPC_CHANNELS.TEAMS_CHECK_INTEGRATION,
    async (): Promise<DetectTeamsResponse> => {
      try {
        // Force re-detection to get latest integration status
        const teamsInfo = await detectTeams();
        return { teamsInfo };
      } catch (error) {
        console.error('Error checking integration:', error);
        return {
          teamsInfo: {
            isInstalled: false,
            variant: 'unknown',
            integrationStatus: {
              canApplyTheme: false,
              method: 'none',
              limitations: ['Error checking integration capabilities'],
              supportedFeatures: [],
            },
            lastChecked: new Date().toISOString(),
          },
        };
      }
    }
  );
}
