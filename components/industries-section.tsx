'use client';

import { useState } from 'react';
import Image from 'next/image';

const industriesData = [
  {
    id: 1,
    image: '/agriculture-icon.png',
    title: 'Agriculture',
    desc: 'Precision farming & crop monitoring',
    details: 'Smart farming solutions',
    fullDescription: 'Transform agricultural practices with AI-powered precision farming, real-time crop monitoring, and predictive analytics for optimal yield management.',
    benefits: ['Increased crop yields by 30%', 'Reduced water usage by 40%', 'Real-time monitoring', 'Predictive analytics'],
  },
  {
    id: 2,
    image: '/disaster-icon.png',
    title: 'Disaster Management',
    desc: 'Emergency response & rescue ops',
    details: 'Rapid response systems',
    fullDescription: 'Enable rapid emergency response with autonomous drones and AI systems for disaster assessment, rescue coordination, and real-time situational awareness.',
    benefits: ['Faster response times', 'Improved safety', 'Real-time assessment', 'Coordinated operations'],
  },
  {
    id: 3,
    image: '/defence-icon.png',
    title: 'Defence & Security',
    desc: 'Advanced surveillance systems',
    details: 'Secure operations',
    fullDescription: 'Enhance national security with advanced surveillance systems, autonomous monitoring, and intelligent threat detection capabilities.',
    benefits: ['24/7 monitoring', 'Threat detection', 'Secure operations', 'Real-time alerts'],
  },
  {
    id: 4,
    image: '/environment-icon.png',
    title: 'Environmental Monitoring',
    desc: 'Climate & ecosystem tracking',
    details: 'Real-time monitoring',
    fullDescription: 'Monitor environmental changes with precision sensors and AI analytics for climate tracking, ecosystem health, and sustainability initiatives.',
    benefits: ['Climate tracking', 'Ecosystem health', 'Sustainability', 'Data-driven decisions'],
  },
  {
    id: 5,
    image: '/infrastructure-icon.png',
    title: 'Smart Infrastructure',
    desc: 'Urban automation solutions',
    details: 'Connected cities',
    fullDescription: 'Build connected smart cities with IoT integration, automated systems, and intelligent infrastructure management for sustainable urban development.',
    benefits: ['Connected systems', 'Automated management', 'Sustainability', 'Urban efficiency'],
  },
];

export function IndustriesSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedIndustry = industriesData.find(ind => ind.id === selectedId);

  return (
    <div className="relative py-20 bg-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tl from-blue-400/8 to-transparent rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedIndustry ? (
          <div className="space-y-12">
            {/* Header */}
            <div className="space-y-3 text-center max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Industries We Serve
              </h2>
              <p className="text-base text-gray-600">
                Transforming sectors with intelligent solutions.
              </p>
            </div>

            {/* Industries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {industriesData.map((industry) => (
                <div key={industry.id} className="group relative">
                  <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 h-80 flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                      <Image 
                        src={industry.image} 
                        alt={industry.title} 
                        width={200} 
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-gray-900">{industry.title}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">{industry.desc}</p>
                      </div>
                      
                      {/* Button */}
                      <button 
                        onClick={() => setSelectedId(industry.id)}
                        className="mt-4 w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Detailed View - Premium Design with Animation */
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            {/* Back Button */}
            <button
              onClick={() => setSelectedId(null)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {/* Premium Detail Card */}
            <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 lg:p-10">
                {/* Image Section - Larger */}
                <div className="lg:col-span-2 flex items-center justify-center">
                  <div className="relative w-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl overflow-hidden flex items-center justify-center aspect-video">
                    <Image 
                      src={selectedIndustry.image} 
                      alt={selectedIndustry.title} 
                      width={600} 
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-3 space-y-6 flex flex-col justify-center">
                  {/* Title */}
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-gray-900">{selectedIndustry.title}</h2>
                    <p className="text-base text-blue-600 font-semibold">{selectedIndustry.details}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedIndustry.fullDescription}</p>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-gray-900">Key Benefits</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedIndustry.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span className="text-xs text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-300">
                      Get Started
                    </button>
                    <button className="px-5 py-2 border border-gray-300 text-gray-700 hover:text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
