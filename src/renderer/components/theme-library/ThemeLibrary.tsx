/**
 * Teams Morph - Theme Library Component
 * 
 * Displays all available themes (built-in and saved).
 */

import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useToast } from '../../hooks/useToast';
import { ThemeCard } from './ThemeCard';
import { Button, Modal, ModalFooter, Input } from '../common';
import type { Theme } from '@shared/types/theme';

type TabType = 'builtin' | 'saved';

export function ThemeLibrary() {
  const { state, selectTheme, deleteTheme, saveTheme, exportTheme, importTheme, resetChanges } = useTheme();
  const { success, error } = useToast();
  const { builtInThemes, savedThemes, selectedThemeId, hasUnsavedChanges, currentTheme } = state;

  const [activeTab, setActiveTab] = useState<TabType>('builtin');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [themeToDelete, setThemeToDelete] = useState<Theme | null>(null);
  const [newThemeName, setNewThemeName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const themes = activeTab === 'builtin' ? builtInThemes : savedThemes;

  // Handle theme selection
  const handleSelectTheme = (theme: Theme) => {
    selectTheme(theme);
  };

  // Handle save theme
  const handleSaveTheme = async () => {
    if (!newThemeName.trim()) {
      error('Please enter a theme name');
      return;
    }

    setIsSaving(true);
    try {
      const saved = await saveTheme(newThemeName.trim());
      if (saved) {
        success(`Theme "${newThemeName}" saved successfully`);
        setShowSaveModal(false);
        setNewThemeName('');
        setActiveTab('saved');
      } else {
        error('Failed to save theme');
      }
    } catch (err) {
      error('Failed to save theme');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle delete theme
  const handleDeleteTheme = async () => {
    if (!themeToDelete) return;

    try {
      const deleted = await deleteTheme(themeToDelete.id);
      if (deleted) {
        success(`Theme "${themeToDelete.name}" deleted`);
      } else {
        error('Failed to delete theme');
      }
    } catch (err) {
      error('Failed to delete theme');
    } finally {
      setShowDeleteModal(false);
      setThemeToDelete(null);
    }
  };

  // Handle export
  const handleExport = async () => {
    try {
      const exported = await exportTheme();
      if (exported) {
        success('Theme exported successfully');
      }
    } catch (err) {
      error('Failed to export theme');
    }
  };

  // Handle import
  const handleImport = async () => {
    try {
      const imported = await importTheme();
      if (imported) {
        success(`Theme "${imported.name}" imported successfully`);
        setActiveTab('saved');
      }
    } catch (err) {
      error('Failed to import theme');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--app-border)]">
        <h2 className="text-lg font-semibold text-[var(--app-text)]">Theme Library</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--app-border)]">
        <button
          onClick={() => setActiveTab('builtin')}
          className={`
            flex-1 px-4 py-2 text-sm font-medium transition-colors
            ${activeTab === 'builtin'
              ? 'text-[var(--app-accent)] border-b-2 border-[var(--app-accent)]'
              : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text)]'
            }
          `}
        >
          Built-in ({builtInThemes.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`
            flex-1 px-4 py-2 text-sm font-medium transition-colors
            ${activeTab === 'saved'
              ? 'text-[var(--app-accent)] border-b-2 border-[var(--app-accent)]'
              : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text)]'
            }
          `}
        >
          Saved ({savedThemes.length})
        </button>
      </div>

      {/* Theme grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {themes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[var(--app-text-secondary)]">
              {activeTab === 'saved' 
                ? 'No saved themes yet. Create your first theme!'
                : 'No built-in themes available'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {themes.map(theme => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={selectedThemeId === theme.id}
                onSelect={() => handleSelectTheme(theme)}
                onDelete={!theme.isBuiltIn ? () => {
                  setThemeToDelete(theme);
                  setShowDeleteModal(true);
                } : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 space-y-2 border-t border-[var(--app-border)]">
        {hasUnsavedChanges && (
          <div className="flex gap-2 mb-2">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => {
                setNewThemeName(currentTheme.isBuiltIn ? '' : currentTheme.name);
                setShowSaveModal(true);
              }}
            >
              Save Theme
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetChanges}
            >
              Reset
            </Button>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={handleExport}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={handleImport}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Import
          </Button>
        </div>
      </div>

      {/* Save Modal */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Save Theme"
        size="sm"
      >
        <Input
          label="Theme Name"
          value={newThemeName}
          onChange={e => setNewThemeName(e.target.value)}
          placeholder="My Custom Theme"
          autoFocus
        />
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowSaveModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveTheme}
            isLoading={isSaving}
            disabled={!newThemeName.trim()}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Theme"
        size="sm"
      >
        <p className="text-[var(--app-text)]">
          Are you sure you want to delete "{themeToDelete?.name}"? This action cannot be undone.
        </p>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteTheme}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ThemeLibrary;
