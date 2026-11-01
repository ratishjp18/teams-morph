/**
 * Teams Morph - Preview Chat List Component
 * 
 * The chat/conversation list in the Teams preview.
 */

import React from 'react';

const chats = [
  {
    id: '1',
    name: 'John Doe',
    message: 'Hey, can you review my PR?',
    time: '10:30 AM',
    unread: 2,
    avatar: 'JD',
  },
  {
    id: '2',
    name: 'Jane Smith',
    message: 'The meeting is at 3pm',
    time: '9:45 AM',
    unread: 0,
    avatar: 'JS',
  },
  {
    id: '3',
    name: 'Dev Team',
    message: 'New deployment scheduled',
    time: 'Yesterday',
    unread: 0,
    avatar: 'DT',
    active: true,
  },
  {
    id: '4',
    name: 'Project Alpha',
    message: 'Sprint planning tomorrow',
    time: 'Yesterday',
    unread: 5,
    avatar: 'PA',
  },
  {
    id: '5',
    name: 'Sarah Wilson',
    message: 'Thanks for your help!',
    time: 'Mon',
    unread: 0,
    avatar: 'SW',
  },
];

export function PreviewChatList() {
  return (
    <div
      className="w-56 flex flex-col border-r overflow-hidden"
      style={{
        background: 'var(--preview-chatlist-bg)',
        borderColor: 'var(--preview-border)',
      }}
    >
      {/* Search */}
      <div className="p-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-md"
          style={{
            backgroundColor: 'var(--preview-input-bg)',
            border: '1px solid var(--preview-input-border)',
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: 'var(--preview-input-placeholder)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span
            className="text-sm"
            style={{ color: 'var(--preview-input-placeholder)' }}
          >
            Search
          </span>
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => (
          <div
            key={chat.id}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors"
            style={{
              backgroundColor: chat.active
                ? 'var(--preview-chatlist-active)'
                : 'transparent',
            }}
          >
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
              style={{ 
                backgroundColor: 'var(--preview-accent)',
                color: 'var(--preview-button-text)',
              }}
            >
              {chat.avatar}
            </div>

            {/* Chat info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span
                  className="font-medium text-sm truncate"
                  style={{ color: 'var(--preview-chatlist-text)' }}
                >
                  {chat.name}
                </span>
                <span
                  className="text-xs flex-shrink-0 ml-2"
                  style={{ color: 'var(--preview-chatlist-secondary)' }}
                >
                  {chat.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className="text-xs truncate"
                  style={{ color: 'var(--preview-chatlist-secondary)' }}
                >
                  {chat.message}
                </p>
                {chat.unread > 0 && (
                  <span
                    className="flex-shrink-0 ml-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{
                      backgroundColor: 'var(--preview-chatlist-badge)',
                      color: 'var(--preview-button-text)',
                    }}
                  >
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviewChatList;
