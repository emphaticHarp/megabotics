'use client';

import { useState } from 'react';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import { useAlert } from '@/components/alert-provider';

interface QuickAddCartProps {
  productId: number;
  productName: string;
  price: number;
  image: string;
  inStock: boolean;
  variant?: 'button' | 'icon';
}

export function QuickAddCart({
  productId,
  productName,
  price,
  image,
  inStock,
  variant = 'button',
}: QuickAddCartProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { showAlert } = useAlert();

  const handleQuickAdd = async () => {
    if (!inStock) {
      showAlert({ type: 'error', title: 'Product out of stock' });
      return;
    }

    setIsAdding(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: any) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: price,
          quantity: 1,
          image: image,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));

      setIsAdded(true);
      showAlert({ type: 'success', title: `${productName} added to cart!` });

      // Reset after 2 seconds
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      showAlert({ type: 'error', title: 'Failed to add to cart' });
    } finally {
      setIsAdding(false);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleQuickAdd}
        disabled={!inStock || isAdding}
        className={`p-2 rounded-full transition-all ${
          isAdded
            ? 'bg-green-100 text-green-600'
            : inStock
            ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        title={inStock ? 'Quick add to cart' : 'Out of stock'}
      >
        {isAdding ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isAdded ? (
          <Check className="w-5 h-5" />
        ) : (
          <ShoppingCart className="w-5 h-5" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleQuickAdd}
      disabled={!inStock || isAdding}
      className={`w-full py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
        isAdded
          ? 'bg-green-100 text-green-700'
          : inStock
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      }`}
    >
      {isAdding ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Adding...
        </>
      ) : isAdded ? (
        <>
          <Check className="w-4 h-4" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Quick Add
        </>
      )}
    </button>
  );
}
