/**
 * Teams Morph - Theme Utilities
 * 
 * Helper functions for theme manipulation and CSS variable generation.
 */

import type { Theme, ThemeColors, ColorValue, GradientValue, FontSizeOption, FONT_SIZE_VALUES } from '@shared/types/theme';
import { v4 as uuidv4 } from 'uuid';

/**
 * Convert a ColorValue to CSS string
 */
export function colorValueToCSS(colorValue: ColorValue): string {
  if (colorValue.type === 'solid') {
    return colorValue.value;
  }

  if (colorValue.type === 'gradient' && colorValue.gradient) {
    return gradientToCSS(colorValue.gradient);
  }

  return colorValue.value;
}

/**
 * Convert a GradientValue to CSS string
 */
export function gradientToCSS(gradient: GradientValue): string {
  const stops = gradient.stops
    .map(stop => `${stop.color} ${stop.position}%`)
    .join(', ');

  if (gradient.type === 'linear') {
    const angle = gradient.angle ?? 180;
    return `linear-gradient(${angle}deg, ${stops})`;
  }

  return `radial-gradient(circle, ${stops})`;
}

/**
 * Apply theme colors as CSS variables to the document
 */
export function applyThemeToDocument(theme: Theme): void {
  const root = document.documentElement;
  const colors = theme.colors;

  // Sidebar
  root.style.setProperty('--preview-sidebar-bg', colorValueToCSS(colors.sidebarBackground));
  root.style.setProperty('--preview-sidebar-text', colors.sidebarText);
  root.style.setProperty('--preview-sidebar-active', colors.sidebarActiveItem);
  root.style.setProperty('--preview-sidebar-hover', colors.sidebarHoverItem);
  root.style.setProperty('--preview-sidebar-icon', colors.sidebarIcon);

  // Chat list
  root.style.setProperty('--preview-chatlist-bg', colorValueToCSS(colors.chatListBackground));
  root.style.setProperty('--preview-chatlist-text', colors.chatListText);
  root.style.setProperty('--preview-chatlist-secondary', colors.chatListSecondaryText);
  root.style.setProperty('--preview-chatlist-active', colors.chatListActiveItem);
  root.style.setProperty('--preview-chatlist-hover', colors.chatListHoverItem);
  root.style.setProperty('--preview-chatlist-badge', colors.chatListUnreadBadge);

  // Chat area
  root.style.setProperty('--preview-chat-bg', colorValueToCSS(colors.chatBackground));
  root.style.setProperty('--preview-chat-header-bg', colors.chatHeaderBackground);
  root.style.setProperty('--preview-chat-header-text', colors.chatHeaderText);

  // Messages
  root.style.setProperty('--preview-sent-bg', colors.sentMessageBackground);
  root.style.setProperty('--preview-sent-text', colors.sentMessageText);
  root.style.setProperty('--preview-received-bg', colors.receivedMessageBackground);
  root.style.setProperty('--preview-received-text', colors.receivedMessageText);
  root.style.setProperty('--preview-timestamp', colors.messageTimestamp);

  // Input
  root.style.setProperty('--preview-input-bg', colors.inputBackground);
  root.style.setProperty('--preview-input-text', colors.inputText);
  root.style.setProperty('--preview-input-border', colors.inputBorder);
  root.style.setProperty('--preview-input-placeholder', colors.inputPlaceholder);

  // Accents
  root.style.setProperty('--preview-accent', colors.primaryAccent);
  root.style.setProperty('--preview-accent-secondary', colors.secondaryAccent);
  root.style.setProperty('--preview-button-bg', colors.buttonBackground);
  root.style.setProperty('--preview-button-text', colors.buttonText);
  root.style.setProperty('--preview-button-hover', colors.buttonHover);

  // General
  root.style.setProperty('--preview-border', colors.borderColor);
  root.style.setProperty('--preview-divider', colors.dividerColor);
  root.style.setProperty('--preview-scrollbar-track', colors.scrollbarTrack);
  root.style.setProperty('--preview-scrollbar-thumb', colors.scrollbarThumb);

  // Font size
  const fontSizes: Record<FontSizeOption, string> = {
    'small': '13px',
    'medium': '14px',
    'large': '16px',
    'extra-large': '18px',
  };
  root.style.setProperty('--preview-font-size', fontSizes[theme.fonts.baseFontSize]);
}

/**
 * Validate a theme object
 */
