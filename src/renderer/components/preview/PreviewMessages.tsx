/**
 * Teams Morph - Preview Messages Component
 * 
 * The message area showing sent and received messages.
 */

import React from 'react';

const messages = [
  {
    id: '1',
    type: 'received',
    sender: 'John Doe',
    avatar: 'JD',
    text: 'Hey everyone! How\'s the project going?',
    time: '10:30 AM',
  },
  {
    id: '2',
    type: 'received',
    sender: 'Jane Smith',
    avatar: 'JS',
    text: 'Going great! I just finished the API integration.',
    time: '10:32 AM',
  },
  {
    id: '3',
    type: 'sent',
    text: 'Nice work Jane! I\'ll start on the frontend components now.',
    time: '10:35 AM',
  },
  {
    id: '4',
    type: 'received',
    sender: 'John Doe',
    avatar: 'JD',
    text: 'Perfect timing! The new designs are ready for implementation.',
    time: '10:36 AM',
  },
  {
    id: '5',
    type: 'sent',
    text: 'Awesome, let me check them out. Should be able to finish by EOD. 🚀',
    time: '10:38 AM',
  },
];

export function PreviewMessages() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <div
          key={message.id}
          className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`flex gap-2 max-w-[75%] ${message.type === 'sent' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar (for received messages) */}
            {message.type === 'received' && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{
                  backgroundColor: 'var(--preview-accent)',
                  color: 'var(--preview-button-text)',
                }}
              >
                {message.avatar}
              </div>
            )}

            {/* Message bubble */}
            <div>
              {/* Sender name (for received messages) */}
              {message.type === 'received' && (
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: 'var(--preview-chatlist-text)' }}
                >
                  {message.sender}
                </p>
              )}
              
              <div
                className="px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: message.type === 'sent'
                    ? 'var(--preview-sent-bg)'
                    : 'var(--preview-received-bg)',
                  color: message.type === 'sent'
                    ? 'var(--preview-sent-text)'
                    : 'var(--preview-received-text)',
                  fontSize: 'var(--preview-font-size)',
                }}
              >
                {message.text}
              </div>
              
              {/* Timestamp */}
              <p
                className={`text-xs mt-1 ${message.type === 'sent' ? 'text-right' : ''}`}
                style={{ color: 'var(--preview-timestamp)' }}
              >
                {message.time}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PreviewMessages;
