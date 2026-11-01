/**
 * Teams Morph - Teams Preview Component
 * 
 * Main preview container showing a Teams-inspired interface.
 */

import React from 'react';
import { PreviewSidebar } from './PreviewSidebar';
import { PreviewChatList } from './PreviewChatList';
import { PreviewHeader } from './PreviewHeader';
import { PreviewMessages } from './PreviewMessages';
import { PreviewInput } from './PreviewInput';

export function TeamsPreview() {
  return (
    <div className="h-full flex flex-col">
      {/* Preview label */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--app-surface)] border-b border-[var(--app-border)]">
        <h2 className="text-sm font-semibold text-[var(--app-text)]">Live Preview</h2>
        <span className="text-xs text-[var(--app-text-secondary)]">Changes apply instantly</span>
      </div>

      {/* Preview container */}
      <div className="flex-1 overflow-hidden rounded-lg border border-[var(--app-border)] m-4 shadow-lg">
        <div className="h-full flex">
          {/* Navigation sidebar */}
          <PreviewSidebar />

          {/* Chat list */}
          <PreviewChatList />

          {/* Main chat area */}
          <div
            className="flex-1 flex flex-col"
            style={{ background: 'var(--preview-chat-bg)' }}
          >
            {/* Chat header */}
            <PreviewHeader />

            {/* Messages */}
            <PreviewMessages />

            {/* Message input */}
            <PreviewInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamsPreview;
