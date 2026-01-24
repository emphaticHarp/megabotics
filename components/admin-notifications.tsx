'use client';

import { useEffect, useState } from 'react';
import { X, RefreshCw, User, ShoppingCart, AlertCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

interface NewUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface NewOrder {
  _id: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface NotificationStats {
  totalUsers: number;
  totalOrders: number;
  pendingOrders: number;
  newUsersCount: number;
  newOrdersCount: number;
}

interface NotificationData {
  newUsers: NewUser[];
  newOrders: NewOrder[];
  stats: NotificationStats;
}

export function AdminNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [previousNotificationCount, setPreviousNotificationCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [clearedNotifications, setClearedNotifications] = useState<Set<string>>(new Set());

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      if (data.success) {
        // Filter out cleared notifications
        const filteredUsers = data.data.newUsers.filter((u: NewUser) => !clearedNotifications.has(u._id));
        const filteredOrders = data.data.newOrders.filter((o: NewOrder) => !clearedNotifications.has(o._id));
        
        const newCount = filteredUsers.length + filteredOrders.length;
        
        // Trigger shake animation if new notifications arrived
        if (newCount > previousNotificationCount && newCount > 0) {
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 600);
        }
        
        setPreviousNotificationCount(newCount);
        setNotifications({
          ...data.data,
          newUsers: filteredUsers,
          newOrders: filteredOrders,
          stats: {
            ...data.data.stats,
            newUsersCount: filteredUsers.length,
            newOrdersCount: filteredOrders.length,
          }
        });
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Real-time polling every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, [previousNotificationCount]);

  const totalNotifications = (notifications?.stats.newUsersCount || 0) + (notifications?.stats.newOrdersCount || 0);

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Notifications"
      >
        <FontAwesomeIcon 
          icon={faBell} 
          className={`w-6 h-6 text-gray-700 ${isShaking ? 'animate-shake' : ''}`}
          style={{ fontSize: '1.5rem' }}
        />
        {totalNotifications > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {totalNotifications}
          </span>
        )}
        {totalNotifications === 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gray-400 rounded-full">
            0
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 max-h-[600px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FontAwesomeIcon icon={faBell} style={{ fontSize: '1.25rem' }} />
              Notifications
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls */}
          <div className="border-b border-gray-200 p-3 flex gap-2 bg-gray-50">
            <button
              onClick={fetchNotifications}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={() => {
                if (notifications) {
                  const allIds = new Set([
                    ...notifications.newUsers.map(u => u._id),
                    ...notifications.newOrders.map(o => o._id)
                  ]);
                  setClearedNotifications(prev => new Set([...prev, ...allIds]));
                  setNotifications(null);
                  setPreviousNotificationCount(0);
                  toast.success('Notifications cleared');
                }
              }}
              className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>

          {/* Stats */}
          {notifications && (
            <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 border-b border-gray-200">
              <div className="bg-blue-50 rounded p-2">
                <p className="text-xs text-gray-600">Total Users</p>
                <p className="text-lg font-bold text-blue-600">{notifications.stats.totalUsers}</p>
              </div>
              <div className="bg-green-50 rounded p-2">
                <p className="text-xs text-gray-600">Total Orders</p>
                <p className="text-lg font-bold text-green-600">{notifications.stats.totalOrders}</p>
              </div>
              <div className="bg-orange-50 rounded p-2">
                <p className="text-xs text-gray-600">Pending Orders</p>
                <p className="text-lg font-bold text-orange-600">{notifications.stats.pendingOrders}</p>
              </div>
              <div className="bg-purple-50 rounded p-2">
                <p className="text-xs text-gray-600">Last Update</p>
                <p className="text-xs font-semibold text-purple-600">
                  {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading && !notifications ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin">
                  <RefreshCw className="w-8 h-8 text-blue-600" />
                </div>
                <p className="mt-2 text-gray-600">Loading notifications...</p>
              </div>
            ) : notifications && (totalNotifications > 0) ? (
              <div className="space-y-0">
                {/* New Users Section */}
                {notifications.newUsers.length > 0 && (
                  <div>
                    <div className="bg-blue-50 px-4 py-2 border-b border-gray-200 sticky top-0">
                      <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        New Users ({notifications.newUsers.length})
                      </h4>
                    </div>
                    {notifications.newUsers.map((user) => (
                      <div key={user._id} className="px-4 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors">
                        <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(user.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* New Orders Section */}
                {notifications.newOrders.length > 0 && (
                  <div>
                    <div className="bg-green-50 px-4 py-2 border-b border-gray-200 sticky top-0">
                      <h4 className="text-sm font-bold text-green-900 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        New Orders ({notifications.newOrders.length})
                      </h4>
                    </div>
                    {notifications.newOrders.map((order) => (
                      <div key={order._id} className="px-4 py-3 border-b border-gray-100 hover:bg-green-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-900 text-sm">{order.customerName}</p>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'completed' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{order.customerEmail}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                          <p className="font-bold text-green-600">₹{(order.totalAmount / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600">No new notifications</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-3 bg-gray-50 text-xs text-gray-600 text-center">
            Real-time updates: Every 5 seconds
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); }
          20%, 40%, 60%, 80% { transform: rotate(10deg); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
