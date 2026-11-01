/**
 * Teams Morph - Predefined Themes
 * 
 * Built-in themes that come with the application.
 * Users cannot delete these, but they can create custom themes based on them.
 */

import type { Theme, ThemeColors, ColorValue } from '../types/theme';

/**
 * Helper to create a solid color value
 */
const solid = (color: string): ColorValue => ({
  type: 'solid',
  value: color,
});

/**
 * Helper to create a gradient color value
 */
const gradient = (
  type: 'linear' | 'radial',
  stops: Array<{ color: string; position: number }>,
  angle?: number
): ColorValue => ({
  type: 'gradient',
  value: stops[0].color,
  gradient: {
    type,
    angle,
    stops,
  },
});

/**
 * Midnight Purple Theme
 * Dark theme with purple accent colors
 */
const midnightPurpleColors: ThemeColors = {
  // Sidebar
  sidebarBackground: solid('#1a1625'),
  sidebarText: '#e8e6f0',
  sidebarActiveItem: '#2d2640',
  sidebarHoverItem: '#252035',
  sidebarIcon: '#9d8ec7',

  // Chat list
  chatListBackground: solid('#211d2e'),
  chatListText: '#e8e6f0',
  chatListSecondaryText: '#a09ab0',
  chatListActiveItem: '#2d2640',
  chatListHoverItem: '#282337',
  chatListUnreadBadge: '#8b5cf6',

  // Chat area
  chatBackground: solid('#1e1a29'),
  chatHeaderBackground: '#252035',
  chatHeaderText: '#e8e6f0',

  // Messages
  sentMessageBackground: '#6b5ce7',
  sentMessageText: '#ffffff',
  receivedMessageBackground: '#2d2640',
  receivedMessageText: '#e8e6f0',
  messageTimestamp: '#8b86a0',

  // Input
  inputBackground: '#252035',
  inputText: '#e8e6f0',
  inputBorder: '#3d3555',
  inputPlaceholder: '#8b86a0',

  // Accents
  primaryAccent: '#8b5cf6',
  secondaryAccent: '#a78bfa',
  buttonBackground: '#6b5ce7',
  buttonText: '#ffffff',
  buttonHover: '#7c6ef0',

  // General
  borderColor: '#3d3555',
  dividerColor: '#2d2640',
  scrollbarTrack: '#1a1625',
  scrollbarThumb: '#3d3555',
};

/**
 * Ocean Blue Theme
 * Blue-based theme with ocean-inspired colors
 */
const oceanBlueColors: ThemeColors = {
  // Sidebar
  sidebarBackground: solid('#0c1929'),
  sidebarText: '#e3eaf5',
  sidebarActiveItem: '#1a3a5c',
  sidebarHoverItem: '#142d4a',
  sidebarIcon: '#5ba3d9',

  // Chat list
  chatListBackground: solid('#0f2035'),
  chatListText: '#e3eaf5',
  chatListSecondaryText: '#8badc7',
  chatListActiveItem: '#1a3a5c',
  chatListHoverItem: '#163148',
  chatListUnreadBadge: '#0ea5e9',

  // Chat area
  chatBackground: gradient('linear', [
    { color: '#0c1929', position: 0 },
    { color: '#1a3a5c', position: 100 },
  ], 180),
  chatHeaderBackground: '#142d4a',
  chatHeaderText: '#e3eaf5',

  // Messages
  sentMessageBackground: '#0284c7',
  sentMessageText: '#ffffff',
  receivedMessageBackground: '#1a3a5c',
  receivedMessageText: '#e3eaf5',
  messageTimestamp: '#8badc7',

  // Input
  inputBackground: '#142d4a',
  inputText: '#e3eaf5',
  inputBorder: '#2a4a6c',
  inputPlaceholder: '#8badc7',

  // Accents
  primaryAccent: '#0ea5e9',
  secondaryAccent: '#38bdf8',
  buttonBackground: '#0284c7',
  buttonText: '#ffffff',
  buttonHover: '#0369a1',

  // General
  borderColor: '#2a4a6c',
  dividerColor: '#1a3a5c',
  scrollbarTrack: '#0c1929',
  scrollbarThumb: '#2a4a6c',
};

/**
 * Pastel Pink Theme
 * Light theme with soft pink tones
 */
