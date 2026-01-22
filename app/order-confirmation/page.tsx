'use client';

import { useRouter } from 'next/navigation';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { Check, Package, Truck, Clock } from 'lucide-react';

export default function OrderConfirmation() {
  const router = useRouter();
  const orderNumber = `ORD-${Date.now()}`;

  return (
    <>
      <AIChatbot />

      {/* Hero Section */}
      <div className="relative pt-40 pb-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Order Confirmed</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase</p>
        </main>
      </div>

      {/* Confirmation Section */}
      <div className="py-12 bg-white">
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-4">Your order has been confirmed and will be processed shortly.</p>
            <p className="text-2xl font-bold text-blue-600">{orderNumber}</p>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Order Confirmed</h3>
              <p className="text-sm text-gray-600">Your order is being prepared</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 text-center">
              <Truck className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">In Transit</h3>
              <p className="text-sm text-gray-600">Shipping within 2-3 days</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Delivery</h3>
              <p className="text-sm text-gray-600">Estimated 5-7 business days</p>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Order Confirmation Email</p>
                  <p className="text-sm text-gray-600">Check your email for order details and tracking information</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Order Processing</p>
                  <p className="text-sm text-gray-600">Your order will be processed and packed within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Shipment Dispatch</p>
                  <p className="text-sm text-gray-600">You'll receive a tracking number once your order ships</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Delivery</p>
                  <p className="text-sm text-gray-600">Your package will be delivered to your address</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/products')}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Back to Home
            </button>
          </div>

          {/* Support */}
          <div className="mt-12 p-6 bg-gray-50 rounded-2xl text-center border-2 border-gray-200">
            <p className="text-gray-600 mb-3">Need help with your order?</p>
            <p className="text-sm text-gray-500">
              Contact our support team at <span className="font-semibold text-gray-900">support@megabotics.com</span> or call <span className="font-semibold text-gray-900">1-800-MEGA-BOT</span>
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
