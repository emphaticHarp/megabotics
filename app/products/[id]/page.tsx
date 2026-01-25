'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { Heart, ShoppingCart, Share2, Loader, ArrowLeft, Star } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stockQuantity: number;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${params.id}`);
      
      if (!response.ok) {
        throw new Error('Product not found');
      }

      const data = await response.json();
      setProduct(data.data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load product');
      setTimeout(() => router.push('/products'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: any) => item.id === product._id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;

    try {
      const response = await fetch('/api/wishlist', {
        method: isWishlisted ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id }),
      });

      if (response.ok) {
        setIsWishlisted(!isWishlisted);
        toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <>
        <AIChatbot />
        <div className="min-h-screen bg-gray-50 py-12 pt-32 flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <AIChatbot />
        <div className="min-h-screen bg-gray-50 py-12 pt-32">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
            <Link href="/products" className="text-blue-600 hover:text-blue-700 font-semibold">
              Back to Products
            </Link>
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
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-white rounded-lg shadow p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  </div>
                  <button
                    onClick={handleShare}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Price</p>
                <p className="text-3xl font-bold text-blue-600">₹{product.price.toLocaleString()}</p>
              </div>

              {/* Stock Status */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Availability</p>
                {product.inStock && product.stockQuantity > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-semibold">
                      In Stock ({product.stockQuantity} available)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              {product.inStock && product.stockQuantity > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Quantity</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-600 transition-colors"
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || product.stockQuantity === 0}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className={`px-6 py-3 border-2 rounded-lg font-semibold transition-all ${
                    isWishlisted
                      ? 'bg-red-50 border-red-600 text-red-600'
                      : 'border-gray-200 text-gray-600 hover:border-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <p className="text-sm text-blue-900">
                  ✓ Free shipping on orders above ₹500
                </p>
                <p className="text-sm text-blue-900">
                  ✓ 30-day money-back guarantee
                </p>
                <p className="text-sm text-blue-900">
                  ✓ 1-year warranty on all products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
