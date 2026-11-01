/**
 * Teams Morph - Main Application
 * 
 * The root component that sets up providers and renders the main layout.
 */

import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { Header } from './components/layout';
import { ThemeEditor } from './components/theme-editor';
import { TeamsPreview } from './components/preview';
import { ThemeLibrary } from './components/theme-library';
import { TeamsStatus } from './components/status';
import { ToastContainer } from './components/common';

/**
 * Main application content
 */
function AppContent() {
  return (
    <div className="h-screen flex flex-col bg-[var(--app-bg)]">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Theme Library */}
        <aside className="w-72 flex flex-col border-r border-[var(--app-border)] bg-[var(--app-surface)]">
          <div className="flex-1 overflow-hidden">
            <ThemeLibrary />
          </div>
          <TeamsStatus />
        </aside>

        {/* Center - Theme Editor */}
        <div className="w-80 flex flex-col border-r border-[var(--app-border)]">
          <div className="px-4 py-3 border-b border-[var(--app-border)] bg-[var(--app-surface)]">
            <h2 className="text-lg font-semibold text-[var(--app-text)]">Theme Editor</h2>
          </div>
          <div className="flex-1 p-4 overflow-hidden">
            <ThemeEditor />
          </div>
        </div>

        {/* Right - Preview */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <TeamsPreview />
        </main>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}

/**
 * App with providers
 */
export function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
