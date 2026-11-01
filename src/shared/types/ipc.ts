/**
 * Teams Morph - IPC Type Definitions
 * 
 * These types define the IPC communication contract between main and renderer processes.
 */

import type { Theme, ThemeExport, ThemeUpdate } from './theme';
import type { TeamsInfo, IntegrationResult } from './teams';

/**
 * IPC Channel names - all channels used for communication
 */
export const IPC_CHANNELS = {
  // Theme operations
  THEME_GET_ALL: 'theme:get-all',
  THEME_GET_BY_ID: 'theme:get-by-id',
  THEME_SAVE: 'theme:save',
  THEME_DELETE: 'theme:delete',
  THEME_EXPORT: 'theme:export',
  THEME_IMPORT: 'theme:import',
  THEME_RESET_DEFAULTS: 'theme:reset-defaults',
  
  // Teams operations
  TEAMS_DETECT: 'teams:detect',
  TEAMS_GET_STATUS: 'teams:get-status',
  TEAMS_APPLY_THEME: 'teams:apply-theme',
  TEAMS_CHECK_INTEGRATION: 'teams:check-integration',
  
  // App operations
  APP_GET_VERSION: 'app:get-version',
  APP_MINIMIZE: 'app:minimize',
  APP_MAXIMIZE: 'app:maximize',
  APP_CLOSE: 'app:close',
} as const;

/**
 * Type for IPC channel names
 */
export type IPCChannel = typeof IPC_CHANNELS[keyof typeof IPC_CHANNELS];

/**
 * IPC request/response types
 */

// Theme operations
export interface GetAllThemesResponse {
  themes: Theme[];
  activeThemeId: string | null;
}

export interface GetThemeByIdRequest {
  id: string;
}

export interface GetThemeByIdResponse {
  theme: Theme | null;
}

export interface SaveThemeRequest {
  theme: Theme;
}

export interface SaveThemeResponse {
  success: boolean;
  theme?: Theme;
  error?: string;
}

export interface DeleteThemeRequest {
  id: string;
}

export interface DeleteThemeResponse {
  success: boolean;
  error?: string;
}

export interface ExportThemeRequest {
  theme: Theme;
}

export interface ExportThemeResponse {
  success: boolean;
  filePath?: string;
  error?: string;
}

export interface ImportThemeResponse {
  success: boolean;
  theme?: ThemeExport;
  error?: string;
}

export interface ResetDefaultsResponse {
  success: boolean;
  themes: Theme[];
}

// Teams operations
export interface DetectTeamsResponse {
  teamsInfo: TeamsInfo;
}

export interface ApplyThemeRequest {
  theme: Theme;
}

export interface ApplyThemeResponse {
  result: IntegrationResult;
}

/**
 * Electron API exposed to renderer process via preload script
 */
export interface ElectronAPI {
  // Theme operations
  getAllThemes: () => Promise<GetAllThemesResponse>;
  getThemeById: (id: string) => Promise<GetThemeByIdResponse>;
  saveTheme: (theme: Theme) => Promise<SaveThemeResponse>;
  deleteTheme: (id: string) => Promise<DeleteThemeResponse>;
  exportTheme: (theme: Theme) => Promise<ExportThemeResponse>;
  importTheme: () => Promise<ImportThemeResponse>;
  resetDefaults: () => Promise<ResetDefaultsResponse>;
  
  // Teams operations
  detectTeams: () => Promise<DetectTeamsResponse>;
  getTeamsStatus: () => Promise<DetectTeamsResponse>;
  applyTheme: (theme: Theme) => Promise<ApplyThemeResponse>;
  checkIntegration: () => Promise<DetectTeamsResponse>;
  
  // App operations
  getAppVersion: () => Promise<string>;
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
}

/**
 * Extend Window interface to include electronAPI
 */
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
