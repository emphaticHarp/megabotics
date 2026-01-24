'use client';

import { CheckCircle2, Circle, Truck, Package, Home } from 'lucide-react';

interface OrderTrackingProps {
  status: string;
  trackingNumber?: string;
  createdAt: string;
}

export function OrderTracking({ status, trackingNumber, createdAt }: OrderTrackingProps) {
  const trackingSteps = [
    { key: 'Pending', label: 'Order Placed', icon: Package },
    { key: 'Processing', label: 'Processing', icon: Package },
    { key: 'Shipped', label: 'Shipped', icon: Truck },
    { key: 'Delivered', label: 'Delivered', icon: Home },
  ];

  const getStepIndex = (currentStatus: string) => {
    const index = trackingSteps.findIndex(step => step.key === currentStatus);
    return index >= 0 ? index : 0;
  };

  const currentStepIndex = getStepIndex(status);
  const isCancelled = status === 'Cancelled';

  return (
    <div className="space-y-6">
      {/* Tracking Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Current Status</p>
            <p className="text-2xl font-bold text-gray-900">{status}</p>
          </div>
          {trackingNumber && (
            <div className="text-right">
              <p className="text-sm text-gray-600">Tracking Number</p>
              <p className="text-lg font-bold text-blue-600">{trackingNumber}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tracking Timeline */}
      {!isCancelled ? (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-700">Order Progress</p>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200" />

            {/* Timeline Steps */}
            <div className="space-y-6">
              {trackingSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = step.icon;

                return (
                  <div key={step.key} className="relative pl-20">
                    {/* Step Circle */}
                    <div className="absolute left-0 top-0">
                      {isCompleted ? (
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isCurrent
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                            : 'bg-green-500 text-white'
                        }`}>
                          {isCurrent ? (
                            <Icon className="w-6 h-6" />
                          ) : (
                            <CheckCircle2 className="w-6 h-6" />
                          )}
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 text-gray-400">
                          <Circle className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div>
                      <p className={`font-semibold ${
                        isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {index === 0 && `Ordered on ${new Date(createdAt).toLocaleDateString()}`}
                        {index === 1 && 'Your order is being prepared'}
                        {index === 2 && 'Your order is on the way'}
                        {index === 3 && 'Order delivered successfully'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">Order Cancelled</p>
          <p className="text-sm text-red-600 mt-1">This order has been cancelled and will not be delivered.</p>
        </div>
      )}

      {/* Estimated Delivery */}
      {status === 'Shipped' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Estimated Delivery</p>
          <p className="text-lg font-bold text-blue-600 mt-1">
            {new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </p>
        </div>
      )}

      {status === 'Delivered' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Delivered On</p>
          <p className="text-lg font-bold text-green-600 mt-1">
            {new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}
