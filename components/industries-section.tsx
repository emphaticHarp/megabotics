'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export function IndustriesSection() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const response = await fetch('/api/industries');
      const data = await response.json();
      if (data.success) {
        setIndustries(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching industries:', error);
      setLoading(false);
    }
  };

  const selectedIndustry = industries.find(ind => ind._id === selectedId);

  if (loading) {
    return (
      <div className="relative py-20 bg-white overflow-hidden">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading industries...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            {industries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {industries.map((industry) => (
                  <div key={industry._id} className="group relative">
                    <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 h-80 flex flex-col">
                      {/* Image Section */}
                      <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                        {industry.image ? (
                          <Image 
                            src={industry.image} 
                            alt={industry.name} 
                            width={200} 
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl">
                            {industry.icon}
                          </div>
                        )}
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="text-base font-bold text-gray-900">{industry.name}</h3>
                          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{industry.description}</p>
                        </div>
                        
                        {/* Button */}
                        <button 
                          onClick={() => setSelectedId(industry._id)}
                          className="mt-4 w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all duration-300">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No industries available yet. Check back soon!</p>
              </div>
            )}
          </div>
        ) : (
          /* Detailed View */
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
                {/* Image Section */}
                <div className="lg:col-span-2 flex items-center justify-center">
                  <div className="relative w-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl overflow-hidden flex items-center justify-center aspect-video">
                    {selectedIndustry.image ? (
                      <Image 
                        src={selectedIndustry.image} 
                        alt={selectedIndustry.name} 
                        width={600} 
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-8xl">{selectedIndustry.icon}</div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-3 space-y-6 flex flex-col justify-center">
                  {/* Title */}
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-gray-900">{selectedIndustry.name}</h2>
                    <p className="text-base text-blue-600 font-semibold">{selectedIndustry.description}</p>
                  </div>

                  {/* Learn More Content */}
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedIndustry.learnMoreContent}</p>

                  {/* Solutions */}
                  {selectedIndustry.solutions && selectedIndustry.solutions.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-gray-900">Our Solutions</h3>
                      <div className="space-y-2">
                        {selectedIndustry.solutions.map((solution: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                            <div>
                              <p className="text-xs font-semibold text-gray-900">{solution.title}</p>
                              <p className="text-xs text-gray-600">{solution.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {selectedIndustry.benefits && selectedIndustry.benefits.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-gray-900">Key Benefits</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedIndustry.benefits.map((benefit: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-xs text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
