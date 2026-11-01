/**
 * Teams Morph - Color Utilities
 * 
 * Helper functions for color manipulation and conversion.
 */

/**
 * Convert hex color to RGB object
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Convert hex to HSL
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to hex
 */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  return rgbToHex(
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  );
}

/**
 * Validate hex color format
 */
export function isValidHex(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

/**
 * Ensure hex color has # prefix
 */
export function normalizeHex(hex: string): string {
  if (!hex.startsWith('#')) {
    hex = '#' + hex;
  }
  return hex.toUpperCase();
}

/**
 * Get contrasting text color (black or white) for a background
 */
export function getContrastColor(hexBg: string): string {
  const rgb = hexToRgb(hexBg);
  if (!rgb) return '#FFFFFF';

  // Calculate relative luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Lighten a hex color by a percentage
 */
export function lighten(hex: string, percent: number): string {
  const hsl = hexToHsl(hex);
  if (!hsl) return hex;

  hsl.l = Math.min(100, hsl.l + percent);
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

/**
 * Darken a hex color by a percentage
 */
export function darken(hex: string, percent: number): string {
  const hsl = hexToHsl(hex);
  if (!hsl) return hex;

  hsl.l = Math.max(0, hsl.l - percent);
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

/**
 * Mix two colors together
 */
export function mixColors(color1: string, color2: string, weight: number = 0.5): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const w = Math.max(0, Math.min(1, weight));
  const r = Math.round(rgb1.r * (1 - w) + rgb2.r * w);
  const g = Math.round(rgb1.g * (1 - w) + rgb2.g * w);
  const b = Math.round(rgb1.b * (1 - w) + rgb2.b * w);

  return rgbToHex(r, g, b);
}

/**
 * Generate a color palette from a base color
 */
export function generatePalette(baseColor: string): string[] {
  const hsl = hexToHsl(baseColor);
  if (!hsl) return [baseColor];

  return [
    hslToHex(hsl.h, hsl.s, Math.min(95, hsl.l + 40)), // Lightest
    hslToHex(hsl.h, hsl.s, Math.min(85, hsl.l + 25)),
    hslToHex(hsl.h, hsl.s, Math.min(75, hsl.l + 15)),
    baseColor,
    hslToHex(hsl.h, hsl.s, Math.max(25, hsl.l - 15)),
    hslToHex(hsl.h, hsl.s, Math.max(15, hsl.l - 25)),
    hslToHex(hsl.h, hsl.s, Math.max(5, hsl.l - 40)), // Darkest
  ];
}

/**
 * Parse CSS color string to hex
 */
export function parseColor(color: string): string | null {
  // Already hex
  if (isValidHex(color)) {
    return normalizeHex(color);
  }

  // RGB format
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    return rgbToHex(
      parseInt(rgbMatch[1]),
      parseInt(rgbMatch[2]),
      parseInt(rgbMatch[3])
    );
  }

  // RGBA format (ignore alpha)
  const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbaMatch) {
    return rgbToHex(
      parseInt(rgbaMatch[1]),
      parseInt(rgbaMatch[2]),
      parseInt(rgbaMatch[3])
    );
  }

  return null;
}

/**
 * Common preset colors for the color picker
 */
export const PRESET_COLORS = [
  '#FFFFFF', '#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA',
  '#ADB5BD', '#6C757D', '#495057', '#343A40', '#212529',
  '#000000',
  '#FF6B6B', '#EE5253', '#E74C3C', '#C0392B', '#922B21',
  '#FF9F43', '#F39C12', '#E67E22', '#D35400', '#BA4A00',
  '#FECA57', '#F1C40F', '#FFC312', '#F79F1F', '#EAB543',
  '#1DD1A1', '#10AC84', '#2ECC71', '#27AE60', '#1E8449',
  '#00D2D3', '#01A3A4', '#3498DB', '#2980B9', '#21618C',
  '#5F27CD', '#6C5CE7', '#9B59B6', '#8E44AD', '#6C3483',
  '#FF6B81', '#F78FB3', '#E84393', '#D63384', '#A0306E',
];
