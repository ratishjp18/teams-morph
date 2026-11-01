/**
 * Teams Morph - Theme Context
 * 
 * Provides theme state management throughout the application.
 */

import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import type { Theme, ThemeColors, ColorValue, FontSizeOption } from '@shared/types/theme';
import type { TeamsInfo } from '@shared/types/teams';
import { PREDEFINED_THEMES, DEFAULT_THEME_ID } from '@shared/constants/themes';
import { applyThemeToDocument, cloneTheme, setThemeColor } from '../utils/theme-utils';

/**
 * Theme state interface
 */
interface ThemeState {
  // Theme data
  currentTheme: Theme;
  originalTheme: Theme;
  hasUnsavedChanges: boolean;
  
  // Theme library
  builtInThemes: Theme[];
  savedThemes: Theme[];
  
  // Teams info
  teamsInfo: TeamsInfo | null;
  isDetectingTeams: boolean;
  
  // UI state
  selectedThemeId: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Theme action types
 */
type ThemeAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_THEMES'; payload: { builtIn: Theme[]; saved: Theme[]; activeId: string | null } }
  | { type: 'SELECT_THEME'; payload: Theme }
  | { type: 'UPDATE_COLOR'; payload: { path: string; value: string | ColorValue } }
  | { type: 'UPDATE_FONT_SIZE'; payload: FontSizeOption }
  | { type: 'RESET_CHANGES' }
  | { type: 'MARK_SAVED'; payload: Theme }
  | { type: 'ADD_SAVED_THEME'; payload: Theme }
  | { type: 'REMOVE_SAVED_THEME'; payload: string }
  | { type: 'SET_TEAMS_INFO'; payload: TeamsInfo | null }
  | { type: 'SET_DETECTING_TEAMS'; payload: boolean };

/**
 * Initial state
 */
const getInitialState = (): ThemeState => {
  const defaultTheme = PREDEFINED_THEMES.find(t => t.id === DEFAULT_THEME_ID) || PREDEFINED_THEMES[0];
  
  return {
    currentTheme: cloneTheme(defaultTheme),
    originalTheme: cloneTheme(defaultTheme),
    hasUnsavedChanges: false,
    builtInThemes: [...PREDEFINED_THEMES],
    savedThemes: [],
    teamsInfo: null,
    isDetectingTeams: false,
    selectedThemeId: DEFAULT_THEME_ID,
    isLoading: true,
    error: null,
  };
};

/**
 * Theme reducer
 */
function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'SET_THEMES': {
      const { builtIn, saved, activeId } = action.payload;
      const selectedId = activeId || DEFAULT_THEME_ID;
      const allThemes = [...builtIn, ...saved];
      const selectedTheme = allThemes.find(t => t.id === selectedId) || builtIn[0];
      
      return {
        ...state,
        builtInThemes: builtIn,
        savedThemes: saved,
        selectedThemeId: selectedId,
        currentTheme: cloneTheme(selectedTheme),
        originalTheme: cloneTheme(selectedTheme),
        hasUnsavedChanges: false,
        isLoading: false,
      };
    }

    case 'SELECT_THEME': {
      const theme = action.payload;
      return {
        ...state,
        selectedThemeId: theme.id,
        currentTheme: cloneTheme(theme),
        originalTheme: cloneTheme(theme),
        hasUnsavedChanges: false,
      };
    }

    case 'UPDATE_COLOR': {
      const newTheme = setThemeColor(state.currentTheme, action.payload.path, action.payload.value);
      return {
        ...state,
        currentTheme: newTheme,
        hasUnsavedChanges: true,
      };
    }

    case 'UPDATE_FONT_SIZE': {
      const newTheme = {
        ...cloneTheme(state.currentTheme),
        fonts: {
          ...state.currentTheme.fonts,
          baseFontSize: action.payload,
        },
        updatedAt: new Date().toISOString(),
      };
      return {
        ...state,
        currentTheme: newTheme,
        hasUnsavedChanges: true,
      };
    }

    case 'RESET_CHANGES':
      return {
        ...state,
        currentTheme: cloneTheme(state.originalTheme),
        hasUnsavedChanges: false,
      };

