'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Briefcase, MapPin, Clock, Users, Zap, Heart, TrendingUp, Award, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const departments = [
    { id: 'all', label: 'All Departments' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'product', label: 'Product' },
    { id: 'sales', label: 'Sales & Marketing' },
    { id: 'operations', label: 'Operations' },
    { id: 'hr', label: 'Human Resources' },
  ];

  const locations = [
    { id: 'all', label: 'All Locations' },
    { id: 'bangalore', label: 'Bangalore' },
    { id: 'delhi', label: 'Delhi' },
    { id: 'mumbai', label: 'Mumbai' },
    { id: 'remote', label: 'Remote' },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior Robotics Engineer',
      department: 'engineering',
      location: 'bangalore',
      type: 'Full-time',
      level: 'Senior',
      salary: '₹20-30 LPA',
      description: 'Lead the development of next-generation autonomous robots.',
      requirements: ['5+ years experience', 'ROS expertise', 'C++ proficiency', 'ML knowledge'],
      benefits: ['Health Insurance', 'Stock Options', 'Remote Work', 'Learning Budget'],
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      department: 'engineering',
      location: 'bangalore',
      type: 'Full-time',
      level: 'Mid-level',
      salary: '₹15-22 LPA',
      description: 'Develop machine learning models for autonomous systems.',
      requirements: ['3+ years experience', 'Python expertise', 'TensorFlow/PyTorch', 'Computer Vision'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Conference Budget'],
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'product',
      location: 'bangalore',
      type: 'Full-time',
      level: 'Mid-level',
      salary: '₹18-25 LPA',
      description: 'Shape the future of our robotics products.',
      requirements: ['4+ years PM experience', 'B2B SaaS', 'Technical background', 'Analytics skills'],
      benefits: ['Health Insurance', 'Stock Options', 'Flexible Work', 'Professional Development'],
    },
    {
      id: 4,
      title: 'Sales Executive',
      department: 'sales',
      location: 'delhi',
      type: 'Full-time',
      level: 'Entry-level',
      salary: '₹8-12 LPA',
      description: 'Drive sales growth in enterprise robotics solutions.',
      requirements: ['2+ years sales experience', 'B2B sales', 'CRM proficiency', 'Communication skills'],
      benefits: ['Commission', 'Health Insurance', 'Car Allowance', 'Travel Opportunities'],
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'remote',
      type: 'Full-time',
      level: 'Mid-level',
      salary: '₹14-20 LPA',
      description: 'Build and maintain our cloud infrastructure.',
      requirements: ['3+ years DevOps', 'Kubernetes', 'AWS/GCP', 'CI/CD pipelines'],
      benefits: ['Health Insurance', 'Remote Work', 'Learning Budget', 'Flexible Hours'],
    },
    {
      id: 6,
      title: 'Marketing Manager',
      department: 'sales',
      location: 'mumbai',
      type: 'Full-time',
      level: 'Mid-level',
      salary: '₹12-18 LPA',
      description: 'Lead marketing initiatives for robotics solutions.',
      requirements: ['4+ years marketing', 'Digital marketing', 'Content strategy', 'Analytics'],
      benefits: ['Health Insurance', 'Stock Options', 'Flexible Work', 'Creative Freedom'],
    },
    {
      id: 7,
      title: 'HR Manager',
      department: 'hr',
      location: 'bangalore',
      type: 'Full-time',
      level: 'Mid-level',
      salary: '₹10-15 LPA',
      description: 'Build and nurture our growing team.',
      requirements: ['3+ years HR', 'Recruitment', 'Employee relations', 'HRIS knowledge'],
      benefits: ['Health Insurance', 'Flexible Work', 'Professional Development', 'Team Events'],
    },
    {
      id: 8,
      title: 'Frontend Developer',
      department: 'engineering',
      location: 'remote',
      type: 'Full-time',
      level: 'Entry-level',
      salary: '₹10-15 LPA',
      description: 'Build beautiful user interfaces for our platform.',
      requirements: ['2+ years React', 'TypeScript', 'UI/UX basics', 'Git proficiency'],
      benefits: ['Health Insurance', 'Remote Work', 'Learning Budget', 'Mentorship'],
    },
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
      const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
      return matchesSearch && matchesDepartment && matchesLocation;
    });
  }, [searchQuery, selectedDepartment, selectedLocation]);

  const benefits = [
    { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive health insurance and wellness programs' },
    { icon: TrendingUp, title: 'Growth Opportunities', desc: 'Career development and learning opportunities' },
    { icon: Award, title: 'Competitive Salary', desc: 'Market-competitive compensation packages' },
    { icon: Users, title: 'Great Team', desc: 'Work with talented and passionate professionals' },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Help us build the future of robotics and automation. We're looking for talented individuals to join our mission.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
                  <Icon className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search jobs by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 font-semibold"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 font-semibold"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.label}</option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 font-semibold"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Counter */}
          <div className="mb-6 text-sm text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} positions
          </div>

          {/* Job Listings */}
          <div className="space-y-4 mb-12">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                          {job.level}
                        </span>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                          {job.type}
                        </span>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                          {job.salary}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="capitalize">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span className="capitalize">{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Requirements:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Benefits:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, idx) => (
                        <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center gap-2">
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No positions found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
              </div>
            )}
          </div>

          {/* Company Culture Section */}
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Join MEGABOTICS?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Innovation First', desc: 'Work on cutting-edge robotics and AI technologies that shape the future.' },
                { title: 'Talented Team', desc: 'Collaborate with brilliant minds from diverse backgrounds and expertise.' },
                { title: 'Growth Mindset', desc: 'Continuous learning opportunities and career development programs.' },
                { title: 'Impact', desc: 'Your work directly impacts millions of lives through our solutions.' },
                { title: 'Work-Life Balance', desc: 'Flexible work arrangements and comprehensive wellness programs.' },
                { title: 'Competitive Perks', desc: 'Competitive salary, stock options, and industry-leading benefits.' },
              ].map((item, idx) => (
                <div key={idx} className="border-l-4 border-purple-600 pl-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Don't see the right role?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and let's talk about opportunities.
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold">
              Send Your Resume
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
