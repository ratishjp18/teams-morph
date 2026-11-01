/**
 * Teams Morph - Toast Context
 * 
 * Provides toast notification functionality throughout the application.
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

/**
 * Toast types
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast interface
 */
export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

/**
 * Toast context type
 */
interface ToastContextType {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

/**
 * Create context
 */
const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Toast provider component
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Add a new toast
   */
  const addToast = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = crypto.randomUUID();
    const toast: Toast = { id, type, message, duration };

    setToasts(prev => [...prev, toast]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  /**
   * Remove a toast by ID
   */
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  /**
   * Convenience methods
   */
  const success = useCallback((message: string) => addToast('success', message), [addToast]);
  const error = useCallback((message: string) => addToast('error', message, 6000), [addToast]);
  const warning = useCallback((message: string) => addToast('warning', message, 5000), [addToast]);
  const info = useCallback((message: string) => addToast('info', message), [addToast]);

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * Hook to use toast context
 */
export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
}
