'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ProductGridLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100">
          <Skeleton className="w-full h-48" />
          <div className="p-4 space-y-4">
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <div className="flex gap-2">
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-1/2 h-4" />
            </div>
            <Skeleton className="w-full h-10 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image */}
      <div className="space-y-4">
        <Skeleton className="w-full h-96 rounded-2xl" />
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-20 h-20 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-6">
        <Skeleton className="w-1/2 h-8" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-5 h-5 rounded" />
          ))}
        </div>
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <div className="grid grid-cols-3 gap-4 py-4 border-y">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton className="w-6 h-6 rounded mx-auto" />
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-full h-4" />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Skeleton className="flex-1 h-12 rounded-lg" />
          <Skeleton className="w-12 h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function CheckoutLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Side */}
      <div className="lg:col-span-2 space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <Skeleton className="w-1/3 h-6 mb-6" />
            <div className="space-y-4">
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="w-full h-10 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Side */}
      <div className="space-y-6">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <Skeleton className="w-1/2 h-6 mb-4" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-full h-4" />
            ))}
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sticky top-20">
          <Skeleton className="w-1/2 h-6 mb-4" />
          <div className="space-y-3 mb-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-4" />
            ))}
          </div>
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function CartLoading() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
          <Skeleton className="w-20 h-20 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-1/3 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="space-y-8">
      <Skeleton className="w-1/2 h-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-full h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
