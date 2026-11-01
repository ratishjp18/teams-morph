/**
 * Teams Morph - Teams Status Component
 * 
 * Shows detailed information about Teams integration status.
 */

import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useToast } from '../../hooks/useToast';
import { Button, Modal } from '../common';

export function TeamsStatus() {
  const { state, applyToTeams } = useTheme();
  const { info, warning } = useToast();
  const { teamsInfo, currentTheme } = state;
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const canApply = teamsInfo?.integrationStatus.canApplyTheme ?? false;

  const handleApply = async () => {
    setIsApplying(true);
    try {
      const result = await applyToTeams();
      if (result.success) {
        info('Theme applied successfully');
      } else {
        warning(result.message);
      }
    } catch (error) {
      warning('Could not apply theme to Teams');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="p-4 border-t border-[var(--app-border)] bg-[var(--app-surface)]">
      {/* Status summary */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[var(--app-text)]">Teams Integration</h3>
        <button
          onClick={() => setShowInfoModal(true)}
          className="text-[var(--app-text-secondary)] hover:text-[var(--app-text)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`w-2 h-2 rounded-full ${
            canApply 
              ? 'bg-[var(--app-success)]' 
              : teamsInfo?.isInstalled 
                ? 'bg-[var(--app-warning)]' 
                : 'bg-[var(--app-text-secondary)]'
          }`}
        />
        <span className="text-sm text-[var(--app-text-secondary)]">
          {canApply
            ? 'Ready to apply'
            : teamsInfo?.isInstalled
              ? 'Preview only (no direct integration)'
              : 'Teams not installed'
          }
        </span>
      </div>

      {/* Apply button */}
      <Button
        variant={canApply ? 'primary' : 'secondary'}
        className="w-full"
        disabled={!canApply}
        isLoading={isApplying}
        onClick={handleApply}
      >
        {canApply ? 'Apply to Teams' : 'Apply Theme (Preview Only)'}
      </Button>

      {!canApply && (
        <p className="text-xs text-[var(--app-text-secondary)] mt-2 text-center">
          Your theme is saved and visible in the preview
        </p>
      )}

      {/* Info Modal */}
      <Modal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        title="About Teams Integration"
        size="md"
      >
        <div className="space-y-4">
          {/* Current status */}
          <div>
            <h4 className="font-medium text-[var(--app-text)] mb-2">Current Status</h4>
            {teamsInfo?.isInstalled ? (
              <div className="p-3 rounded-md bg-[var(--app-bg)]">
                <p className="text-sm text-[var(--app-text)]">
                  <strong>Teams Detected:</strong> {teamsInfo.variant === 'new' ? 'New Teams' : 'Classic Teams'}
                  {teamsInfo.version && ` (v${teamsInfo.version})`}
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-md bg-[var(--app-bg)]">
                <p className="text-sm text-[var(--app-text-secondary)]">
                  Microsoft Teams is not installed on this system.
                </p>
              </div>
            )}
          </div>

          {/* Supported features */}
          <div>
            <h4 className="font-medium text-[var(--app-text)] mb-2">What You Can Do</h4>
            <ul className="space-y-1">
              {teamsInfo?.integrationStatus.supportedFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[var(--app-text)]">
                  <span className="text-[var(--app-success)]">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div>
            <h4 className="font-medium text-[var(--app-text)] mb-2">Limitations</h4>
            <ul className="space-y-1">
              {teamsInfo?.integrationStatus.limitations.map((limitation, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--app-text-secondary)]">
                  <span className="text-[var(--app-warning)] mt-0.5">•</span>
                  {limitation}
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          {teamsInfo?.integrationStatus.notes && (
            <div className="p-3 rounded-md bg-[var(--app-accent)]/10 border border-[var(--app-accent)]/30">
              <p className="text-sm text-[var(--app-text)]">
                {teamsInfo.integrationStatus.notes}
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default TeamsStatus;
