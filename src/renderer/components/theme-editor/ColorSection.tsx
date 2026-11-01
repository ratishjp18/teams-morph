/**
 * Teams Morph - Color Section Component
 * 
 * A collapsible section containing multiple color pickers.
 */

import React, { useState, ReactNode } from 'react';

interface ColorSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function ColorSection({ title, icon, children, defaultOpen = true }: ColorSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[var(--app-border)] rounded-lg overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[var(--app-bg)] hover:bg-[var(--app-surface)] transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-[var(--app-accent)]">{icon}</span>}
          <span className="font-medium text-[var(--app-text)]">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--app-text-secondary)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-4 py-4 space-y-4 bg-[var(--app-surface)] animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * A row of color pickers within a section
 */
interface ColorRowProps {
  children: ReactNode;
}

export function ColorRow({ children }: ColorRowProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {children}
    </div>
  );
}

export default ColorSection;
