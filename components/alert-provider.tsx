'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2Icon, AlertCircleIcon, AlertTriangleIcon, InfoIcon, X } from 'lucide-react';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface AlertMessage {
  id: string;
  type: AlertType;
  title: string;
  duration?: number;
}

interface AlertContextType {
  alerts: AlertMessage[];
  showAlert: (alert: Omit<AlertMessage, 'id'>) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const showAlert = useCallback((alert: Omit<AlertMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newAlert: AlertMessage = { ...alert, id };
    
    setAlerts((prev) => [...prev, newAlert]);

    // Auto-remove after duration (default 4 seconds)
    const duration = alert.duration || 4000;
    setTimeout(() => {
      removeAlert(id);
    }, duration);
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, removeAlert }}>
      {children}
      <AlertContainer alerts={alerts} onRemove={removeAlert} />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
}

function AlertContainer({ alerts, onRemove }: { alerts: AlertMessage[]; onRemove: (id: string) => void }) {
  const getStyles = (type: AlertType) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          icon: <CheckCircle2Icon className="w-5 h-5" />,
        };
      case 'error':
        return {
          bg: 'bg-red-500',
          icon: <AlertCircleIcon className="w-5 h-5" />,
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500',
          icon: <AlertTriangleIcon className="w-5 h-5" />,
        };
      case 'info':
        return {
          bg: 'bg-blue-500',
          icon: <InfoIcon className="w-5 h-5" />,
        };
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[9999] space-y-2">
      {alerts.map((alert) => {
        const styles = getStyles(alert.type);
        return (
          <div
            key={alert.id}
            className={`${styles.bg} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom fade-in duration-300 max-w-md`}
          >
            <div className="flex-shrink-0">{styles.icon}</div>
            <p className="text-sm font-medium flex-1">{alert.title}</p>
            <button
              onClick={() => onRemove(alert.id)}
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
