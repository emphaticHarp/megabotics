'use client';

import { Star } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
}

const sampleReviews: Review[] = [
  {
    id: 1,
    author: 'Rajesh Kumar',
    rating: 5,
    title: 'Excellent product, highly recommended!',
    content: 'This product exceeded my expectations. The build quality is outstanding and it works perfectly. Customer service was also very helpful.',
    date: '2 weeks ago',
    helpful: 45,
  },
  {
    id: 2,
    author: 'Priya Singh',
    rating: 4,
    title: 'Great value for money',
    content: 'Good product with solid performance. Delivery was quick and packaging was excellent. Minor issues with setup but resolved quickly.',
    date: '1 month ago',
    helpful: 32,
  },
  {
    id: 3,
    author: 'Amit Patel',
    rating: 5,
    title: 'Best in class technology',
    content: 'Outstanding innovation and reliability. The features are comprehensive and the interface is user-friendly. Worth every penny!',
    date: '1 month ago',
    helpful: 28,
  },
];

interface ProductReviewsProps {
  productId: number;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>

      <div className="space-y-4">
        {sampleReviews.map((review) => (
          <div key={review.id} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{review.rating}.0</span>
                </div>
                <h4 className="font-bold text-gray-900">{review.title}</h4>
              </div>
              <span className="text-xs text-gray-500">{review.date}</span>
            </div>

            {/* Author */}
            <p className="text-sm text-gray-600 mb-3">By {review.author}</p>

            {/* Content */}
            <p className="text-gray-700 mb-4">{review.content}</p>

            {/* Helpful */}
            <div className="flex items-center gap-4">
              <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                👍 Helpful ({review.helpful})
              </button>
              <button className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                👎 Not Helpful
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-blue-600 transition-all">
        Load More Reviews
      </button>
    </div>
  );
}
