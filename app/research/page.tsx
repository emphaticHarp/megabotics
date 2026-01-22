'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Beaker, Lightbulb, TrendingUp, Users, Calendar, ArrowRight, Search, Filter, Heart, Download, Share2, Eye, BarChart3, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function ResearchPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    { id: 'all', label: 'All Research' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'robotics', label: 'Robotics' },
    { id: 'automation', label: 'Automation' },
    { id: 'iot', label: 'IoT' },
    { id: 'computer-vision', label: 'Computer Vision' },
  ];

  const researchProjects = [
    {
      id: 1,
      title: 'Advanced Neural Networks for Autonomous Systems',
      category: 'ai',
      date: 'Mar 2024',
      status: 'In Progress',
      team: 8,
      description: 'Developing cutting-edge neural network architectures for real-time decision making in autonomous robotics systems.',
      image: '🧠',
      progress: 65,
      budget: '₹50 Lakh',
      publications: 3,
      patents: 1,
      collaborators: ['IIT Delhi', 'CSIR', 'Tech Startups'],
      impact: 'High',
      technologies: ['TensorFlow', 'PyTorch', 'CUDA'],
    },
    {
      id: 2,
      title: 'Collaborative Robot Learning Framework',
      category: 'robotics',
      date: 'Feb 2024',
      status: 'In Progress',
      team: 12,
      description: 'Research on human-robot collaboration and adaptive learning systems for industrial automation.',
      image: '🤖',
      progress: 45,
      budget: '₹75 Lakh',
      publications: 5,
      patents: 2,
      collaborators: ['MIT', 'Carnegie Mellon', 'Industry Partners'],
      impact: 'Very High',
      technologies: ['ROS', 'Gazebo', 'Python'],
    },
    {
      id: 3,
      title: 'Real-time Computer Vision for Inspection',
      category: 'computer-vision',
      date: 'Jan 2024',
      status: 'Completed',
      team: 6,
      description: 'Advanced computer vision algorithms for automated quality inspection and defect detection.',
      image: '👁️',
      progress: 100,
      budget: '₹30 Lakh',
      publications: 4,
      patents: 1,
      collaborators: ['Stanford', 'Berkeley'],
      impact: 'High',
      technologies: ['OpenCV', 'YOLO', 'Deep Learning'],
    },
    {
      id: 4,
      title: 'IoT Sensor Network Optimization',
      category: 'iot',
      date: 'Dec 2023',
      status: 'Completed',
      team: 7,
      description: 'Optimizing IoT sensor networks for low-power, high-accuracy environmental monitoring.',
      image: '📡',
      progress: 100,
      budget: '₹25 Lakh',
      publications: 2,
      patents: 0,
      collaborators: ['NIT Rourkee', 'Tech Companies'],
      impact: 'Medium',
      technologies: ['MQTT', 'LoRaWAN', 'Edge Computing'],
    },
    {
      id: 5,
      title: 'Autonomous Navigation in Complex Environments',
      category: 'robotics',
      date: 'Nov 2023',
      status: 'In Progress',
      team: 10,
      description: 'Developing robust autonomous navigation systems for robots in unstructured environments.',
      image: '🗺️',
      progress: 55,
      budget: '₹60 Lakh',
      publications: 6,
      patents: 3,
      collaborators: ['CMU', 'ETH Zurich', 'Research Labs'],
      impact: 'Very High',
      technologies: ['SLAM', 'Path Planning', 'Sensor Fusion'],
    },
    {
      id: 6,
      title: 'Predictive Maintenance Using ML',
      category: 'ai',
      date: 'Oct 2023',
      status: 'In Progress',
      team: 9,
      description: 'Machine learning models for predictive maintenance and anomaly detection in industrial systems.',
      image: '🔧',
      progress: 70,
      budget: '₹40 Lakh',
      publications: 3,
      patents: 1,
      collaborators: ['IISc Bangalore', 'Industry'],
      impact: 'High',
      technologies: ['Scikit-learn', 'XGBoost', 'Time Series Analysis'],
    },
    {
      id: 7,
      title: 'Edge Computing for Real-time Processing',
      category: 'automation',
      date: 'Sep 2023',
      status: 'Completed',
      team: 8,
      description: 'Implementing edge computing solutions for real-time data processing in distributed systems.',
      image: '⚡',
      progress: 100,
      budget: '₹35 Lakh',
      publications: 4,
      patents: 2,
      collaborators: ['Google Cloud', 'AWS', 'Tech Partners'],
      impact: 'High',
      technologies: ['Kubernetes', 'Docker', 'TensorFlow Lite'],
    },
    {
      id: 8,
      title: 'Swarm Robotics Coordination',
      category: 'robotics',
      date: 'Aug 2023',
      status: 'In Progress',
      team: 11,
      description: 'Research on coordinated behavior of multiple robots for collaborative tasks.',
      image: '🐝',
      progress: 50,
      budget: '₹55 Lakh',
      publications: 7,
      patents: 2,
      collaborators: ['Harvard', 'MIT', 'Research Centers'],
      impact: 'Very High',
      technologies: ['Multi-agent Systems', 'Distributed Control', 'Simulation'],
    },
  ];

  // Filter and sort
  const filteredProjects = useMemo(() => {
    let result = researchProjects;

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'progress') {
      result.sort((a, b) => b.progress - a.progress);
    } else if (sortBy === 'impact') {
      const impactOrder = { 'Very High': 3, 'High': 2, 'Medium': 1 };
      result.sort((a, b) => (impactOrder[b.impact as keyof typeof impactOrder] || 0) - (impactOrder[a.impact as keyof typeof impactOrder] || 0));
    } else if (sortBy === 'budget') {
      result.sort((a, b) => {
        const budgetA = parseInt(a.budget.replace(/[^0-9]/g, ''));
        const budgetB = parseInt(b.budget.replace(/[^0-9]/g, ''));
        return budgetB - budgetA;
      });
    } else if (sortBy === 'team') {
      result.sort((a, b) => b.team - a.team);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const favoriteProjects = researchProjects.filter(p => favorites.includes(p.id));

  // Calculate analytics
  const analytics = {
    totalProjects: researchProjects.length,
    activeProjects: researchProjects.filter(p => p.status === 'In Progress').length,
    completedProjects: researchProjects.filter(p => p.status === 'Completed').length,
    totalBudget: researchProjects.reduce((sum, p) => sum + parseInt(p.budget.replace(/[^0-9]/g, '')), 0),
    totalPublications: researchProjects.reduce((sum, p) => sum + p.publications, 0),
    totalPatents: researchProjects.reduce((sum, p) => sum + p.patents, 0),
    avgTeamSize: Math.round(researchProjects.reduce((sum, p) => sum + p.team, 0) / researchProjects.length),
    categoryBreakdown: categories.map(cat => ({
      name: cat.label,
      count: researchProjects.filter(p => p.category === cat.id).length
    }))
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <Beaker className="w-8 h-8" />
              <h1 className="text-4xl font-bold">Research & Development</h1>
            </div>
            <p className="text-lg text-blue-100 max-w-2xl">
              Pioneering cutting-edge research in robotics, AI, and automation. Pushing the boundaries of what's possible.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Analytics Toggle */}
          <div className="flex justify-end mb-6">
            <Button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              {showAnalytics ? 'Hide' : 'Show'} Analytics
            </Button>
          </div>

          {/* Analytics Dashboard */}
          {showAnalytics && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Research Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Total Projects</p>
                  <p className="text-3xl font-bold text-purple-600">{analytics.totalProjects}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Active Projects</p>
                  <p className="text-3xl font-bold text-blue-600">{analytics.activeProjects}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{analytics.completedProjects}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Avg Team Size</p>
                  <p className="text-3xl font-bold text-orange-600">{analytics.avgTeamSize}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Total Budget</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(analytics.totalBudget / 100000).toFixed(1)} Lakh</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Publications</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalPublications}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Patents Filed</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalPatents}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Projects by Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {analytics.categoryBreakdown.map((cat, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">{cat.name}</p>
                      <p className="text-2xl font-bold text-purple-600">{cat.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
              <p className="text-sm text-gray-600 mb-2">Active Projects</p>
              <p className="text-3xl font-bold text-purple-600">5</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
              <p className="text-sm text-gray-600 mb-2">Publications</p>
              <p className="text-3xl font-bold text-blue-600">34</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <p className="text-sm text-gray-600 mb-2">Patents Filed</p>
              <p className="text-3xl font-bold text-green-600">12</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600">
              <p className="text-sm text-gray-600 mb-2">Research Team</p>
              <p className="text-3xl font-bold text-orange-600">70+</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search research projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 font-semibold"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-purple-600 text-white shadow-lg'
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
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 font-semibold"
              >
                <option value="date">Sort by Date</option>
                <option value="progress">Sort by Progress</option>
                <option value="impact">Sort by Impact</option>
                <option value="budget">Sort by Budget</option>
                <option value="team">Sort by Team Size</option>
              </select>
            </div>
          </div>

          {/* Results Counter & Favorites */}
          <div className="mb-6 text-sm text-gray-600 flex justify-between items-center">
            <span>
              Showing {paginatedProjects.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
            </span>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900 font-semibold flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              Favorites ({favorites.length})
            </button>
          </div>

          {/* Research Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {paginatedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-gray-200 relative">
                  <button
                    onClick={() => toggleFavorite(project.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(project.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{project.image}</div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-purple-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Team Size</p>
                      <p className="text-lg font-bold text-gray-900">{project.team}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Budget</p>
                      <p className="text-lg font-bold text-gray-900">{project.budget}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Publications</p>
                      <p className="text-lg font-bold text-gray-900">{project.publications}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Patents</p>
                      <p className="text-lg font-bold text-gray-900">{project.patents}</p>
                    </div>
                  </div>

                  {/* Impact Badge */}
                  <div className="mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      project.impact === 'Very High'
                        ? 'bg-red-100 text-red-700'
                        : project.impact === 'High'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      Impact: {project.impact}
                    </span>
                  </div>

                  {/* Collaborators */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Collaborators</p>
                    <div className="flex flex-wrap gap-2">
                      {project.collaborators.map((collab, idx) => (
                        <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {collab}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link href={`/research/${project.id}`}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center gap-2 group/btn">
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && filteredProjects.length > 0 && (
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
                      ? 'bg-purple-600 text-white'
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

          {/* Research Areas Section */}
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Lightbulb className="w-8 h-8 text-purple-600" />
              Our Research Areas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Artificial Intelligence', desc: 'Deep learning, neural networks, and intelligent systems' },
                { title: 'Robotics', desc: 'Autonomous systems, collaborative robots, and swarm robotics' },
                { title: 'Computer Vision', desc: 'Image processing, object detection, and visual analytics' },
                { title: 'IoT & Sensors', desc: 'Sensor networks, edge computing, and data collection' },
                { title: 'Automation', desc: 'Process automation, workflow optimization, and control systems' },
                { title: 'Machine Learning', desc: 'Predictive models, anomaly detection, and data science' },
              ].map((area, idx) => (
                <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all">
                  <h3 className="font-bold text-gray-900 mb-2">{area.title}</h3>
                  <p className="text-gray-600 text-sm">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Research Opportunities */}
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Zap className="w-8 h-8 text-purple-600" />
              Research Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Industry Partnerships</h3>
                <p className="text-gray-600 mb-4">Collaborate with leading companies to develop practical solutions for real-world challenges.</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Joint research initiatives</li>
                  <li>✓ Technology transfer programs</li>
                  <li>✓ Commercialization support</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Academic Collaborations</h3>
                <p className="text-gray-600 mb-4">Partner with top universities and research institutions globally.</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Student internships</li>
                  <li>✓ Faculty exchange programs</li>
                  <li>✓ Joint publications</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Funding Opportunities</h3>
                <p className="text-gray-600 mb-4">Access grants and funding for innovative research projects.</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Government grants</li>
                  <li>✓ Private funding</li>
                  <li>✓ Venture capital</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Talent Development</h3>
                <p className="text-gray-600 mb-4">Build and nurture a world-class research team.</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Training programs</li>
                  <li>✓ Mentorship opportunities</li>
                  <li>✓ Career advancement</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Collaborate With Us</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Interested in partnering on research projects? Let's innovate together and shape the future of robotics and automation.
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold">
              Start a Collaboration
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
