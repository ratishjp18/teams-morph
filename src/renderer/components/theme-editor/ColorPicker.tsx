/**
 * Teams Morph - Color Picker Component
 * 
 * A comprehensive color picker with hex input, visual selection, and presets.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { isValidHex, normalizeHex, hexToRgb, rgbToHex, PRESET_COLORS } from '../../utils/color-utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Sync input value with prop
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle hex input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    setInputValue(newValue);

    // Add # if missing
    if (newValue && !newValue.startsWith('#')) {
      newValue = '#' + newValue;
    }

    // Validate and update
    if (isValidHex(newValue)) {
      onChange(normalizeHex(newValue));
    }
  }, [onChange]);

  // Handle native color input change
  const handleNativeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value.toUpperCase();
    setInputValue(color);
    onChange(color);
  }, [onChange]);

  // Handle preset color click
  const handlePresetClick = useCallback((color: string) => {
    setInputValue(color);
    onChange(color);
    setIsOpen(false);
  }, [onChange]);

  return (
    <div ref={pickerRef} className="relative">
      {label && (
        <label className="block text-xs font-medium text-[var(--app-text-secondary)] mb-1.5">
          {label}
        </label>
      )}
      
      <div className="flex items-center gap-2">
        {/* Color preview button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-10 h-10 rounded-md border-2 border-[var(--app-border)] hover:border-[var(--app-accent)] transition-colors overflow-hidden"
          style={{ backgroundColor: value }}
        >
          {/* Checkerboard for transparency visualization */}
          <div 
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
            }}
          />
        </button>

        {/* Hex input */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-24 px-2 py-2 text-sm font-mono rounded-md bg-[var(--app-bg)] text-[var(--app-text)] border border-[var(--app-border)] focus:outline-none focus:border-[var(--app-accent)] uppercase"
          placeholder="#000000"
          maxLength={7}
        />

        {/* Native color picker (hidden, triggered by button) */}
        <input
          type="color"
          value={value}
          onChange={handleNativeChange}
          className="w-8 h-8 opacity-0 absolute cursor-pointer"
          style={{ left: 0 }}
        />
      </div>

      {/* Dropdown picker */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 z-50 p-3 rounded-lg bg-[var(--app-surface)] border border-[var(--app-border)] shadow-lg animate-scale-in">
          {/* Native color input for advanced picking */}
          <div className="mb-3">
            <input
              type="color"
              value={value}
              onChange={handleNativeChange}
              className="w-full h-32 cursor-pointer rounded-md border border-[var(--app-border)]"
            />
          </div>

          {/* Preset colors */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--app-text-secondary)] font-medium">Presets</p>
            <div className="grid grid-cols-11 gap-1">
              {PRESET_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handlePresetClick(color)}
                  className={`
                    w-5 h-5 rounded border
                    ${color === value ? 'ring-2 ring-[var(--app-accent)] ring-offset-1 ring-offset-[var(--app-surface)]' : 'border-[var(--app-border)]'}
                    hover:scale-110 transition-transform
                  `}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
