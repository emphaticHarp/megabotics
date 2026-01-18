'use client';

import { AIChatbot } from '@/components/ai-chatbot';
import { TypingAnimation } from '@/components/typing-animation';
import { IndustriesSection } from '@/components/industries-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <AIChatbot />
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden pt-24">
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent pointer-events-none"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-200/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  <span className="text-sm font-semibold text-white">🚀 Pioneering Deep-Tech Innovation</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg">
                  <TypingAnimation 
                    text="MEGABOTICS" 
                    speed={80}
                  />
                </h1>
                <h2 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
                  <TypingAnimation 
                    text="The Future of Robotics, Drones & Automation" 
                    speed={30}
                  />
                </h2>
                <p className="text-lg text-white/90 leading-relaxed drop-shadow-md">
                  Advancing the frontiers of intelligent systems through independent, deep-tech innovation. We design, build, and deploy next-generation robotics and autonomous solutions for real-world challenges.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Request Demo
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
                  Explore Our Work
                </button>
              </div>
            </div>

            {/* Right Side - Empty for image space */}
            <div className="hidden lg:block"></div>
          </div>
        </main>
      </div>

      {/* What We Build Section */}
      <div className="relative py-20 bg-white overflow-hidden">
        {/* Minimal Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-400/8 to-transparent rounded-full blur-3xl"></div>
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Clean Header */}
            <div className="space-y-3 text-center max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                What We Build
              </h2>
              <p className="text-base text-gray-600">
                Innovative solutions engineered for tomorrow's challenges.
              </p>
            </div>

            {/* Cards Grid - Clean & Minimal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Robotics Card */}
              <div className="group relative">
                <div className="relative p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <span className="text-2xl">🤖</span>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900">Robotics Systems</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Advanced autonomous and collaborative robots engineered for industrial excellence and precision manufacturing.</p>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn more</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drones Card */}
              <div className="group relative">
                <div className="relative p-6 bg-white border border-gray-200 rounded-2xl hover:border-cyan-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                      <span className="text-2xl">🚁</span>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900">Drone Platforms</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">High-endurance, intelligent UAVs designed for precision surveying, monitoring, and autonomous operations.</p>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-cyan-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn more</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI & Automation Card */}
              <div className="group relative">
                <div className="relative p-6 bg-white border border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <span className="text-2xl">⚙️</span>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900">AI & Automation</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Cutting-edge artificial intelligence and automation for enterprise-grade process optimization and intelligent systems.</p>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-purple-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn more</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Industries We Serve Section */}
      <IndustriesSection />

      {/* Featured Project Section */}
      <div className="relative py-16 bg-white overflow-hidden">
        {/* Minimal Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-400/8 to-transparent rounded-full blur-3xl"></div>
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-1 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Featured Project
              </h2>
            </div>

            {/* Project Card */}
            <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 lg:h-72 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden flex items-center justify-center">
                  <span className="text-6xl opacity-70">🚁</span>
                </div>
                
                {/* Content Section */}
                <div className="p-6 lg:p-8 space-y-4 flex flex-col justify-center">
                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Autonomous Drone Fleet</h3>
                    <p className="text-xs text-blue-600 font-semibold">Precision Agriculture</p>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-2 text-xs text-gray-700">
                    <p><span className="font-bold">Challenge:</span> Labor-intensive farming limiting yields and resource optimization.</p>
                    <p><span className="font-bold">Solution:</span> AI-powered drone fleets with real-time crop monitoring and predictive analytics.</p>
                    <p><span className="font-bold">Results:</span> 30% yield increase, 40% water reduction, 50% less manual labor.</p>
                  </div>
                  
                  {/* CTA */}
                  <button className="w-fit px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                    View Case Study
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Make in India Section */}
      <section className="relative py-14 bg-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-tl from-green-500/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <main className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="relative bg-gradient-to-br from-orange-100 via-amber-50 to-green-100 border border-orange-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 p-7 lg:p-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-300/40 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-300/40 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative space-y-4 text-center">
              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-950">
                Make in India 🇮🇳
              </h2>
              
              {/* Subtitle */}
              <p className="text-xs font-bold text-orange-800 uppercase tracking-wide">
                Indigenous Innovation. Global Excellence.
              </p>
              
              {/* Description */}
              <p className="text-sm text-gray-800 leading-relaxed max-w-2xl mx-auto font-medium">
                We are committed to building India's future through homegrown deep-tech robotics, contributing to Aatmanirbhar Bharat and positioning India as a global technology leader.
              </p>

              {/* Quote */}
              <div className="pt-3 border-t border-orange-400">
                <p className="italic text-xs text-gray-800 max-w-2xl mx-auto font-medium">
                  "Make in India is about creating a mindset of innovation and self-reliance that will propel our nation to new heights of technological excellence."
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>

      {/* Final CTA Section */}
      <div className="relative py-20 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Let's Build the Future of Intelligent Systems
              </h2>
              <p className="text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
                Join us in revolutionizing robotics, drones, and automation. Together, we'll create transformative solutions that empower industries, drive innovation, and position India as a global technology leader in deep-tech innovation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
                Request Demo
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 text-sm">
                Contact Us
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
