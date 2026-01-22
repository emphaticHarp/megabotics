'use client';

import { useState } from 'react';

interface Variant {
  id: string;
  name: string;
  value: string;
  priceModifier?: number;
}

interface ProductVariantsProps {
  variants: {
    size?: Variant[];
    color?: Variant[];
    storage?: Variant[];
  };
  onVariantChange?: (type: string, value: string) => void;
}

export function ProductVariants({ variants, onVariantChange }: ProductVariantsProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const handleVariantSelect = (type: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: value,
    }));
    onVariantChange?.(type, value);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900">Customize Your Product</h3>

      {/* Size Variants */}
      {variants.size && variants.size.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900">Size</label>
          <div className="flex flex-wrap gap-2">
            {variants.size.map((variant) => (
              <button
                key={variant.id}
                onClick={() => handleVariantSelect('size', variant.value)}
                className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
                  selectedVariants.size === variant.value
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Variants */}
      {variants.color && variants.color.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900">Color</label>
          <div className="flex flex-wrap gap-3">
            {variants.color.map((variant) => (
              <button
                key={variant.id}
                onClick={() => handleVariantSelect('color', variant.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedVariants.color === variant.value
                    ? 'border-blue-600 ring-2 ring-blue-300'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
                title={variant.name}
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: variant.value }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Storage Variants */}
      {variants.storage && variants.storage.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900">Storage</label>
          <div className="flex flex-wrap gap-2">
            {variants.storage.map((variant) => (
              <button
                key={variant.id}
                onClick={() => handleVariantSelect('storage', variant.value)}
                className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
                  selectedVariants.storage === variant.value
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                }`}
              >
                {variant.name}
                {variant.priceModifier && (
                  <span className="text-xs ml-1">
                    {variant.priceModifier > 0 ? '+' : ''}₹{variant.priceModifier}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Save for Later */}
      <div className="pt-4 border-t border-gray-200">
        <button className="w-full py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all">
          Save for Later
        </button>
      </div>
    </div>
  );
}
