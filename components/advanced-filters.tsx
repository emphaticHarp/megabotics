'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface FilterState {
  inStockOnly: boolean;
  hasDiscount: boolean;
  minRating: number;
  warranty: string[];
  delivery: string[];
}

const warrantyOptions = ['2 Years', '3 Years', '5 Years'];
const deliveryOptions = ['3-5 Business Days', '5-7 Business Days', '7-10 Business Days', '10-14 Business Days', '14-21 Business Days'];

export function AdvancedFilters({ onFilterChange, isOpen, onClose }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    inStockOnly: false,
    hasDiscount: false,
    minRating: 0,
    warranty: [],
    delivery: [],
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 lg:relative lg:bg-transparent">
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl lg:relative lg:shadow-none lg:w-full lg:h-auto overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between lg:hidden">
            <h3 className="text-lg font-bold text-gray-900">Filters</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stock Filter */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Availability</h4>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) =>
                  handleFilterChange({ ...filters, inStockOnly: e.target.checked })
                }
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-700">In Stock Only</span>
            </label>
          </div>

          {/* Discount Filter */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Offers</h4>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.hasDiscount}
                onChange={(e) =>
                  handleFilterChange({ ...filters, hasDiscount: e.target.checked })
                }
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-700">On Sale</span>
            </label>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Minimum Rating</h4>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 0].map((rating) => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() =>
                      handleFilterChange({ ...filters, minRating: rating })
                    }
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    {rating > 0 ? `${rating}★ & above` : 'All Ratings'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Warranty Filter */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Warranty</h4>
            <div className="space-y-2">
              {warrantyOptions.map((warranty) => (
                <label key={warranty} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.warranty.includes(warranty)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...filters.warranty, warranty]
                        : filters.warranty.filter((w) => w !== warranty);
                      handleFilterChange({ ...filters, warranty: updated });
                    }}
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">{warranty}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Delivery Filter */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Delivery Time</h4>
            <div className="space-y-2">
              {deliveryOptions.map((delivery) => (
                <label key={delivery} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.delivery.includes(delivery)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...filters.delivery, delivery]
                        : filters.delivery.filter((d) => d !== delivery);
                      handleFilterChange({ ...filters, delivery: updated });
                    }}
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">{delivery}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              const resetFilters: FilterState = {
                inStockOnly: false,
                hasDiscount: false,
                minRating: 0,
                warranty: [],
                delivery: [],
              };
              setFilters(resetFilters);
              onFilterChange(resetFilters);
            }}
            className="w-full py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:border-blue-600 transition-all"
          >
            Reset Filters
          </button>

          {/* Ad Banner Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-600 transition-all cursor-pointer group">
              <img
                src="/ad1.png"
                alt="Featured Ad"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
