'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { useAlert } from '@/components/alert-provider';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showAlert } = useAlert();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAlert({ type: 'error', title: 'Please enter a valid email' });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail('');
      showAlert({ type: 'success', title: 'Successfully subscribed to newsletter!' });
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      showAlert({ type: 'error', title: 'Subscription failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
      <div className="max-w-md mx-auto text-center space-y-4">
        <Mail className="w-12 h-12 mx-auto" />
        <h3 className="text-2xl font-bold">Stay Updated</h3>
        <p className="text-blue-100">
          Subscribe to our newsletter for the latest products, updates, and exclusive offers.
        </p>

        <form onSubmit={handleSubscribe} className="flex gap-2 mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || isSubscribed}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              isSubscribed
                ? 'bg-green-500 text-white'
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
          >
            {isSubscribed ? (
              <>
                <Check className="w-4 h-4" />
                Done
              </>
            ) : isLoading ? (
              'Subscribing...'
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
