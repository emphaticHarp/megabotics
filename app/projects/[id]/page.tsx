'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ArrowLeft, MapPin, Calendar, Users, Star, Download, Share2, Heart, ChevronRight, Zap, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { generateProjectPDF, shareProject } from '@/lib/pdf-utils';

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock project data - in real app, fetch from API
  const projectsData: Record<number, any> = {
    1: {
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
      budget: '$2500000',
      duration: '6 months',
      roi: '320%',
      technologies: ['AI', 'Drones', 'IoT', 'ML', 'Computer Vision', 'Data Analytics'],
      teamMembers: [
        { name: 'Raj Kumar', role: 'Project Lead', image: '👨‍💼' },
        { name: 'Priya Singh', role: 'AI Specialist', image: '👩‍💻' },
        { name: 'Amit Patel', role: 'Drone Operator', image: '👨‍🔧' },
      ],
      testimonial: 'Exceptional results and professional execution. The system has transformed our farming operations.',
      testimonialAuthor: 'Farmer Association Lead',
      testimonialRole: 'Agricultural Department',
      rating: 4.8,
      timeline: [
        { phase: 'Planning & Design', duration: '1 month', status: 'Completed' },
        { phase: 'Development', duration: '2 months', status: 'Completed' },
        { phase: 'Testing & Deployment', duration: '2 months', status: 'Completed' },
        { phase: 'Optimization', duration: '1 month', status: 'Completed' },
      ],
      gallery: ['/agriculture-icon.png', '/agriculture-icon.png', '/agriculture-icon.png'],
      metrics: [
        { label: 'Acres Monitored', value: '5000+' },
        { label: 'Data Points/Day', value: '50K+' },
        { label: 'Accuracy Rate', value: '98.5%' },
        { label: 'Cost Savings', value: '$180K' },
      ],
      challenges: [
        'Real-time data processing at scale',
        'Integration with existing farm systems',
        'Weather-resistant drone operations',
      ],
      solutions: [
        'Cloud-based ML pipeline for instant analysis',
        'Custom API development for seamless integration',
        'Advanced weatherproofing and autonomous flight systems',
      ],
    },
    2: {
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
      budget: '$1800000',
      duration: '4 months',
      roi: '280%',
      technologies: ['Robotics', 'AI', 'Computer Vision', 'IoT', 'Data Analytics'],
      teamMembers: [
        { name: 'Vikram Singh', role: 'Project Lead', image: '👨‍💼' },
        { name: 'Neha Sharma', role: 'Robotics Engineer', image: '👩‍🔬' },
        { name: 'Rohan Gupta', role: 'Software Developer', image: '👨‍💻' },
      ],
      testimonial: 'Transformed our inspection process completely. Safety and efficiency improved dramatically.',
      testimonialAuthor: 'Infrastructure Ministry',
      testimonialRole: 'Government of India',
      rating: 4.9,
      timeline: [
        { phase: 'Requirements Analysis', duration: '2 weeks', status: 'Completed' },
        { phase: 'Robot Development', duration: '6 weeks', status: 'Completed' },
        { phase: 'AI Model Training', duration: '4 weeks', status: 'Completed' },
        { phase: 'Field Testing', duration: '2 weeks', status: 'Completed' },
      ],
      gallery: ['/infrastructure-icon.png', '/infrastructure-icon.png', '/infrastructure-icon.png'],
      metrics: [
        { label: 'Bridges Inspected', value: '50+' },
        { label: 'Time Reduction', value: '70%' },
        { label: 'Defects Detected', value: '1000+' },
        { label: 'Safety Incidents', value: '0' },
      ],
      challenges: [
        'Complex bridge geometries',
        'Real-time defect classification',
        'Autonomous navigation in confined spaces',
      ],
      solutions: [
        '3D mapping and adaptive pathfinding',
        'Deep learning models trained on 10K+ images',
        'Advanced sensor fusion and obstacle avoidance',
      ],
    },
  };

  const project = projectsData[projectId] || projectsData[1];

  const relatedProjects = [
    { id: 3, title: 'Border Patrol Enhancement', category: 'defense', image: '/defence-icon.png' },
    { id: 4, title: 'Disaster Response Initiative', category: 'disaster', image: '/disaster-icon.png' },
    { id: 5, title: 'Environmental Monitoring Network', category: 'environment', image: '/environment-icon.png' },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-cyan-50 relative">
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/projects" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Projects
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold">{project.title}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl overflow-hidden mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Content Section */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="p-2 hover:bg-white rounded-full transition-all"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          isFavorite
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
                  <p className="text-lg text-gray-600 mb-6">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    onClick={() => generateProjectPDF(project.title, project)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Report
                  </Button>
                  <Button 
                    onClick={() => shareProject(project.title, typeof window !== 'undefined' ? window.location.href : '')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-full flex items-center gap-2 font-semibold"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Project
                  </Button>
                </div>
              </div>
              
              {/* Image Section - Full Height */}
              <div className="h-96 md:h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Project Info Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Project Rating</p>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold text-gray-900">{project.rating}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Budget</p>
                <p className="text-xl font-bold text-gray-900">{project.budget}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Duration</p>
                <p className="text-xl font-bold text-gray-900">{project.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">ROI</p>
                <p className="text-xl font-bold text-green-600">{project.roi}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            {['overview', 'timeline', 'team', 'gallery', 'testimonials'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-semibold border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-gray-200 text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2 space-y-8">
                {/* Key Metrics */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Metrics</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((metric: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-lg p-4 shadow-md">
                        <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                        <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Technologies Used</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech: string, idx: number) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Challenges</h3>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge: string, idx: number) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-red-500 font-bold">•</span>
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Solutions</h3>
                    <ul className="space-y-3">
                      {project.solutions.map((solution: string, idx: number) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-green-500 font-bold">✓</span>
                          <span className="text-gray-700">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Project Details</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-gray-600">Location</p>
                        <p className="font-semibold text-gray-900">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-gray-600">Completion Date</p>
                        <p className="font-semibold text-gray-900">{project.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-gray-600">Team Size</p>
                        <p className="font-semibold text-gray-900">{project.team} members</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-gray-600">ROI</p>
                        <p className="font-semibold text-green-600">{project.roi}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg text-white p-6">
                  <h3 className="font-semibold mb-4">Impact Summary</h3>
                  <p className="text-lg font-bold mb-4">{project.impact}</p>
                  <p className="text-blue-100 text-sm">This project has delivered significant value and measurable results for the organization.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Project Timeline</h2>
              <div className="space-y-6">
                {project.timeline.map((phase: any, idx: number) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      {idx < project.timeline.length - 1 && (
                        <div className="w-1 h-16 bg-blue-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-lg font-bold text-gray-900">{phase.phase}</h3>
                      <p className="text-gray-600 mb-2">{phase.duration}</p>
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {phase.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Project Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.teamMembers.map((member: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-5xl mb-4">{member.image}</div>
                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.gallery.map((image: string, idx: number) => (
                  <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg h-64 flex items-center justify-center overflow-hidden hover:shadow-lg transition-all">
                    <img src={image} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Client Testimonial</h2>
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_: any, i: number) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-6 italic">"{project.testimonial}"</p>
                <div>
                  <p className="font-bold text-gray-900">{project.testimonialAuthor}</p>
                  <p className="text-gray-600">{project.testimonialRole}</p>
                </div>
              </div>
            </div>
          )}

          {/* Related Projects */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relProject: any) => (
                <Link key={relProject.id} href={`/projects/${relProject.id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                    <div className="h-48 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center overflow-hidden">
                      <img src={relProject.image} alt={relProject.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-blue-600 font-semibold uppercase mb-2">{relProject.category}</p>
                      <h3 className="font-bold text-gray-900">{relProject.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Interested in Similar Solutions?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how MEGABOTICS can help transform your organization with cutting-edge robotics and automation.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold">
              Schedule a Consultation
            </Button>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
