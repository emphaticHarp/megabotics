'use client';

import { Star, TrendingUp } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  sales?: number;
}

interface ProductRecommendationsProps {
  type: 'bestsellers' | 'recommended' | 'customers-also-viewed';
  products: Product[];
}

export function ProductRecommendations({ type, products }: ProductRecommendationsProps) {
  const titles = {
    bestsellers: 'Best Sellers',
    recommended: 'Recommended For You',
    'customers-also-viewed': 'Customers Also Viewed',
  };

  const descriptions = {
    bestsellers: 'Most popular products in this category',
    recommended: 'Based on your browsing history',
    'customers-also-viewed': 'Frequently bought together',
  };

  return (
    <div className="py-12 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {type === 'bestsellers' && <TrendingUp className="w-5 h-5 text-orange-600" />}
          <h3 className="text-2xl font-bold text-gray-900">{titles[type]}</h3>
        </div>
        <p className="text-gray-600 text-sm">{descriptions[type]}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <a
            key={product.id}
            href={`/products/${product.id}`}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            {/* Image */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              {/* Badge */}
              {type === 'bestsellers' && (
                <div className="absolute top-3 left-3 z-10 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  #{index + 1}
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Info */}
            <div className="p-4 space-y-3">
              <h4 className="font-bold text-gray-900 line-clamp-2 text-sm">
                {product.name}
              </h4>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price and Sales */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <p className="font-bold text-blue-600 text-sm">
                  ₹{(product.price / 1000).toFixed(0)}K
                </p>
                {product.sales && (
                  <span className="text-xs text-orange-600 font-semibold">
                    {product.sales}+ sold
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
