'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Coupon {
  _id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount: number | null;
  usageLimit: number | null;
  usageCount: number;
  validFrom: string;
  validUntil: string;
  active: boolean;
  createdAt: string;
}

interface FormData {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount: number | null;
  usageLimit: number | null;
  validFrom: string;
  validUntil: string;
}

export function AdminCouponsSection() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState<FormData>({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    minOrderAmount: 0,
    maxDiscount: null,
    usageLimit: null,
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Auto-refresh coupons every 5 seconds
  useEffect(() => {
    if (!autoRefresh) {
      if (refreshInterval) clearInterval(refreshInterval);
      return;
    }

    const interval = setInterval(() => {
      fetchCoupons();
    }, 5000); // 5 seconds

    setRefreshInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const fetchCoupons = async () => {
    try {
      const response = await fetch(`/api/coupons?all=true&t=${Date.now()}`, {
        cache: 'no-store',
      });
      const data = await response.json();
      if (data.success) {
        setCoupons(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingId ? `/api/coupons/${editingId}` : '/api/coupons';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save coupon');
      }

      toast.success(editingId ? 'Coupon updated' : 'Coupon created');
      resetForm();
      // Refresh immediately
      setTimeout(() => fetchCoupons(), 100);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;

    try {
      const response = await fetch(`/api/coupons/${deletingId}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Failed to delete coupon');
      }

      toast.success('Coupon deleted');
      setDeleteDialogOpen(false);
      setDeletingId(null);
      fetchCoupons();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleToggleActive = async (coupon: Coupon) => {
    try {
      const response = await fetch(`/api/coupons/${coupon._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !coupon.active }),
      });

      if (!response.ok) {
        throw new Error('Failed to update coupon');
      }

      toast.success(coupon.active ? 'Coupon deactivated' : 'Coupon activated');
      fetchCoupons();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingId(coupon._id);
    setFormData({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount,
      maxDiscount: coupon.maxDiscount,
      usageLimit: coupon.usageLimit,
      validFrom: coupon.validFrom.split('T')[0],
      validUntil: coupon.validUntil.split('T')[0],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: 0,
      minOrderAmount: 0,
      maxDiscount: null,
      usageLimit: null,
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
    setShowForm(false);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Coupons & Discounts</h3>
          <p className="text-gray-600 text-sm mt-1">Manage discount codes and promotional offers</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchCoupons()}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition-colors"
            title="Refresh"
          >
            ↻
          </button>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
              autoRefresh
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
          >
            {autoRefresh ? '🔄 Live' : '⏸ Paused'}
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Coupon
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search coupons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
        />
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">No coupons found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Discount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Min Order</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Usage</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Valid Until</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredCoupons.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-bold text-blue-600">{coupon.code}</code>
                        <button
                          onClick={() => copyCode(coupon.code)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          {copiedCode === coupon.code ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{coupon.description}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">₹{coupon.minOrderAmount}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {coupon.usageCount}/{coupon.usageLimit || '∞'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(coupon.validUntil).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        coupon.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {coupon.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleActive(coupon)}
                          className={`p-2 rounded transition-colors ${
                            coupon.active
                              ? 'hover:bg-green-100 text-green-600'
                              : 'hover:bg-red-100 text-red-600'
                          }`}
                          title={coupon.active ? 'Deactivate' : 'Activate'}
                        >
                          {coupon.active ? '✓' : '✗'}
                        </button>
                        <button
                          onClick={() => handleEdit(coupon)}
                          className="p-2 hover:bg-blue-100 text-blue-600 rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon._id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 border-b border-gray-200 p-6 flex items-center justify-between bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Coupon' : 'Create Coupon'}
              </h2>
              <button
                onClick={resetForm}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="SUMMER20"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Discount Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Discount Type *
                  </label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>

                {/* Discount Value */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) || 0 })}
                    placeholder="20"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Min Order Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Order Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.minOrderAmount}
                    onChange={(e) => setFormData({ ...formData, minOrderAmount: parseFloat(e.target.value) || 0 })}
                    placeholder="500"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Max Discount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Maximum Discount (₹) - Optional
                  </label>
                  <input
                    type="number"
                    value={formData.maxDiscount || ''}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value ? parseFloat(e.target.value) : null })}
                    placeholder="1000"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Usage Limit */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Usage Limit - Optional
                  </label>
                  <input
                    type="number"
                    value={formData.usageLimit || ''}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="100"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Valid From */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valid From *
                  </label>
                  <input
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Valid Until */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valid Until *
                  </label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summer sale discount..."
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 border-t pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Coupon'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Coupon</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this coupon? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3">
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="flex-1"
            >
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