const pastelPinkColors: ThemeColors = {
  // Sidebar
  sidebarBackground: solid('#fdf2f8'),
  sidebarText: '#831843',
  sidebarActiveItem: '#fce7f3',
  sidebarHoverItem: '#fbcfe8',
  sidebarIcon: '#ec4899',

  // Chat list
  chatListBackground: solid('#fff1f2'),
  chatListText: '#831843',
  chatListSecondaryText: '#9d174d',
  chatListActiveItem: '#fce7f3',
  chatListHoverItem: '#fecdd3',
  chatListUnreadBadge: '#f472b6',

  // Chat area
  chatBackground: solid('#ffffff'),
  chatHeaderBackground: '#fdf2f8',
  chatHeaderText: '#831843',

  // Messages
  sentMessageBackground: '#f472b6',
  sentMessageText: '#ffffff',
  receivedMessageBackground: '#fce7f3',
  receivedMessageText: '#831843',
  messageTimestamp: '#9d174d',

  // Input
  inputBackground: '#ffffff',
  inputText: '#831843',
  inputBorder: '#fbcfe8',
  inputPlaceholder: '#9d174d',

  // Accents
  primaryAccent: '#ec4899',
  secondaryAccent: '#f472b6',
  buttonBackground: '#ec4899',
  buttonText: '#ffffff',
  buttonHover: '#db2777',

  // General
  borderColor: '#fbcfe8',
  dividerColor: '#fce7f3',
  scrollbarTrack: '#fdf2f8',
  scrollbarThumb: '#f9a8d4',
};

/**
 * Neon Dark Theme
 * Dark theme with vibrant neon accents
 */
const neonDarkColors: ThemeColors = {
  // Sidebar
  sidebarBackground: solid('#0a0a0a'),
  sidebarText: '#f0f0f0',
  sidebarActiveItem: '#1a1a1a',
  sidebarHoverItem: '#151515',
  sidebarIcon: '#00ff88',

  // Chat list
  chatListBackground: solid('#0f0f0f'),
  chatListText: '#f0f0f0',
  chatListSecondaryText: '#888888',
  chatListActiveItem: '#1a1a1a',
  chatListHoverItem: '#171717',
  chatListUnreadBadge: '#ff00ff',

  // Chat area
  chatBackground: solid('#0a0a0a'),
  chatHeaderBackground: '#111111',
  chatHeaderText: '#f0f0f0',

  // Messages
  sentMessageBackground: '#00ff88',
  sentMessageText: '#0a0a0a',
  receivedMessageBackground: '#1a1a1a',
  receivedMessageText: '#f0f0f0',
  messageTimestamp: '#666666',

  // Input
  inputBackground: '#151515',
  inputText: '#f0f0f0',
  inputBorder: '#333333',
  inputPlaceholder: '#666666',

  // Accents
  primaryAccent: '#00ff88',
  secondaryAccent: '#ff00ff',
  buttonBackground: '#00ff88',
  buttonText: '#0a0a0a',
  buttonHover: '#00cc6a',

  // General
  borderColor: '#333333',
  dividerColor: '#222222',
  scrollbarTrack: '#0a0a0a',
  scrollbarThumb: '#333333',
};

/**
 * Forest Green Theme
 * Nature-inspired green color scheme
 */
const forestGreenColors: ThemeColors = {
  // Sidebar
  sidebarBackground: solid('#0d1f17'),
  sidebarText: '#d1e7dd',
  sidebarActiveItem: '#1a3d2c',
  sidebarHoverItem: '#142f23',
  sidebarIcon: '#4ade80',

  // Chat list
  chatListBackground: solid('#112a1f'),
  chatListText: '#d1e7dd',
  chatListSecondaryText: '#86b89a',
  chatListActiveItem: '#1a3d2c',
  chatListHoverItem: '#163526',
  chatListUnreadBadge: '#22c55e',

  // Chat area
  chatBackground: gradient('linear', [
    { color: '#0d1f17', position: 0 },
    { color: '#1a3d2c', position: 100 },
  ], 135),
  chatHeaderBackground: '#142f23',
  chatHeaderText: '#d1e7dd',

  // Messages
  sentMessageBackground: '#16a34a',
  sentMessageText: '#ffffff',
  receivedMessageBackground: '#1a3d2c',
  receivedMessageText: '#d1e7dd',
  messageTimestamp: '#86b89a',

  // Input
  inputBackground: '#142f23',
  inputText: '#d1e7dd',
  inputBorder: '#2a5a40',
  inputPlaceholder: '#86b89a',

  // Accents
  primaryAccent: '#22c55e',
  secondaryAccent: '#4ade80',
  buttonBackground: '#16a34a',
  buttonText: '#ffffff',
  buttonHover: '#15803d',

  // General
  borderColor: '#2a5a40',
  dividerColor: '#1a3d2c',
  scrollbarTrack: '#0d1f17',
  scrollbarThumb: '#2a5a40',
};

/**
 * Minimal White Theme
 * Clean, minimal white/light gray theme
 */
