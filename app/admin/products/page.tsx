'use client';

import { useEffect, useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, X, AlertCircle, Zap, Download, Upload, Eye, EyeOff, Star, Copy, ExternalLink, GripVertical, Filter, ChevronDown, BarChart3, TrendingUp, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/admin-layout';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { ProductAnalyticsChart } from '@/components/product-analytics-chart';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  images: string[];
  specs: string[];
  inStock: boolean;
  stockQuantity: number;
  warranty: string;
  delivery: string;
  rating: number;
  reviews: number;
  isActive: boolean;
  isMaintenance: boolean;
  isVisible?: boolean;
  isFeatured?: boolean;
  priority?: number;
  sku?: string;
  createdAt?: string;
}

interface FormData {
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  description: string;
  images: string[];
  specs: string[];
  inStock: boolean;
  stockQuantity: number;
  warranty: string;
  delivery: string;
  rating: number;
  reviews: number;
  isMaintenance: boolean;
  isVisible?: boolean;
  isFeatured?: boolean;
  priority?: number;
  sku?: string;
}

const categories = ['Drones', 'Robotics', 'Security', 'Agriculture', 'Infrastructure', 'Emergency', 'Environment', 'Defence'];
const warranties = ['1 Year', '2 Years', '3 Years'];
const deliveries = ['3-5 Business Days', '5-7 Business Days', '7-10 Business Days', '10-14 Business Days', '14-21 Business Days', '21-30 Business Days'];

