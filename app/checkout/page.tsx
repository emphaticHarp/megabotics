'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { ChevronDown, MapPin, Phone, Mail, Truck, Clock, AlertCircle, Check, X } from 'lucide-react';
import { useAlert } from '@/components/alert-provider';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  days: string;
  baseCharge: number;
}

const deliveryOptions: DeliveryOption[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: 'Regular delivery to your address',
    days: '5-7 Business Days',
    baseCharge: 100,
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Fast delivery with priority handling',
    days: '2-3 Business Days',
    baseCharge: 300,
  },
  {
    id: 'overnight',
    name: 'Overnight Delivery',
    description: 'Next day delivery available',
    days: '1 Business Day',
    baseCharge: 500,
  },
];

const promoCodes = {
  'SAVE10': { discount: 10, type: 'percentage' },
  'SAVE500': { discount: 500, type: 'fixed' },
  'WELCOME20': { discount: 20, type: 'percentage' },
  'FREESHIP': { discount: 0, type: 'free-shipping' },
};

export default function Checkout() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  // Calculate delivery charge based on address
  const calculateDeliveryCharge = () => {
    const baseCharge = deliveryOptions.find(d => d.id === selectedDelivery)?.baseCharge || 100;
    
    // Add extra charge for certain states
    const stateCharges: Record<string, number> = {
      'maharashtra': 0,
      'karnataka': 50,
      'tamil-nadu': 75,
      'delhi': 0,
      'uttar-pradesh': 100,
      'rajasthan': 125,
      'other': 150,
    };

    const extraCharge = stateCharges[formData.state.toLowerCase()] || stateCharges['other'];
    return baseCharge + extraCharge;
  };

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = calculateDeliveryCharge();
  
  // Calculate discount
  let discount = 0;
  let freeShipping = false;
  if (appliedPromo && promoCodes[appliedPromo as keyof typeof promoCodes]) {
    const promo = promoCodes[appliedPromo as keyof typeof promoCodes];
    if (promo.type === 'percentage') {
      discount = (subtotal * promo.discount) / 100;
    } else if (promo.type === 'fixed') {
      discount = promo.discount;
    } else if (promo.type === 'free-shipping') {
      freeShipping = true;
    }
  }

  const finalDeliveryCharge = freeShipping ? 0 : deliveryCharge;
  const total = subtotal - discount + finalDeliveryCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
    }

    // Limit CVV to 3 digits
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      showAlert({ type: 'error', title: 'Please enter a promo code' });
      return;
    }

    if (promoCodes[promoCode.toUpperCase() as keyof typeof promoCodes]) {
      setAppliedPromo(promoCode.toUpperCase());
      showAlert({ type: 'success', title: `Promo code "${promoCode.toUpperCase()}" applied!` });
      setPromoCode('');
    } else {
      showAlert({ type: 'error', title: 'Invalid promo code' });
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showAlert({ type: 'info', title: 'Promo code removed' });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      showAlert({ type: 'error', title: 'Please fill in all required fields' });
      return false;
    }

    if (!formData.address || !formData.city || !formData.state || !formData.zipCode) {
      showAlert({ type: 'error', title: 'Please fill in complete address' });
      return false;
    }

    if (paymentMethod === 'card') {
      if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
        showAlert({ type: 'error', title: 'Please fill in all card details' });
        return false;
      }
    }

    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));

      showAlert({ type: 'success', title: 'Order placed successfully!' });
      
      // Redirect to order confirmation
      setTimeout(() => {
        router.push('/order-confirmation');
      }, 1500);
    } catch (error) {
      showAlert({ type: 'error', title: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <AIChatbot />
        <div className="min-h-screen pt-40 pb-20 bg-white">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to proceed with checkout</p>
            <button
              onClick={() => router.push('/products')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Continue Shopping
            </button>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AIChatbot />

      {/* Hero Section */}
      <div className="relative pt-40 pb-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase</p>
        </main>
      </div>

      {/* Checkout Section */}
      <div className="py-12 bg-white">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Delivery & Payment Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Address */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Delivery Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address *"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State *"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code *"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>

              {/* Delivery Options */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-blue-600" />
                  Delivery Options
                </h2>

                <div className="space-y-3">
                  {deliveryOptions.map(option => (
                    <label
                      key={option.id}
                      className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedDelivery === option.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={selectedDelivery === option.id}
                        onChange={(e) => setSelectedDelivery(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{option.name}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {option.days}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{option.baseCharge}</p>
                        <p className="text-xs text-gray-500">+ state charges</p>
                      </div>
                    </label>
                  ))}
                </div>

                {formData.state && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Delivery charge for {formData.state}:</strong> ₹{calculateDeliveryCharge()}
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>

                <div className="space-y-4 mb-6">
                  {['card', 'upi', 'netbanking'].map(method => (
                    <label
                      key={method}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="font-semibold text-gray-900 capitalize">
                        {method === 'card' ? 'Credit/Debit Card' : method === 'upi' ? 'UPI' : 'Net Banking'}
                      </span>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number (16 digits)"
                      value={cardData.cardNumber}
                      onChange={handleCardInputChange}
                      maxLength={19}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={cardData.cardName}
                      onChange={handleCardInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={handleCardInputChange}
                        maxLength={5}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={cardData.cvv}
                        onChange={handleCardInputChange}
                        maxLength={3}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <input
                    type="text"
                    placeholder="UPI ID (e.g., yourname@upi)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                )}
              </div>
            </div>

            {/* Right Side - Order Summary & Promo */}
            <div className="space-y-6">
              {/* Promo Code */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Promo Code</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Apply
                  </button>
                </div>

                {appliedPromo && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-green-700 font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      {appliedPromo} applied
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-4">
                  Available codes: SAVE10, SAVE500, WELCOME20, FREESHIP
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sticky top-20">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

                {/* Cart Items */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount</span>
                      <span className="font-semibold text-green-600">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Delivery {freeShipping ? '(Free)' : ''}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {freeShipping ? '₹0' : `₹${finalDeliveryCharge.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full mt-6 py-3 rounded-lg font-semibold text-white transition-all ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Your payment is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
