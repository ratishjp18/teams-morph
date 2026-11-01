/**
 * Teams Morph - Input Component
 * 
 * Reusable text input component.
 */

import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`;

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--app-text)] mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-3 py-2 rounded-md
            bg-[var(--app-bg)] text-[var(--app-text)]
            border ${error ? 'border-[var(--app-error)]' : 'border-[var(--app-border)]'}
            focus:outline-none focus:border-[var(--app-accent)]
            placeholder:text-[var(--app-text-secondary)]
            transition-colors
            ${className}
          `}
          {...props}
        />
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-[var(--app-error)]' : 'text-[var(--app-text-secondary)]'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
