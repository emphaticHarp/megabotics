'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface WishlistItem {
  _id: string;
  productId: string;
  productName: string;
  price: number;
  image: string;
  inStock: boolean;
}

export default function WishlistPage() {
  const router = useRouter();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/wishlist');
      
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }

      const data = await response.json();
      setItems(data.data || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        setItems(items.filter(item => item.productId !== productId));
        toast.success('Removed from wishlist');
      }
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = (item: WishlistItem) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((cartItem: any) => cartItem.id === item.productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: item.productId,
          name: item.productName,
          price: item.price,
          quantity: 1,
          image: item.image,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <>
        <AIChatbot />
        <div className="min-h-screen bg-gray-50 py-12 pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading wishlist...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AIChatbot />
      <div className="min-h-screen bg-gray-50 py-12 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">{items.length} items saved</p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Start adding products to your wishlist</p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.productName}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      ₹{item.price.toLocaleString()}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.inStock}
                        className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemove(item.productId)}
                        className="px-4 py-2 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
