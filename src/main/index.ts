/**
 * Teams Morph - Electron Main Process
 * 
 * Entry point for the Electron application.
 * Handles window creation, IPC setup, and application lifecycle.
 */

import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { createMainWindow, getMainWindow } from './window';
import { setupIpcHandlers } from './ipc';
import { initializeThemeStorage } from './services/theme-storage';

/**
 * Handle creating/removing shortcuts on Windows when installing/uninstalling
 * This is handled by electron-builder's NSIS installer
 */

/**
 * Initialize the application
 */
async function initializeApp(): Promise<void> {
  try {
    // Initialize theme storage with default themes
    await initializeThemeStorage();
    
    // Set up IPC handlers
    setupIpcHandlers();
    
    console.log('Teams Morph initialized successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
}

/**
 * Create window when Electron is ready
 */
app.whenReady().then(async () => {
  await initializeApp();
  createMainWindow();

  // On macOS, re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

/**
 * Quit when all windows are closed (except on macOS)
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * Handle certificate errors (development only)
 */
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (process.env.NODE_ENV === 'development') {
    // In development, ignore certificate errors
    event.preventDefault();
    callback(true);
  } else {
    callback(false);
  }
});

/**
 * Prevent navigation to external URLs
 */
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    // Only allow navigation to local URLs in development
    if (parsedUrl.protocol !== 'file:' && !navigationUrl.startsWith('http://localhost')) {
      event.preventDefault();
    }
  });
});
