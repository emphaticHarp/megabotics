'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '@/components/admin-layout';
import { toast } from 'sonner';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  views: number;
  published: boolean;
  createdAt: string;
}

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string;
  published: boolean;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'Admin',
    category: 'Technology',
    tags: '',
    published: true,
  });

  useEffect(() => {
    fetchPosts();
  }, [page, searchTerm]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });

      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/blog?${params}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      toast.error('Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingId ? `/api/blog/${editingId}` : '/api/blog';
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save post');
      }

      toast.success(editingId ? 'Post updated' : 'Post created');
      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blog/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      toast.success('Post deleted');
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post._id);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      category: post.category,
      tags: post.tags.join(', '),
      published: post.published,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      author: 'Admin',
      category: 'Technology',
      tags: '',
      published: true,
    });
    setShowForm(false);
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const response = await fetch(`/api/blog/${post._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      toast.success(post.published ? 'Post unpublished' : 'Post published');
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600 mt-1">Create and manage blog posts</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No blog posts found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Author</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Views</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{post.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{post.slug}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{post.author}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{post.views}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePublish(post)}
                            className={`p-2 rounded transition-colors ${
                              post.published
                                ? 'hover:bg-red-100 text-red-600'
                                : 'hover:bg-green-100 text-green-600'
                            }`}
                          >
                            {post.published ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 hover:bg-blue-100 text-blue-600 rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post._id)}
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

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 border-b border-gray-200 p-6 flex items-center justify-between bg-white">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? 'Edit Post' : 'Create Post'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Blog post title"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slug (auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="blog-post-title"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Short summary of the post"
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Full blog post content"
                    rows={8}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 font-mono text-sm"
                    required
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Featured Image URL *
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Author */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Admin"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Technology"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="robotics, ai, automation"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* Published */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label htmlFor="published" className="text-sm font-semibold text-gray-700">
                    Publish immediately
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 border-t pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Save Post'}
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
      </div>
    </AdminLayout>
  );
}
