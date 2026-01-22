'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Search, Star, Heart, ArrowRight, Download, Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProjectFiltersAdvanced } from '@/components/project-filters-advanced';
import { ProjectAnalytics } from '@/components/project-analytics';
import { ProjectEmptyState } from '@/components/project-empty-state';
import { ProjectFavoritesView } from '@/components/project-favorites-view';
import { exportProjectsAsCSV, exportProjectsAsPDF } from '@/lib/project-export';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<any>({});
  const itemsPerPage = 6;

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'defense', label: 'Defense' },
    { id: 'disaster', label: 'Disaster Relief' },
    { id: 'environment', label: 'Environment' },
  ];

  const allTechnologies = ['AI', 'Drones', 'IoT', 'ML', 'Robotics', 'Computer Vision', 'Data Analytics', 'Surveillance', 'Real-time Analytics', 'Cloud', 'Automation'];

  const projects = [
    {
      id: 1,
      title: 'Smart Crop Monitoring System',
      category: 'agriculture',
      location: 'Punjab, India',
      date: 'Jan 2024',
      team: 12,
      description: 'Deployed precision mapping drones across 5000+ acres for real-time crop health monitoring and yield prediction.',
      image: '/agriculture-icon.png',
      status: 'Completed',
      impact: '35% increase in yield',
      budget: 2500000,
      duration: 6,
      roi: 320,
      technologies: ['AI', 'Drones', 'IoT', 'ML'],
      teamMembers: ['Raj Kumar', 'Priya Singh', 'Amit Patel'],
      testimonial: 'Exceptional results and professional execution.',
      testimonialAuthor: 'Farmer Association Lead',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Bridge Inspection Automation',
      category: 'infrastructure',
      location: 'Mumbai, India',
      date: 'Dec 2023',
      team: 8,
      description: 'Automated inspection of 50+ bridges using AI-powered robots, reducing inspection time by 70%.',
      image: '/infrastructure-icon.png',
      status: 'Completed',
      impact: '70% time reduction',
      budget: 1800000,
      duration: 4,
      roi: 280,
      technologies: ['Robotics', 'AI', 'Computer Vision'],
      teamMembers: ['Vikram Singh', 'Neha Sharma', 'Rohan Gupta'],
      testimonial: 'Transformed our inspection process completely.',
      testimonialAuthor: 'Infrastructure Ministry',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Border Patrol Enhancement',
      category: 'defense',
      location: 'Rajasthan, India',
      date: 'Nov 2023',
      team: 15,
      description: 'Deployed autonomous surveillance drones for enhanced border security with real-time threat detection.',
      image: '/defence-icon.png',
      status: 'Ongoing',
      impact: '99.2% detection rate',
      budget: 5000000,
      duration: 12,
      roi: 450,
      technologies: ['Drones', 'AI', 'Surveillance', 'Real-time Analytics'],
      teamMembers: ['Col. Rajesh', 'Dr. Ananya', 'Capt. Arjun'],
      testimonial: 'Critical for national security operations.',
      testimonialAuthor: 'Defense Ministry',
      rating: 4.9,
    },
    {
      id: 4,
      title: 'Disaster Response Initiative',
      category: 'disaster',
      location: 'Kerala, India',
      date: 'Oct 2023',
      team: 20,
      description: 'Rapid deployment of rescue robots and drones for flood relief operations, saving 500+ lives.',
      image: '/disaster-icon.png',
      status: 'Completed',
      impact: '500+ lives saved',
      budget: 3000000,
      duration: 3,
      roi: 999,
      technologies: ['Robotics', 'Drones', 'Real-time Analytics'],
      teamMembers: ['Dr. Suresh', 'Meera Nair', 'Arun Pillai'],
      testimonial: 'Saved countless lives during the crisis.',
      testimonialAuthor: 'State Disaster Management',
      rating: 5.0,
    },
    {
      id: 5,
      title: 'Environmental Monitoring Network',
      category: 'environment',
      location: 'Himalayas, India',
      date: 'Sep 2023',
      team: 10,
      description: 'Installed IoT sensors and drones for real-time environmental monitoring and climate data collection.',
      image: '/environment-icon.png',
      status: 'Ongoing',
      impact: '10,000+ data points/day',
      budget: 1500000,
      duration: 8,
      roi: 200,
      technologies: ['IoT', 'Drones', 'Data Analytics', 'Cloud'],
      teamMembers: ['Dr. Vikram', 'Priya Sharma', 'Nikhil Desai'],
      testimonial: 'Invaluable data for climate research.',
      testimonialAuthor: 'Environmental Ministry',
      rating: 4.7,
    },
    {
      id: 6,
      title: 'Smart City Infrastructure',
      category: 'infrastructure',
      location: 'Bangalore, India',
      date: 'Aug 2023',
      team: 18,
      description: 'Integrated robotics and automation for smart city infrastructure management and maintenance.',
      image: '/infrastructure-icon.png',
      status: 'Ongoing',
      impact: '40% efficiency gain',
      budget: 4000000,
      duration: 10,
      roi: 350,
      technologies: ['Robotics', 'IoT', 'AI', 'Automation'],
      teamMembers: ['Rajesh Kumar', 'Anjali Verma', 'Sanjay Rao'],
      testimonial: 'Best smart city implementation in India.',
      testimonialAuthor: 'City Administration',
      rating: 4.8,
    },
    {
      id: 7,
      title: 'Agricultural Automation Hub',
      category: 'agriculture',
      location: 'Haryana, India',
      date: 'Jul 2023',
      team: 14,
      description: 'Established automation center for precision farming with collaborative robots and AI systems.',
      image: '/agriculture-icon.png',
      status: 'Completed',
      impact: '50% cost reduction',
      budget: 2200000,
      duration: 5,
      roi: 310,
      technologies: ['Robotics', 'AI', 'Automation'],
      teamMembers: ['Harpreet Singh', 'Kavya Nair', 'Deepak Sharma'],
      testimonial: 'Revolutionized farming practices in the region.',
      testimonialAuthor: 'Agricultural Department',
      rating: 4.7,
    },
    {
      id: 8,
      title: 'Coastal Defense System',
      category: 'defense',
      location: 'Goa, India',
      date: 'Jun 2023',
      team: 16,
      description: 'Advanced surveillance and defense system for coastal security with autonomous patrol units.',
      image: '/defence-icon.png',
      status: 'Completed',
      impact: '100% coverage',
      budget: 3500000,
      duration: 7,
      roi: 400,
      technologies: ['Drones', 'Surveillance', 'AI'],
      teamMembers: ['Adm. Vikram', 'Lt. Sharma', 'Cdr. Patel'],
      testimonial: 'Enhanced coastal security significantly.',
      testimonialAuthor: 'Navy Command',
      rating: 4.9,
    },
  ];

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = projects;

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(p => p.status.toLowerCase() === statusFilter.toLowerCase());
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Advanced filters
    if (advancedFilters.budgetMin !== null && advancedFilters.budgetMin !== undefined) {
      result = result.filter(p => p.budget >= advancedFilters.budgetMin);
    }
    if (advancedFilters.budgetMax !== null && advancedFilters.budgetMax !== undefined) {
      result = result.filter(p => p.budget <= advancedFilters.budgetMax);
    }
    if (advancedFilters.roiMin !== null && advancedFilters.roiMin !== undefined) {
      result = result.filter(p => p.roi >= advancedFilters.roiMin);
    }
    if (advancedFilters.roiMax !== null && advancedFilters.roiMax !== undefined) {
      result = result.filter(p => p.roi <= advancedFilters.roiMax);
    }
    if (advancedFilters.teamMin !== null && advancedFilters.teamMin !== undefined) {
      result = result.filter(p => p.team >= advancedFilters.teamMin);
    }
    if (advancedFilters.teamMax !== null && advancedFilters.teamMax !== undefined) {
      result = result.filter(p => p.team <= advancedFilters.teamMax);
    }
    if (advancedFilters.durationMin !== null && advancedFilters.durationMin !== undefined) {
      result = result.filter(p => p.duration >= advancedFilters.durationMin);
    }
    if (advancedFilters.durationMax !== null && advancedFilters.durationMax !== undefined) {
      result = result.filter(p => p.duration <= advancedFilters.durationMax);
    }
    if (advancedFilters.selectedTechs && advancedFilters.selectedTechs.length > 0) {
      result = result.filter(p =>
        advancedFilters.selectedTechs.some((tech: string) => p.technologies.includes(tech))
      );
    }

    // Sorting
    if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'impact') {
      result.sort((a, b) => b.roi - a.roi);
    } else if (sortBy === 'team') {
      result.sort((a, b) => b.team - a.team);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, statusFilter, searchQuery, sortBy, advancedFilters]);

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

  const favoriteProjects = projects.filter(p => favorites.includes(p.id));

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setStatusFilter('all');
    setSearchQuery('');
    setSortBy('date');
    setAdvancedFilters({});
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Showcasing innovative robotics and automation solutions deployed across India, transforming industries and saving lives.
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
              <Eye className="w-4 h-4" />
              {showAnalytics ? 'Hide' : 'Show'} Analytics
            </Button>
          </div>

          {/* Analytics Dashboard */}
          {showAnalytics && <ProjectAnalytics projects={projects} />}

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects by name, location, or description..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 font-semibold"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 mb-8">
            {/* Category Filter */}
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

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 font-semibold"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 font-semibold"
            >
              <option value="date">Sort by Date</option>
              <option value="impact">Sort by Impact (ROI)</option>
              <option value="team">Sort by Team Size</option>
              <option value="rating">Sort by Rating</option>
            </select>

            {/* Advanced Filters */}
            <ProjectFiltersAdvanced
              onFilterChange={setAdvancedFilters}
              technologies={allTechnologies}
            />

            {/* Export Buttons */}
            <button
              onClick={() => exportProjectsAsCSV(filteredProjects)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900 font-semibold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              CSV
            </button>
            <button
              onClick={() => exportProjectsAsPDF(filteredProjects)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900 font-semibold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>

            {/* Favorites Button */}
            <button
              onClick={() => setShowFavorites(true)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900 font-semibold flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              Favorites ({favorites.length})
            </button>
          </div>

          {/* Results Counter */}
          <div className="mb-6 text-sm text-gray-600 flex justify-between items-center">
            <span>
              Showing {paginatedProjects.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
            </span>
            {Object.keys(advancedFilters).some(key => advancedFilters[key] !== null && advancedFilters[key] !== undefined && advancedFilters[key].length > 0) && (
              <button
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Projects Grid or Empty State */}
          {filteredProjects.length === 0 ? (
            <ProjectEmptyState onClearFilters={clearAllFilters} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          project.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleFavorite(project.id)}
                      className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(project.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 flex-1">{project.title}</h3>
                      <div className="flex items-center gap-1 ml-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-700">{project.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                    {/* Project Meta */}
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>📍 {project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📅 {project.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👥 {project.team} team members</span>
                      </div>
                    </div>

                    {/* Impact & Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-blue-600 uppercase">Impact</p>
                        <p className="text-sm font-bold text-gray-900">{project.impact}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-green-600 uppercase">ROI</p>
                        <p className="text-sm font-bold text-gray-900">{project.roi}%</p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link href={`/projects/${project.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center gap-2 group/btn">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

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

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">{projects.length}+</p>
                <p className="text-blue-100">Active Projects</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">500+</p>
                <p className="text-blue-100">Lives Saved</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">50K+</p>
                <p className="text-blue-100">Acres Covered</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">99.2%</p>
                <p className="text-blue-100">Success Rate</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Industry?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Partner with MEGABOTICS to deploy cutting-edge robotics and automation solutions for your organization.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg">
              Get in Touch
            </Button>
          </div>
        </div>
      </main>

      {/* Favorites Modal */}
      {showFavorites && (
        <ProjectFavoritesView
          favorites={favoriteProjects}
          onRemoveFavorite={toggleFavorite}
          onClose={() => setShowFavorites(false)}
        />
      )}

      <Footer />
    </>
  );
}
