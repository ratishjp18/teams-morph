/**
 * Teams Morph - Theme IPC Handlers
 * 
 * Handles all theme-related IPC communication.
 */

import { ipcMain, dialog } from 'electron';
import * as fs from 'fs/promises';
import { IPC_CHANNELS } from '../../shared/types/ipc';
import type {
  GetAllThemesResponse,
  GetThemeByIdRequest,
  GetThemeByIdResponse,
  SaveThemeRequest,
  SaveThemeResponse,
  DeleteThemeRequest,
  DeleteThemeResponse,
  ExportThemeRequest,
  ExportThemeResponse,
  ImportThemeResponse,
  ResetDefaultsResponse,
} from '../../shared/types/ipc';
import type { Theme, ThemeExport } from '../../shared/types/theme';
import {
  getAllThemes,
  getThemeById,
  saveTheme,
  deleteTheme,
  resetToDefaults,
  getActiveThemeId,
} from '../services/theme-storage';

/**
 * Set up theme-related IPC handlers
 */
export function setupThemeHandlers(): void {
  // Get all themes
  ipcMain.handle(
    IPC_CHANNELS.THEME_GET_ALL,
    async (): Promise<GetAllThemesResponse> => {
      try {
        const themes = await getAllThemes();
        const activeThemeId = getActiveThemeId();
        return { themes, activeThemeId };
      } catch (error) {
        console.error('Error getting all themes:', error);
        return { themes: [], activeThemeId: null };
      }
    }
  );

  // Get theme by ID
  ipcMain.handle(
    IPC_CHANNELS.THEME_GET_BY_ID,
    async (_, { id }: GetThemeByIdRequest): Promise<GetThemeByIdResponse> => {
      try {
        const theme = await getThemeById(id);
        return { theme };
      } catch (error) {
        console.error('Error getting theme by ID:', error);
        return { theme: null };
      }
    }
  );

  // Save theme
  ipcMain.handle(
    IPC_CHANNELS.THEME_SAVE,
    async (_, { theme }: SaveThemeRequest): Promise<SaveThemeResponse> => {
      try {
        const savedTheme = await saveTheme(theme);
        return { success: true, theme: savedTheme };
      } catch (error) {
        console.error('Error saving theme:', error);
        return { success: false, error: String(error) };
      }
    }
  );

  // Delete theme
  ipcMain.handle(
    IPC_CHANNELS.THEME_DELETE,
    async (_, { id }: DeleteThemeRequest): Promise<DeleteThemeResponse> => {
      try {
        await deleteTheme(id);
        return { success: true };
      } catch (error) {
        console.error('Error deleting theme:', error);
        return { success: false, error: String(error) };
      }
    }
  );

  // Export theme
  ipcMain.handle(
    IPC_CHANNELS.THEME_EXPORT,
    async (_, { theme }: ExportThemeRequest): Promise<ExportThemeResponse> => {
      try {
        const { filePath } = await dialog.showSaveDialog({
          title: 'Export Theme',
          defaultPath: `${theme.name.replace(/\s+/g, '-').toLowerCase()}.teams-theme.json`,
          filters: [
            { name: 'Teams Morph Theme', extensions: ['teams-theme.json'] },
            { name: 'JSON Files', extensions: ['json'] },
          ],
        });

        if (!filePath) {
          return { success: false, error: 'Export cancelled' };
        }

        const exportData: ThemeExport = {
          name: theme.name,
          description: theme.description,
          colors: theme.colors,
          fonts: theme.fonts,
          version: '1.0.0',
          exportedAt: new Date().toISOString(),
        };

        await fs.writeFile(filePath, JSON.stringify(exportData, null, 2), 'utf-8');
        
        return { success: true, filePath };
      } catch (error) {
        console.error('Error exporting theme:', error);
        return { success: false, error: String(error) };
      }
    }
  );

  // Import theme
  ipcMain.handle(
    IPC_CHANNELS.THEME_IMPORT,
    async (): Promise<ImportThemeResponse> => {
      try {
        const { filePaths } = await dialog.showOpenDialog({
          title: 'Import Theme',
          filters: [
            { name: 'Teams Morph Theme', extensions: ['teams-theme.json'] },
            { name: 'JSON Files', extensions: ['json'] },
          ],
          properties: ['openFile'],
        });

        if (filePaths.length === 0) {
          return { success: false, error: 'Import cancelled' };
        }

        const content = await fs.readFile(filePaths[0], 'utf-8');
        const themeData = JSON.parse(content) as ThemeExport;

        // Validate the imported theme
        if (!themeData.name || !themeData.colors) {
          return { success: false, error: 'Invalid theme file format' };
        }

        return { success: true, theme: themeData };
      } catch (error) {
        console.error('Error importing theme:', error);
        return { success: false, error: String(error) };
      }
    }
  );

  // Reset to defaults
  ipcMain.handle(
    IPC_CHANNELS.THEME_RESET_DEFAULTS,
    async (): Promise<ResetDefaultsResponse> => {
      try {
        await resetToDefaults();
        const themes = await getAllThemes();
        return { success: true, themes };
      } catch (error) {
        console.error('Error resetting to defaults:', error);
        return { success: false, themes: [] };
      }
    }
  );
}
