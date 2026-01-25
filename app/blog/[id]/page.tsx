'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { Calendar, User, Eye, ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  views: number;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/${params.id}`);

      if (!response.ok) {
        throw new Error('Blog post not found');
      }

      const data = await response.json();
      setPost(data.data);

      // Fetch related posts
      fetchRelatedPosts(data.data.category);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load blog post');
      setTimeout(() => router.push('/blog'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (category: string) => {
    try {
      const response = await fetch(`/api/blog?category=${category}&limit=3`);
      if (response.ok) {
        const data = await response.json();
        setRelatedPosts(data.data.filter((p: BlogPost) => p._id !== params.id).slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch related posts:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <>
        <AIChatbot />
        <div className="min-h-screen bg-gray-50 py-12 pt-32 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <AIChatbot />
        <div className="min-h-screen bg-gray-50 py-12 pt-32">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
            <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-semibold">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AIChatbot />
      <div className="min-h-screen bg-gray-50 py-12 pt-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </button>

          {/* Article */}
          <article className="bg-white rounded-lg shadow overflow-hidden">
            {/* Featured Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover"
            />

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                  <button
                    onClick={handleShare}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b pb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.views} views</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?search=${tag}`}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative h-40 bg-gray-100 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {formatDate(relatedPost.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
