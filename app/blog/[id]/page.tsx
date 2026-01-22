'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useParams } from 'next/navigation';
import { ArrowLeft, Heart, Share2, MessageCircle, Eye, Calendar, User, Bookmark, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState([
    { id: 1, author: 'John Doe', avatar: '👤', text: 'Great article! Very informative.', date: '2024-01-21', likes: 12 },
    { id: 2, author: 'Jane Smith', avatar: '👩', text: 'Loved the insights on autonomous systems.', date: '2024-01-20', likes: 8 },
  ]);

  const blogPosts: Record<number, any> = {
    1: {
      id: 1,
      title: 'The Future of Autonomous Robotics in Manufacturing',
      category: 'robotics',
      author: 'Dr. Rajesh Kumar',
      authorBio: 'Robotics researcher with 15+ years of experience in autonomous systems.',
      date: '2024-01-20',
      readTime: 8,
      image: '/robotics-icon.png',
      excerpt: 'Exploring how autonomous robots are revolutionizing manufacturing processes and increasing productivity by 300%.',
      views: 2450,
      likes: 342,
      comments: 28,
      tags: ['Robotics', 'Manufacturing', 'AI', 'Automation'],
      featured: true,
      content: `
        <h2>Introduction</h2>
        <p>The manufacturing industry is undergoing a significant transformation with the integration of autonomous robotics. These intelligent machines are not just replacing manual labor but are fundamentally changing how we approach production efficiency and quality control.</p>

        <h2>Current State of Autonomous Robotics</h2>
        <p>Today's autonomous robots are equipped with advanced sensors, machine learning algorithms, and real-time decision-making capabilities. They can adapt to changing conditions, learn from their environment, and optimize their operations without human intervention.</p>

        <h3>Key Technologies</h3>
        <ul>
          <li>Computer Vision for quality inspection</li>
          <li>Machine Learning for predictive maintenance</li>
          <li>IoT sensors for real-time monitoring</li>
          <li>AI-powered path planning and navigation</li>
        </ul>

        <h2>Impact on Manufacturing</h2>
        <p>The implementation of autonomous robots has shown remarkable results across various manufacturing sectors:</p>
        <ul>
          <li>300% increase in productivity</li>
          <li>50% reduction in defects</li>
          <li>40% decrease in operational costs</li>
          <li>Improved worker safety</li>
        </ul>

        <h2>Challenges and Solutions</h2>
        <p>While the benefits are clear, there are challenges to overcome:</p>
        <ul>
          <li><strong>Integration:</strong> Seamless integration with existing systems</li>
          <li><strong>Cost:</strong> High initial investment</li>
          <li><strong>Skills Gap:</strong> Need for trained personnel</li>
          <li><strong>Regulatory:</strong> Compliance with safety standards</li>
        </ul>

        <h2>Future Outlook</h2>
        <p>The future of autonomous robotics in manufacturing is incredibly promising. We can expect:</p>
        <ul>
          <li>More affordable and accessible solutions</li>
          <li>Greater autonomy and decision-making capabilities</li>
          <li>Better human-robot collaboration</li>
          <li>Industry-wide adoption across sectors</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Autonomous robotics is not just a trend; it's a fundamental shift in how manufacturing will operate in the future. Organizations that embrace this technology early will gain significant competitive advantages.</p>
      `,
      relatedPosts: [2, 4, 8],
    },
    2: {
      id: 2,
      title: 'Deep Learning Models for Real-time Object Detection',
      category: 'ai',
      author: 'Priya Singh',
      authorBio: 'AI specialist and computer vision expert with expertise in deep learning frameworks.',
      date: '2024-01-18',
      readTime: 12,
      image: '/agriculture-icon.png',
      excerpt: 'A comprehensive guide to implementing state-of-the-art deep learning models for object detection tasks.',
      views: 1890,
      likes: 267,
      comments: 45,
      tags: ['AI', 'Deep Learning', 'Computer Vision', 'Tutorial'],
      featured: true,
      content: `
        <h2>Understanding Object Detection</h2>
        <p>Object detection is a computer vision task that involves identifying and locating objects within an image or video stream. It combines classification and localization to provide both what objects are present and where they are located.</p>

        <h2>Popular Deep Learning Models</h2>
        <h3>YOLO (You Only Look Once)</h3>
        <p>YOLO is a real-time object detection system that frames detection as a single regression problem. It's known for its speed and accuracy.</p>

        <h3>R-CNN Family</h3>
        <p>Region-based CNN models like Faster R-CNN provide high accuracy at the cost of computational speed.</p>

        <h3>SSD (Single Shot MultiBox Detector)</h3>
        <p>SSD balances speed and accuracy, making it suitable for real-time applications.</p>

        <h2>Implementation Guide</h2>
        <p>Here's a step-by-step guide to implementing object detection:</p>
        <ol>
          <li>Choose your model architecture</li>
          <li>Prepare your dataset</li>
          <li>Train the model</li>
          <li>Evaluate performance</li>
          <li>Deploy in production</li>
        </ol>

        <h2>Best Practices</h2>
        <ul>
          <li>Use pre-trained models when possible</li>
          <li>Augment your training data</li>
          <li>Monitor for overfitting</li>
          <li>Optimize for your target hardware</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Deep learning has revolutionized object detection, enabling real-time applications that were previously impossible. By following best practices and choosing the right model for your use case, you can build powerful detection systems.</p>
      `,
      relatedPosts: [1, 6, 9],
    },
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: postComments.length + 1,
        author: 'You',
        avatar: '👤',
        text: commentText,
        date: new Date().toLocaleDateString(),
        likes: 0,
      };
      setPostComments([...postComments, newComment]);
      setCommentText('');
    }
  };

  const post = blogPosts[parseInt(id)];

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Post not found</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleShare = () => {
    const url = `${window.location.origin}/blog/${post.id}`;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="relative h-96 bg-gray-200">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {post.category.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-600">{post.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-all"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-all"
                  >
                    <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 hover:bg-gray-100 rounded-full transition-all"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>

              {/* Article Meta */}
              <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">By</p>
                    <p className="font-semibold text-gray-900">{post.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Published</p>
                    <p className="font-semibold text-gray-900">{new Date(post.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Views</p>
                    <p className="font-semibold text-gray-900">{post.views.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag: string, idx: number) => (
                <span key={idx} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Info */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="text-5xl">👤</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author}</h3>
                <p className="text-gray-600 mb-4">{post.authorBio}</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                  Follow Author
                </Button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Comments ({postComments.length})
            </h3>
            <div className="mb-8">
              <textarea
                placeholder="Share your thoughts..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                rows={4}
              />
              <Button 
                onClick={handleAddComment}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
              >
                Post Comment
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {postComments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{comment.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">{comment.author}</p>
                        <p className="text-sm text-gray-500">{comment.date}</p>
                      </div>
                      <p className="text-gray-700 mb-3">{comment.text}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-all">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{comment.likes}</span>
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Link key={i} href={`/blog/${i}`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer">
                    <div className="relative h-40 bg-gray-200">
                      <img 
                        src={i === 1 ? '/robotics-icon.png' : i === 2 ? '/agriculture-icon.png' : '/infrastructure-icon.png'} 
                        alt="Related article"
                        className="w-full h-full object-cover hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">Related Article Title {i}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">Brief description of the related article goes here.</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Author Name</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Don't Miss Future Articles</h2>
            <p className="text-lg text-blue-100 mb-8">Subscribe to get the latest insights delivered to your inbox.</p>
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
        </div>
      </main>
      <Footer />
    </>
  );
}
