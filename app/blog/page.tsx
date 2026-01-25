'use client';

import { useState, useEffect } from 'react';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { Search, Calendar, User, Eye } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  views: number;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
  }, [search, category, page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9',
      });

      if (search) params.append('search', search);
      if (category) params.append('category', category);

      const response = await fetch(`/api/blog?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const data = await response.json();
      setPosts(data.data);
      setTotalPages(data.pagination.pages);

      // Extract unique categories
      if (page === 1) {
        const uniqueCategories = [...new Set(data.data.map((post: BlogPost) => post.category))];
        setCategories(uniqueCategories as string[]);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <>
      <AIChatbot />
      <div className="min-h-screen bg-gray-50 py-12 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-gray-600 text-lg">
              Insights, tips, and updates about robotics and automation
            </p>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No posts found</h2>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.createdAt)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-600 disabled:opacity-50 transition-colors"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        page === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'border-2 border-gray-200 hover:border-blue-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-600 disabled:opacity-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
