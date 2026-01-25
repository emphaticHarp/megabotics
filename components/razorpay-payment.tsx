'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

interface RazorpayPaymentProps {
  amount: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

export function RazorpayPayment({
  amount,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onError,
}: RazorpayPaymentProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: orderId,
          notes: {
            orderId,
            customerName,
          },
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Megabotics',
        description: `Order #${orderId}`,
        customer_id: orderId,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: '#0891b2',
        },
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyData.success) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            toast.success('Payment successful!');
            onSuccess(response.razorpay_payment_id);
          } catch (error: any) {
            toast.error(error.message || 'Payment verification failed');
            onError(error.message);
          }
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
            onError('Payment cancelled by user');
          },
        },
      };

      const razorpay = (window as any).Razorpay;
      if (!razorpay) {
        throw new Error('Razorpay not loaded');
      }

      const checkout = new razorpay(options);
      checkout.open();
    } catch (error: any) {
      toast.error(error.message || 'Payment failed');
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading && <Loader className="w-4 h-4 animate-spin" />}
      {loading ? 'Processing...' : `Pay ₹${(amount / 1000).toFixed(0)}K with Razorpay`}
    </button>
  );
}
