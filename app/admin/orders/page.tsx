'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const orders = [
    { id: 'ORD-001', customer: 'Rajesh Kumar', email: 'rajesh@example.com', amount: '₹2,50,000', status: 'Delivered', date: '2024-03-15', items: 2 },
    { id: 'ORD-002', customer: 'Priya Singh', email: 'priya@example.com', amount: '₹5,75,000', status: 'Processing', date: '2024-03-16', items: 1 },
    { id: 'ORD-003', customer: 'Amit Patel', email: 'amit@example.com', amount: '₹1,85,000', status: 'Shipped', date: '2024-03-17', items: 3 },
    { id: 'ORD-004', customer: 'Neha Gupta', email: 'neha@example.com', amount: '₹8,50,000', status: 'Delivered', date: '2024-03-18', items: 1 },
    { id: 'ORD-005', customer: 'Vikram Sharma', email: 'vikram@example.com', amount: '₹3,20,000', status: 'Processing', date: '2024-03-19', items: 2 },
    { id: 'ORD-006', customer: 'Anjali Verma', email: 'anjali@example.com', amount: '₹12,00,000', status: 'Delivered', date: '2024-03-20', items: 1 },
    { id: 'ORD-007', customer: 'Rohan Desai', email: 'rohan@example.com', amount: '₹4,50,000', status: 'Cancelled', date: '2024-03-21', items: 2 },
    { id: 'ORD-008', customer: 'Divya Nair', email: 'divya@example.com', amount: '₹7,25,000', status: 'Shipped', date: '2024-03-22', items: 1 },
    { id: 'ORD-009', customer: 'Sanjay Rao', email: 'sanjay@example.com', amount: '₹2,80,000', status: 'Delivered', date: '2024-03-23', items: 3 },
    { id: 'ORD-010', customer: 'Meera Iyer', email: 'meera@example.com', amount: '₹6,50,000', status: 'Processing', date: '2024-03-24', items: 1 },
    { id: 'ORD-011', customer: 'Arjun Singh', email: 'arjun@example.com', amount: '₹3,75,000', status: 'Shipped', date: '2024-03-25', items: 2 },
    { id: 'ORD-012', customer: 'Pooja Kapoor', email: 'pooja@example.com', amount: '₹9,20,000', status: 'Delivered', date: '2024-03-26', items: 1 },
  ];

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIdx, startIdx + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{order.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                    <td className="px-6 py-4 text-sm flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
