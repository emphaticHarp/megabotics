'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { CheckCircle, Download, Home, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  orderStatus: string;
  trackingNumber?: string;
  createdAt: string;
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationLoading />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}

function OrderConfirmationLoading() {
  return (
    <>
      <AIChatbot />
      <div className="min-h-screen bg-gray-50 py-12 pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      // Search for order by orderId
      const response = await fetch('/api/orders', {
        cache: 'no-store',
      });
      const data = await response.json();

      if (data.success && data.data) {
        const foundOrder = data.data.find((o: Order) => o.orderId === orderId);
        if (foundOrder) {
          setOrder(foundOrder);
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = () => {
    if (!order) return;

    const invoiceContent = `
ORDER INVOICE
===========================================
Order ID: ${order.orderId}
Date: ${new Date(order.createdAt).toLocaleDateString()}

CUSTOMER DETAILS
===========================================
Name: ${order.customerName}
Email: ${order.email}
Phone: ${order.phone}
Address: ${order.address}
City: ${order.city}, ${order.state} - ${order.pincode}

ORDER ITEMS
===========================================
${order.items.map(item => `${item.productName} x${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`).join('\n')}

ORDER SUMMARY
===========================================
Subtotal: ₹${order.subtotal.toLocaleString()}
Delivery Charge: ₹${order.deliveryCharge}
Total Amount: ₹${order.totalAmount.toLocaleString()}

PAYMENT DETAILS
===========================================
Payment Method: ${order.paymentMethod}
Payment Status: ${order.paymentStatus}

ORDER STATUS
===========================================
Status: ${order.orderStatus}
${order.trackingNumber ? `Tracking Number: ${order.trackingNumber}` : ''}

Thank you for your order!
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(invoiceContent));
    element.setAttribute('download', `invoice-${order.orderId}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <>
        <AIChatbot />
        <div className="min-h-screen bg-gray-50 py-12 pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <AIChatbot />
        <div className="min-h-screen bg-gray-50 py-12 pt-32">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
            <p className="text-gray-600 mb-6">We couldn't find your order. Please check your email for order details.</p>
            <button
              onClick={() => router.push('/products')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Continue Shopping
            </button>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-2">Thank you for your purchase</p>
            <p className="text-lg font-semibold text-blue-600">Order ID: {order.orderId}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Details */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h2>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">{order.customerName}</p>
                  <p>{order.address}</p>
                  <p>{order.city}, {order.state} - {order.pincode}</p>
                  <p className="text-sm text-gray-600">Phone: {order.phone}</p>
                  <p className="text-sm text-gray-600">Email: {order.email}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.productName}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Price: ₹{item.price.toLocaleString()}</p>
                      </div>
                      <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charge</span>
                    <span className="font-semibold text-gray-900">₹{order.deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹{order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600">Payment Method</p>
                      <p className="font-semibold text-gray-900">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Payment Status</p>
                      <p className={`font-semibold ${
                        order.paymentStatus === 'Completed' ? 'text-green-600' :
                        order.paymentStatus === 'Failed' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {order.paymentStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Status</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600">Status</p>
                      <p className="font-semibold text-gray-900">{order.orderStatus}</p>
                    </div>
                    {order.trackingNumber && (
                      <div>
                        <p className="text-gray-600">Tracking Number</p>
                        <p className="font-semibold text-gray-900">{order.trackingNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-6 space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <p className="text-sm text-green-700">
                    ✓ Order confirmed<br />
                    ✓ Confirmation email sent<br />
                    ✓ You can track your order
                  </p>
                </div>

                <button
                  onClick={downloadInvoice}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Invoice
                </button>

                <button
                  onClick={() => router.push('/orders')}
                  className="w-full py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all"
                >
                  View All Orders
                </button>

                <button
                  onClick={() => router.push('/products')}
                  className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Continue Shopping
                </button>

                <button
                  onClick={() => router.push('/')}
                  className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </button>

                <div className="p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                  <p className="font-semibold mb-2">Need Help?</p>
                  <p className="text-xs">Contact us at support@megabotics.com or call +91 XXXX-XXXX-XX</p>
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