// Quick Edit Modal Component
function QuickEditModal({ product, isOpen, onClose, onSave }: { product: Product | null; isOpen: boolean; onClose: () => void; onSave: (data: any) => void }) {
  const [editData, setEditData] = useState({ price: 0, stockQuantity: 0, discount: 0 });

  useEffect(() => {
    if (product) {
      setEditData({
        price: product.price,
        stockQuantity: product.stockQuantity,
        discount: product.discount || 0,
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Quick Edit: {product.name}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input
              type="number"
              value={editData.price}
              onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              value={editData.stockQuantity}
              onChange={(e) => setEditData({ ...editData, stockQuantity: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
            <input
              type="number"
              value={editData.discount}
              onChange={(e) => setEditData({ ...editData, discount: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                onSave(editData);
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Details Modal Component
function ProductDetailsModal({ product, isOpen, onClose }: { product: Product | null; isOpen: boolean; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 border-b border-gray-200 p-4 flex items-center justify-between bg-white">
          <h3 className="text-lg font-bold text-gray-900">Product Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden h-64">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                      idx === currentImageIndex ? 'border-blue-600' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Product Name</p>
              <p className="font-semibold text-gray-900">{product.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">SKU</p>
              <p className="font-semibold text-gray-900">{product.sku || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Category</p>
              <p className="font-semibold text-gray-900">{product.category}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Rating</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <p className="font-semibold text-gray-900">{product.rating} ({product.reviews} reviews)</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Current Price:</span>
              <span className="font-bold text-blue-600">₹{(product.price / 1000).toFixed(0)}K</span>
            </div>
            {product.originalPrice && (
              <div className="flex justify-between">
                <span className="text-gray-700">Original Price:</span>
                <span className="font-bold text-gray-500 line-through">₹{(product.originalPrice / 1000).toFixed(0)}K</span>
              </div>
            )}
            {product.discount && (
              <div className="flex justify-between">
                <span className="text-gray-700">Discount:</span>
                <span className="font-bold text-red-600">{product.discount}%</span>
              </div>
            )}
          </div>

          {/* Stock & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Stock Quantity</p>
              <p className={`font-semibold text-lg ${product.stockQuantity < 5 ? 'text-red-600' : 'text-green-600'}`}>
                {product.stockQuantity} units
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Status</p>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${product.inStock && product.stockQuantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.inStock && product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.isMaintenance && <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">Maintenance</span>}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs text-gray-600 mb-2">Description</p>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Specifications */}
          <div>
            <p className="text-xs text-gray-600 mb-2">Specifications</p>
            <ul className="space-y-1">
              {product.specs.map((spec, idx) => (
                <li key={idx} className="text-sm text-gray-700">✓ {spec}</li>
              ))}
            </ul>
          </div>

          {/* Warranty & Delivery */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Warranty</p>
              <p className="font-semibold text-gray-900">{product.warranty}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Delivery</p>
              <p className="font-semibold text-gray-900">{product.delivery}</p>
            </div>
          </div>

          {/* Visibility & Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Visibility</p>
              <p className={`font-semibold ${product.isVisible !== false ? 'text-green-600' : 'text-gray-600'}`}>
                {product.isVisible !== false ? 'Visible' : 'Hidden'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Featured</p>
              <p className={`font-semibold ${product.isFeatured ? 'text-blue-600' : 'text-gray-600'}`}>
                {product.isFeatured ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Rating Editor Modal Component
function RatingEditorModal({ product, isOpen, onClose, onSave }: { product: Product | null; isOpen: boolean; onClose: () => void; onSave: (rating: number, reviews: number) => void }) {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    if (product) {
      setRating(product.rating);
      setReviews(product.reviews);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Edit Rating: {product.name}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
            <div className="flex gap-2 items-center">
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-bold text-yellow-500">{rating.toFixed(1)} ⭐</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Reviews</label>
            <input
              type="number"
              value={reviews}
              onChange={(e) => setReviews(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                onSave(rating, reviews);
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Comparison Modal Component
function ProductComparisonModal({ products, isOpen, onClose }: { products: Product[]; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || products.length === 0) return null;

  const specs = ['Price', 'Original Price', 'Discount', 'Stock', 'Rating', 'Reviews', 'Warranty', 'Delivery', 'In Stock', 'Featured', 'Visible'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 border-b border-gray-200 p-4 flex items-center justify-between bg-white">
          <h3 className="text-lg font-bold text-gray-900">Compare Products ({products.length})</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-x-auto p-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-3 text-left font-semibold bg-gray-50">Specification</th>
                {products.map(p => (
                  <th key={p._id} className="border border-gray-300 p-3 text-left font-semibold bg-gray-50 min-w-[200px]">
                    <p className="font-bold text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-600">{p.category}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map(spec => (
                <tr key={spec}>
                  <td className="border border-gray-300 p-3 font-semibold text-gray-700 bg-gray-50">{spec}</td>
                  {products.map(p => (
                    <td key={p._id} className="border border-gray-300 p-3 text-gray-700">
                      {spec === 'Price' && `₹${(p.price / 1000).toFixed(0)}K`}
                      {spec === 'Original Price' && (p.originalPrice ? `₹${(p.originalPrice / 1000).toFixed(0)}K` : 'N/A')}
                      {spec === 'Discount' && `${p.discount || 0}%`}
                      {spec === 'Stock' && `${p.stockQuantity} units`}
                      {spec === 'Rating' && `${p.rating} ⭐`}
                      {spec === 'Reviews' && p.reviews}
                      {spec === 'Warranty' && p.warranty}
                      {spec === 'Delivery' && p.delivery}
                      {spec === 'In Stock' && (p.inStock ? '✓ Yes' : '✗ No')}
                      {spec === 'Featured' && (p.isFeatured ? '✓ Yes' : '✗ No')}
                      {spec === 'Visible' && (p.isVisible !== false ? '✓ Yes' : '✗ No')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 p-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [headline, setHeadline] = useState('');
  const [headlineActive, setHeadlineActive] = useState(false);
  const [showHeadlineForm, setShowHeadlineForm] = useState(false);
  const [savingHeadline, setSavingHeadline] = useState(false);
  
  // New state for enhanced features
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'rating' | 'date'>('name');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([0, 1000000]);
  const [filterStockStatus, setFilterStockStatus] = useState<'all' | 'in-stock' | 'low-stock' | 'out-of-stock'>('all');
  const [filterMaintenance, setFilterMaintenance] = useState<'all' | 'active' | 'maintenance'>('all');
  const [showQuickEdit, setShowQuickEdit] = useState(false);
  const [quickEditProduct, setQuickEditProduct] = useState<Product | null>(null);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkPriceUpdate, setBulkPriceUpdate] = useState<number | ''>('');
  const [bulkStockUpdate, setBulkStockUpdate] = useState<number | ''>('');
  const [bulkDiscountUpdate, setBulkDiscountUpdate] = useState<number | ''>('');
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [priceHistoryProduct, setPriceHistoryProduct] = useState<Product | null>(null);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [compareProducts, setCompareProducts] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showBatchImageUpload, setShowBatchImageUpload] = useState(false);
  const [batchImageUrl, setBatchImageUrl] = useState('');
  const [priceRangeMin, setPriceRangeMin] = useState(0);
  const [priceRangeMax, setPriceRangeMax] = useState(1000000);
  const [showRatingEditor, setShowRatingEditor] = useState(false);
  const [ratingProduct, setRatingProduct] = useState<Product | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: 'Drones',
    price: 0,
    originalPrice: 0,
    discount: 0,
    description: '',
    images: [''],
    specs: [''],
    inStock: true,
    stockQuantity: 0,
    warranty: '2 Years',
    delivery: '3-5 Business Days',
    rating: 0,
    reviews: 0,
    isMaintenance: false,
    isVisible: true,
    isFeatured: false,
    priority: 0,
    sku: '',
  });

  useEffect(() => {
    fetchProducts();
    fetchHeadline();
  }, []);

  // Auto-refresh products every 60 seconds
  useEffect(() => {
    if (!autoRefresh) {
      if (refreshInterval) clearInterval(refreshInterval);
      return;
    }

    const interval = setInterval(() => {
      fetchProducts();
    }, 60000); // 60 seconds

    setRefreshInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const fetchHeadline = async () => {
    try {
      const response = await fetch('/api/headlines');
      const data = await response.json();
      if (data.success && data.data) {
        setHeadline(data.data.text || '');
        setHeadlineActive(data.data.isActive || false);
      }
    } catch (error) {
      toast.error('Error fetching headline');
    }
  };

  const saveHeadline = async () => {
    setSavingHeadline(true);
    try {
      const response = await fetch('/api/headlines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: headline,
          isActive: headlineActive,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save headline');
      }

      setShowHeadlineForm(false);
      toast.success('Headline saved successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save headline');
    } finally {
      setSavingHeadline(false);
    }
  };

  const toggleHeadline = async () => {
    const newState = !headlineActive;
    setHeadlineActive(newState);
    
    try {
      const response = await fetch('/api/headlines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: headline,
          isActive: newState,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update headline');
      }
      toast.success(newState ? 'Headline enabled' : 'Headline disabled');
    } catch (error: any) {
      setHeadlineActive(!newState);
      toast.error(error.message || 'Failed to update headline');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      toast.error('Error fetching products');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Drones',
      price: 0,
      originalPrice: 0,
      discount: 0,
      description: '',
      images: [''],
      specs: [''],
      inStock: true,
      stockQuantity: 0,
      warranty: '2 Years',
      delivery: '3-5 Business Days',
      rating: 0,
      reviews: 0,
      isMaintenance: false,
      isVisible: true,
      isFeatured: false,
      priority: 0,
      sku: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    setEditingId(null);
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || '',
      category: product.category || 'Drones',
      price: Number(product.price) || 0,
      originalPrice: Number(product.originalPrice) || 0,
      discount: Number(product.discount) || 0,
      description: product.description || '',
      images: Array.isArray(product.images) && product.images.length > 0 ? product.images : [''],
      specs: Array.isArray(product.specs) && product.specs.length > 0 ? product.specs : [''],
      inStock: Boolean(product.inStock),
      stockQuantity: Number(product.stockQuantity) || 0,
      warranty: product.warranty || '2 Years',
      delivery: product.delivery || '3-5 Business Days',
      rating: Number(product.rating) || 0,
      reviews: Number(product.reviews) || 0,
      isMaintenance: Boolean(product.isMaintenance),
      isVisible: product.isVisible !== false,
      isFeatured: product.isFeatured || false,
      priority: product.priority || 0,
      sku: product.sku || '',
    });
    setShowForm(true);
  };

  // Bulk Actions
  const toggleSelectProduct = (id: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProducts(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p._id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) {
      toast.error('No products selected');
      return;
    }

    if (!confirm(`Delete ${selectedProducts.size} products? This cannot be undone.`)) return;

    try {
      for (const id of selectedProducts) {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
      }
      toast.success(`${selectedProducts.size} products deleted`);
      setSelectedProducts(new Set());
      fetchProducts();
    } catch (error) {
      toast.error('Error deleting products');
    }
  };

  const handleBulkPriceUpdate = async () => {
    if (selectedProducts.size === 0) {
      toast.error('No products selected');
      return;
    }

    if (bulkPriceUpdate === '') {
      toast.error('Enter a price');
      return;
    }

    try {
      for (const id of selectedProducts) {
        const product = products.find(p => p._id === id);
        if (product) {
          await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ price: bulkPriceUpdate }),
          });
        }
      }
      toast.success(`Updated price for ${selectedProducts.size} products`);
      setBulkPriceUpdate('');
      setSelectedProducts(new Set());
      fetchProducts();
    } catch (error) {
      toast.error('Error updating prices');
    }
  };

  const handleBulkStockUpdate = async () => {
    if (selectedProducts.size === 0) {
      toast.error('No products selected');
      return;
    }

    if (bulkStockUpdate === '') {
      toast.error('Enter stock quantity');
      return;
    }

    try {
      for (const id of selectedProducts) {
        await fetch(`/api/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stockQuantity: bulkStockUpdate }),
        });
      }
      toast.success(`Updated stock for ${selectedProducts.size} products`);
      setBulkStockUpdate('');
      setSelectedProducts(new Set());
      fetchProducts();
    } catch (error) {
      toast.error('Error updating stock');
    }
  };

  const handleBulkDiscountUpdate = async () => {
    if (selectedProducts.size === 0) {
      toast.error('No products selected');
      return;
    }

    if (bulkDiscountUpdate === '') {
      toast.error('Enter discount percentage');
      return;
    }

    try {
      for (const id of selectedProducts) {
        await fetch(`/api/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ discount: bulkDiscountUpdate }),
        });
      }
      toast.success(`Updated discount for ${selectedProducts.size} products`);
      setBulkDiscountUpdate('');
      setSelectedProducts(new Set());
      fetchProducts();
    } catch (error) {
      toast.error('Error updating discounts');
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredProducts.length === 0) {
      toast.error('No products to export');
      return;
    }

    const headers = ['ID', 'Name', 'SKU', 'Category', 'Price', 'Original Price', 'Discount', 'Stock', 'In Stock', 'Rating', 'Reviews', 'Warranty', 'Delivery', 'Maintenance', 'Visible', 'Featured'];
    const rows = filteredProducts.map(p => [
      p._id,
      p.name,
      p.sku || '',
      p.category,
      p.price,
      p.originalPrice || '',
      p.discount || '',
      p.stockQuantity,
      p.inStock ? 'Yes' : 'No',
      p.rating,
      p.reviews,
      p.warranty,
      p.delivery,
      p.isMaintenance ? 'Yes' : 'No',
      p.isVisible !== false ? 'Yes' : 'No',
      p.isFeatured ? 'Yes' : 'No',
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Products exported to CSV');
  };

  // Import from CSV
  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error('Please select a CSV file');
      return;
    }

    setIsImporting(true);
    const toastId = toast.loading('Importing CSV file...');

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const csv = event.target?.result as string;
        
        if (!csv || csv.trim().length === 0) {
          toast.error('CSV file is empty', { id: toastId });
          setIsImporting(false);
          return;
        }

        const lines = csv.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          toast.error('CSV file must contain headers and at least one product', { id: toastId });
          setIsImporting(false);
          return;
        }

        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        
        let importedCount = 0;
        let errorCount = 0;
        const errors: string[] = [];

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          try {
            const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
            const productData: any = {};
            
            headers.forEach((header, idx) => {
              const value = values[idx];
              if (header === 'Price' || header === 'Original Price' || header === 'Discount') {
                productData[header.toLowerCase().replace(' ', '')] = parseFloat(value) || 0;
              } else if (header === 'Stock' || header === 'Reviews') {
                productData[header.toLowerCase()] = parseInt(value) || 0;
              } else if (header === 'Rating') {
                // Ensure rating is between 0 and 5
                let rating = parseFloat(value) || 0;
                rating = Math.min(5, Math.max(0, rating));
                productData[header.toLowerCase()] = rating;
              } else if (['In Stock', 'Maintenance', 'Visible', 'Featured'].includes(header)) {
                productData[header.toLowerCase().replace(' ', '')] = value === 'Yes';
              } else {
                productData[header.toLowerCase().replace(' ', '')] = value;
              }
            });

            // Validate required fields
            if (!productData.name || !productData.category || !productData.price) {
              errorCount++;
              errors.push(`Row ${i + 1}: Missing required fields (name, category, price)`);
              continue;
            }

            // Ensure description exists
            if (!productData.description) {
              productData.description = `${productData.name} - ${productData.category}`;
            }

            // Ensure specs array exists
            if (!productData.specs || productData.specs.length === 0) {
              productData.specs = ['Standard specifications'];
            }

            // Ensure images array exists
            if (!productData.images || productData.images.length === 0) {
              productData.images = ['https://via.placeholder.com/400x400?text=Product'];
            }

            // Create product
            const response = await fetch('/api/products', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(productData),
            });

            if (response.ok) {
              importedCount++;
            } else {
              errorCount++;
              errors.push(`Row ${i + 1}: Failed to import product`);
            }
          } catch (rowError) {
            errorCount++;
            errors.push(`Row ${i + 1}: Invalid data format`);
          }
        }

        // Show results
        if (importedCount > 0 && errorCount === 0) {
          toast.success(`✓ Successfully imported ${importedCount} product${importedCount !== 1 ? 's' : ''}`, { id: toastId });
        } else if (importedCount > 0 && errorCount > 0) {
          toast.warning(`⚠ Imported ${importedCount} product${importedCount !== 1 ? 's' : ''}, ${errorCount} error${errorCount !== 1 ? 's' : ''}`, { id: toastId });
        } else {
          toast.error(`✗ Failed to import. ${errorCount} error${errorCount !== 1 ? 's' : ''} found`, { id: toastId });
        }

        if (errors.length > 0 && errors.length <= 5) {
          errors.forEach(err => console.warn(err));
        }

        if (importedCount > 0) {
          fetchProducts();
        }
      } catch (error: any) {
        console.error('Import error:', error);
        toast.error(`Error importing CSV: ${error.message || 'Unknown error'}`, { id: toastId });
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };

    reader.onerror = () => {
      toast.error('Failed to read CSV file', { id: toastId });
      setIsImporting(false);
    };

    reader.readAsText(file);
  };

  // Quick Edit Save
  const handleQuickEditSave = async (data: any) => {
    if (!quickEditProduct) return;

    try {
      const response = await fetch(`/api/products/${quickEditProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Product updated');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Error updating product');
    }
  };

  // Duplicate Product
  const handleDuplicateProduct = async (product: Product) => {
    try {
      const newProduct = { ...product };
      delete (newProduct as any)._id;
      newProduct.name = `${product.name} (Copy)`;
      newProduct.sku = `${product.sku || ''}-copy-${Date.now()}`;

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        toast.success('Product duplicated');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Error duplicating product');
    }
  };

  // Toggle Visibility
  const handleToggleVisibility = async (product: Product) => {
    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !product.isVisible }),
      });

      if (response.ok) {
        toast.success(product.isVisible ? 'Product hidden' : 'Product visible');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Error updating visibility');
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (product: Product) => {
    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !product.isFeatured }),
      });

      if (response.ok) {
        toast.success(product.isFeatured ? 'Removed from featured' : 'Added to featured');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Error updating featured status');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    setUploading(true);

    try {
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save product');
      }

      toast.success(editingId ? 'Product updated' : 'Product created');
      resetForm();
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Product deleted');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  const toggleStock = async (product: Product) => {
    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: !product.inStock }),
      });

      if (response.ok) {
        toast.success(product.inStock ? 'Marked as out of stock' : 'Marked as in stock');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Error toggling stock');
    }
  };

  const toggleMaintenance = async (product: Product) => {
    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isMaintenance: !product.isMaintenance }),
      });

      if (response.ok) {
        toast.success(product.isMaintenance ? 'Maintenance disabled' : 'Maintenance enabled');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Error toggling maintenance');
    }
  };

  const toggleActive = async (product: Product) => {
    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !product.isActive }),
      });

      if (response.ok) {
        toast.success(product.isActive ? 'Product deactivated' : 'Product activated');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Error toggling product status');
    }
  };

  // Add to search history
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term && !searchHistory.includes(term)) {
      setSearchHistory([term, ...searchHistory.slice(0, 4)]);
    }
  };

  // Batch add image to selected products
  const handleBatchAddImage = async () => {
    if (!batchImageUrl || selectedProducts.size === 0) {
      toast.error('Enter image URL and select products');
      return;
    }

    try {
      for (const id of selectedProducts) {
        const product = products.find(p => p._id === id);
        if (product) {
          const newImages = [...(product.images || []), batchImageUrl];
          await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ images: newImages }),
          });
        }
      }
      toast.success(`Added image to ${selectedProducts.size} products`);
      setBatchImageUrl('');
      setShowBatchImageUpload(false);
      fetchProducts();
    } catch (error) {
      toast.error('Error adding images');
    }
  };

  // Calculate product statistics
  const getProductStats = () => {
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0);
    const avgPrice = products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0;
    const avgRating = products.length > 0 ? products.reduce((sum, p) => sum + p.rating, 0) / products.length : 0;
    const totalReviews = products.reduce((sum, p) => sum + p.reviews, 0);
    const outOfStock = products.filter(p => !p.inStock).length;
    const lowStock = products.filter(p => p.inStock && p.stockQuantity < lowStockThreshold).length;
    const inactive = products.filter(p => !p.isActive).length;
    const featured = products.filter(p => p.isFeatured).length;

    return { totalValue, avgPrice, avgRating, totalReviews, outOfStock, lowStock, inactive, featured };
  };

  // Export detailed analytics
  const handleExportAnalytics = () => {
    const stats = getProductStats();
    const analytics = {
      exportDate: new Date().toISOString(),
      totalProducts: products.length,
      ...stats,
      byCategory: categories.map(cat => ({
        category: cat,
        count: products.filter(p => p.category === cat).length,
        avgPrice: products.filter(p => p.category === cat).length > 0
          ? products.filter(p => p.category === cat).reduce((sum, p) => sum + p.price, 0) / products.filter(p => p.category === cat).length
          : 0,
      })),
    };

    const json = JSON.stringify(analytics, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `product-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Analytics exported');
  };

  // Handle rating save
  const handleRatingSave = async (rating: number, reviews: number) => {
    if (!ratingProduct) return;

    try {
      const response = await fetch(`/api/products/${ratingProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, reviews }),
      });

      if (response.ok) {
        toast.success('Rating updated');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Error updating rating');
    }
  };

  // Filtering and Sorting
  const filteredProducts = products
    .filter(prod => {
      // Search filter
      if (searchTerm && !prod.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !prod.sku?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      // Category filter
      if (filterCategory && prod.category !== filterCategory) return false;
      // Price range filter
      if (prod.price < filterPriceRange[0] || prod.price > filterPriceRange[1]) return false;
      // Stock status filter
      if (filterStockStatus === 'in-stock' && !prod.inStock) return false;
      if (filterStockStatus === 'low-stock' && (prod.stockQuantity >= lowStockThreshold || !prod.inStock)) return false;
      if (filterStockStatus === 'out-of-stock' && prod.inStock) return false;
      // Maintenance filter
      if (filterMaintenance === 'active' && prod.isMaintenance) return false;
      if (filterMaintenance === 'maintenance' && !prod.isMaintenance) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'stock') return b.stockQuantity - a.stockQuantity;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'date') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      return a.name.localeCompare(b.name);
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / pagination.perPage);
  const paginatedProducts = filteredProducts.slice(
    (pagination.page - 1) * pagination.perPage,
    pagination.page * pagination.perPage
  );

  return (
    <AdminLayout currentPage="Products">
      <div className="p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <p className="text-xs text-blue-600 font-semibold mb-1">Total Products</p>
            <p className="text-2xl font-bold text-blue-900">{products.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <p className="text-xs text-green-600 font-semibold mb-1">In Stock</p>
            <p className="text-2xl font-bold text-green-900">{products.filter(p => p.inStock).length}</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
            <p className="text-xs text-red-600 font-semibold mb-1">Out of Stock</p>
            <p className="text-2xl font-bold text-red-900">{products.filter(p => !p.inStock).length}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <p className="text-xs text-orange-600 font-semibold mb-1">Low Stock</p>
            <p className="text-2xl font-bold text-orange-900">{products.filter(p => p.inStock && p.stockQuantity < lowStockThreshold).length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <p className="text-xs text-purple-600 font-semibold mb-1">Featured</p>
            <p className="text-2xl font-bold text-purple-900">{products.filter(p => p.isFeatured).length}</p>
          </div>
        </div>

        {/* Quick Summary Card */}
        <div className="mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-indigo-100 text-sm font-medium mb-1">Total Inventory Value</p>
              <p className="text-3xl font-bold">₹{(products.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0) / 100000).toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-indigo-100 text-sm font-medium mb-1">Average Product Rating</p>
              <p className="text-3xl font-bold">{products.length > 0 ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1) : 0} ⭐</p>
            </div>
            <div>
              <p className="text-indigo-100 text-sm font-medium mb-1">Total Customer Reviews</p>
              <p className="text-3xl font-bold">{products.reduce((sum, p) => sum + p.reviews, 0)}</p>
            </div>
          </div>
        </div>

        {/* Headline Banner */}
        <div className="mb-6 bg-white rounded-lg p-4 overflow-hidden border-b-2 border-red-600">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 overflow-hidden">
              {headlineActive ? (
                <div className="animate-marquee whitespace-nowrap text-red-700 font-bold text-xl">
                  {headline || '📢 No announcement yet. Add one from the admin panel!'}
                </div>
              ) : (
                <div className="text-red-700 font-bold text-xl opacity-50">
                  Headline is OFF
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={toggleHeadline}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  headlineActive
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
                {headlineActive ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowHeadlineForm(!showHeadlineForm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Headline Form */}
          {showHeadlineForm && (
            <div className="mt-4 space-y-3">
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Enter announcement text..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveHeadline}
                  disabled={savingHeadline}
                  className="flex-1 px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
                >
                  {savingHeadline ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setShowHeadlineForm(false)}
                  className="flex-1 px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                fetchProducts();
                toast.success('Products refreshed');
              }}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                autoRefresh
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              {autoRefresh ? '✓ Auto' : '✕ Manual'}
            </button>
            <Button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </Button>
            <Button
              onClick={openAddForm}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Analytics Section */}
        {showAnalytics && (
          <div className="mb-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                Product Analytics & Insights
              </h3>
              <button
                onClick={() => setShowAnalytics(false)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <ProductAnalyticsChart products={products} />
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingId ? 'Edit Product' : 'Add Product'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* LEFT COLUMN */}
                  <div className="space-y-3">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Product name"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Price *</label>
                      <input
                        type="number"
                        value={isNaN(formData.price) ? '' : formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
                        placeholder="0"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>

                    {/* Original Price */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Original Price</label>
                      <input
                        type="number"
                        value={isNaN(formData.originalPrice) ? '' : formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
                        placeholder="0"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    {/* Discount */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Discount %</label>
                      <input
                        type="number"
                        value={isNaN(formData.discount) ? '' : formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
                        placeholder="0"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Product description"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                        rows={2}
                        required
                      />
                    </div>

                    {/* Stock Quantity */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        value={isNaN(formData.stockQuantity) ? '' : formData.stockQuantity}
                        onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value === '' ? 0 : parseInt(e.target.value) })}
                        placeholder="0"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    {/* In Stock Toggle */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="w-4 h-4 rounded"
                      />
                      <label className="text-xs font-medium text-gray-700">In Stock</label>
                    </div>

                    {/* Maintenance Toggle */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isMaintenance}
                        onChange={(e) => setFormData({ ...formData, isMaintenance: e.target.checked })}
                        className="w-4 h-4 rounded"
                      />
                      <label className="text-xs font-medium text-gray-700">Under Maintenance</label>
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="space-y-3">
                    {/* Warranty */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Warranty</label>
                      <select
                        value={formData.warranty}
                        onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {warranties.map(w => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    </div>

                    {/* Delivery */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Delivery</label>
                      <select
                        value={formData.delivery}
                        onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {deliveries.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Rating</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={isNaN(formData.rating) ? '' : formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
                        placeholder="0"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    {/* Reviews */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Reviews Count</label>
                      <input
                        type="number"
                        value={isNaN(formData.reviews) ? '' : formData.reviews}
                        onChange={(e) => setFormData({ ...formData, reviews: e.target.value === '' ? 0 : parseInt(e.target.value) })}
                        placeholder="0"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    {/* Images */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-gray-700">Images (URLs)</label>
                        <button
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            images: [...formData.images, ''],
                          })}
                          className="p-0.5 hover:bg-blue-100 rounded text-blue-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-1 max-h-20 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="flex gap-1">
                            <input
                              type="url"
                              value={img}
                              onChange={(e) => {
                                const newImages = [...formData.images];
                                newImages[idx] = e.target.value;
                                setFormData({ ...formData, images: newImages });
                              }}
                              placeholder="Image URL"
                              className="flex-1 px-1.5 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({
                                ...formData,
                                images: formData.images.filter((_, i) => i !== idx),
                              })}
                              className="p-0.5 hover:bg-red-100 rounded text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specs */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-gray-700">Specifications</label>
                        <button
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            specs: [...formData.specs, ''],
                          })}
                          className="p-0.5 hover:bg-blue-100 rounded text-blue-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-1 max-h-20 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                        {formData.specs.map((spec, idx) => (
                          <div key={idx} className="flex gap-1">
                            <input
                              type="text"
                              value={spec}
                              onChange={(e) => {
                                const newSpecs = [...formData.specs];
                                newSpecs[idx] = e.target.value;
                                setFormData({ ...formData, specs: newSpecs });
                              }}
                              placeholder="Specification"
                              className="flex-1 px-1.5 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({
                                ...formData,
                                specs: formData.specs.filter((_, i) => i !== idx),
                              })}
                              className="p-0.5 hover:bg-red-100 rounded text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loader */}
                {uploading && (
                  <div className="flex items-center justify-center py-4">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
                  <Button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : editingId ? 'Update' : 'Upload'}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    disabled={uploading}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white disabled:opacity-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
            {searchHistory.length > 0 && searchTerm === '' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <p className="px-3 py-2 text-xs font-semibold text-gray-600">Recent Searches</p>
                {searchHistory.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(term)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    🔍 {term}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Filter Presets */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => {
                setFilterStockStatus('out-of-stock');
                setFilterMaintenance('all');
                setFilterCategory('');
              }}
              className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              Out of Stock
            </button>
            <button
              onClick={() => {
                setFilterStockStatus('low-stock');
                setFilterMaintenance('all');
                setFilterCategory('');
              }}
              className="px-3 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              Low Stock
            </button>
            <button
              onClick={() => {
                setFilterMaintenance('maintenance');
                setFilterStockStatus('all');
                setFilterCategory('');
              }}
              className="px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Zap className="w-4 h-4" />
              Maintenance
            </button>
            <button
              onClick={() => {
                setFilterStockStatus('all');
                setFilterMaintenance('all');
                setFilterCategory('');
                setSearchTerm('');
              }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          </div>

          {/* Filters & Actions Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Category Filter */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Stock Status Filter */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Stock Status</label>
              <select
                value={filterStockStatus}
                onChange={(e) => setFilterStockStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock (&lt;5)</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            {/* Maintenance Filter */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Status</label>
              <select
                value={filterMaintenance}
                onChange={(e) => setFilterMaintenance(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price">Price (Low to High)</option>
                <option value="stock">Stock (High to Low)</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="date">Date (Newest)</option>
              </select>
            </div>

            {/* Low Stock Threshold */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Low Stock Alert</label>
              <input
                type="number"
                min="1"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 5)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="flex gap-2 items-end">
              <button
                onClick={handleExportCSV}
                className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                CSV
              </button>
              <button
                onClick={() => !isImporting && fileInputRef.current?.click()}
                disabled={isImporting}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isImporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Import
                  </>
                )}
              </button>
              <button
                onClick={handleExportAnalytics}
                className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Analytics
              </button>
              <button
                onClick={() => setShowAdvancedStats(!showAdvancedStats)}
                className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Stats
              </button>
              <button
                onClick={() => setShowBatchImageUpload(!showBatchImageUpload)}
                className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Batch Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleImportCSV}
                className="hidden"
              />
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedProducts.size > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-blue-900">{selectedProducts.size} product(s) selected</p>
                <button
                  onClick={() => setSelectedProducts(new Set())}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Clear Selection
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                {/* Bulk Price Update */}
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="New price"
                    value={bulkPriceUpdate}
                    onChange={(e) => setBulkPriceUpdate(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    onClick={handleBulkPriceUpdate}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
                  >
                    Update Price
                  </button>
                </div>

                {/* Bulk Stock Update */}
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="New stock"
                    value={bulkStockUpdate}
                    onChange={(e) => setBulkStockUpdate(e.target.value === '' ? '' : parseInt(e.target.value))}
                    className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    onClick={handleBulkStockUpdate}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
                  >
                    Update Stock
                  </button>
                </div>

                {/* Bulk Discount Update */}
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Discount %"
                    value={bulkDiscountUpdate}
                    onChange={(e) => setBulkDiscountUpdate(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    onClick={handleBulkDiscountUpdate}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
                  >
                    Update Discount
                  </button>
                </div>

                {/* Bulk Delete */}
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold col-span-1 md:col-span-2 lg:col-span-1"
                >
                  Delete Selected
                </button>

                {/* Toggle Select All */}
                <button
                  onClick={toggleSelectAll}
                  className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs font-semibold"
                >
                  {selectedProducts.size === filteredProducts.length ? 'Deselect All' : 'Select All'}
                </button>

                {/* Bulk Activate/Deactivate */}
                <button
                  onClick={async () => {
                    try {
                      for (const id of selectedProducts) {
                        const product = products.find(p => p._id === id);
                        if (product) {
                          await fetch(`/api/products/${id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ isActive: !product.isActive }),
                          });
                        }
                      }
                      toast.success(`Updated status for ${selectedProducts.size} products`);
                      setSelectedProducts(new Set());
                      fetchProducts();
                    } catch (error) {
                      toast.error('Error updating status');
                    }
                  }}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold"
                >
                  Toggle Status
                </button>
              </div>
            </div>
          )}

          {/* Advanced Statistics */}
          {showAdvancedStats && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Advanced Statistics
                </h3>
                <button
                  onClick={() => setShowAdvancedStats(false)}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Hide
                </button>
              </div>
              {(() => {
                const stats = getProductStats();
                return (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                    <div className="bg-white rounded p-2 border border-indigo-200">
                      <p className="text-xs text-gray-600">Total Value</p>
                      <p className="text-sm font-bold text-indigo-600">₹{(stats.totalValue / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="bg-white rounded p-2 border border-indigo-200">
                      <p className="text-xs text-gray-600">Avg Price</p>
                      <p className="text-sm font-bold text-indigo-600">₹{(stats.avgPrice / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-white rounded p-2 border border-indigo-200">
                      <p className="text-xs text-gray-600">Avg Rating</p>
                      <p className="text-sm font-bold text-indigo-600">{stats.avgRating.toFixed(1)} ⭐</p>
                    </div>
                    <div className="bg-white rounded p-2 border border-indigo-200">
                      <p className="text-xs text-gray-600">Total Reviews</p>
                      <p className="text-sm font-bold text-indigo-600">{stats.totalReviews}</p>
                    </div>
                    <div className="bg-white rounded p-2 border border-red-200">
                      <p className="text-xs text-gray-600">Out of Stock</p>
                      <p className="text-sm font-bold text-red-600">{stats.outOfStock}</p>
                    </div>
                    <div className="bg-white rounded p-2 border border-orange-200">
                      <p className="text-xs text-gray-600">Low Stock</p>
                      <p className="text-sm font-bold text-orange-600">{stats.lowStock}</p>
                    </div>
                    <div className="bg-white rounded p-2 border border-gray-200">
                      <p className="text-xs text-gray-600">Inactive</p>
                      <p className="text-sm font-bold text-gray-600">{stats.inactive}</p>
                    </div>
                    <div className="bg-white rounded p-2 border border-blue-200">
                      <p className="text-xs text-gray-600">Featured</p>
                      <p className="text-sm font-bold text-blue-600">{stats.featured}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Batch Image Upload */}
          {showBatchImageUpload && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-orange-900 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Add Image to Selected Products
                </h3>
                <button
                  onClick={() => setShowBatchImageUpload(false)}
                  className="text-xs text-orange-600 hover:text-orange-700 font-semibold"
                >
                  Close
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Enter image URL..."
                  value={batchImageUrl}
                  onChange={(e) => setBatchImageUrl(e.target.value)}
                  className="flex-1 px-3 py-2 border border-orange-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
                <button
                  onClick={handleBatchAddImage}
                  disabled={selectedProducts.size === 0}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold text-sm disabled:opacity-50"
                >
                  Add to {selectedProducts.size} Product{selectedProducts.size !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded"
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Product</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Stock</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr key={product._id} className={`border-b border-gray-200 hover:bg-gray-50 ${selectedProducts.has(product._id) ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.has(product._id)}
                        onChange={() => toggleSelectProduct(product._id)}
                        className="w-4 h-4 rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.sku && `SKU: ${product.sku}`}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{product.category}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-blue-600">₹{(product.price / 1000).toFixed(0)}K</p>
                      {product.discount && (
                        <p className="text-xs text-red-600 font-semibold">{product.discount}% off</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className={`font-semibold text-sm ${product.inStock && product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.inStock && product.stockQuantity > 0 ? `${product.stockQuantity} units` : 'Out of Stock'}
                      </p>
                      {product.inStock && product.stockQuantity > 0 && product.stockQuantity < lowStockThreshold && (
                        <p className="text-xs text-orange-600 font-semibold">⚠️ Low Stock</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => toggleStock(product)}
                          className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                            product.inStock && product.stockQuantity > 0
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {product.inStock && product.stockQuantity > 0 ? 'In Stock' : 'Out'}
                        </button>
                        <button
                          onClick={() => toggleMaintenance(product)}
                          className={`px-2 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1 ${
                            product.isMaintenance
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <Zap className="w-3 h-3" />
                          {product.isMaintenance ? 'Maint' : 'Active'}
                        </button>
                        {product.isFeatured && (
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-blue-700" />
                            Featured
                          </span>
                        )}
                        {product.isVisible === false && (
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1">
                            <EyeOff className="w-3 h-3" />
                            Hidden
                          </span>
                        )}
                        {!product.isActive && (
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
                            Inactive
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {/* View Details */}
                        <button
                          onClick={() => {
                            setDetailsProduct(product);
                            setShowProductDetails(true);
                          }}
                          className="p-2 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Quick Edit */}
                        <button
                          onClick={() => {
                            setQuickEditProduct(product);
                            setShowQuickEdit(true);
                          }}
                          className="p-2 hover:bg-yellow-100 rounded text-yellow-600 transition-colors"
                          title="Quick Edit"
                        >
                          <Zap className="w-4 h-4" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => openEditForm(product)}
                          className="p-2 hover:bg-green-100 rounded text-green-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Toggle Visibility */}
                        <button
                          onClick={() => handleToggleVisibility(product)}
                          className={`p-2 rounded transition-colors ${
                            product.isVisible !== false
                              ? 'hover:bg-gray-100 text-gray-600'
                              : 'hover:bg-red-100 text-red-600'
                          }`}
                          title={product.isVisible !== false ? 'Hide' : 'Show'}
                        >
                          {product.isVisible !== false ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>

                        {/* Toggle Featured */}
                        <button
                          onClick={() => handleToggleFeatured(product)}
                          className={`p-2 rounded transition-colors ${
                            product.isFeatured
                              ? 'hover:bg-blue-100 text-blue-600'
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                          title={product.isFeatured ? 'Remove from Featured' : 'Add to Featured'}
                        >
                          <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-blue-600' : ''}`} />
                        </button>

                        {/* Toggle Active Status */}
                        <button
                          onClick={() => toggleActive(product)}
                          className={`p-2 rounded transition-colors ${
                            product.isActive
                              ? 'hover:bg-green-100 text-green-600'
                              : 'hover:bg-red-100 text-red-600'
                          }`}
                          title={product.isActive ? 'Deactivate' : 'Activate'}
                        >
                          <AlertCircle className={`w-4 h-4 ${!product.isActive ? 'fill-red-600' : ''}`} />
                        </button>

                        {/* Copy SKU */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(product.sku || product._id);
                            toast.success('Copied to clipboard');
                          }}
                          className="p-2 hover:bg-purple-100 rounded text-purple-600 transition-colors"
                          title="Copy SKU"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        {/* Duplicate */}
                        <button
                          onClick={() => handleDuplicateProduct(product)}
                          className="p-2 hover:bg-indigo-100 rounded text-indigo-600 transition-colors"
                          title="Duplicate"
                        >
                          <GripVertical className="w-4 h-4" />
                        </button>

                        {/* View on Website */}
                        <a
                          href={`/products/${product._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-cyan-100 rounded text-cyan-600 transition-colors"
                          title="View on Website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 hover:bg-red-100 rounded text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        {/* Compare */}
                        <button
                          onClick={() => {
                            const newCompare = new Set(compareProducts);
                            if (newCompare.has(product._id)) {
                              newCompare.delete(product._id);
                            } else {
                              newCompare.add(product._id);
                            }
                            setCompareProducts(newCompare);
                          }}
                          className={`p-2 rounded transition-colors ${
                            compareProducts.has(product._id)
                              ? 'bg-cyan-100 text-cyan-600'
                              : 'hover:bg-cyan-100 text-cyan-600'
                          }`}
                          title="Add to Compare"
                        >
                          <Filter className="w-4 h-4" />
                        </button>

                        {/* Edit Rating */}
                        <button
                          onClick={() => {
                            setRatingProduct(product);
                            setShowRatingEditor(true);
                          }}
                          className="p-2 hover:bg-yellow-100 rounded text-yellow-600 transition-colors"
                          title="Edit Rating"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found</p>
            </div>
          )}
        </div>

        {/* Compare Button */}
        {compareProducts.size > 0 && (
          <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-lg p-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-cyan-900">{compareProducts.size} product(s) selected for comparison</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowComparison(true);
                }}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold"
              >
                Compare Now
              </button>
              <button
                onClick={() => setCompareProducts(new Set())}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {(pagination.page - 1) * pagination.perPage + 1} to {Math.min(pagination.page * pagination.perPage, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            
            <div className="flex items-center gap-2">
              {/* Items Per Page */}
              <select
                value={pagination.perPage}
                onChange={(e) => {
                  setPagination({ page: 1, perPage: parseInt(e.target.value) });
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>

              {/* Page Navigation */}
              <div className="flex gap-1">
                <button
                  onClick={() => setPagination({ ...pagination, page: Math.max(1, pagination.page - 1) })}
                  disabled={pagination.page === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setPagination({ ...pagination, page })}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                      pagination.page === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setPagination({ ...pagination, page: Math.min(totalPages, pagination.page + 1) })}
                  disabled={pagination.page === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Edit Modal */}
      <QuickEditModal
        product={quickEditProduct}
        isOpen={showQuickEdit}
        onClose={() => setShowQuickEdit(false)}
        onSave={handleQuickEditSave}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={detailsProduct}
        isOpen={showProductDetails}
        onClose={() => setShowProductDetails(false)}
      />

      {/* Product Comparison Modal */}
      <ProductComparisonModal
        products={Array.from(compareProducts).map(id => products.find(p => p._id === id)).filter(Boolean) as Product[]}
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />

      {/* Rating Editor Modal */}
      <RatingEditorModal
        product={ratingProduct}
        isOpen={showRatingEditor}
        onClose={() => setShowRatingEditor(false)}
        onSave={handleRatingSave}
      />

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </AdminLayout>
  );
}


