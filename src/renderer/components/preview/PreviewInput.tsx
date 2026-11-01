/**
 * Teams Morph - Preview Input Component
 * 
 * The message input area at the bottom of the chat.
 */

import React from 'react';

export function PreviewInput() {
  return (
    <div
      className="px-4 py-3 border-t"
      style={{ borderColor: 'var(--preview-border)' }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-md"
        style={{
          backgroundColor: 'var(--preview-input-bg)',
          border: '1px solid var(--preview-input-border)',
        }}
      >
        {/* Attachment button */}
        <button
          className="p-1 rounded hover:opacity-80 transition-opacity"
          style={{ color: 'var(--preview-input-placeholder)' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Input field */}
        <div className="flex-1">
          <span
            style={{
              color: 'var(--preview-input-placeholder)',
              fontSize: 'var(--preview-font-size)',
            }}
          >
            Type a message...
          </span>
        </div>

        {/* Emoji button */}
        <button
          className="p-1 rounded hover:opacity-80 transition-opacity"
          style={{ color: 'var(--preview-input-placeholder)' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Send button */}
        <button
          className="p-1.5 rounded"
          style={{
            backgroundColor: 'var(--preview-button-bg)',
            color: 'var(--preview-button-text)',
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PreviewInput;
