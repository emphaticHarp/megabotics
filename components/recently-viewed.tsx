'use client';

import { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';

interface ViewedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

export function RecentlyViewed() {
  const [viewedProducts, setViewedProducts] = useState<ViewedProduct[]>([]);

  useEffect(() => {
    const loadViewed = () => {
      const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      setViewedProducts(viewed.slice(0, 6));
    };

    loadViewed();

    // Listen for updates
    window.addEventListener('recentlyViewedUpdated', loadViewed);
    return () => window.removeEventListener('recentlyViewedUpdated', loadViewed);
  }, []);

  const removeViewed = (id: number) => {
    const updated = viewedProducts.filter(p => p.id !== id);
    setViewedProducts(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  return (
    <div className="py-12 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Recently Viewed</h3>

      {viewedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {viewedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              {/* Remove Button */}
              <button
                onClick={() => removeViewed(product.id)}
                className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-red-100 transition-all opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>

              {/* Image */}
              <div className="h-32 bg-gray-200 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="p-3 space-y-2">
                <h4 className="font-semibold text-gray-900 line-clamp-2 text-sm">
                  {product.name}
                </h4>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                </div>
                <p className="font-bold text-blue-600 text-sm">
                  ₹{(product.price / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">No recently viewed products yet</p>
        </div>
      )}
    </div>
  );
}
