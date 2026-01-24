'use client';

import { useState, useEffect } from 'react';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { OrderTracking } from '@/components/order-tracking';
import { Eye, Download, ShoppingBag, X } from 'lucide-react';
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
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchOrders();
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
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = (order: Order) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 20;

      // Header
      doc.setFontSize(24);
      doc.setTextColor(30, 58, 138); // Blue color
      doc.text('INVOICE', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Order ID and Date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Order ID: ${order.orderId}`, 20, yPosition);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, pageWidth - 20, yPosition, { align: 'right' });
      yPosition += 10;

      // Divider
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      // Customer Details Section
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text('CUSTOMER DETAILS', 20, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(`Name: ${order.customerName}`, 20, yPosition);
      yPosition += 6;
      doc.text(`Email: ${order.email}`, 20, yPosition);
      yPosition += 6;
      doc.text(`Phone: ${order.phone}`, 20, yPosition);
      yPosition += 6;
      doc.text(`Address: ${order.address}`, 20, yPosition);
      yPosition += 6;
      doc.text(`City: ${order.city}, ${order.state} - ${order.pincode}`, 20, yPosition);
      yPosition += 12;

      // Divider
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      // Order Items Section
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text('ORDER ITEMS', 20, yPosition);
      yPosition += 8;

      // Table Header
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.setFillColor(30, 58, 138);
      doc.rect(20, yPosition - 5, pageWidth - 40, 7, 'F');
      doc.text('Product', 25, yPosition);
      doc.text('Qty', 120, yPosition);
      doc.text('Price', 150, yPosition);
      doc.text('Total', 180, yPosition);
      yPosition += 10;

      // Table Rows
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      order.items.forEach((item, index) => {
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 20;
        }
        
        const productName = item.productName.length > 30 
          ? item.productName.substring(0, 30) + '...' 
          : item.productName;
        
        doc.text(productName, 25, yPosition);
        doc.text(item.quantity.toString(), 120, yPosition);
        doc.text(`₹${item.price.toLocaleString()}`, 150, yPosition);
        doc.text(`₹${(item.price * item.quantity).toLocaleString()}`, 180, yPosition);
        yPosition += 8;
      });

      yPosition += 5;

      // Divider
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      // Order Summary Section
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      
      const summaryX = pageWidth - 80;
      doc.text('Subtotal:', summaryX, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(`₹${order.subtotal.toLocaleString()}`, pageWidth - 20, yPosition, { align: 'right' });
      yPosition += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('Delivery Charge:', summaryX, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(`₹${order.deliveryCharge}`, pageWidth - 20, yPosition, { align: 'right' });
      yPosition += 10;

      // Total
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 58, 138);
      doc.text('TOTAL:', summaryX, yPosition);
      doc.text(`₹${order.totalAmount.toLocaleString()}`, pageWidth - 20, yPosition, { align: 'right' });
      yPosition += 12;

      // Divider
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      // Payment & Status Section
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'bold');
      doc.text('Payment Method:', 20, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(order.paymentMethod, 70, yPosition);
      yPosition += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('Payment Status:', 20, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(order.paymentStatus, 70, yPosition);
      yPosition += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('Order Status:', 20, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(order.orderStatus, 70, yPosition);
      yPosition += 8;

      if (order.trackingNumber) {
        doc.setFont('helvetica', 'bold');
        doc.text('Tracking Number:', 20, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(order.trackingNumber, 70, yPosition);
      }

      // Footer
      yPosition = pageHeight - 20;
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('Thank you for your order!', pageWidth / 2, yPosition, { align: 'center' });

      // Save PDF
      doc.save(`invoice-${order.orderId}.pdf`);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate invoice');
    }
  };

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(order => order.orderStatus === filterStatus);

  const orderStatuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  if (loading) {
    return (
      <>
        <AIChatbot />
        <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {orderStatuses.map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">No orders found</h2>
              <p className="text-gray-600">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-all">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      {/* Order ID */}
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-bold text-gray-900">{order.orderId}</p>
                      </div>

                      {/* Date */}
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Amount */}
                      <div>
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="font-bold text-blue-600">₹{order.totalAmount.toLocaleString()}</p>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          order.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                          order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetails(true);
                          }}
                          className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-all"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => downloadInvoice(order)}
                          className="p-2 hover:bg-green-100 rounded-lg text-green-600 transition-all"
                          title="Download Invoice"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Order Details - {selectedOrder.orderId}</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Tracking */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-4">Order Tracking</h4>
                <OrderTracking 
                  status={selectedOrder.orderStatus}
                  trackingNumber={selectedOrder.trackingNumber}
                  createdAt={selectedOrder.createdAt}
                />
              </div>

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
                      <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charge</span>
                    <span className="font-semibold">₹{selectedOrder.deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>₹{selectedOrder.totalAmount.toLocaleString()}</span>
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

              {/* Close Button */}
              <button
                onClick={() => setShowDetails(false)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
