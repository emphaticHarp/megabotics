'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ShoppingBag, Package, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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
      total: '$2,499.99',
      status: 'Delivered',
      items: 3,
      statusIcon: CheckCircle,
      statusColor: 'text-green-600',
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      total: '$1,299.99',
      status: 'In Transit',
      items: 2,
      statusIcon: Truck,
      statusColor: 'text-blue-600',
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      total: '$899.99',
      status: 'Processing',
      items: 1,
      statusIcon: Package,
      statusColor: 'text-yellow-600',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            My Orders
          </h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
              <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
              <Button 
                onClick={() => router.push('/products')}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const StatusIcon = order.statusIcon;
                return (
                  <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-5 h-5 ${order.statusColor}`} />
                        <span className={`font-semibold ${order.statusColor}`}>{order.status}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">{order.items} item(s)</p>
                        <p className="text-2xl font-bold text-gray-900">{order.total}</p>
                      </div>
                      <Link href={`/orders/${order.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
