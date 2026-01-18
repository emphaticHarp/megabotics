'use client';

import { useState } from 'react';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { ShoppingCart, Star, Filter, Search } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  specs: string[];
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Autonomous Drone X1',
    category: 'Drones',
    price: 45000,
    rating: 4.8,
    reviews: 234,
    image: '/robotics-icon.png',
    description: 'Advanced autonomous drone with AI-powered navigation',
    specs: ['4K Camera', '60min Flight Time', 'AI Navigation', 'Weather Resistant'],
    inStock: true,
  },
  {
    id: 2,
    name: 'Industrial Robot Arm',
    category: 'Robotics',
    price: 125000,
    rating: 4.9,
    reviews: 156,
    image: '/robotics-icon.png',
    description: 'Precision industrial robotic arm for manufacturing',
    specs: ['6-Axis', '50kg Payload', 'Accuracy ±0.03mm', 'IP54 Rated'],
    inStock: true,
  },
  {
    id: 3,
    name: 'Smart Surveillance Bot',
    category: 'Security',
    price: 35000,
    rating: 4.7,
    reviews: 189,
    image: '/robotics-icon.png',
    description: 'AI-powered surveillance robot with autonomous patrol',
    specs: ['360° Vision', 'Night Mode', 'Autonomous Patrol', 'Cloud Storage'],
    inStock: true,
  },
  {
    id: 4,
    name: 'Agricultural Drone Pro',
    category: 'Agriculture',
    price: 55000,
    rating: 4.6,
    reviews: 142,
    image: '/agriculture-icon.png',
    description: 'Specialized drone for precision agriculture',
    specs: ['Multispectral Camera', '2hr Flight', 'Crop Analysis', 'GPS Mapping'],
    inStock: true,
  },
  {
    id: 5,
    name: 'Infrastructure Inspector',
    category: 'Infrastructure',
    price: 75000,
    rating: 4.8,
    reviews: 98,
    image: '/infrastructure-icon.png',
    description: 'Autonomous robot for infrastructure inspection',
    specs: ['Thermal Imaging', 'Obstacle Detection', 'Report Generation', 'IP67'],
    inStock: true,
  },
  {
    id: 6,
    name: 'Disaster Response Unit',
    category: 'Emergency',
    price: 95000,
    rating: 4.9,
    reviews: 76,
    image: '/disaster-icon.png',
    description: 'Rugged robot for disaster response and rescue',
    specs: ['Extreme Durability', 'Thermal Camera', 'Payload Arm', 'Real-time Streaming'],
    inStock: false,
  },
  {
    id: 7,
    name: 'Environmental Monitor',
    category: 'Environment',
    price: 28000,
    rating: 4.5,
    reviews: 112,
    image: '/environment-icon.png',
    description: 'Autonomous environmental monitoring system',
    specs: ['Air Quality Sensors', 'Water Testing', 'Data Logging', 'Solar Powered'],
    inStock: true,
  },
  {
    id: 8,
    name: 'Defence Surveillance System',
    category: 'Defence',
    price: 150000,
    rating: 4.9,
    reviews: 54,
    image: '/defence-icon.png',
    description: 'Advanced defence surveillance and reconnaissance system',
    specs: ['Long Range', 'Encrypted Comms', 'Autonomous Patrol', 'Military Grade'],
    inStock: true,
  },
];

const categories = ['All', 'Drones', 'Robotics', 'Security', 'Agriculture', 'Infrastructure', 'Emergency', 'Environment', 'Defence'];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <>
      <AIChatbot />

      {/* Hero Section */}
      <div className="relative pt-40 pb-12 bg-gradient-to-br from-blue-50 to-cyan-50">
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
          {/* Search and Filter Bar */}
          <div className="space-y-6 mb-12">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
              />
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
                    onClick={() => setSelectedCategory(category)}
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

            {/* Sort */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>

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
                      {product.rating} ({product.reviews} reviews)
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

                  {/* Price and Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-600">Starting at</p>
                      <p className="text-xl font-bold text-gray-900">
                        ₹{(product.price / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <button
                      disabled={!product.inStock}
                      className={`p-2 rounded-full transition-all ${
                        product.inStock
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No products found matching your criteria.</p>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
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

      <Footer />
    </>
  );
}
