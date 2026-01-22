'use client';

import { useState } from 'react';
import { X, User, ShoppingCart } from 'lucide-react';

interface GuestCheckoutBannerProps {
  onDismiss?: () => void;
}

export function GuestCheckoutBanner({ onDismiss }: GuestCheckoutBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-5 h-5" />
          <div>
            <p className="font-semibold">Checkout as Guest</p>
            <p className="text-sm text-blue-100">No account needed - shop and checkout in minutes</p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 hover:bg-white/20 rounded-lg transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