export function validateTheme(theme: Partial<Theme>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!theme.name || theme.name.trim().length === 0) {
    errors.push('Theme name is required');
  }

  if (!theme.colors) {
    errors.push('Theme colors are required');
  } else {
    // Validate essential color fields exist
    const requiredFields: (keyof ThemeColors)[] = [
      'sidebarBackground',
      'chatBackground',
      'sentMessageBackground',
      'receivedMessageBackground',
      'primaryAccent',
    ];

    for (const field of requiredFields) {
      if (!theme.colors[field]) {
        errors.push(`Missing required color: ${field}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Create a deep copy of a theme
 */
export function cloneTheme(theme: Theme): Theme {
  return JSON.parse(JSON.stringify(theme));
}

/**
 * Create a new theme from an existing one
 */
export function createThemeFromExisting(
  baseTheme: Theme,
  overrides: Partial<Pick<Theme, 'name' | 'description'>>
): Theme {
  const now = new Date().toISOString();
  
  return {
    ...cloneTheme(baseTheme),
    id: uuidv4(),
    name: overrides.name || `${baseTheme.name} Copy`,
    description: overrides.description || `Based on ${baseTheme.name}`,
    isBuiltIn: false,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Compare two themes for equality (by colors)
 */
export function themesEqual(theme1: Theme, theme2: Theme): boolean {
  return JSON.stringify(theme1.colors) === JSON.stringify(theme2.colors) &&
         JSON.stringify(theme1.fonts) === JSON.stringify(theme1.fonts);
}

/**
 * Get a nested property from theme colors
 */
export function getThemeColor(theme: Theme, path: string): string | ColorValue | undefined {
  const parts = path.split('.');
  let current: any = theme.colors;

  for (const part of parts) {
    if (current === undefined) return undefined;
    current = current[part];
  }

  return current;
}

/**
 * Set a nested property in theme colors
 */
export function setThemeColor(theme: Theme, path: string, value: string | ColorValue): Theme {
  const newTheme = cloneTheme(theme);
  const parts = path.split('.');
  let current: any = newTheme.colors;

  for (let i = 0; i < parts.length - 1; i++) {
    if (current[parts[i]] === undefined) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }

  current[parts[parts.length - 1]] = value;
  newTheme.updatedAt = new Date().toISOString();

  return newTheme;
}

/**
 * Generate theme CSS for export
 */
export function generateThemeCSS(theme: Theme): string {
  const colors = theme.colors;
  
  return `/* Teams Morph Theme: ${theme.name} */
/* Generated: ${new Date().toISOString()} */

:root {
  /* Sidebar */
  --teams-sidebar-bg: ${colorValueToCSS(colors.sidebarBackground)};
  --teams-sidebar-text: ${colors.sidebarText};
  --teams-sidebar-active: ${colors.sidebarActiveItem};
  --teams-sidebar-hover: ${colors.sidebarHoverItem};
  --teams-sidebar-icon: ${colors.sidebarIcon};

  /* Chat List */
  --teams-chatlist-bg: ${colorValueToCSS(colors.chatListBackground)};
  --teams-chatlist-text: ${colors.chatListText};
  --teams-chatlist-secondary: ${colors.chatListSecondaryText};
  --teams-chatlist-active: ${colors.chatListActiveItem};
  --teams-chatlist-hover: ${colors.chatListHoverItem};
  --teams-chatlist-badge: ${colors.chatListUnreadBadge};

  /* Chat Area */
  --teams-chat-bg: ${colorValueToCSS(colors.chatBackground)};
  --teams-chat-header-bg: ${colors.chatHeaderBackground};
  --teams-chat-header-text: ${colors.chatHeaderText};

  /* Messages */
  --teams-sent-bg: ${colors.sentMessageBackground};
  --teams-sent-text: ${colors.sentMessageText};
  --teams-received-bg: ${colors.receivedMessageBackground};
  --teams-received-text: ${colors.receivedMessageText};
  --teams-timestamp: ${colors.messageTimestamp};

  /* Input */
  --teams-input-bg: ${colors.inputBackground};
  --teams-input-text: ${colors.inputText};
  --teams-input-border: ${colors.inputBorder};
  --teams-input-placeholder: ${colors.inputPlaceholder};

  /* Accents */
  --teams-accent: ${colors.primaryAccent};
  --teams-accent-secondary: ${colors.secondaryAccent};
  --teams-button-bg: ${colors.buttonBackground};
  --teams-button-text: ${colors.buttonText};
  --teams-button-hover: ${colors.buttonHover};

  /* General */
  --teams-border: ${colors.borderColor};
  --teams-divider: ${colors.dividerColor};
}`;
}
