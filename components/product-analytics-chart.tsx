'use client';

import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stockQuantity: number;
  rating: number;
  reviews: number;
  isFeatured?: boolean;
}

interface ProductAnalyticsChartProps {
  products: Product[];
}

export function ProductAnalyticsChart({ products }: ProductAnalyticsChartProps) {
  // Calculate best sellers (by reviews and rating)
  const bestSellers = products
    .sort((a, b) => (b.reviews * b.rating) - (a.reviews * a.rating))
    .slice(0, 8)
    .map(p => ({
      name: p.name.substring(0, 15),
      fullName: p.name,
      sales: p.reviews,
      rating: p.rating,
      value: p.reviews * p.rating,
    }));

  // Calculate category distribution
  const categoryData = Object.entries(
    products.reduce((acc: Record<string, number>, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  // Calculate price range distribution
  const priceRanges = [
    { range: '0-50K', min: 0, max: 50000 },
    { range: '50K-100K', min: 50000, max: 100000 },
    { range: '100K-200K', min: 100000, max: 200000 },
    { range: '200K+', min: 200000, max: Infinity },
  ];

  const priceDistribution = priceRanges.map(({ range, min, max }) => ({
    range,
    count: products.filter(p => p.price >= min && p.price < max).length,
  }));

  // Calculate stock status
  const stockStatus = [
    { name: 'In Stock', value: products.filter(p => p.stockQuantity > 0).length },
    { name: 'Low Stock', value: products.filter(p => p.stockQuantity > 0 && p.stockQuantity < 5).length },
    { name: 'Out of Stock', value: products.filter(p => p.stockQuantity === 0).length },
  ];

  // Calculate rating distribution
  const ratingDistribution = [
    { rating: '5⭐', count: products.filter(p => p.rating >= 4.5).length },
    { rating: '4⭐', count: products.filter(p => p.rating >= 3.5 && p.rating < 4.5).length },
    { rating: '3⭐', count: products.filter(p => p.rating >= 2.5 && p.rating < 3.5).length },
    { rating: '2⭐', count: products.filter(p => p.rating >= 1.5 && p.rating < 2.5).length },
    { rating: '1⭐', count: products.filter(p => p.rating < 1.5).length },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

  const topProduct = bestSellers[0];
  const avgRating = products.length > 0 ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1) : 0;
  const totalReviews = products.reduce((sum, p) => sum + p.reviews, 0);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{topProduct?.fullName.substring(0, 20)}</div>
            <p className="text-xs text-gray-500 mt-1">{topProduct?.value} engagement score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{avgRating} ⭐</div>
            <p className="text-xs text-gray-500 mt-1">Across all products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalReviews}</div>
            <p className="text-xs text-gray-500 mt-1">Customer feedback</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{products.filter(p => p.isFeatured).length}</div>
            <p className="text-xs text-gray-500 mt-1">Featured products</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Sellers Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top 8 Best Sellers</CardTitle>
            <CardDescription>By reviews and rating</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bestSellers}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                  formatter={(value) => [`${value}`, 'Engagement']}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Top performer: {topProduct?.fullName}
            </div>
          </CardFooter>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Products by Category</CardTitle>
            <CardDescription>Distribution across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Price Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Price Range Distribution</CardTitle>
            <CardDescription>Products by price segment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceDistribution}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="range" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Products by star rating</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingDistribution}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="rating" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stock Status */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Status Overview</CardTitle>
            <CardDescription>Inventory distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Best Sellers Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Best Sellers Detailed</CardTitle>
            <CardDescription>Top performing products with metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Rank</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Product Name</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Reviews</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Rating</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSellers.map((product, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                          {idx + 1}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-medium text-gray-900">{product.fullName}</td>
                      <td className="py-2 px-3 text-gray-600">{product.sales}</td>
                      <td className="py-2 px-3">
                        <span className="text-yellow-500 font-semibold">{product.rating.toFixed(1)} ⭐</span>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                              style={{ width: `${(product.value / (bestSellers[0]?.value || 1)) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-gray-600">{product.value}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
