/**
 * Teams Morph - Theme Type Definitions
 * 
 * These types define the structure of themes used throughout the application.
 * Themes can customize colors for sidebar, chat, messages, and various UI elements.
 */

/**
 * Represents a gradient stop with color and position
 */
export interface GradientStop {
  /** Color value in hex format */
  color: string;
  /** Position as percentage (0-100) */
  position: number;
}

/**
 * Gradient configuration for backgrounds
 */
export interface GradientValue {
  /** Type of gradient */
  type: 'linear' | 'radial';
  /** Angle for linear gradients (0-360 degrees) */
  angle?: number;
  /** Array of color stops */
  stops: GradientStop[];
}

/**
 * A color value that can be either solid or gradient
 */
export interface ColorValue {
  /** Whether this is a solid color or gradient */
  type: 'solid' | 'gradient';
  /** Hex color value for solid colors */
  value: string;
  /** Gradient configuration (only for gradient type) */
  gradient?: GradientValue;
}

/**
 * Theme colors configuration
 * Contains all customizable color values for the Teams interface
 */
export interface ThemeColors {
  // Sidebar colors
  /** Background color/gradient for the navigation sidebar */
  sidebarBackground: ColorValue;
  /** Text color in the sidebar */
  sidebarText: string;
  /** Background color for active/selected item in sidebar */
  sidebarActiveItem: string;
  /** Background color for hovered item in sidebar */
  sidebarHoverItem: string;
  /** Icon color in the sidebar */
  sidebarIcon: string;

  // Chat list colors
  /** Background color/gradient for the chat list panel */
  chatListBackground: ColorValue;
  /** Primary text color in chat list */
  chatListText: string;
  /** Secondary text color in chat list (timestamps, previews) */
  chatListSecondaryText: string;
  /** Background color for active/selected chat */
  chatListActiveItem: string;
  /** Background color for hovered chat */
  chatListHoverItem: string;
  /** Badge color for unread messages */
  chatListUnreadBadge: string;

  // Main chat area colors
  /** Background color/gradient for the main chat area */
  chatBackground: ColorValue;
  /** Background color for the chat header */
  chatHeaderBackground: string;
  /** Text color in the chat header */
  chatHeaderText: string;

  // Message bubble colors
  /** Background color for sent messages */
  sentMessageBackground: string;
  /** Text color for sent messages */
  sentMessageText: string;
  /** Background color for received messages */
  receivedMessageBackground: string;
  /** Text color for received messages */
  receivedMessageText: string;
  /** Color for message timestamps */
  messageTimestamp: string;

  // Input area colors
  /** Background color for the message input field */
  inputBackground: string;
  /** Text color in the input field */
  inputText: string;
  /** Border color for the input field */
  inputBorder: string;
  /** Placeholder text color */
  inputPlaceholder: string;

  // Accent colors
  /** Primary accent color (links, highlights) */
  primaryAccent: string;
  /** Secondary accent color */
  secondaryAccent: string;
  /** Button background color */
  buttonBackground: string;
  /** Button text color */
  buttonText: string;
  /** Button hover background color */
  buttonHover: string;

  // General colors
  /** General border color */
  borderColor: string;
  /** Divider/separator color */
  dividerColor: string;
  /** Scrollbar track color */
  scrollbarTrack: string;
  /** Scrollbar thumb color */
  scrollbarThumb: string;
}

/**
 * Font size options
 */
export type FontSizeOption = 'small' | 'medium' | 'large' | 'extra-large';

/**
 * Theme font configuration
 */
export interface ThemeFonts {
  /** Base font size for the theme */
  baseFontSize: FontSizeOption;
  /** Optional custom font family */
  fontFamily?: string;
}

/**
 * Complete theme definition
 */
export interface Theme {
  /** Unique identifier for the theme */
  id: string;
  /** Display name of the theme */
  name: string;
  /** Optional description */
  description?: string;
  /** ISO timestamp of creation */
  createdAt: string;
  /** ISO timestamp of last update */
  updatedAt: string;
  /** Whether this is a built-in theme (cannot be deleted) */
  isBuiltIn: boolean;
  /** Color configuration */
  colors: ThemeColors;
  /** Font configuration */
  fonts: ThemeFonts;
}

/**
 * Theme export format (excludes internal properties)
 */
export interface ThemeExport {
  name: string;
  description?: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  version: string;
  exportedAt: string;
}

/**
 * Theme update payload (partial update)
 */
export type ThemeUpdate = Partial<Pick<Theme, 'name' | 'description' | 'colors' | 'fonts'>>;

/**
 * Font size to CSS value mapping
 */
export const FONT_SIZE_VALUES: Record<FontSizeOption, string> = {
  'small': '13px',
  'medium': '14px',
  'large': '16px',
  'extra-large': '18px',
};
