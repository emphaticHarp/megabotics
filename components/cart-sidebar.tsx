'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, X, Trash2, Plus, Minus, Truck, Shield, Tag, ArrowRight } from 'lucide-react';
import { useAlert } from '@/components/alert-provider';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function CartSidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const { showAlert } = useAlert();

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCart);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    loadCart();
  }, []);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      try {
        const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(updatedCart);
        // Don't auto-open the cart - let user click the button
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    showAlert({ type: 'info', title: 'Item removed from cart' });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
    showAlert({ type: 'info', title: 'Cart cleared' });
  };

  const applyCoupon = () => {
    if (couponInput.trim()) {
      setAppliedCoupon(couponInput);
      setCouponInput('');
      showAlert({ type: 'success', title: 'Coupon applied successfully!' });
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const discount = appliedCoupon ? Math.floor(totalPrice * 0.1) : 0;
  const finalPrice = totalPrice - discount;

  return (
    <>
      {/* Cart Button - Fixed Position Above AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-24 z-40 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
        aria-label="Open cart"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          {totalItems > 0 && (
            <span className="absolute -top-6 -right-5 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      {/* Cart Sidebar with Sliding Animation */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop with fade animation */}
          <div
            className="absolute inset-0 bg-black/50 animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar with slide animation */}
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Cart</h2>
                    <p className="text-xs text-gray-500">{totalItems} items</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-semibold">Your cart is empty</p>
                  <p className="text-xs text-gray-500 mt-1">Add items to get started</p>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all animate-in fade-in slide-in-from-left duration-300 group/item"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform"
                        loading="lazy"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 line-clamp-1 text-sm">
                        {item.name}
                      </h3>
                      <p className="text-blue-600 font-bold text-sm mt-0.5">
                        ₹{(item.price / 1000).toFixed(0)}K
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 mt-2 bg-white rounded-lg p-1 w-fit">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-semibold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 hover:bg-red-100 text-red-600 rounded-lg transition-colors flex-shrink-0 opacity-0 group-hover/item:opacity-100"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Divider */}
            {cartItems.length > 0 && <div className="h-px bg-gray-100" />}

            {/* Promo Code Section */}
            {cartItems.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {/* Benefits */}
            {cartItems.length > 0 && (
              <div className="px-4 py-3 space-y-2 bg-blue-50 border-b border-blue-100">
                <div className="flex items-center gap-2 text-xs">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Free shipping on orders</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Secure checkout</span>
                </div>
              </div>
            )}

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 p-4 space-y-3 bg-white">
                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{(totalPrice / 1000).toFixed(0)}K</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Discount
                      </span>
                      <span className="font-semibold">-₹{(discount / 1000).toFixed(0)}K</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">₹{(finalPrice / 1000).toFixed(0)}K</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      router.push('/checkout');
                      setIsOpen(false);
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm"
                  >
                    Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all text-sm"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
