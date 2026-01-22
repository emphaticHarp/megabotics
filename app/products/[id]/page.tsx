'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, Truck, Shield, Zap, Check } from 'lucide-react';
import { useAlert } from '@/components/alert-provider';
import { Breadcrumb } from '@/components/breadcrumb';
import { ShareProduct } from '@/components/share-product';
import { ProductReviews } from '@/components/product-reviews';
import { ProductFAQ } from '@/components/product-faq';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { ProductReviewsEnhanced } from '@/components/product-reviews-enhanced';
import { ProductQA } from '@/components/product-qa';
import { PaymentOptions } from '@/components/payment-options';
import { TrustBadges } from '@/components/trust-badges';
import { RecentlyViewed } from '@/components/recently-viewed';
import { ProductVariants } from '@/components/product-variants';
import { ProductRecommendations } from '@/components/product-recommendations';

interface Product {
  id: number;
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
  reviewsDistribution: Record<number, number>;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Autonomous Drone X1',
    category: 'Drones',
    price: 45000,
    originalPrice: 50000,
    discount: 10,
    rating: 4.8,
    reviews: 234,
    images: ['/robotics-icon.png', '/agriculture-icon.png', '/infrastructure-icon.png'],
    description: 'Advanced autonomous drone with AI-powered navigation',
    specs: ['4K Camera', '60min Flight Time', 'AI Navigation', 'Weather Resistant', 'GPS Enabled', 'Obstacle Avoidance'],
    inStock: true,
    stockQuantity: 15,
    warranty: '2 Years',
    delivery: '3-5 Business Days',
    reviewsDistribution: { 5: 180, 4: 40, 3: 10, 2: 3, 1: 1 },
  },
  {
    id: 2,
    name: 'Industrial Robot Arm',
    category: 'Robotics',
    price: 125000,
    originalPrice: 135000,
    discount: 7,
    rating: 4.9,
    reviews: 156,
    images: ['/robotics-icon.png', '/infrastructure-icon.png'],
    description: 'Precision industrial robotic arm for manufacturing',
    specs: ['6-Axis', '50kg Payload', 'Accuracy ±0.03mm', 'IP54 Rated', 'Programmable', 'High Speed'],
    inStock: true,
    stockQuantity: 8,
    warranty: '3 Years',
    delivery: '7-10 Business Days',
    reviewsDistribution: { 5: 145, 4: 10, 3: 1, 2: 0, 1: 0 },
  },
  {
    id: 3,
    name: 'Smart Surveillance Bot',
    category: 'Security',
    price: 35000,
    rating: 4.7,
    reviews: 189,
    images: ['/robotics-icon.png', '/defence-icon.png'],
    description: 'AI-powered surveillance robot with autonomous patrol',
    specs: ['360° Vision', 'Night Mode', 'Autonomous Patrol', 'Cloud Storage', 'Motion Detection', 'Alert System'],
    inStock: true,
    stockQuantity: 22,
    warranty: '2 Years',
    delivery: '3-5 Business Days',
    reviewsDistribution: { 5: 165, 4: 20, 3: 4, 2: 0, 1: 0 },
  },
  {
    id: 4,
    name: 'Agricultural Drone Pro',
    category: 'Agriculture',
    price: 55000,
    originalPrice: 62000,
    discount: 11,
    rating: 4.6,
    reviews: 142,
    images: ['/agriculture-icon.png', '/environment-icon.png'],
    description: 'Specialized drone for precision agriculture',
    specs: ['Multispectral Camera', '2hr Flight', 'Crop Analysis', 'GPS Mapping', 'Soil Monitoring', 'Yield Prediction'],
    inStock: true,
    stockQuantity: 12,
    warranty: '2 Years',
    delivery: '5-7 Business Days',
    reviewsDistribution: { 5: 120, 4: 18, 3: 4, 2: 0, 1: 0 },
  },
  {
    id: 5,
    name: 'Infrastructure Inspector',
    category: 'Infrastructure',
    price: 75000,
    rating: 4.8,
    reviews: 98,
    images: ['/infrastructure-icon.png', '/robotics-icon.png'],
    description: 'Autonomous robot for infrastructure inspection',
    specs: ['Thermal Imaging', 'Obstacle Detection', 'Report Generation', 'IP67', 'Long Range', 'Data Analytics'],
    inStock: true,
    stockQuantity: 6,
    warranty: '3 Years',
    delivery: '7-10 Business Days',
    reviewsDistribution: { 5: 85, 4: 12, 3: 1, 2: 0, 1: 0 },
  },
  {
    id: 6,
    name: 'Disaster Response Unit',
    category: 'Emergency',
    price: 95000,
    originalPrice: 105000,
    discount: 10,
    rating: 4.9,
    reviews: 76,
    images: ['/disaster-icon.png', '/defence-icon.png'],
    description: 'Rugged robot for disaster response and rescue',
    specs: ['Extreme Durability', 'Thermal Camera', 'Payload Arm', 'Real-time Streaming', 'Rugged Design', 'Emergency Mode'],
    inStock: false,
    stockQuantity: 0,
    warranty: '3 Years',
    delivery: '10-14 Business Days',
    reviewsDistribution: { 5: 70, 4: 5, 3: 1, 2: 0, 1: 0 },
  },
  {
    id: 7,
    name: 'Environmental Monitor',
    category: 'Environment',
    price: 28000,
    rating: 4.5,
    reviews: 112,
    images: ['/environment-icon.png', '/agriculture-icon.png'],
    description: 'Autonomous environmental monitoring system',
    specs: ['Air Quality Sensors', 'Water Testing', 'Data Logging', 'Solar Powered', 'Real-time Alerts', 'Cloud Integration'],
    inStock: true,
    stockQuantity: 18,
    warranty: '2 Years',
    delivery: '3-5 Business Days',
    reviewsDistribution: { 5: 95, 4: 15, 3: 2, 2: 0, 1: 0 },
  },
  {
    id: 8,
    name: 'Defence Surveillance System',
    category: 'Defence',
    price: 150000,
    originalPrice: 165000,
    discount: 9,
    rating: 4.9,
    reviews: 54,
    images: ['/defence-icon.png', '/robotics-icon.png'],
    description: 'Advanced defence surveillance and reconnaissance system',
    specs: ['Long Range', 'Encrypted Comms', 'Autonomous Patrol', 'Military Grade', 'Secure Network', 'Advanced AI'],
    inStock: true,
    stockQuantity: 4,
    warranty: '3 Years',
    delivery: '14-21 Business Days',
    reviewsDistribution: { 5: 50, 4: 4, 3: 0, 2: 0, 1: 0 },
  },
  {
    id: 9,
    name: 'Precision Mapping Drone',
    category: 'Drones',
    price: 65000,
    originalPrice: 72000,
    discount: 10,
    rating: 4.7,
    reviews: 128,
    images: ['/robotics-icon.png', '/infrastructure-icon.png'],
    description: 'High-precision mapping and surveying drone',
    specs: ['LiDAR Sensor', '90min Flight', 'RTK GPS', 'Thermal Camera', 'IP45 Rated', 'Cloud Sync'],
    inStock: true,
    stockQuantity: 10,
    warranty: '2 Years',
    delivery: '5-7 Business Days',
    reviewsDistribution: { 5: 100, 4: 25, 3: 3, 2: 0, 1: 0 },
  },
  {
    id: 10,
    name: 'Collaborative Robot Cobot',
    category: 'Robotics',
    price: 85000,
    originalPrice: 95000,
    discount: 11,
    rating: 4.8,
    reviews: 167,
    images: ['/robotics-icon.png', '/infrastructure-icon.png'],
    description: 'Safe collaborative robot for human-robot interaction',
    specs: ['Force Limiting', '10kg Payload', 'Easy Programming', 'Safety Certified', 'Compact Design', 'Plug & Play'],
    inStock: true,
    stockQuantity: 14,
    warranty: '2 Years',
    delivery: '7-10 Business Days',
    reviewsDistribution: { 5: 130, 4: 35, 3: 2, 2: 0, 1: 0 },
  },
  {
    id: 11,
    name: 'Perimeter Security Bot',
    category: 'Security',
    price: 42000,
    originalPrice: 48000,
    discount: 12,
    rating: 4.6,
    reviews: 145,
    images: ['/defence-icon.png', '/robotics-icon.png'],
    description: 'Autonomous perimeter patrol and security robot',
    specs: ['LiDAR Mapping', 'Facial Recognition', 'Intruder Alert', 'Night Vision', 'Weather Proof', 'Mobile App'],
    inStock: true,
    stockQuantity: 19,
    warranty: '2 Years',
    delivery: '3-5 Business Days',
    reviewsDistribution: { 5: 110, 4: 30, 3: 5, 2: 0, 1: 0 },
  },
  {
    id: 12,
    name: 'Crop Health Analyzer',
    category: 'Agriculture',
    price: 38000,
    rating: 4.5,
    reviews: 98,
    images: ['/agriculture-icon.png', '/environment-icon.png'],
    description: 'AI-powered crop health analysis system',
    specs: ['Multispectral Analysis', 'Disease Detection', 'Yield Forecast', 'Soil Mapping', 'Weather Integration', 'Report Generation'],
    inStock: true,
    stockQuantity: 16,
    warranty: '2 Years',
    delivery: '5-7 Business Days',
    reviewsDistribution: { 5: 75, 4: 20, 3: 3, 2: 0, 1: 0 },
  },
  {
    id: 13,
    name: 'Bridge Inspection Robot',
    category: 'Infrastructure',
    price: 88000,
    originalPrice: 98000,
    discount: 10,
    rating: 4.8,
    reviews: 76,
    images: ['/infrastructure-icon.png', '/robotics-icon.png'],
    description: 'Specialized robot for bridge and tunnel inspection',
    specs: ['Ultrasonic Sensors', 'Crack Detection', 'High Resolution Camera', 'Waterproof', 'Extended Range', 'Data Logging'],
    inStock: true,
    stockQuantity: 7,
    warranty: '3 Years',
    delivery: '10-14 Business Days',
    reviewsDistribution: { 5: 65, 4: 10, 3: 1, 2: 0, 1: 0 },
  },
  {
    id: 14,
    name: 'Rescue Drone Pro',
    category: 'Emergency',
    price: 110000,
    originalPrice: 125000,
    discount: 12,
    rating: 4.9,
    reviews: 89,
    images: ['/disaster-icon.png', '/defence-icon.png'],
    description: 'Advanced rescue and emergency response drone',
    specs: ['Thermal Imaging', 'Payload Delivery', 'Long Range', 'Weather Resistant', 'Real-time Streaming', 'Emergency Beacon'],
    inStock: true,
    stockQuantity: 5,
    warranty: '3 Years',
    delivery: '10-14 Business Days',
    reviewsDistribution: { 5: 78, 4: 10, 3: 1, 2: 0, 1: 0 },
  },
  {
    id: 15,
    name: 'Air Quality Sensor Network',
    category: 'Environment',
    price: 32000,
    originalPrice: 38000,
    discount: 16,
    rating: 4.6,
    reviews: 134,
    images: ['/environment-icon.png', '/agriculture-icon.png'],
    description: 'Distributed air quality monitoring network',
    specs: ['PM2.5 Detection', 'Gas Sensors', 'Real-time Data', 'Cloud Dashboard', 'Mobile Alerts', 'Long Battery'],
    inStock: true,
    stockQuantity: 22,
    warranty: '2 Years',
    delivery: '3-5 Business Days',
    reviewsDistribution: { 5: 105, 4: 25, 3: 4, 2: 0, 1: 0 },
  },
  {
    id: 16,
    name: 'Military Grade Surveillance',
    category: 'Defence',
    price: 175000,
    originalPrice: 195000,
    discount: 10,
    rating: 4.9,
    reviews: 42,
    images: ['/defence-icon.png', '/robotics-icon.png'],
    description: 'Military-grade surveillance and reconnaissance system',
    specs: ['Encrypted Communication', 'Stealth Mode', 'Advanced AI', 'Autonomous Patrol', 'Secure Network', 'Military Certified'],
    inStock: false,
    stockQuantity: 0,
    warranty: '3 Years',
    delivery: '21-30 Business Days',
    reviewsDistribution: { 5: 38, 4: 4, 3: 0, 2: 0, 1: 0 },
  },
  {
    id: 17,
    name: 'Delivery Drone Fleet',
    category: 'Drones',
    price: 52000,
    originalPrice: 58000,
    discount: 10,
    rating: 4.7,
    reviews: 156,
    images: ['/robotics-icon.png', '/agriculture-icon.png'],
    description: 'Autonomous delivery drone with payload optimization',
    specs: ['5kg Payload', '45min Flight', 'Auto-landing', 'GPS Navigation', 'Weather Resistant', 'Fleet Management'],
    inStock: true,
    stockQuantity: 11,
    warranty: '2 Years',
    delivery: '5-7 Business Days',
    reviewsDistribution: { 5: 125, 4: 28, 3: 3, 2: 0, 1: 0 },
  },
  {
    id: 18,
    name: 'Welding Robot System',
    category: 'Robotics',
    price: 145000,
    originalPrice: 160000,
    discount: 9,
    rating: 4.8,
    reviews: 98,
    images: ['/robotics-icon.png', '/infrastructure-icon.png'],
    description: 'Industrial welding robot with precision control',
    specs: ['6-Axis Arm', 'High Precision', 'Fast Cycle Time', 'Safety Features', 'Easy Integration', 'Maintenance Free'],
    inStock: true,
    stockQuantity: 3,
    warranty: '3 Years',
    delivery: '14-21 Business Days',
    reviewsDistribution: { 5: 85, 4: 12, 3: 1, 2: 0, 1: 0 },
  },
  {
    id: 19,
    name: 'Access Control Bot',
    category: 'Security',
    price: 48000,
    originalPrice: 55000,
    discount: 13,
    rating: 4.7,
    reviews: 167,
    images: ['/defence-icon.png', '/robotics-icon.png'],
    description: 'Smart access control and identity verification robot',
    specs: ['Facial Recognition', 'Biometric Scan', 'RFID Reader', 'Real-time Alerts', 'Cloud Integration', 'Multi-language'],
    inStock: true,
    stockQuantity: 13,
    warranty: '2 Years',
    delivery: '5-7 Business Days',
    reviewsDistribution: { 5: 135, 4: 30, 3: 2, 2: 0, 1: 0 },
  },
  {
    id: 20,
    name: 'Irrigation Management System',
    category: 'Agriculture',
    price: 35000,
    originalPrice: 42000,
    discount: 17,
    rating: 4.6,
    reviews: 112,
    images: ['/agriculture-icon.png', '/environment-icon.png'],
    description: 'Smart irrigation control and optimization system',
    specs: ['Soil Moisture Sensors', 'Weather Forecast', 'Automated Watering', 'Water Saving', 'Mobile Control', 'Analytics Dashboard'],
    inStock: true,
    stockQuantity: 20,
    warranty: '2 Years',
    delivery: '3-5 Business Days',
    reviewsDistribution: { 5: 90, 4: 20, 3: 2, 2: 0, 1: 0 },
  },
  {
    id: 21,
    name: 'Power Line Inspection Bot',
    category: 'Infrastructure',
    price: 92000,
    originalPrice: 105000,
    discount: 12,
    rating: 4.8,
    reviews: 84,
    images: ['/infrastructure-icon.png', '/robotics-icon.png'],
    description: 'Autonomous power line inspection and maintenance robot',
    specs: ['High Voltage Safe', 'Thermal Detection', 'Defect Mapping', 'Real-time Monitoring', 'Weather Proof', 'Extended Range'],
    inStock: true,
    stockQuantity: 6,
    warranty: '3 Years',
    delivery: '10-14 Business Days',
    reviewsDistribution: { 5: 72, 4: 11, 3: 1, 2: 0, 1: 0 },
  },
  {
    id: 22,
    name: 'Hazmat Response Robot',
    category: 'Emergency',
    price: 125000,
    originalPrice: 140000,
    discount: 11,
    rating: 4.9,
    reviews: 67,
    images: ['/disaster-icon.png', '/defence-icon.png'],
    description: 'Hazardous material handling and response robot',
    specs: ['Chemical Resistant', 'Radiation Detection', 'Payload Arm', 'Remote Control', 'Real-time Feedback', 'Emergency Protocol'],
    inStock: true,
    stockQuantity: 4,
    warranty: '3 Years',
    delivery: '14-21 Business Days',
    reviewsDistribution: { 5: 60, 4: 6, 3: 1, 2: 0, 1: 0 },
  },
  {
    id: 23,
    name: 'Water Quality Monitor',
    category: 'Environment',
    price: 36000,
    originalPrice: 42000,
    discount: 14,
    rating: 4.5,
    reviews: 98,
    images: ['/environment-icon.png', '/agriculture-icon.png'],
    description: 'Comprehensive water quality monitoring system',
    specs: ['pH Sensor', 'Turbidity Meter', 'Dissolved Oxygen', 'Temperature Control', 'Data Logging', 'Cloud Sync'],
    inStock: true,
    stockQuantity: 17,
    warranty: '2 Years',
    delivery: '5-7 Business Days',
    reviewsDistribution: { 5: 78, 4: 18, 3: 2, 2: 0, 1: 0 },
  },
  {
    id: 24,
    name: 'Border Patrol Drone',
    category: 'Defence',
    price: 165000,
    originalPrice: 185000,
    discount: 11,
    rating: 4.9,
    reviews: 51,
    images: ['/defence-icon.png', '/robotics-icon.png'],
    description: 'Long-range border patrol and surveillance drone',
    specs: ['Extended Range', 'Thermal Imaging', 'Encrypted Comms', 'Autonomous Patrol', 'Military Grade', 'Real-time Streaming'],
    inStock: true,
    stockQuantity: 3,
    warranty: '3 Years',
    delivery: '21-30 Business Days',
    reviewsDistribution: { 5: 45, 4: 5, 3: 1, 2: 0, 1: 0 },
  },
];

