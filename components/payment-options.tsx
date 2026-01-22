'use client';

import { useState } from 'react';
import { CreditCard, Smartphone, Banknote, Gift } from 'lucide-react';

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Visa, Mastercard, Amex',
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Google Pay, PhonePe, Paytm',
  },
  {
    id: 'bank',
    name: 'Net Banking',
    icon: <Banknote className="w-6 h-6" />,
    description: 'All major banks',
  },
];

interface PaymentOptionsProps {
  price: number;
}

export function PaymentOptions({ price }: PaymentOptionsProps) {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [selectedEMI, setSelectedEMI] = useState<number | null>(null);
  const [giftWrap, setGiftWrap] = useState(false);

  const emiOptions = [
    { months: 3, rate: 0 },
    { months: 6, rate: 1.5 },
    { months: 12, rate: 2.5 },
  ];

  const calculateEMI = (months: number, rate: number) => {
    const monthlyRate = rate / 100 / 12;
    const emi = (price * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900">Payment & Delivery Options</h3>

      {/* Payment Methods */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-900">Select Payment Method</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {paymentOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedPayment(option.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedPayment === option.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className={`mb-2 ${selectedPayment === option.id ? 'text-blue-600' : 'text-gray-600'}`}>
                {option.icon}
              </div>
              <p className="font-semibold text-gray-900 text-sm">{option.name}</p>
              <p className="text-xs text-gray-600">{option.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* EMI Options */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <label className="text-sm font-semibold text-gray-900">EMI Options (0% Interest)</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {emiOptions.map((option) => {
            const emi = calculateEMI(option.months, option.rate);
            return (
              <button
                key={option.months}
                onClick={() => setSelectedEMI(selectedEMI === option.months ? null : option.months)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedEMI === option.months
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <p className="font-semibold text-gray-900 text-sm">₹{emi}/month</p>
                <p className="text-xs text-gray-600">{option.months} months</p>
                {option.rate > 0 && <p className="text-xs text-gray-500">@ {option.rate}% interest</p>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gift Wrapping */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={giftWrap}
            onChange={(e) => setGiftWrap(e.target.checked)}
            className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
          />
          <div>
            <p className="font-semibold text-gray-900 text-sm">Gift Wrapping</p>
            <p className="text-xs text-gray-600">Add premium gift wrapping (+₹299)</p>
          </div>
        </label>
      </div>

      {/* Order Summary */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Product Price</span>
          <span className="font-semibold text-gray-900">₹{(price / 1000).toFixed(0)}K</span>
        </div>
        {giftWrap && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Gift Wrapping</span>
            <span className="font-semibold text-gray-900">₹299</span>
          </div>
        )}
        <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-blue-600">
            ₹{((price + (giftWrap ? 299 : 0)) / 1000).toFixed(0)}K
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
        Proceed to Checkout
      </button>
    </div>
  );
}
