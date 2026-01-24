'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { ShoppingCart, ArrowLeft, Loader } from 'lucide-react';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface FormData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
  deliveryCharge: number;
}

const paymentMethods = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet'];
const deliveryCharges: { [key: string]: number } = {
  'Standard': 0,
  'Express': 50,
  'Overnight': 100,
};

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deliveryType, setDeliveryType] = useState('Standard');
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'UPI',
    deliveryCharge: 0,
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(cart);
      if (cart.length === 0) {
        toast.info('Cart is empty');
        setTimeout(() => router.push('/products'), 2000);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + formData.deliveryCharge;
  };

  const handleDeliveryChange = (type: string) => {
    setDeliveryType(type);
    setFormData({
      ...formData,
      deliveryCharge: deliveryCharges[type] || 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!formData.address.trim()) {
      toast.error('Please enter your address');
      return false;
    }
    if (!formData.city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    if (!formData.state.trim()) {
      toast.error('Please enter your state');
      return false;
    }
    if (!formData.pincode.trim()) {
      toast.error('Please enter your pincode');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const orderData = {
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        items: cartItems.map(item => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal: calculateSubtotal(),
        deliveryCharge: formData.deliveryCharge,
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'Pending',
        totalAmount: calculateTotal(),
        orderStatus: 'Pending',
        notes: '',
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      toast.success('Order placed successfully!');
      
      // Clear cart
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));

      // Redirect to order confirmation
      setTimeout(() => {
        router.push(`/order-confirmation?orderId=${data.data.orderId}`);
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <AIChatbot />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Redirecting to products...</p>
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
              Back to Cart
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address, apartment, etc."
                        rows={3}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Mumbai"
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Maharashtra"
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="400001"
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Options</h2>
                  <div className="space-y-3">
                    {Object.entries(deliveryCharges).map(([type, charge]) => (
                      <label key={type} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-600 transition-all" style={{ borderColor: deliveryType === type ? '#2563eb' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="delivery"
                          value={type}
                          checked={deliveryType === type}
                          onChange={() => handleDeliveryChange(type)}
                          className="w-4 h-4"
                        />
                        <div className="ml-4 flex-1">
                          <p className="font-semibold text-gray-900">{type} Delivery</p>
                          <p className="text-sm text-gray-600">
                            {type === 'Standard' && '5-7 business days'}
                            {type === 'Express' && '2-3 business days'}
                            {type === 'Overnight' && 'Next day delivery'}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900">₹{charge}</p>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {paymentMethods.map(method => (
                      <label key={method} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-600 transition-all" style={{ borderColor: formData.paymentMethod === method ? '#2563eb' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        <span className="ml-3 font-semibold text-gray-900">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pb-3 border-b">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charge</span>
                    <span className="font-semibold text-gray-900">₹{formData.deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total</span>
                    <span className="text-blue-600">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600">
                    ✓ Secure payment processing<br />
                    ✓ Free returns within 30 days<br />
                    ✓ 100% authentic products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
