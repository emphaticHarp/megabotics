'use client';

import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { useAlert } from '@/components/alert-provider';

interface ShareProductProps {
  productName: string;
  productUrl: string;
}

export function ShareProduct({ productName, productUrl }: ShareProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showAlert } = useAlert();

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(productName)}&url=${encodeURIComponent(productUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`Check out ${productName}: ${productUrl}`)}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    showAlert({ type: 'success', title: 'Link copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-blue-600 transition-all"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl p-4 z-10 min-w-max">
          <div className="space-y-2">
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors text-gray-700"
            >
              <span>📘</span> Facebook
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors text-gray-700"
            >
              <span>𝕏</span> Twitter
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors text-gray-700"
            >
              <span>💼</span> LinkedIn
            </a>
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 rounded-lg transition-colors text-gray-700"
            >
              <span>💬</span> WhatsApp
            </a>
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 text-left"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
