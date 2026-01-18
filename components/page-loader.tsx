'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function PageLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="space-y-4 text-center">
        {/* Animated Loader */}
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-cyan-600 animate-spin"></div>
            
            {/* Inner rotating ring (opposite direction) */}
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-600 border-l-cyan-600 animate-spin" style={{ animationDirection: 'reverse' }}></div>
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-900">Loading</p>
          <div className="flex justify-center gap-1">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-100"></span>
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-200"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <Suspense fallback={null}>
      <PageLoaderContent />
    </Suspense>
  );
}
