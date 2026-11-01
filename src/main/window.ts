/**
 * Teams Morph - Window Management
 * 
 * Handles main window creation and management.
 */

import { BrowserWindow, shell } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;

/**
 * Window configuration
 */
const WINDOW_CONFIG = {
  width: 1400,
  height: 900,
  minWidth: 1100,
  minHeight: 700,
  title: 'Teams Morph',
};

/**
 * Create the main application window
 */
export function createMainWindow(): BrowserWindow {
  mainWindow = new BrowserWindow({
    ...WINDOW_CONFIG,
    frame: true,
    show: false,
    backgroundColor: '#1a1625', // Midnight Purple background
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // Load the app - always load from built files
  const indexPath = path.join(__dirname, '../renderer/index.html');
  mainWindow.loadFile(indexPath);
  
  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Clean up on close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}

/**
 * Get the main window instance
 */
export function getMainWindow(): BrowserWindow | null {
  return mainWindow;
}

/**
 * Focus the main window
 */
export function focusMainWindow(): void {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
}

/**
 * Minimize the main window
 */
export function minimizeMainWindow(): void {
  mainWindow?.minimize();
}

/**
 * Maximize or restore the main window
 */
export function maximizeMainWindow(): void {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
}

/**
 * Close the main window
 */
export function closeMainWindow(): void {
  mainWindow?.close();
}
