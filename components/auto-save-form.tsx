'use client';

import { useEffect, useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface AutoSaveFormProps {
  formKey: string;
  children: React.ReactNode;
  onSave?: (data: Record<string, any>) => void;
}

export function AutoSaveForm({ formKey, children, onSave }: AutoSaveFormProps) {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save form data
  useEffect(() => {
    const handleFormChange = () => {
      setSaveStatus('saving');

      // Get all form inputs
      const form = document.querySelector(`[data-form-key="${formKey}"]`) as HTMLFormElement;
      if (!form) return;

      const formData = new FormData(form);
      const data: Record<string, any> = {};

      formData.forEach((value, key) => {
        if (data[key]) {
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
      });

      // Save to localStorage
      try {
        localStorage.setItem(`form_${formKey}`, JSON.stringify(data));
        setLastSaved(new Date());
        setSaveStatus('saved');
        onSave?.(data);

        // Reset status after 2 seconds
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (error) {
        console.error('Auto-save failed:', error);
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    };

    const form = document.querySelector(`[data-form-key="${formKey}"]`) as HTMLFormElement;
    if (!form) return;

    // Debounce auto-save
    let timeout: NodeJS.Timeout;
    const handleInput = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleFormChange, 1000);
    };

    form.addEventListener('input', handleInput);
    form.addEventListener('change', handleInput);

    return () => {
      form.removeEventListener('input', handleInput);
      form.removeEventListener('change', handleInput);
      clearTimeout(timeout);
    };
  }, [formKey, onSave]);

  return (
    <div>
      <div data-form-key={formKey}>
        {children}
      </div>

      {/* Auto-save Status Indicator */}
      {saveStatus !== 'idle' && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg border-2">
          {saveStatus === 'saving' && (
            <>
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-700">Saving...</span>
            </>
          )}
          {saveStatus === 'saved' && (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">Saved</span>
            </>
          )}
          {saveStatus === 'error' && (
            <>
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">Save failed</span>
            </>
          )}
        </div>
      )}

      {lastSaved && saveStatus === 'idle' && (
        <p className="text-xs text-gray-500 mt-2">
          Last saved: {lastSaved.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}

// Hook to restore form data
export function useRestoreFormData(formKey: string) {
  const [data, setData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`form_${formKey}`);
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to restore form data:', error);
    }
  }, [formKey]);

  const clearData = () => {
    localStorage.removeItem(`form_${formKey}`);
    setData(null);
  };

  return { data, clearData };
}
