/**
 * Teams Morph - Header Component
 * 
 * The main application header with title and Teams status.
 */

import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../common';

export function Header() {
  const { state, detectTeams } = useTheme();
  const { teamsInfo, isDetectingTeams } = state;

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[var(--app-surface)] border-b border-[var(--app-border)]">
      {/* Logo and title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--app-accent)] to-purple-500 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-[var(--app-text)]">Teams Morph</h1>
          <p className="text-xs text-[var(--app-text-secondary)]">Theme Customizer for Microsoft Teams</p>
        </div>
      </div>

      {/* Teams status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {isDetectingTeams ? (
            <div className="flex items-center gap-2 text-[var(--app-text-secondary)]">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-sm">Detecting Teams...</span>
            </div>
          ) : teamsInfo?.isInstalled ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--app-success)]" />
              <span className="text-sm text-[var(--app-text)]">
                Teams {teamsInfo.variant === 'new' ? '(New)' : teamsInfo.variant === 'classic' ? '(Classic)' : ''} 
                {teamsInfo.version && ` v${teamsInfo.version}`}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--app-warning)]" />
              <span className="text-sm text-[var(--app-text-secondary)]">Teams not detected</span>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => detectTeams()}
          disabled={isDetectingTeams}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </Button>
      </div>
    </header>
  );
}

export default Header;
