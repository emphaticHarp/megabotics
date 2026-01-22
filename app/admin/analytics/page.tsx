'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, TrendingUp, Users, ShoppingCart, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');

    if (!adminToken || !adminUser) {
      router.push('/admin/login');
      return;
    }

    try {
      setAdmin(JSON.parse(adminUser));
      setLoading(false);
    } catch (err) {
      router.push('/admin/login');
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const metrics = [
    { label: 'Total Revenue', value: '₹45.2L', change: '+12.5%', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
    { label: 'Total Users', value: '1,234', change: '+8.2%', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Orders', value: '789', change: '+15.3%', icon: ShoppingCart, color: 'bg-purple-100 text-purple-600' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.5%', icon: BarChart3, color: 'bg-orange-100 text-orange-600' },
  ];

  const chartData = [
    { month: 'Jan', revenue: 25, orders: 120, users: 450 },
    { month: 'Feb', revenue: 32, orders: 145, users: 520 },
    { month: 'Mar', revenue: 28, orders: 135, users: 480 },
    { month: 'Apr', revenue: 38, orders: 165, users: 620 },
    { month: 'May', revenue: 45, orders: 189, users: 750 },
    { month: 'Jun', revenue: 52, orders: 210, users: 890 },
  ];

  const categoryPerformance = [
    { category: 'Drones', revenue: '₹12.5L', orders: 245, growth: '+18%' },
    { category: 'Robotics', revenue: '₹10.8L', orders: 198, growth: '+12%' },
    { category: 'Security', revenue: '₹8.2L', orders: 156, growth: '+8%' },
    { category: 'Agriculture', revenue: '₹7.5L', orders: 142, growth: '+15%' },
    { category: 'Infrastructure', revenue: '₹6.2L', orders: 48, growth: '+22%' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-6 flex items-center gap-3">
        <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 text-sm font-semibold">{metric.label}</h3>
                  <div className={`p-3 rounded-lg ${metric.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-xs text-green-600 mt-2">↑ {metric.change} from last month</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Revenue Trend (₹ Lakhs)</h2>
            <div className="space-y-4">
              {chartData.map((data, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700 w-12">{data.month}</p>
                  <div className="flex-1 mx-4">
                    <div className="w-full h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg transition-all"
                        style={{ width: `${(data.revenue / 52) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 w-12 text-right">₹{data.revenue}L</p>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Orders Trend</h2>
            <div className="space-y-4">
              {chartData.map((data, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700 w-12">{data.month}</p>
                  <div className="flex-1 mx-4">
                    <div className="w-full h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg transition-all"
                        style={{ width: `${(data.orders / 210) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 w-12 text-right">{data.orders}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Category Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Revenue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Orders</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categoryPerformance.map((cat, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{cat.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{cat.revenue}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cat.orders}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        {cat.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">New Users This Month</h3>
            <p className="text-3xl font-bold text-gray-900">245</p>
            <p className="text-xs text-green-600 mt-2">↑ 18% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Active Users</h3>
            <p className="text-3xl font-bold text-gray-900">892</p>
            <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Avg. Order Value</h3>
            <p className="text-3xl font-bold text-gray-900">₹57.3K</p>
            <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
