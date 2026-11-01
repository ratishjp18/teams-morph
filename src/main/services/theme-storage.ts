/**
 * Teams Morph - Theme Storage Service
 * 
 * Handles persistence of themes using electron-store.
 */

import Store from 'electron-store';
import { v4 as uuidv4 } from 'uuid';
import type { Theme } from '../../shared/types/theme';
import { PREDEFINED_THEMES, DEFAULT_THEME_ID } from '../../shared/constants/themes';

/**
 * Store schema for type safety
 */
interface StoreSchema {
  themes: Theme[];
  activeThemeId: string | null;
  version: string;
}

/**
 * Electron store instance
 */
const store = new Store<StoreSchema>({
  name: 'teams-morph-themes',
  defaults: {
    themes: [...PREDEFINED_THEMES],
    activeThemeId: DEFAULT_THEME_ID,
    version: '1.0.0',
  },
});

/**
 * Initialize theme storage
 * Ensures default themes exist and handles migrations
 */
export async function initializeThemeStorage(): Promise<void> {
  try {
    const themes = store.get('themes');
    
    // Ensure all built-in themes exist
    const builtInIds = PREDEFINED_THEMES.map(t => t.id);
    const existingBuiltInIds = themes.filter(t => t.isBuiltIn).map(t => t.id);
    
    // Add any missing built-in themes
    const missingThemes = PREDEFINED_THEMES.filter(
      t => !existingBuiltInIds.includes(t.id)
    );
    
    if (missingThemes.length > 0) {
      const updatedThemes = [...themes, ...missingThemes];
      store.set('themes', updatedThemes);
    }
    
    console.log('Theme storage initialized');
  } catch (error) {
    console.error('Error initializing theme storage:', error);
    // Reset to defaults if there's an error
    store.set('themes', [...PREDEFINED_THEMES]);
    store.set('activeThemeId', DEFAULT_THEME_ID);
  }
}

/**
 * Get all themes (built-in + custom)
 */
export async function getAllThemes(): Promise<Theme[]> {
  return store.get('themes');
}

/**
 * Get a theme by ID
 */
export async function getThemeById(id: string): Promise<Theme | null> {
  const themes = store.get('themes');
  return themes.find(t => t.id === id) || null;
}

/**
 * Save a theme (create or update)
 */
export async function saveTheme(theme: Theme): Promise<Theme> {
  const themes = store.get('themes');
  const existingIndex = themes.findIndex(t => t.id === theme.id);
  
  const now = new Date().toISOString();
  
  if (existingIndex >= 0) {
    // Update existing theme
    if (themes[existingIndex].isBuiltIn) {
      throw new Error('Cannot modify built-in themes');
    }
    
    themes[existingIndex] = {
      ...theme,
      updatedAt: now,
    };
  } else {
    // Create new theme
    const newTheme: Theme = {
      ...theme,
      id: theme.id || uuidv4(),
      isBuiltIn: false,
      createdAt: now,
      updatedAt: now,
    };
    themes.push(newTheme);
  }
  
  store.set('themes', themes);
  
  return themes.find(t => t.id === theme.id) || theme;
}

/**
 * Delete a theme by ID
 */
export async function deleteTheme(id: string): Promise<void> {
  const themes = store.get('themes');
  const theme = themes.find(t => t.id === id);
  
  if (!theme) {
    throw new Error('Theme not found');
  }
  
  if (theme.isBuiltIn) {
    throw new Error('Cannot delete built-in themes');
  }
  
  const updatedThemes = themes.filter(t => t.id !== id);
  store.set('themes', updatedThemes);
  
  // If the deleted theme was active, set default as active
  const activeId = store.get('activeThemeId');
  if (activeId === id) {
    store.set('activeThemeId', DEFAULT_THEME_ID);
  }
}

/**
 * Reset to default themes
 */
export async function resetToDefaults(): Promise<void> {
  store.set('themes', [...PREDEFINED_THEMES]);
  store.set('activeThemeId', DEFAULT_THEME_ID);
}

/**
 * Get the active theme ID
 */
export function getActiveThemeId(): string | null {
  return store.get('activeThemeId');
}

/**
 * Set the active theme ID
 */
export function setActiveThemeId(id: string): void {
  store.set('activeThemeId', id);
}

/**
 * Create a copy of a theme with a new ID and name
 */
export async function duplicateTheme(id: string, newName: string): Promise<Theme> {
  const original = await getThemeById(id);
  
  if (!original) {
    throw new Error('Theme not found');
  }
  
  const now = new Date().toISOString();
  const newTheme: Theme = {
    ...original,
    id: uuidv4(),
    name: newName,
    description: `Copy of ${original.name}`,
    isBuiltIn: false,
    createdAt: now,
    updatedAt: now,
  };
  
  return saveTheme(newTheme);
}
