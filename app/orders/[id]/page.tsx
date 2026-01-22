'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OrderDetailPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: '₹2,49,999',
      status: 'Delivered',
      items: 3,
      statusIcon: CheckCircle,
      statusColor: 'text-green-600',
      deliveryDate: '2024-01-20',
      shippingAddress: '123 Tech Street, Bangalore, Karnataka 560001',
      trackingNumber: 'TRK-2024-001-ABC',
      products: [
        { id: 1, name: 'Precision Mapping Drone', price: '₹99,999', quantity: 1, image: '/agriculture-icon.png' },
        { id: 2, name: 'Collaborative Robot Cobot', price: '₹1,00,000', quantity: 1, image: '/robotics-icon.png' },
        { id: 3, name: 'Perimeter Security Bot', price: '₹50,000', quantity: 1, image: '/defence-icon.png' },
      ],
      timeline: [
        { step: 'Order Placed', date: '2024-01-15', completed: true },
        { step: 'Processing', date: '2024-01-16', completed: true },
        { step: 'Shipped', date: '2024-01-17', completed: true },
        { step: 'In Transit', date: '2024-01-18', completed: true },
        { step: 'Delivered', date: '2024-01-20', completed: true },
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      total: '₹1,29,999',
      status: 'In Transit',
      items: 2,
      statusIcon: Truck,
      statusColor: 'text-blue-600',
      deliveryDate: '2024-01-25',
      shippingAddress: '456 Innovation Ave, Mumbai, Maharashtra 400001',
      trackingNumber: 'TRK-2024-002-XYZ',
      products: [
        { id: 4, name: 'Crop Health Analyzer', price: '₹75,000', quantity: 1, image: '/agriculture-icon.png' },
        { id: 5, name: 'Bridge Inspection Robot', price: '₹54,999', quantity: 1, image: '/infrastructure-icon.png' },
      ],
      timeline: [
        { step: 'Order Placed', date: '2024-01-10', completed: true },
        { step: 'Processing', date: '2024-01-11', completed: true },
        { step: 'Shipped', date: '2024-01-12', completed: true },
        { step: 'In Transit', date: '2024-01-18', completed: true },
        { step: 'Delivered', date: '2024-01-25', completed: false },
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      total: '₹89,999',
      status: 'Processing',
      items: 1,
      statusIcon: Package,
      statusColor: 'text-yellow-600',
      deliveryDate: '2024-01-28',
      shippingAddress: '789 Future Lane, Delhi, Delhi 110001',
      trackingNumber: 'TRK-2024-003-DEF',
      products: [
        { id: 6, name: 'Rescue Drone Pro', price: '₹89,999', quantity: 1, image: '/disaster-icon.png' },
      ],
      timeline: [
        { step: 'Order Placed', date: '2024-01-05', completed: true },
        { step: 'Processing', date: '2024-01-06', completed: true },
        { step: 'Shipped', date: '2024-01-22', completed: false },
        { step: 'In Transit', date: '2024-01-25', completed: false },
        { step: 'Delivered', date: '2024-01-28', completed: false },
      ]
    },
  ];

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Order not found</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const StatusIcon = order.statusIcon;

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/orders" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>

          {/* Order Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{order.id}</h1>
                <p className="text-gray-600">Ordered on {order.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusIcon className={`w-8 h-8 ${order.statusColor}`} />
                <span className={`text-2xl font-bold ${order.statusColor}`}>{order.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Order Total</p>
                <p className="text-2xl font-bold text-gray-900">{order.total}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Expected Delivery</p>
                <p className="text-2xl font-bold text-gray-900">{order.deliveryDate}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                <p className="text-lg font-bold text-gray-900">{order.trackingNumber}</p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Timeline</h2>
            <div className="space-y-4">
              {order.timeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.completed ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {item.completed ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.step}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h2>
            <div className="space-y-4">
              {order.products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{product.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              Shipping Address
            </h2>
            <p className="text-gray-700 text-lg">{order.shippingAddress}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3">
              Download Invoice
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-full px-8 py-3">
              Contact Support
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
