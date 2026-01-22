'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Upload } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  unhelpful: number;
  image?: string;
  verified: boolean;
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
    unhelpful: 2,
    verified: true,
    image: '/robotics-icon.png',
  },
  {
    id: 2,
    author: 'Priya Singh',
    rating: 4,
    title: 'Great value for money',
    content: 'Good product with solid performance. Delivery was quick and packaging was excellent. Minor issues with setup but resolved quickly.',
    date: '1 month ago',
    helpful: 32,
    unhelpful: 1,
    verified: true,
  },
  {
    id: 3,
    author: 'Amit Patel',
    rating: 5,
    title: 'Best in class technology',
    content: 'Outstanding innovation and reliability. The features are comprehensive and the interface is user-friendly. Worth every penny!',
    date: '1 month ago',
    helpful: 28,
    unhelpful: 0,
    verified: true,
    image: '/agriculture-icon.png',
  },
];

interface ProductReviewsEnhancedProps {
  productId: number;
  rating: number;
  totalReviews: number;
  reviewsDistribution: Record<number, number>;
}

export function ProductReviewsEnhanced({
  productId,
  rating,
  totalReviews,
  reviewsDistribution,
}: ProductReviewsEnhancedProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, boolean>>({});

  const toggleHelpful = (reviewId: number, isHelpful: boolean) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: isHelpful,
    }));
  };

  const filteredReviews = selectedRating
    ? sampleReviews.filter(r => r.rating === selectedRating)
    : sampleReviews;

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900">{rating}</div>
            <div className="flex justify-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">Based on {totalReviews} reviews</p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-3 pt-4 border-t">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = reviewsDistribution[stars] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <button
                  key={stars}
                  onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                    selectedRating === stars ? 'bg-blue-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-semibold text-gray-700 w-12">{stars}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2 space-y-4">
          {filteredReviews.map((review, index) => (
            <div key={review.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
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
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold">
                        Verified
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-gray-900">{review.title}</h4>
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>

              {/* Author */}
              <p className="text-sm text-gray-600 mb-2">By {review.author}</p>

              {/* Content */}
              <p className="text-gray-700 text-sm mb-3">{review.content}</p>

              {/* Review Image */}
              {review.image && (
                <div className="mb-3 w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={review.image}
                    alt="Review"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Helpful Votes */}
              <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-600">Helpful?</span>
                <button
                  onClick={() => toggleHelpful(review.id, true)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-all ${
                    helpfulVotes[review.id] === true
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  {review.helpful}
                </button>
                <button
                  onClick={() => toggleHelpful(review.id, false)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-all ${
                    helpfulVotes[review.id] === false
                      ? 'bg-red-100 text-red-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  {review.unhelpful}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <button className="w-full py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-blue-600 transition-all">
        Load More Reviews
      </button>
    </div>
  );
}
