/**
 * Teams Morph - IPC Handler Setup
 * 
 * Sets up all IPC handlers for communication between main and renderer processes.
 */

import { ipcMain, app } from 'electron';
import { IPC_CHANNELS } from '../../shared/types/ipc';
import { setupThemeHandlers } from './theme-handlers';
import { setupTeamsHandlers } from './teams-handlers';
import { minimizeMainWindow, maximizeMainWindow, closeMainWindow } from '../window';

/**
 * Set up all IPC handlers
 */
export function setupIpcHandlers(): void {
  // Set up theme-related handlers
  setupThemeHandlers();
  
  // Set up Teams-related handlers
  setupTeamsHandlers();
  
  // Set up app-related handlers
  setupAppHandlers();
  
  console.log('IPC handlers set up successfully');
}

/**
 * Set up application-related IPC handlers
 */
function setupAppHandlers(): void {
  // Get app version
  ipcMain.handle(IPC_CHANNELS.APP_GET_VERSION, () => {
    return app.getVersion();
  });

  // Window controls
  ipcMain.on(IPC_CHANNELS.APP_MINIMIZE, () => {
    minimizeMainWindow();
  });

  ipcMain.on(IPC_CHANNELS.APP_MAXIMIZE, () => {
    maximizeMainWindow();
  });

  ipcMain.on(IPC_CHANNELS.APP_CLOSE, () => {
    closeMainWindow();
  });
}