export default function ProductDetail() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { showAlert } = useAlert();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(productId));

    // Track recently viewed products
    if (product) {
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const filtered = recentlyViewed.filter((p: any) => p.id !== product.id);
      const updated = [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          rating: product.rating,
        },
        ...filtered,
      ].slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      window.dispatchEvent(new Event('recentlyViewedUpdated'));
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updated = favorites.filter((id: number) => id !== productId);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
      showAlert({ type: 'info', title: 'Removed from wishlist' });
    } else {
      favorites.push(productId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      showAlert({ type: 'success', title: 'Added to wishlist!' });
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0],
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    // Trigger cart update event
    window.dispatchEvent(new Event('cartUpdated'));
    showAlert({ type: 'success', title: `Added ${quantity} item(s) to cart!` });
    setQuantity(1);
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const totalReviews = Object.values(product.reviewsDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <AIChatbot />

      {/* Hero Section */}
      <div className="relative pt-40 pb-12 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={product.images[0]}
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
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: product.category, href: `/products?category=${product.category}` },
              { label: product.name },
            ]}
          />
          <div className="space-y-3 mt-4">
            <p className="text-sm text-blue-600 font-semibold">{product.category}</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              {product.name}
            </h1>
          </div>
        </main>
      </div>

      {/* Product Details */}
      <div className="bg-white flex-1">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 mb-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden h-96">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex ? 'border-blue-600' : 'border-gray-200'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={image} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Price and Discount */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl font-bold text-gray-900">₹{(product.price / 1000).toFixed(0)}K</span>
                  {product.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through">₹{(product.originalPrice / 1000).toFixed(0)}K</span>
                  )}
                  {product.discount && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">-{product.discount}%</span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg">{product.description}</p>

              {/* Stock and Delivery Info */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y">
                <div className="text-center">
                  <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Stock</p>
                  <p className="font-bold text-gray-900">{product.stockQuantity} units</p>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Delivery</p>
                  <p className="font-bold text-gray-900">{product.delivery}</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Warranty</p>
                  <p className="font-bold text-gray-900">{product.warranty}</p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-600 transition-all"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-600 transition-all"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Bulk Discount Info */}
              {quantity >= 5 && (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-semibold">
                    ✓ Bulk discount applied! Save {Math.floor(quantity * 5)}% on this order
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                    product.inStock
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button
                  onClick={toggleFavorite}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
                    isFavorite
                      ? 'bg-red-100 border-red-600 text-red-600'
                      : 'border-gray-300 text-gray-700 hover:border-blue-600'
                  }`}
                  aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-600' : ''}`} />
                </button>
              </div>

              {/* Share Button */}
              <ShareProduct
                productName={product.name}
                productUrl={typeof window !== 'undefined' ? window.location.href : ''}
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="py-8 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Distribution */}
          <div className="py-8 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating}</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">Based on {totalReviews} reviews</p>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = product.reviewsDistribution[stars] || 0;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-700 w-12">{stars}★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="py-8 border-t">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((relProduct) => (
                  <a
                    key={relProduct.id}
                    href={`/products/${relProduct.id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100"
                  >
                    <div className="relative h-40 bg-gray-100 overflow-hidden">
                      <img
                        src={relProduct.images[0]}
                        alt={relProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 space-y-2">
                      <h3 className="font-bold text-gray-900 line-clamp-2 text-sm">{relProduct.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{relProduct.rating}</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">₹{(relProduct.price / 1000).toFixed(0)}K</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Trust Badges */}
          <div className="py-8 border-t">
            <TrustBadges />
          </div>

          {/* Product Variants */}
          <div className="py-8 border-t">
            <ProductVariants
              variants={{
                size: [
                  { id: 's', name: 'Small', value: 'S' },
                  { id: 'm', name: 'Medium', value: 'M' },
                  { id: 'l', name: 'Large', value: 'L' },
                ],
                color: [
                  { id: 'black', name: 'Black', value: '#000000' },
                  { id: 'white', name: 'White', value: '#FFFFFF' },
                  { id: 'blue', name: 'Blue', value: '#0066FF' },
                ],
              }}
            />
          </div>

          {/* Payment Options */}
          <div className="py-8 border-t">
            <PaymentOptions price={product.price} />
          </div>

          {/* Enhanced Reviews */}
          <div className="py-8 border-t">
            <ProductReviewsEnhanced
              productId={product.id}
              rating={product.rating}
              totalReviews={product.reviews}
              reviewsDistribution={product.reviewsDistribution}
            />
          </div>

          {/* Q&A Section */}
          <div className="py-8 border-t">
            <ProductQA />
          </div>

          {/* FAQ Section */}
          <div className="py-8 border-t">
            <ProductFAQ />
          </div>

          {/* Best Sellers */}
          <div className="py-8 border-t">
            <ProductRecommendations
              type="bestsellers"
              products={relatedProducts.map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.images[0],
                rating: p.rating,
                reviews: p.reviews,
                sales: Math.floor(Math.random() * 500) + 100,
              }))}
            />
          </div>

          {/* Customers Also Viewed */}
          <div className="py-8 border-t">
            <ProductRecommendations
              type="customers-also-viewed"
              products={relatedProducts.map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.images[0],
                rating: p.rating,
                reviews: p.reviews,
              }))}
            />
          </div>

          {/* Recently Viewed */}
          <div className="py-8 border-t">
            <RecentlyViewed />
          </div>

          {/* Newsletter Signup */}
          <div className="py-8 border-t">
            <NewsletterSignup />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
