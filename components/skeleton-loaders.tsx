'use client';

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
          <div className="h-48 bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="w-4 h-4 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="flex justify-between pt-3">
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="h-96 bg-gray-200 rounded-2xl" />
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/2" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="grid grid-cols-3 gap-4 py-4 border-y">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="h-6 bg-gray-200 rounded mx-auto w-6" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
          <div className="w-12 h-12 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ReviewsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-3">
          <div className="flex justify-between">
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="w-4 h-4 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-3 bg-gray-200 rounded w-20" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
      ))}
    </div>
  );
}
