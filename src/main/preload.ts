/**
 * Teams Morph - Preload Script
 * 
 * Exposes a secure API to the renderer process via context bridge.
 * This script runs in an isolated context with access to Node.js APIs.
 */

import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../shared/types/ipc';
import type { Theme } from '../shared/types/theme';
import type { ElectronAPI } from '../shared/types/ipc';

/**
 * Electron API exposed to renderer
 */
const electronAPI: ElectronAPI = {
  // Theme operations
  getAllThemes: () => ipcRenderer.invoke(IPC_CHANNELS.THEME_GET_ALL),
  getThemeById: (id: string) => ipcRenderer.invoke(IPC_CHANNELS.THEME_GET_BY_ID, { id }),
  saveTheme: (theme: Theme) => ipcRenderer.invoke(IPC_CHANNELS.THEME_SAVE, { theme }),
  deleteTheme: (id: string) => ipcRenderer.invoke(IPC_CHANNELS.THEME_DELETE, { id }),
  exportTheme: (theme: Theme) => ipcRenderer.invoke(IPC_CHANNELS.THEME_EXPORT, { theme }),
  importTheme: () => ipcRenderer.invoke(IPC_CHANNELS.THEME_IMPORT),
  resetDefaults: () => ipcRenderer.invoke(IPC_CHANNELS.THEME_RESET_DEFAULTS),

  // Teams operations
  detectTeams: () => ipcRenderer.invoke(IPC_CHANNELS.TEAMS_DETECT),
  getTeamsStatus: () => ipcRenderer.invoke(IPC_CHANNELS.TEAMS_GET_STATUS),
  applyTheme: (theme: Theme) => ipcRenderer.invoke(IPC_CHANNELS.TEAMS_APPLY_THEME, { theme }),
  checkIntegration: () => ipcRenderer.invoke(IPC_CHANNELS.TEAMS_CHECK_INTEGRATION),

  // App operations
  getAppVersion: () => ipcRenderer.invoke(IPC_CHANNELS.APP_GET_VERSION),
  minimizeWindow: () => ipcRenderer.send(IPC_CHANNELS.APP_MINIMIZE),
  maximizeWindow: () => ipcRenderer.send(IPC_CHANNELS.APP_MAXIMIZE),
  closeWindow: () => ipcRenderer.send(IPC_CHANNELS.APP_CLOSE),
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);
