'use client';

import { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface OrderTrackingEvent {
  status: string;
  timestamp: string;
  message: string;
  location?: string;
}

interface OrderTrackingProps {
  orderId: string;
}

export function OrderTrackingRealtime({ orderId }: OrderTrackingProps) {
  const [events, setEvents] = useState<OrderTrackingEvent[]>([]);
  const [currentStatus, setCurrentStatus] = useState('Pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial tracking data
    const fetchTracking = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          cache: 'no-store',
        });
        const data = await response.json();

        if (data.success && data.data) {
          setCurrentStatus(data.data.orderStatus);
          // Parse tracking events from order notes
          const trackingEvents: OrderTrackingEvent[] = [
            {
              status: 'Order Placed',
              timestamp: new Date(data.data.createdAt).toLocaleString(),
              message: 'Your order has been placed successfully',
            },
          ];

          if (data.data.orderStatus === 'Processing') {
            trackingEvents.push({
              status: 'Processing',
              timestamp: new Date().toLocaleString(),
              message: 'Your order is being prepared',
            });
          }

          if (data.data.orderStatus === 'Shipped') {
            trackingEvents.push({
              status: 'Shipped',
              timestamp: new Date().toLocaleString(),
              message: `Shipped with tracking number: ${data.data.trackingNumber || 'N/A'}`,
              location: 'In Transit',
            });
          }

          if (data.data.orderStatus === 'Delivered') {
            trackingEvents.push({
              status: 'Delivered',
              timestamp: new Date().toLocaleString(),
              message: 'Your order has been delivered',
              location: 'Delivered',
            });
          }

          setEvents(trackingEvents);
        }
      } catch (error) {
        console.error('Error fetching tracking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchTracking, 30000);

    return () => clearInterval(interval);
  }, [orderId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Order Placed':
        return <Package className="w-6 h-6 text-blue-600" />;
      case 'Processing':
        return <Clock className="w-6 h-6 text-yellow-600" />;
      case 'Shipped':
        return <Truck className="w-6 h-6 text-purple-600" />;
      case 'Delivered':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      default:
        return <Package className="w-6 h-6 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
        <p className="text-sm text-gray-600 mb-1">Current Status</p>
        <p className="text-2xl font-bold text-gray-900">{currentStatus}</p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex gap-4">
            {/* Icon */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                {getStatusIcon(event.status)}
              </div>
              {index < events.length - 1 && (
                <div className="w-1 h-12 bg-gray-200 mt-2"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-2">
              <h4 className="font-semibold text-gray-900">{event.status}</h4>
              <p className="text-sm text-gray-600 mt-1">{event.message}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span>{event.timestamp}</span>
                {event.location && <span>📍 {event.location}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estimated Delivery */}
      {currentStatus !== 'Delivered' && currentStatus !== 'Cancelled' && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Estimated Delivery:</strong> 3-5 business days from shipment
          </p>
        </div>
      )}
    </div>
  );
}
