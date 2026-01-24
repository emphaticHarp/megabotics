'use client';

import { useState, useEffect } from 'react';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { HeadlineBanner } from '@/components/headline-banner';
import { ShoppingCart, Star, Filter, Search, Heart, X, ChevronLeft, ChevronRight, Zap, Truck, Shield } from 'lucide-react';
import { useAlert } from '@/components/alert-provider';
import { AdvancedFilters, FilterState } from '@/components/advanced-filters';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  specs: string[];
  inStock: boolean;
  stockQuantity: number;
  warranty: string;
  delivery: string;
  reviewsDistribution?: Record<number, number>;
  isMaintenance?: boolean;
  isActive?: boolean;
}

const categories = ['All', 'Drones', 'Robotics', 'Security', 'Agriculture', 'Infrastructure', 'Emergency', 'Environment', 'Defence'];

// Quick View Modal Component
function QuickViewModal({ product, isOpen, onClose }: { product: Product | null; isOpen: boolean; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { showAlert } = useAlert();

  if (!isOpen || !product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Carousel */}
          <div className="relative bg-gray-100 rounded-xl overflow-hidden h-64">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">{product.category}</p>
                <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
              </div>
              {product.discount && (
                <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">₹{(product.price / 1000).toFixed(0)}K</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">₹{(product.originalPrice / 1000).toFixed(0)}K</span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Stock & Delivery */}
            <div className="grid grid-cols-3 gap-3 py-3 border-y">
              <div className="text-center">
                <p className="text-xs text-gray-600">Stock</p>
                <p className={`font-bold ${product.stockQuantity > 0 && product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stockQuantity > 0 && product.inStock ? `${product.stockQuantity} units` : 'Out of Stock'}
                </p>
              </div>
              <div className="text-center">
                <Truck className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                <p className="text-xs text-gray-600">{product.delivery}</p>
              </div>
              <div className="text-center">
                <Shield className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                <p className="text-xs text-gray-600">{product.warranty}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>

            {/* Specs */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Key Specifications</h4>
              <div className="grid grid-cols-2 gap-2">
                {product.specs.map((spec, idx) => (
                  <p key={idx} className="text-sm text-gray-700">✓ {spec}</p>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                disabled={!product.inStock || product.stockQuantity === 0}
                onClick={() => {
                  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                  const existingItem = cart.find((item: any) => item.id === product._id);

                  if (existingItem) {
                    existingItem.quantity += 1;
                  } else {
                    cart.push({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      image: product.images[0],
                    });
                  }

                  localStorage.setItem('cart', JSON.stringify(cart));
                  // Trigger cart update event
                  window.dispatchEvent(new Event('cartUpdated'));
                  showAlert({ type: 'success', title: 'Added to cart!' });
                  onClose();
                }}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  product.inStock && product.stockQuantity > 0
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {product.inStock && product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={() => {
                  showAlert({ type: 'success', title: 'Added to wishlist!' });
                }}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-600 transition-all"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Comparison Modal Component
function ComparisonModal({ products: compProducts, isOpen, onClose }: { products: Product[]; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || compProducts.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white">
          <h2 className="text-xl font-bold">Compare Products</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="font-bold py-3 pr-4">Product</td>
                {compProducts.map((p) => (
                  <td key={p._id} className="py-3 px-4 text-center">
                    <p className="font-semibold text-gray-900">{p.name}</p>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="font-bold py-3 pr-4">Price</td>
                {compProducts.map((p) => (
                  <td key={p._id} className="py-3 px-4 text-center">
                    <p className="font-bold text-blue-600">₹{(p.price / 1000).toFixed(0)}K</p>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="font-bold py-3 pr-4">Rating</td>
                {compProducts.map((p) => (
                  <td key={p._id} className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{p.rating}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="font-bold py-3 pr-4">Stock</td>
                {compProducts.map((p) => (
                  <td key={p._id} className="py-3 px-4 text-center">
                    <p className={p.inStock ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                      {p.inStock ? `${p.stockQuantity} units` : 'Out of Stock'}
                    </p>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="font-bold py-3 pr-4">Warranty</td>
                {compProducts.map((p) => (
                  <td key={p._id} className="py-3 px-4 text-center">
                    <p>{p.warranty}</p>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="font-bold py-3 pr-4">Delivery</td>
                {compProducts.map((p) => (
                  <td key={p._id} className="py-3 px-4 text-center">
                    <p>{p.delivery}</p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-bold py-3 pr-4">Specs</td>
                {compProducts.map((p) => (
                  <td key={p._id} className="py-3 px-4">
                    <ul className="text-xs space-y-1">
                      {p.specs.map((spec, idx) => (
                        <li key={idx}>✓ {spec}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({
  product,
  onQuickView,
  onCompare,
  isComparing,
  isInComparison,
}: {
  product: Product;
  onQuickView: (p: Product) => void;
  onCompare: (p: Product) => void;
  isComparing: boolean;
  isInComparison: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { showAlert } = useAlert();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(product._id));
  }, [product._id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updated = favorites.filter((id: string) => id !== product._id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
      showAlert({ type: 'info', title: 'Removed from wishlist' });
    } else {
      favorites.push(product._id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      showAlert({ type: 'success', title: 'Added to wishlist!' });
    }
  };

  return (
    <div className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
      isInComparison ? 'border-blue-600' : 'border-gray-100'
    }`}>
      {/* Product Image with Carousel */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {(!product.inStock || product.stockQuantity === 0) && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 space-y-2">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </div>
          {product.discount && (
            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 left-3 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-600 text-red-600' : 'text-gray-600'}`} />
        </button>

        {/* Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{product.name}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Specs */}
        <div className="space-y-1">
          {product.specs.slice(0, 2).map((spec, idx) => (
            <p key={idx} className="text-xs text-gray-600">
              ✓ {spec}
            </p>
          ))}
        </div>

        {/* Stock Quantity */}
        <div className="text-xs text-gray-600">
          {product.inStock && product.stockQuantity > 0 ? (
            <span className="text-green-600 font-semibold">✓ {product.stockQuantity} in stock</span>
          ) : (
            <span className="text-red-600 font-semibold">Out of stock</span>
          )}
        </div>

        {/* Price and Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-600">Starting at</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-gray-900">₹{(product.price / 1000).toFixed(0)}K</p>
              {product.originalPrice && (
                <p className="text-sm text-gray-500 line-through">₹{(product.originalPrice / 1000).toFixed(0)}K</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            disabled={!product.inStock || product.stockQuantity === 0}
            onClick={() => {
              const cart = JSON.parse(localStorage.getItem('cart') || '[]');
              const existingItem = cart.find((item: any) => item.id === product._id);

              if (existingItem) {
                existingItem.quantity += 1;
              } else {
                cart.push({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.images[0],
                });
              }

              localStorage.setItem('cart', JSON.stringify(cart));
              // Trigger cart update event
              window.dispatchEvent(new Event('cartUpdated'));
              showAlert({ type: 'success', title: 'Added to cart!' });
            }}
            className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
              product.inStock && product.stockQuantity > 0
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-all"
          >
            View
          </button>
          <button
            onClick={() => onCompare(product)}
            className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
              isInComparison
                ? 'bg-blue-600 text-white'
                : 'border-2 border-gray-300 text-gray-700 hover:border-blue-600'
            }`}
            title="Compare"
          >
            ⚖
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    inStockOnly: false,
    hasDiscount: false,
    minRating: 0,
    warranty: [],
    delivery: [],
  });
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const itemsPerPage = 8;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products', {
          cache: 'no-store',
        });
        const data = await response.json();
        console.log('Products API Response:', data);
        if (data.success && data.data) {
          console.log('Products loaded:', data.data.length, 'items');
          setProducts(data.data);
        } else {
          console.warn('No products data in response');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load recently viewed from localStorage
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentlyViewed(viewed);
  }, []);

  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
    .filter(product => !advancedFilters.inStockOnly || product.inStock)
    .filter(product => !advancedFilters.hasDiscount || product.discount)
    .filter(product => product.rating >= advancedFilters.minRating)
    .filter(product => advancedFilters.warranty.length === 0 || advancedFilters.warranty.includes(product.warranty))
    .filter(product => advancedFilters.delivery.length === 0 || advancedFilters.delivery.includes(product.delivery))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCompare = (product: Product) => {
    if (comparisonProducts.find(p => p._id === product._id)) {
      setComparisonProducts(comparisonProducts.filter(p => p._id !== product._id));
    } else if (comparisonProducts.length < 3) {
      setComparisonProducts([...comparisonProducts, product]);
    }
  };

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 p-4 space-y-4">
      <Skeleton className="w-full h-48 rounded-lg" />
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
      <div className="flex gap-2">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
      <Skeleton className="w-full h-10 rounded-lg" />
    </div>
  );

  return (
    <>
      <AIChatbot />

      {/* Hero Section */}
      <div className="relative pt-40 pb-12 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/robotics-icon.png"
            alt="Background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-cyan-600/30" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl" />

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Our Products
            </h1>
            <p className="text-base text-gray-700 leading-relaxed">
              Explore our cutting-edge robotics and autonomous systems designed for the future.
            </p>
          </div>
        </main>
      </div>

      {/* Headline Banner */}
      <HeadlineBanner />

      {/* Products Section */}
      <div className="py-12 bg-white">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            {/* Advanced Filters Sidebar - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <AdvancedFilters
                onFilterChange={setAdvancedFilters}
                isOpen={true}
                onClose={() => {}}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Filter Bar */}
              <div className="space-y-6 mb-12">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Mobile Filter Button */}
                <div className="lg:hidden">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                  >
                    <Filter className="w-5 h-5" />
                    Advanced Filters
                  </button>
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Categories</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setCurrentPage(1);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Price Range</span>
                    <span className="text-sm font-bold text-blue-600">
                      ₹{(priceRange[0] / 1000).toFixed(0)}K - ₹{(priceRange[1] / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="5000"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newMin = Math.min(parseInt(e.target.value), priceRange[1]);
                        setPriceRange([newMin, priceRange[1]]);
                        setCurrentPage(1);
                      }}
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newMax = Math.max(parseInt(e.target.value), priceRange[0]);
                        setPriceRange([priceRange[0], newMax]);
                        setCurrentPage(1);
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Sort and Comparison */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-700">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                  {comparisonProducts.length > 0 && (
                    <button
                      onClick={() => setComparisonProducts([])}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      Compare ({comparisonProducts.length})
                    </button>
                  )}
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {isLoading ? (
                  // Show skeleton loaders while loading
                  [...Array(itemsPerPage)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                ) : paginatedProducts.length > 0 ? (
                  // Show actual products
                  paginatedProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onQuickView={setQuickViewProduct}
                      onCompare={handleCompare}
                      isComparing={comparisonProducts.length > 0}
                      isInComparison={comparisonProducts.some(p => p._id === product._id)}
                    />
                  ))
                ) : (
                  // Show no results message
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-gray-600">No products found matching your criteria.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mb-8">
                  <button
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setCurrentPage(Math.max(1, currentPage - 1));
                        setIsLoading(false);
                      }, 300);
                    }}
                    disabled={currentPage === 1 || isLoading}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-600 transition-all"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setCurrentPage(i + 1);
                          setIsLoading(false);
                        }, 300);
                      }}
                      disabled={isLoading}
                      className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                          : 'border-2 border-gray-300 text-gray-700 hover:border-blue-600 disabled:opacity-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setCurrentPage(Math.min(totalPages, currentPage + 1));
                        setIsLoading(false);
                      }, 300);
                    }}
                    disabled={currentPage === totalPages || isLoading}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-600 transition-all"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Results Count */}
              <div className="text-center text-sm text-gray-600 mb-8">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </div>
            </div>
          </div>

          {/* Mobile Advanced Filters Modal */}
          {showFilters && (
            <AdvancedFilters
              onFilterChange={setAdvancedFilters}
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
            />
          )}
        </main>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-gradient-to-r from-blue-600 to-cyan-600">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Contact our sales team to discuss custom solutions tailored to your needs.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg">
            Get in Touch
          </button>
        </main>
      </div>

      {/* Newsletter Section */}
      <div className="py-12 bg-white">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </main>
      </div>

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <ComparisonModal
        products={comparisonProducts}
        isOpen={comparisonProducts.length > 0}
        onClose={() => setComparisonProducts([])}
      />

      <Footer />
    </>
  );
}
