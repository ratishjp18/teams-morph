/**
 * Teams Morph - Theme Editor Component
 * 
 * Main theme editing interface with all color customization options.
 */

import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { ColorSection, ColorRow } from './ColorSection';
import { ColorPicker } from './ColorPicker';
import { FontSizeSelector } from './FontSizeSelector';
import type { ColorValue } from '@shared/types/theme';

/**
 * Helper to get string color from theme
 */
function getColorString(colorValue: string | ColorValue): string {
  if (typeof colorValue === 'string') {
    return colorValue;
  }
  return colorValue.value;
}

export function ThemeEditor() {
  const { state, setColor } = useTheme();
  const { currentTheme } = state;
  const colors = currentTheme.colors;

  // Helper to create color change handler
  const handleColor = (path: string) => (value: string) => {
    setColor(path, value);
  };

  // Helper for ColorValue fields (backgrounds)
  const handleColorValue = (path: string) => (value: string) => {
    const colorValue: ColorValue = { type: 'solid', value };
    setColor(path, colorValue);
  };

  return (
    <div className="space-y-4 h-full overflow-y-auto pr-2 scrollbar-thin">
      {/* Current theme name */}
      <div className="flex items-center gap-2 pb-3 border-b border-[var(--app-border)]">
        <span className="text-sm text-[var(--app-text-secondary)]">Editing:</span>
        <span className="font-semibold text-[var(--app-text)]">{currentTheme.name}</span>
        {currentTheme.isBuiltIn && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--app-accent)] text-white">
            Built-in
          </span>
        )}
        {state.hasUnsavedChanges && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--app-warning)] text-black">
            Unsaved
          </span>
        )}
      </div>

      {/* Font Size */}
      <div className="pb-3 border-b border-[var(--app-border)]">
        <FontSizeSelector />
      </div>

      {/* Sidebar Colors */}
      <ColorSection
        title="Sidebar"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        }
      >
        <ColorPicker
          label="Background"
          value={getColorString(colors.sidebarBackground)}
          onChange={handleColorValue('sidebarBackground')}
        />
        <ColorRow>
          <ColorPicker
            label="Text"
            value={colors.sidebarText}
            onChange={handleColor('sidebarText')}
          />
          <ColorPicker
            label="Icons"
            value={colors.sidebarIcon}
            onChange={handleColor('sidebarIcon')}
          />
        </ColorRow>
        <ColorRow>
          <ColorPicker
            label="Active Item"
            value={colors.sidebarActiveItem}
            onChange={handleColor('sidebarActiveItem')}
          />
          <ColorPicker
            label="Hover Item"
            value={colors.sidebarHoverItem}
            onChange={handleColor('sidebarHoverItem')}
          />
        </ColorRow>
      </ColorSection>

      {/* Chat List Colors */}
      <ColorSection
        title="Chat List"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        }
      >
        <ColorPicker
          label="Background"
          value={getColorString(colors.chatListBackground)}
          onChange={handleColorValue('chatListBackground')}
        />
        <ColorRow>
          <ColorPicker
            label="Text"
            value={colors.chatListText}
            onChange={handleColor('chatListText')}
          />
          <ColorPicker
            label="Secondary Text"
            value={colors.chatListSecondaryText}
            onChange={handleColor('chatListSecondaryText')}
          />
        </ColorRow>
        <ColorRow>
          <ColorPicker
            label="Active Item"
            value={colors.chatListActiveItem}
            onChange={handleColor('chatListActiveItem')}
          />
          <ColorPicker
            label="Unread Badge"
            value={colors.chatListUnreadBadge}
            onChange={handleColor('chatListUnreadBadge')}
          />
        </ColorRow>
      </ColorSection>

      {/* Chat Area Colors */}
      <ColorSection
        title="Chat Area"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        }
      >
        <ColorPicker
          label="Background"
          value={getColorString(colors.chatBackground)}
          onChange={handleColorValue('chatBackground')}
        />
        <ColorRow>
          <ColorPicker
            label="Header Background"
            value={colors.chatHeaderBackground}
            onChange={handleColor('chatHeaderBackground')}
          />
          <ColorPicker
            label="Header Text"
            value={colors.chatHeaderText}
            onChange={handleColor('chatHeaderText')}
          />
        </ColorRow>
      </ColorSection>

      {/* Message Colors */}
      <ColorSection
        title="Messages"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        }
      >
        <ColorRow>
          <ColorPicker
            label="Sent Background"
            value={colors.sentMessageBackground}
            onChange={handleColor('sentMessageBackground')}
          />
          <ColorPicker
            label="Sent Text"
            value={colors.sentMessageText}
            onChange={handleColor('sentMessageText')}
          />
        </ColorRow>
        <ColorRow>
          <ColorPicker
            label="Received Background"
            value={colors.receivedMessageBackground}
            onChange={handleColor('receivedMessageBackground')}
          />
          <ColorPicker
            label="Received Text"
            value={colors.receivedMessageText}
            onChange={handleColor('receivedMessageText')}
          />
        </ColorRow>
        <ColorPicker
          label="Timestamp"
          value={colors.messageTimestamp}
          onChange={handleColor('messageTimestamp')}
        />
      </ColorSection>

      {/* Input Colors */}
      <ColorSection
        title="Message Input"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        }
      >
        <ColorRow>
          <ColorPicker
            label="Background"
            value={colors.inputBackground}
            onChange={handleColor('inputBackground')}
          />
          <ColorPicker
            label="Border"
            value={colors.inputBorder}
            onChange={handleColor('inputBorder')}
          />
        </ColorRow>
        <ColorRow>
          <ColorPicker
            label="Text"
            value={colors.inputText}
            onChange={handleColor('inputText')}
          />
          <ColorPicker
            label="Placeholder"
            value={colors.inputPlaceholder}
            onChange={handleColor('inputPlaceholder')}
          />
        </ColorRow>
      </ColorSection>

      {/* Accent Colors */}
      <ColorSection
        title="Accent & Buttons"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        }
      >
        <ColorRow>
          <ColorPicker
            label="Primary Accent"
            value={colors.primaryAccent}
            onChange={handleColor('primaryAccent')}
          />
          <ColorPicker
            label="Secondary Accent"
            value={colors.secondaryAccent}
            onChange={handleColor('secondaryAccent')}
          />
        </ColorRow>
        <ColorRow>
          <ColorPicker
            label="Button Background"
            value={colors.buttonBackground}
            onChange={handleColor('buttonBackground')}
          />
          <ColorPicker
            label="Button Text"
            value={colors.buttonText}
            onChange={handleColor('buttonText')}
          />
        </ColorRow>
        <ColorPicker
          label="Button Hover"
          value={colors.buttonHover}
          onChange={handleColor('buttonHover')}
        />
      </ColorSection>

      {/* General Colors */}
      <ColorSection
        title="General"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
        defaultOpen={false}
      >
        <ColorRow>
          <ColorPicker
            label="Border Color"
            value={colors.borderColor}
            onChange={handleColor('borderColor')}
          />
          <ColorPicker
            label="Divider Color"
            value={colors.dividerColor}
            onChange={handleColor('dividerColor')}
          />
        </ColorRow>
        <ColorRow>
          <ColorPicker
            label="Scrollbar Track"
            value={colors.scrollbarTrack}
            onChange={handleColor('scrollbarTrack')}
          />
          <ColorPicker
            label="Scrollbar Thumb"
            value={colors.scrollbarThumb}
            onChange={handleColor('scrollbarThumb')}
          />
        </ColorRow>
      </ColorSection>
    </div>
  );
}

export default ThemeEditor;