    case 'MARK_SAVED': {
      const savedTheme = action.payload;
      return {
        ...state,
        currentTheme: cloneTheme(savedTheme),
        originalTheme: cloneTheme(savedTheme),
        hasUnsavedChanges: false,
      };
    }

    case 'ADD_SAVED_THEME': {
      const newTheme = action.payload;
      const existingIndex = state.savedThemes.findIndex(t => t.id === newTheme.id);
      
      let updatedSaved: Theme[];
      if (existingIndex >= 0) {
        updatedSaved = [...state.savedThemes];
        updatedSaved[existingIndex] = newTheme;
      } else {
        updatedSaved = [...state.savedThemes, newTheme];
      }
      
      return {
        ...state,
        savedThemes: updatedSaved,
        currentTheme: cloneTheme(newTheme),
        originalTheme: cloneTheme(newTheme),
        selectedThemeId: newTheme.id,
        hasUnsavedChanges: false,
      };
    }

    case 'REMOVE_SAVED_THEME': {
      const filteredThemes = state.savedThemes.filter(t => t.id !== action.payload);
      const needsNewSelection = state.selectedThemeId === action.payload;
      
      let newSelectedId = state.selectedThemeId;
      let newCurrentTheme = state.currentTheme;
      let newOriginalTheme = state.originalTheme;
      
      if (needsNewSelection) {
        const defaultTheme = state.builtInThemes.find(t => t.id === DEFAULT_THEME_ID) || state.builtInThemes[0];
        newSelectedId = defaultTheme.id;
        newCurrentTheme = cloneTheme(defaultTheme);
        newOriginalTheme = cloneTheme(defaultTheme);
      }
      
      return {
        ...state,
        savedThemes: filteredThemes,
        selectedThemeId: newSelectedId,
        currentTheme: newCurrentTheme,
        originalTheme: newOriginalTheme,
        hasUnsavedChanges: false,
      };
    }

    case 'SET_TEAMS_INFO':
      return { ...state, teamsInfo: action.payload };

    case 'SET_DETECTING_TEAMS':
      return { ...state, isDetectingTeams: action.payload };

    default:
      return state;
  }
}

/**
 * Context type
 */
interface ThemeContextType {
  state: ThemeState;
  // Theme selection
  selectTheme: (theme: Theme) => void;
  // Color editing
  setColor: (path: string, value: string | ColorValue) => void;
  setFontSize: (size: FontSizeOption) => void;
  // Theme management
  saveTheme: (name?: string) => Promise<Theme | null>;
  deleteTheme: (id: string) => Promise<boolean>;
  resetChanges: () => void;
  // Import/Export
  exportTheme: () => Promise<boolean>;
  importTheme: () => Promise<Theme | null>;
  // Teams
  detectTeams: () => Promise<void>;
  applyToTeams: () => Promise<{ success: boolean; message: string }>;
  // Utility
  refreshThemes: () => Promise<void>;
}

