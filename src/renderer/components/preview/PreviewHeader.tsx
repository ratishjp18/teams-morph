/**
 * Teams Morph - Preview Header Component
 * 
 * The header bar of the Teams preview showing the current chat title.
 */

import React from 'react';

export function PreviewHeader() {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 border-b"
      style={{
        backgroundColor: 'var(--preview-chat-header-bg)',
        borderColor: 'var(--preview-border)',
      }}
    >
      {/* Chat info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
          style={{ backgroundColor: 'var(--preview-accent)' }}
        >
          <span style={{ color: 'var(--preview-button-text)' }}>DT</span>
        </div>
        
        {/* Title */}
        <div>
          <h3
            className="font-semibold text-sm"
            style={{ color: 'var(--preview-chat-header-text)' }}
          >
            Dev Team
          </h3>
          <p
            className="text-xs"
            style={{ color: 'var(--preview-timestamp)' }}
          >
            5 members
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Video call */}
        <button
          className="p-2 rounded-md hover:opacity-80 transition-opacity"
          style={{ color: 'var(--preview-chat-header-text)' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        
        {/* Audio call */}
        <button
          className="p-2 rounded-md hover:opacity-80 transition-opacity"
          style={{ color: 'var(--preview-chat-header-text)' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>

        {/* More options */}
        <button
          className="p-2 rounded-md hover:opacity-80 transition-opacity"
          style={{ color: 'var(--preview-chat-header-text)' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PreviewHeader;
