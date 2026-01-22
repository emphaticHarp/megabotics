'use client';

import { useState, useEffect } from 'react';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { ShoppingCart, Star, Filter, Search, Heart, X, ChevronLeft, ChevronRight, Zap, Truck, Shield } from 'lucide-react';
import { useAlert } from '@/components/alert-provider';
import { AdvancedFilters, FilterState } from '@/components/advanced-filters';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { Skeleton } from '@/components/ui/skeleton';

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
                <p className="font-bold text-gray-900">{product.stockQuantity} units</p>
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
                disabled={!product.inStock}
                onClick={() => {
                  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                  const existingItem = cart.find((item: any) => item.id === product.id);

                  if (existingItem) {
                    existingItem.quantity += 1;
                  } else {
                    cart.push({
                      id: product.id,
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
                  product.inStock
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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
                  <td key={p.id} className="py-3 px-4 text-center">
                    <p className="font-semibold text-gray-900">{p.name}</p>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="font-bold py-3 pr-4">Price</td>
                {compProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-center">
                    <p className="font-bold text-blue-600">₹{(p.price / 1000).toFixed(0)}K</p>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="font-bold py-3 pr-4">Rating</td>
                {compProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-center">
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
                  <td key={p.id} className="py-3 px-4 text-center">
                    <p className={p.inStock ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                      {p.inStock ? `${p.stockQuantity} units` : 'Out of Stock'}
                    </p>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="font-bold py-3 pr-4">Warranty</td>
                {compProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-center">
                    <p>{p.warranty}</p>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="font-bold py-3 pr-4">Delivery</td>
                {compProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-center">
                    <p>{p.delivery}</p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-bold py-3 pr-4">Specs</td>
                {compProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4">
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
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updated = favorites.filter((id: number) => id !== product.id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
      showAlert({ type: 'info', title: 'Removed from wishlist' });
    } else {
      favorites.push(product.id);
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

        {!product.inStock && (
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
          {product.inStock ? (
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
            disabled={!product.inStock}
            onClick={() => {
              const cart = JSON.parse(localStorage.getItem('cart') || '[]');
              const existingItem = cart.find((item: any) => item.id === product.id);

              if (existingItem) {
                existingItem.quantity += 1;
              } else {
                cart.push({
                  id: product.id,
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
              product.inStock
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    inStockOnly: false,
    hasDiscount: false,
    minRating: 0,
    warranty: [],
    delivery: [],
  });
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const itemsPerPage = 8;

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
    if (comparisonProducts.find(p => p.id === product.id)) {
      setComparisonProducts(comparisonProducts.filter(p => p.id !== product.id));
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
                      key={product.id}
                      product={product}
                      onQuickView={setQuickViewProduct}
                      onCompare={handleCompare}
                      isComparing={comparisonProducts.length > 0}
                      isInComparison={comparisonProducts.some(p => p.id === product.id)}
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
