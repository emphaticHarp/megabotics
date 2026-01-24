'use client';

import { useEffect, useState, useRef } from 'react';

export function HeadlineBanner() {
  const [headline, setHeadline] = useState<string>('');
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchHeadline();
    
    // Refresh headline every 3 seconds for real-time updates
    intervalRef.current = setInterval(fetchHeadline, 3000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const fetchHeadline = async () => {
    try {
      const response = await fetch('/api/headlines', {
        cache: 'no-store',
      });
      const data = await response.json();
      console.log('Headline API Response:', data);
      
      if (data.success && data.data) {
        setHeadline(data.data.text || '');
        setIsActive(data.data.isActive === true);
        console.log('Headline updated:', { text: data.data.text, isActive: data.data.isActive });
      } else {
        setIsActive(false);
        setHeadline('');
      }
    } catch (error) {
      console.error('Error fetching headline:', error);
      setIsActive(false);
    }
  };

  // Only render if headline is active and has text
  if (!isActive || !headline) {
    return null;
  }

  return (
    <div className="bg-white py-4 overflow-hidden border-b-2 border-red-600">
      <div className="animate-marquee whitespace-nowrap text-red-700 font-bold text-xl">
        {headline}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
