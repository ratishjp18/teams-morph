/**
 * Teams Morph - Font Size Selector Component
 * 
 * Allows users to select the base font size for the theme.
 */

import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import type { FontSizeOption } from '@shared/types/theme';

const fontSizeOptions: { value: FontSizeOption; label: string; preview: string }[] = [
  { value: 'small', label: 'Small', preview: '13px' },
  { value: 'medium', label: 'Medium', preview: '14px' },
  { value: 'large', label: 'Large', preview: '16px' },
  { value: 'extra-large', label: 'Extra Large', preview: '18px' },
];

export function FontSizeSelector() {
  const { state, setFontSize } = useTheme();
  const currentSize = state.currentTheme.fonts.baseFontSize;

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--app-text)] mb-2">
        Font Size
      </label>
      <div className="grid grid-cols-4 gap-2">
        {fontSizeOptions.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFontSize(option.value)}
            className={`
              px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${currentSize === option.value
                ? 'bg-[var(--app-accent)] text-white'
                : 'bg-[var(--app-bg)] text-[var(--app-text)] hover:bg-[var(--app-surface)] border border-[var(--app-border)]'
              }
            `}
          >
            <span className="block">{option.label}</span>
            <span className="text-xs opacity-75">{option.preview}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FontSizeSelector;
