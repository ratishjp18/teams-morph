/**
 * Teams Morph - Theme Card Component
 * 
 * A card displaying a theme preview with actions.
 */

import React from 'react';
import type { Theme, ColorValue } from '@shared/types/theme';

interface ThemeCardProps {
  theme: Theme;
  isSelected: boolean;
  onSelect: () => void;
  onDelete?: () => void;
}

/**
 * Get color string from ColorValue
 */
function getColorString(color: string | ColorValue): string {
  if (typeof color === 'string') return color;
  return color.value;
}

export function ThemeCard({ theme, isSelected, onSelect, onDelete }: ThemeCardProps) {
  const colors = theme.colors;

  return (
    <div
      onClick={onSelect}
      className={`
        group relative rounded-lg overflow-hidden cursor-pointer transition-all
        border-2
        ${isSelected 
          ? 'border-[var(--app-accent)] shadow-lg' 
          : 'border-[var(--app-border)] hover:border-[var(--app-accent)]/50'
        }
      `}
    >
      {/* Color preview */}
      <div className="h-20 flex">
        {/* Sidebar preview */}
        <div
          className="w-4"
          style={{ backgroundColor: getColorString(colors.sidebarBackground) }}
        />
        {/* Chat list preview */}
        <div
          className="w-8"
          style={{ backgroundColor: getColorString(colors.chatListBackground) }}
        />
        {/* Chat area preview */}
        <div
          className="flex-1 flex flex-col"
          style={{ backgroundColor: getColorString(colors.chatBackground) }}
        >
          {/* Messages preview */}
          <div className="flex-1 p-1 flex flex-col justify-center gap-1">
            <div
              className="h-2 w-2/3 rounded-sm"
              style={{ backgroundColor: colors.receivedMessageBackground }}
            />
            <div
              className="h-2 w-1/2 rounded-sm self-end"
              style={{ backgroundColor: colors.sentMessageBackground }}
            />
          </div>
          {/* Input preview */}
          <div
            className="h-3 mx-1 mb-1 rounded-sm"
            style={{ backgroundColor: colors.inputBackground }}
          />
        </div>
      </div>

      {/* Theme info */}
      <div className="p-3 bg-[var(--app-surface)]">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-medium text-sm text-[var(--app-text)] truncate">
              {theme.name}
            </h3>
            {theme.description && (
              <p className="text-xs text-[var(--app-text-secondary)] truncate mt-0.5">
                {theme.description}
              </p>
            )}
          </div>
          
          {/* Badges */}
          <div className="flex gap-1 flex-shrink-0">
            {theme.isBuiltIn && (
              <span className="px-1.5 py-0.5 text-xs rounded bg-[var(--app-accent)]/20 text-[var(--app-accent)]">
                Built-in
              </span>
            )}
            {isSelected && (
              <span className="px-1.5 py-0.5 text-xs rounded bg-[var(--app-success)]/20 text-[var(--app-success)]">
                Active
              </span>
            )}
          </div>
        </div>

        {/* Accent colors preview */}
        <div className="flex gap-1 mt-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: colors.primaryAccent }}
            title="Primary accent"
          />
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: colors.sentMessageBackground }}
            title="Sent message"
          />
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: colors.receivedMessageBackground }}
            title="Received message"
          />
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: getColorString(colors.sidebarBackground) }}
            title="Sidebar"
          />
        </div>
      </div>

      {/* Delete button (for non-built-in themes) */}
      {!theme.isBuiltIn && onDelete && (
        <button
          onClick={e => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-2 right-2 p-1 rounded bg-[var(--app-error)] text-white opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete theme"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default ThemeCard;