/**
 * Create context
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme provider component
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, undefined, getInitialState);

  // Apply theme to document whenever it changes
  useEffect(() => {
    applyThemeToDocument(state.currentTheme);
  }, [state.currentTheme]);

  // Load themes on mount
  useEffect(() => {
    loadThemes();
    detectTeamsInstallation();
  }, []);

  /**
   * Load themes from storage
   */
  const loadThemes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await window.electronAPI.getAllThemes();
      
      const builtIn = response.themes.filter(t => t.isBuiltIn);
      const saved = response.themes.filter(t => !t.isBuiltIn);
      
      dispatch({
        type: 'SET_THEMES',
        payload: { builtIn, saved, activeId: response.activeThemeId },
      });
    } catch (error) {
      console.error('Failed to load themes:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load themes' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  /**
   * Detect Teams installation
   */
  const detectTeamsInstallation = async () => {
    try {
      dispatch({ type: 'SET_DETECTING_TEAMS', payload: true });
      const response = await window.electronAPI.detectTeams();
      dispatch({ type: 'SET_TEAMS_INFO', payload: response.teamsInfo });
    } catch (error) {
      console.error('Failed to detect Teams:', error);
    } finally {
      dispatch({ type: 'SET_DETECTING_TEAMS', payload: false });
    }
  };

  /**
   * Select a theme
   */
  const selectTheme = useCallback((theme: Theme) => {
    dispatch({ type: 'SELECT_THEME', payload: theme });
  }, []);

  /**
   * Set a color value
   */
  const setColor = useCallback((path: string, value: string | ColorValue) => {
    dispatch({ type: 'UPDATE_COLOR', payload: { path, value } });
  }, []);

  /**
   * Set font size
   */
  const setFontSize = useCallback((size: FontSizeOption) => {
    dispatch({ type: 'UPDATE_FONT_SIZE', payload: size });
  }, []);

  /**
   * Save the current theme
   */
  const saveTheme = useCallback(async (name?: string): Promise<Theme | null> => {
    try {
      const themeToSave: Theme = {
        ...state.currentTheme,
        name: name || state.currentTheme.name,
        isBuiltIn: false,
      };

      // If it's a built-in theme being saved, give it a new ID
      if (state.currentTheme.isBuiltIn || name) {
        themeToSave.id = crypto.randomUUID();
        themeToSave.createdAt = new Date().toISOString();
      }
      themeToSave.updatedAt = new Date().toISOString();

      const response = await window.electronAPI.saveTheme(themeToSave);
      
      if (response.success && response.theme) {
        dispatch({ type: 'ADD_SAVED_THEME', payload: response.theme });
        return response.theme;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to save theme:', error);
      return null;
    }
  }, [state.currentTheme]);

  /**
   * Delete a saved theme
   */
  const deleteTheme = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await window.electronAPI.deleteTheme(id);
      
      if (response.success) {
        dispatch({ type: 'REMOVE_SAVED_THEME', payload: id });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to delete theme:', error);
      return false;
    }
  }, []);

  /**
   * Reset changes to original theme
   */
  const resetChanges = useCallback(() => {
    dispatch({ type: 'RESET_CHANGES' });
  }, []);

  /**
   * Export current theme
   */
  const exportTheme = useCallback(async (): Promise<boolean> => {
    try {
      const response = await window.electronAPI.exportTheme(state.currentTheme);
      return response.success;
    } catch (error) {
      console.error('Failed to export theme:', error);
      return false;
    }
  }, [state.currentTheme]);

  /**
   * Import a theme
   */
  const importTheme = useCallback(async (): Promise<Theme | null> => {
    try {
      const response = await window.electronAPI.importTheme();
      
      if (response.success && response.theme) {
        // Create a new theme from the import
        const newTheme: Theme = {
          id: crypto.randomUUID(),
          name: response.theme.name,
          description: response.theme.description,
          colors: response.theme.colors,
          fonts: response.theme.fonts,
          isBuiltIn: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Save the imported theme
        const saveResponse = await window.electronAPI.saveTheme(newTheme);
        
        if (saveResponse.success && saveResponse.theme) {
          dispatch({ type: 'ADD_SAVED_THEME', payload: saveResponse.theme });
          return saveResponse.theme;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Failed to import theme:', error);
      return null;
    }
  }, []);

  /**
   * Detect Teams
   */
  const detectTeams = useCallback(async () => {
    await detectTeamsInstallation();
  }, []);

  /**
   * Apply theme to Teams
   */
  const applyToTeams = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await window.electronAPI.applyTheme(state.currentTheme);
      return {
        success: response.result.success,
        message: response.result.message,
      };
    } catch (error) {
      console.error('Failed to apply theme:', error);
      return {
        success: false,
        message: 'Failed to apply theme to Teams',
      };
    }
  }, [state.currentTheme]);

  /**
   * Refresh themes from storage
   */
  const refreshThemes = useCallback(async () => {
    await loadThemes();
  }, []);

  const value: ThemeContextType = {
    state,
    selectTheme,
    setColor,
    setFontSize,
    saveTheme,
    deleteTheme,
    resetChanges,
    exportTheme,
    importTheme,
    detectTeams,
    applyToTeams,
    refreshThemes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use theme context
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
