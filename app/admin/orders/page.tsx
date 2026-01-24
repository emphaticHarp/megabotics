'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, Eye, Download, Mail, Phone, BarChart3, Calendar, Filter, ChevronDown, Copy, RefreshCw, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/admin-layout';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

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
  notes: string;
  createdAt: string;
}

interface FormData {
  deliveryCharge: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  trackingNumber: string;
  notes: string;
  returnStatus?: string;
  refundAmount?: number;
  refundReason?: string;
}

const paymentMethods = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet'];
const paymentStatuses = ['Pending', 'Completed', 'Failed', 'Refunded'];
const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const returnStatuses = ['None', 'Return Requested', 'Return Approved', 'Return Shipped', 'Return Received', 'Refunded'];
const refundReasons = ['Defective Product', 'Wrong Item', 'Not as Described', 'Changed Mind', 'Damaged in Transit', 'Other'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('All');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({ subject: '', message: '' });
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundData, setRefundData] = useState({ amount: 0, reason: '' });
  const [formData, setFormData] = useState<FormData>({
    deliveryCharge: 0,
    paymentMethod: 'UPI',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    trackingNumber: '',
    notes: '',
    returnStatus: 'None',
    refundAmount: 0,
    refundReason: '',
  });

  useEffect(() => {
    fetchOrders();
    
    // Real-time polling every 5 seconds
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders', {
        cache: 'no-store',
      });
      const data = await response.json();
      if (data.success && data.data) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    }
  };

  const getOrderAnalytics = () => {
    const filteredByDate = orders.filter(order => {
      if (!dateRange.start || !dateRange.end) return true;
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(dateRange.start) && orderDate <= new Date(dateRange.end);
    });

    const totalOrders = filteredByDate.length;
    const totalRevenue = filteredByDate.reduce((sum, o) => sum + o.totalAmount, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    const statusBreakdown = {
      Pending: filteredByDate.filter(o => o.orderStatus === 'Pending').length,
      Processing: filteredByDate.filter(o => o.orderStatus === 'Processing').length,
      Shipped: filteredByDate.filter(o => o.orderStatus === 'Shipped').length,
      Delivered: filteredByDate.filter(o => o.orderStatus === 'Delivered').length,
      Cancelled: filteredByDate.filter(o => o.orderStatus === 'Cancelled').length,
    };

    const paymentBreakdown = {
      Pending: filteredByDate.filter(o => o.paymentStatus === 'Pending').length,
      Completed: filteredByDate.filter(o => o.paymentStatus === 'Completed').length,
      Failed: filteredByDate.filter(o => o.paymentStatus === 'Failed').length,
      Refunded: filteredByDate.filter(o => o.paymentStatus === 'Refunded').length,
    };

    const methodBreakdown = {
      UPI: filteredByDate.filter(o => o.paymentMethod === 'UPI').length,
      'Credit Card': filteredByDate.filter(o => o.paymentMethod === 'Credit Card').length,
      'Debit Card': filteredByDate.filter(o => o.paymentMethod === 'Debit Card').length,
      'Net Banking': filteredByDate.filter(o => o.paymentMethod === 'Net Banking').length,
      'Wallet': filteredByDate.filter(o => o.paymentMethod === 'Wallet').length,
    };

    return { totalOrders, totalRevenue, avgOrderValue, statusBreakdown, paymentBreakdown, methodBreakdown };
  };

  const handleBulkStatusUpdate = async (newStatus: string) => {
    if (selectedOrders.size === 0) {
      toast.error('No orders selected');
      return;
    }

    try {
      for (const id of selectedOrders) {
        await fetch(`/api/orders/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderStatus: newStatus }),
        });
      }
      toast.success(`Updated ${selectedOrders.size} orders`);
      setSelectedOrders(new Set());
      fetchOrders();
    } catch (error) {
      toast.error('Error updating orders');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedOrders.size === 0) {
      toast.error('No orders selected');
      return;
    }

    if (!confirm(`Delete ${selectedOrders.size} orders?`)) return;

    try {
      for (const id of selectedOrders) {
        await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      }
      toast.success(`Deleted ${selectedOrders.size} orders`);
      setSelectedOrders(new Set());
      fetchOrders();
    } catch (error) {
      toast.error('Error deleting orders');
    }
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Amount', 'Payment Method', 'Payment Status', 'Order Status', 'Date'];
    const rows = filteredOrders.map(o => [
      o.orderId,
      o.customerName,
      o.email,
      o.totalAmount,
      o.paymentMethod,
      o.paymentStatus,
      o.orderStatus,
      new Date(o.createdAt).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Orders exported to CSV');
  };

  const printInvoice = (order: Order) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    doc.setFontSize(20);
    doc.setTextColor(30, 58, 138);
    doc.text('INVOICE', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Order ID: ${order.orderId}`, 20, yPosition);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, pageWidth - 20, yPosition, { align: 'right' });
    yPosition += 15;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('CUSTOMER DETAILS', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${order.customerName}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Email: ${order.email}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Phone: ${order.phone}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Address: ${order.address}, ${order.city}, ${order.state} - ${order.pincode}`, 20, yPosition);
    yPosition += 12;

    doc.setFont('helvetica', 'bold');
    doc.text('ORDER ITEMS', 20, yPosition);
    yPosition += 8;

    doc.setFont('helvetica', 'normal');
    order.items.forEach(item => {
      doc.text(`${item.productName} x${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`, 20, yPosition);
      yPosition += 6;
    });

    yPosition += 5;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: ₹${order.totalAmount.toLocaleString()}`, 20, yPosition);

    doc.save(`invoice-${order.orderId}.pdf`);
    toast.success('Invoice printed');
  };

  const duplicateOrder = async (order: Order) => {
    try {
      const newOrder = {
        ...order,
        orderId: `ORD-${Date.now()}`,
        orderStatus: 'Pending',
        paymentStatus: 'Pending',
        trackingNumber: '',
      };
      delete (newOrder as any)._id;

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        toast.success('Order duplicated');
        fetchOrders();
      }
    } catch (error) {
      toast.error('Error duplicating order');
    }
  };

  const sendEmail = async () => {
    if (!selectedOrder) return;
    toast.success(`Email sent to ${selectedOrder.email}`);
    setShowEmailModal(false);
  };

  const processRefund = async () => {
    if (!selectedOrder) return;
    try {
      await fetch(`/api/orders/${selectedOrder._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentStatus: 'Refunded',
          notes: `Refund of ₹${refundData.amount} processed. Reason: ${refundData.reason}`,
        }),
      });
      toast.success('Refund processed');
      setShowRefundModal(false);
      fetchOrders();
    } catch (error) {
      toast.error('Error processing refund');
    }
  };

  const openEditForm = (order: Order) => {
    setEditingId(order._id);
    setFormData({
      deliveryCharge: order.deliveryCharge,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      trackingNumber: order.trackingNumber || '',
      notes: order.notes,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingId) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/orders/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update order');
      }

      toast.success('Order updated successfully!');
      fetchOrders();
      setShowForm(false);
      setEditingId(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      toast.success('Order deleted successfully!');
      fetchOrders();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete order');
    }
  };

  const filteredOrders = orders
    .filter(order => {
      if (searchTerm && !order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.phone.includes(searchTerm) &&
          !order.trackingNumber?.includes(searchTerm)) {
        return false;
      }
      if (filterStatus !== 'All' && order.orderStatus !== filterStatus) return false;
      if (filterPaymentStatus !== 'All' && order.paymentStatus !== filterPaymentStatus) return false;
      if (filterPaymentMethod !== 'All' && order.paymentMethod !== filterPaymentMethod) return false;
      if (dateRange.start && new Date(order.createdAt) < new Date(dateRange.start)) return false;
      if (dateRange.end && new Date(order.createdAt) > new Date(dateRange.end)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'amount') return b.totalAmount - a.totalAmount;
      if (sortBy === 'customer') return a.customerName.localeCompare(b.customerName);
      return 0;
    });

  return (
    <AdminLayout currentPage="Orders">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold flex items-center gap-2"
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </button>
        </div>

        {/* Analytics Dashboard */}
        {showAnalytics && (() => {
          const analytics = getOrderAnalytics();
          return (
            <div className="mb-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-blue-600">{analytics.totalOrders}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600">₹{(analytics.totalRevenue / 100000).toFixed(1)}L</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                  <p className="text-3xl font-bold text-purple-600">₹{(analytics.avgOrderValue / 1000).toFixed(0)}K</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-gray-600">Delivered Orders</p>
                  <p className="text-3xl font-bold text-emerald-600">{analytics.statusBreakdown.Delivered}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="font-semibold text-gray-900 mb-3">Order Status</p>
                  {Object.entries(analytics.statusBreakdown).map(([status, count]) => (
                    <div key={status} className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">{status}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="font-semibold text-gray-900 mb-3">Payment Status</p>
                  {Object.entries(analytics.paymentBreakdown).map(([status, count]) => (
                    <div key={status} className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">{status}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="font-semibold text-gray-900 mb-3">Payment Methods</p>
                  {Object.entries(analytics.methodBreakdown).map(([method, count]) => (
                    <div key={method} className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">{method}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Date Range Filter */}
        <div className="mb-6 bg-white rounded-lg p-4 border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Order Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="All">All</option>
                {orderStatuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Payment Status</label>
              <select
                value={filterPaymentStatus}
                onChange={(e) => setFilterPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="All">All</option>
                {paymentStatuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="date">Date (Newest)</option>
                <option value="amount">Amount (High to Low)</option>
                <option value="customer">Customer Name</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              Bulk Actions ({selectedOrders.size})
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {showBulkActions && selectedOrders.size > 0 && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <p className="font-semibold text-blue-900">{selectedOrders.size} orders selected</p>
            <div className="flex gap-2 flex-wrap">
              {orderStatuses.map(status => (
                <button
                  key={status}
                  onClick={() => handleBulkStatusUpdate(status)}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
                >
                  Mark as {status}
                </button>
              ))}
              <button
                onClick={handleBulkDelete}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Customer, Email, Phone, or Tracking Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.size === filteredOrders.length && filteredOrders.length > 0}
                    onChange={() => {
                      if (selectedOrders.size === filteredOrders.length) {
                        setSelectedOrders(new Set());
                      } else {
                        setSelectedOrders(new Set(filteredOrders.map(o => o._id)));
                      }
                    }}
                    className="w-4 h-4 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id} className={`hover:bg-gray-50 ${selectedOrders.has(order._id) ? 'bg-blue-50' : ''}`}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.has(order._id)}
                      onChange={() => {
                        const newSelected = new Set(selectedOrders);
                        if (newSelected.has(order._id)) {
                          newSelected.delete(order._id);
                        } else {
                          newSelected.add(order._id);
                        }
                        setSelectedOrders(newSelected);
                      }}
                      className="w-4 h-4 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.orderId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div>{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="text-gray-700">{order.paymentMethod}</div>
                    <div className={`text-xs font-semibold ${
                      order.paymentStatus === 'Completed' ? 'text-green-600' :
                      order.paymentStatus === 'Failed' ? 'text-red-600' :
                      order.paymentStatus === 'Refunded' ? 'text-purple-600' :
                      'text-yellow-600'
                    }`}>
                      {order.paymentStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      order.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                      order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-1 flex flex-wrap gap-1">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowDetails(true);
                      }}
                      className="p-2 hover:bg-blue-100 rounded-lg text-blue-600"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEditForm(order)}
                      className="p-2 hover:bg-green-100 rounded-lg text-green-600"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => printInvoice(order)}
                      className="p-2 hover:bg-purple-100 rounded-lg text-purple-600"
                      title="Print Invoice"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => duplicateOrder(order)}
                      className="p-2 hover:bg-indigo-100 rounded-lg text-indigo-600"
                      title="Duplicate Order"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Edit Order</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Delivery Charge */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Charge</label>
                  <input
                    type="number"
                    value={isNaN(formData.deliveryCharge) ? '' : formData.deliveryCharge}
                    onChange={(e) => setFormData({ ...formData, deliveryCharge: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {paymentMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>

                {/* Payment Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Status</label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {paymentStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {/* Order Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Order Status</label>
                  <select
                    value={formData.orderStatus}
                    onChange={(e) => setFormData({ ...formData, orderStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {orderStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {/* Tracking Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tracking Number</label>
                  <input
                    type="text"
                    value={formData.trackingNumber}
                    onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                    placeholder="Enter tracking number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Add any notes about this order"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {showDetails && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Order Details - {selectedOrder.orderId}</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Customer Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">City</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.city}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-gray-600 text-sm">Address</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.address}, {selectedOrder.state} - {selectedOrder.pincode}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{item.productName}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{selectedOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span className="font-semibold">₹{selectedOrder.deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total</span>
                      <span>₹{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Payment & Status */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Payment Method</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment Status</p>
                    <p className={`font-semibold ${
                      selectedOrder.paymentStatus === 'Completed' ? 'text-green-600' :
                      selectedOrder.paymentStatus === 'Failed' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {selectedOrder.paymentStatus}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Order Status</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.orderStatus}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tracking Number</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.trackingNumber || 'N/A'}</p>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <p className="text-gray-600 text-sm">Notes</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowEmailModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </button>
                  <button
                    onClick={() => setShowRefundModal(true)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
                  >
                    Process Refund
                  </button>
                  <button
                    onClick={() => printInvoice(selectedOrder)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print Invoice
                  </button>
                  <button
                    onClick={() => duplicateOrder(selectedOrder)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {showEmailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Send Email</h3>
              <button onClick={() => setShowEmailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                <input
                  type="email"
                  value={selectedOrder.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                  placeholder="Order Update"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                  placeholder="Your message here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={sendEmail}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Send
                </button>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Process Refund</h3>
              <button onClick={() => setShowRefundModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Refund Amount</label>
                <input
                  type="number"
                  value={refundData.amount}
                  onChange={(e) => setRefundData({ ...refundData, amount: parseFloat(e.target.value) })}
                  placeholder={selectedOrder.totalAmount.toString()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-xs text-gray-600 mt-1">Max: ₹{selectedOrder.totalAmount}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason</label>
                <select
                  value={refundData.reason}
                  onChange={(e) => setRefundData({ ...refundData, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select reason</option>
                  {refundReasons.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={processRefund}
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
                >
                  Process
                </button>
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
