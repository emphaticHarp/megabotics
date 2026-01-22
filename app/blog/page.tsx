'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Search, Heart, Share2, MessageCircle, Eye, Calendar, User, ArrowRight, Filter, BarChart3, Bookmark, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const itemsPerPage = 6;

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'robotics', label: 'Robotics' },
    { id: 'automation', label: 'Automation' },
    { id: 'industry', label: 'Industry News' },
    { id: 'tutorial', label: 'Tutorials' },
    { id: 'case-study', label: 'Case Studies' },
  ];

  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [comments, setComments] = useState<Record<number, any[]>>({
    1: [
      { id: 1, author: 'John Doe', text: 'Great article! Very informative.', date: '2024-01-21' },
      { id: 2, author: 'Jane Smith', text: 'Loved the insights on autonomous systems.', date: '2024-01-20' },
    ],
    2: [
      { id: 1, author: 'Mike Johnson', text: 'Perfect tutorial for beginners!', date: '2024-01-19' },
    ],
  });

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Autonomous Robotics in Manufacturing',
      category: 'robotics',
      author: 'Dr. Rajesh Kumar',
      date: '2024-01-20',
      readTime: 8,
      image: '/robotics-icon.png',
      excerpt: 'Exploring how autonomous robots are revolutionizing manufacturing processes and increasing productivity by 300%.',
      content: 'Full article content here...',
      views: 2450,
      likes: 342,
      comments: 28,
      tags: ['Robotics', 'Manufacturing', 'AI', 'Automation'],
      featured: true,
    },
    {
      id: 2,
      title: 'Deep Learning Models for Real-time Object Detection',
      category: 'ai',
      author: 'Priya Singh',
      date: '2024-01-18',
      readTime: 12,
      image: '/agriculture-icon.png',
      excerpt: 'A comprehensive guide to implementing state-of-the-art deep learning models for object detection tasks.',
      content: 'Full article content here...',
      views: 1890,
      likes: 267,
      comments: 45,
      tags: ['AI', 'Deep Learning', 'Computer Vision', 'Tutorial'],
      featured: true,
    },
    {
      id: 3,
      title: 'IoT Sensors: Transforming Smart Cities',
      category: 'industry',
      author: 'Amit Patel',
      date: '2024-01-15',
      readTime: 10,
      image: '/infrastructure-icon.png',
      excerpt: 'How IoT sensor networks are enabling smarter, more efficient cities across India.',
      content: 'Full article content here...',
      views: 1650,
      likes: 198,
      comments: 32,
      tags: ['IoT', 'Smart Cities', 'Sensors', 'Industry'],
      featured: false,
    },
    {
      id: 4,
      title: 'Getting Started with ROS 2: A Beginner\'s Guide',
      category: 'tutorial',
      author: 'Vikram Singh',
      date: '2024-01-12',
      readTime: 15,
      image: '/defence-icon.png',
      excerpt: 'Step-by-step tutorial to get started with Robot Operating System 2 for robotics development.',
      content: 'Full article content here...',
      views: 3200,
      likes: 456,
      comments: 67,
      tags: ['ROS', 'Robotics', 'Tutorial', 'Programming'],
      featured: true,
    },
    {
      id: 5,
      title: 'Case Study: Crop Monitoring System Implementation',
      category: 'case-study',
      author: 'Neha Sharma',
      date: '2024-01-10',
      readTime: 14,
      image: '/agriculture-icon.png',
      excerpt: 'Real-world implementation of AI-powered crop monitoring system that increased yield by 35%.',
      content: 'Full article content here...',
      views: 2100,
      likes: 312,
      comments: 41,
      tags: ['Agriculture', 'AI', 'Case Study', 'Implementation'],
      featured: false,
    },
    {
      id: 6,
      title: 'Predictive Maintenance: Reducing Downtime with ML',
      category: 'ai',
      author: 'Dr. Suresh Kumar',
      date: '2024-01-08',
      readTime: 11,
      image: '/infrastructure-icon.png',
      excerpt: 'How machine learning models predict equipment failures before they happen, saving millions in downtime.',
      content: 'Full article content here...',
      views: 1920,
      likes: 289,
      comments: 38,
      tags: ['ML', 'Predictive Maintenance', 'Industry 4.0'],
      featured: false,
    },
    {
      id: 7,
      title: 'Edge Computing: Processing Data at the Source',
      category: 'automation',
      author: 'Rohan Gupta',
      date: '2024-01-05',
      readTime: 9,
      image: '/environment-icon.png',
      excerpt: 'Understanding edge computing and its role in real-time data processing for autonomous systems.',
      content: 'Full article content here...',
      views: 1450,
      likes: 201,
      comments: 29,
      tags: ['Edge Computing', 'Cloud', 'Real-time Processing'],
      featured: false,
    },
    {
      id: 8,
      title: 'Swarm Robotics: Coordinating Multiple Robots',
      category: 'robotics',
      author: 'Meera Nair',
      date: '2024-01-02',
      readTime: 13,
      image: '/disaster-icon.png',
      excerpt: 'Exploring the fascinating world of swarm robotics and how multiple robots coordinate to solve complex tasks.',
      content: 'Full article content here...',
      views: 1780,
      likes: 245,
      comments: 35,
      tags: ['Swarm Robotics', 'Coordination', 'Multi-agent Systems'],
      featured: false,
    },
    {
      id: 9,
      title: 'Computer Vision in Quality Inspection',
      category: 'tutorial',
      author: 'Arjun Singh',
      date: '2023-12-28',
      readTime: 10,
      image: '/robotics-icon.png',
      excerpt: 'Implementing computer vision systems for automated quality inspection in manufacturing.',
      content: 'Full article content here...',
      views: 2340,
      likes: 334,
      comments: 52,
      tags: ['Computer Vision', 'Quality Control', 'Manufacturing'],
      featured: true,
    },
  ];

  const toggleLike = (postId: number) => {
    setLikes(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Filter and sort
  const filteredPosts = useMemo(() => {
    let result = blogPosts;

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'views') {
      result.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'likes') {
      result.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'comments') {
      result.sort((a, b) => b.comments - a.comments);
    } else if (sortBy === 'trending') {
      result.sort((a, b) => (b.views + b.likes * 2 + b.comments * 3) - (a.views + a.likes * 2 + a.comments * 3));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  // Analytics
  const analytics = {
    totalPosts: blogPosts.length,
    totalViews: blogPosts.reduce((sum, p) => sum + p.views, 0),
    totalLikes: blogPosts.reduce((sum, p) => sum + p.likes, 0),
    totalComments: blogPosts.reduce((sum, p) => sum + p.comments, 0),
    avgReadTime: Math.round(blogPosts.reduce((sum, p) => sum + p.readTime, 0) / blogPosts.length),
    featuredPosts: blogPosts.filter(p => p.featured).length,
    categoryBreakdown: categories.map(cat => ({
      name: cat.label,
      count: blogPosts.filter(p => p.category === cat.id).length
    }))
  };

  const featuredPosts = blogPosts.filter(p => p.featured);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Blog & Insights</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Stay updated with the latest trends, tutorials, and insights in robotics, AI, and automation.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Analytics Toggle */}
          <div className="flex justify-end mb-6">
            <Button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              {showAnalytics ? 'Hide' : 'Show'} Analytics
            </Button>
          </div>

          {/* Analytics Dashboard */}
          {showAnalytics && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Blog Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Total Views</p>
                  <p className="text-3xl font-bold text-blue-600">{analytics.totalViews.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Total Likes</p>
                  <p className="text-3xl font-bold text-red-600">{analytics.totalLikes}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Total Comments</p>
                  <p className="text-3xl font-bold text-green-600">{analytics.totalComments}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalPosts}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Featured Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.featuredPosts}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Avg Read Time</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.avgReadTime} min</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Saved Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Posts by Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {analytics.categoryBreakdown.map((cat, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">{cat.name}</p>
                      <p className="text-2xl font-bold text-blue-600">{cat.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Featured Posts Carousel */}
          {featuredPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPosts.slice(0, 3).map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                      <div className="relative h-40 overflow-hidden bg-gray-200">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">Featured</span>
                          <span className="text-xs text-gray-500">{post.readTime} min read</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{post.author}</span>
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search posts by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 font-semibold"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 font-semibold"
              >
                <option value="date">Sort by Date</option>
                <option value="views">Sort by Views</option>
                <option value="likes">Sort by Likes</option>
                <option value="comments">Sort by Comments</option>
                <option value="trending">Sort by Trending</option>
              </select>

              <button
                onClick={() => setCurrentPage(1)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900 font-semibold flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4 fill-blue-600 text-blue-600" />
                Saved ({favorites.length})
              </button>
            </div>
          </div>

          {/* Results Counter */}
          <div className="mb-6 text-sm text-gray-600">
            Showing {paginatedPosts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {paginatedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Post Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <button
                    onClick={() => toggleFavorite(post.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        favorites.includes(post.id)
                          ? 'fill-blue-600 text-blue-600'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Post Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                      {post.readTime} min
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Author</p>
                      <p className="text-sm font-bold text-gray-900">{post.author}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Published</p>
                      <p className="text-sm font-bold text-gray-900">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600 mb-1">Views</p>
                      <p className="text-lg font-bold text-blue-600">{post.views}</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600 mb-1">Likes</p>
                      <p className="text-lg font-bold text-red-600">{post.likes}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600 mb-1">Comments</p>
                      <p className="text-lg font-bold text-green-600">{post.comments}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-all ${
                        likes[post.id]
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likes[post.id] ? 'fill-red-600' : ''}`} />
                      Like
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                      <MessageCircle className="w-4 h-4" />
                      Comment
                    </button>
                  </div>

                  {/* Read More Button */}
                  <Link href={`/blog/${post.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center gap-2 group/btn">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && filteredPosts.length > 0 && (
            <div className="flex justify-center gap-2 mb-12">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100 text-gray-900 font-semibold transition-all"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100 text-gray-900 font-semibold transition-all"
              >
                Next
              </button>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-white text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest articles, tutorials, and insights delivered to your inbox every week.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 font-semibold">
                Subscribe
              </Button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Have a Story to Share?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for guest contributors and industry experts to share their insights and experiences.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg font-semibold">
              Become a Contributor
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
