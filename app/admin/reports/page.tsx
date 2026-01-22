'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Download, Eye, ChevronLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminReportsPage() {
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

  const reports = [
    {
      id: 1,
      name: 'Monthly Sales Report - March 2024',
      type: 'Sales',
      date: '2024-03-31',
      size: '2.4 MB',
      status: 'Ready',
    },
    {
      id: 2,
      name: 'User Activity Report - Q1 2024',
      type: 'User Analytics',
      date: '2024-03-30',
      size: '1.8 MB',
      status: 'Ready',
    },
    {
      id: 3,
      name: 'Inventory Status Report',
      type: 'Inventory',
      date: '2024-03-29',
      size: '3.2 MB',
      status: 'Ready',
    },
    {
      id: 4,
      name: 'Customer Satisfaction Survey',
      type: 'Customer',
      date: '2024-03-28',
      size: '1.5 MB',
      status: 'Ready',
    },
    {
      id: 5,
      name: 'Product Performance Analysis',
      type: 'Products',
      date: '2024-03-27',
      size: '2.1 MB',
      status: 'Ready',
    },
    {
      id: 6,
      name: 'Revenue Forecast - Q2 2024',
      type: 'Financial',
      date: '2024-03-26',
      size: '1.9 MB',
      status: 'Ready',
    },
  ];

  const reportTypes = [
    { name: 'Sales Report', description: 'Monthly and quarterly sales data', icon: '📊' },
    { name: 'User Analytics', description: 'User behavior and engagement metrics', icon: '👥' },
    { name: 'Inventory Report', description: 'Stock levels and product availability', icon: '📦' },
    { name: 'Financial Report', description: 'Revenue, expenses, and profitability', icon: '💰' },
    { name: 'Customer Report', description: 'Customer satisfaction and feedback', icon: '⭐' },
    { name: 'Product Report', description: 'Product performance and trends', icon: '🎯' },
  ];

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Generate Report
        </Button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Report Types */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Available Report Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((type, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-3xl mb-3">{type.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Recent Reports</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Report Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      {report.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {report.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.size}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Schedule */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Scheduled Reports</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Weekly Sales Report</p>
                <p className="text-sm text-gray-600">Every Monday at 9:00 AM</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Monthly Financial Report</p>
                <p className="text-sm text-gray-600">First day of every month at 10:00 AM</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Quarterly User Analytics</p>
                <p className="text-sm text-gray-600">First day of every quarter at 2:00 PM</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