const minimalWhiteColors: ThemeColors = {
  // Sidebar
  sidebarBackground: solid('#f8f9fa'),
  sidebarText: '#212529',
  sidebarActiveItem: '#e9ecef',
  sidebarHoverItem: '#f1f3f5',
  sidebarIcon: '#495057',

  // Chat list
  chatListBackground: solid('#ffffff'),
  chatListText: '#212529',
  chatListSecondaryText: '#6c757d',
  chatListActiveItem: '#e9ecef',
  chatListHoverItem: '#f8f9fa',
  chatListUnreadBadge: '#6264a7',

  // Chat area
  chatBackground: solid('#ffffff'),
  chatHeaderBackground: '#f8f9fa',
  chatHeaderText: '#212529',

  // Messages
  sentMessageBackground: '#6264a7',
  sentMessageText: '#ffffff',
  receivedMessageBackground: '#f1f3f5',
  receivedMessageText: '#212529',
  messageTimestamp: '#6c757d',

  // Input
  inputBackground: '#ffffff',
  inputText: '#212529',
  inputBorder: '#dee2e6',
  inputPlaceholder: '#6c757d',

  // Accents
  primaryAccent: '#6264a7',
  secondaryAccent: '#8b8cc7',
  buttonBackground: '#6264a7',
  buttonText: '#ffffff',
  buttonHover: '#4f5185',

  // General
  borderColor: '#dee2e6',
  dividerColor: '#e9ecef',
  scrollbarTrack: '#f8f9fa',
  scrollbarThumb: '#ced4da',
};

/**
 * Custom Theme Template
 * Blank template for user customization (Teams default-like)
 */
const customThemeColors: ThemeColors = {
  // Sidebar
  sidebarBackground: solid('#292828'),
  sidebarText: '#ffffff',
  sidebarActiveItem: '#3b3a39',
  sidebarHoverItem: '#323131',
  sidebarIcon: '#ffffff',

  // Chat list
  chatListBackground: solid('#1f1f1f'),
  chatListText: '#ffffff',
  chatListSecondaryText: '#c8c6c4',
  chatListActiveItem: '#3b3a39',
  chatListHoverItem: '#2d2c2c',
  chatListUnreadBadge: '#6264a7',

  // Chat area
  chatBackground: solid('#1f1f1f'),
  chatHeaderBackground: '#292828',
  chatHeaderText: '#ffffff',

  // Messages
  sentMessageBackground: '#6264a7',
  sentMessageText: '#ffffff',
  receivedMessageBackground: '#3b3a39',
  receivedMessageText: '#ffffff',
  messageTimestamp: '#c8c6c4',

  // Input
  inputBackground: '#3b3a39',
  inputText: '#ffffff',
  inputBorder: '#484644',
  inputPlaceholder: '#c8c6c4',

  // Accents
  primaryAccent: '#6264a7',
  secondaryAccent: '#8b8cc7',
  buttonBackground: '#6264a7',
  buttonText: '#ffffff',
  buttonHover: '#7b7dc7',

  // General
  borderColor: '#484644',
  dividerColor: '#3b3a39',
  scrollbarTrack: '#1f1f1f',
  scrollbarThumb: '#484644',
};

/**
 * Create a theme object with standard metadata
 */
const createBuiltInTheme = (
  id: string,
  name: string,
  description: string,
  colors: ThemeColors
): Theme => ({
  id,
  name,
  description,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  isBuiltIn: true,
  colors,
  fonts: {
    baseFontSize: 'medium',
  },
});

/**
 * All predefined themes
 */
export const PREDEFINED_THEMES: Theme[] = [
  createBuiltInTheme(
    'midnight-purple',
    'Midnight Purple',
    'Dark theme with elegant purple accents for a sophisticated look',
    midnightPurpleColors
  ),
  createBuiltInTheme(
    'ocean-blue',
    'Ocean Blue',
    'Calming blue tones inspired by the deep ocean',
    oceanBlueColors
  ),
  createBuiltInTheme(
    'pastel-pink',
    'Pastel Pink',
    'Light and cheerful theme with soft pink colors',
    pastelPinkColors
  ),
  createBuiltInTheme(
    'neon-dark',
    'Neon Dark',
    'Ultra-dark theme with vibrant neon green and magenta accents',
    neonDarkColors
  ),
  createBuiltInTheme(
    'forest-green',
    'Forest Green',
    'Nature-inspired theme with calming forest colors',
    forestGreenColors
  ),
  createBuiltInTheme(
    'minimal-white',
    'Minimal White',
    'Clean and minimal light theme for a professional look',
    minimalWhiteColors
  ),
  createBuiltInTheme(
    'custom-theme',
    'Custom Theme',
    'Start from scratch with Teams default colors',
    customThemeColors
  ),
];

/**
 * Default theme ID
 */
export const DEFAULT_THEME_ID = 'midnight-purple';

/**
 * Get a predefined theme by ID
 */
export const getPredefindThemeById = (id: string): Theme | undefined => {
  return PREDEFINED_THEMES.find(theme => theme.id === id);
};

/**
 * Get the default theme
 */
export const getDefaultTheme = (): Theme => {
  return PREDEFINED_THEMES.find(theme => theme.id === DEFAULT_THEME_ID) || PREDEFINED_THEMES[0];
};
