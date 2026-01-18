'use client';

import { AIChatbot } from '@/components/ai-chatbot';
import { GallerySlider } from '@/components/gallery-slider';
import { Footer } from '@/components/footer';

export default function About() {
  return (
    <>
      <AIChatbot />
      
      {/* Hero Section */}
      <div className="relative pt-40 pb-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              About MEGABOTICS
            </h1>
            <p className="text-base text-gray-700 leading-relaxed">
              Pioneering the future of robotics, drones, and autonomous systems through indigenous innovation and deep-tech excellence.
            </p>
          </div>
        </main>
      </div>

      {/* Mission Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Content */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  To advance the frontiers of intelligent systems through independent, deep-tech innovation. We design, build, and deploy next-generation robotics and autonomous solutions that address real-world challenges across multiple sectors.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Our commitment to Aatmanirbhar Bharat drives us to develop indigenous solutions that position India as a global technology leader while creating sustainable economic growth and employment opportunities.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  We believe in leveraging cutting-edge technology to solve complex problems, improve efficiency, and create positive impact for industries, communities, and society at large.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">5+</div>
                  <p className="text-xs text-gray-700 font-semibold">Industries Served</p>
                  <p className="text-xs text-gray-600">Agriculture, Defense, Disaster Management</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">100+</div>
                  <p className="text-xs text-gray-700 font-semibold">Team Members</p>
                  <p className="text-xs text-gray-600">Engineers, Scientists, Innovators</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">50+</div>
                  <p className="text-xs text-gray-700 font-semibold">Projects Completed</p>
                  <p className="text-xs text-gray-600">Across multiple sectors</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">2020</div>
                  <p className="text-xs text-gray-700 font-semibold">Founded</p>
                  <p className="text-xs text-gray-600">Bangalore, India</p>
                </div>
              </div>
            </div>

            {/* Additional Mission Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">Core Objectives</h3>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>• Develop indigenous deep-tech solutions</li>
                  <li>• Create sustainable employment</li>
                  <li>• Drive technological excellence</li>
                  <li>• Foster innovation ecosystem</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">Strategic Focus</h3>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>• Autonomous systems development</li>
                  <li>• AI and machine learning</li>
                  <li>• Real-world problem solving</li>
                  <li>• Industry transformation</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">Impact Areas</h3>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>• Economic growth</li>
                  <li>• Environmental sustainability</li>
                  <li>• Social development</li>
                  <li>• Technological advancement</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Values Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
              <p className="text-sm text-gray-600">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                <div className="text-3xl">🚀</div>
                <h3 className="font-bold text-gray-900">Innovation</h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Pushing boundaries and exploring new frontiers in deep-tech robotics and autonomous systems. We embrace experimentation and continuous improvement.
                </p>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs font-semibold text-blue-600">Key Focus:</p>
                  <p className="text-xs text-gray-600 mt-1">R&D investment, Patent development, Breakthrough technologies</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                <div className="text-3xl">⭐</div>
                <h3 className="font-bold text-gray-900">Excellence</h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Delivering world-class solutions with precision, quality, and attention to detail. We maintain the highest standards in everything we do.
                </p>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs font-semibold text-blue-600">Key Focus:</p>
                  <p className="text-xs text-gray-600 mt-1">Quality assurance, Performance optimization, Customer satisfaction</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                <div className="text-3xl">🌍</div>
                <h3 className="font-bold text-gray-900">Impact</h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Creating meaningful change that benefits industries, communities, and society. We measure success by the positive impact we create.
                </p>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs font-semibold text-blue-600">Key Focus:</p>
                  <p className="text-xs text-gray-600 mt-1">Social responsibility, Environmental sustainability, Community development</p>
                </div>
              </div>
            </div>

            {/* Additional Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">🤝 Collaboration</h3>
                <p className="text-xs text-gray-700">We believe in the power of teamwork and partnerships to achieve greater goals and create lasting impact.</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">🔒 Integrity</h3>
                <p className="text-xs text-gray-700">We operate with transparency, honesty, and ethical principles in all our business dealings and relationships.</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Team Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Our Leadership Team</h2>
              <p className="text-sm text-gray-600">Experienced leaders driving innovation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  name: 'Visionary Leader', 
                  role: 'Founder & CEO', 
                  emoji: '👨‍💼',
                  bio: 'Pioneering deep-tech innovation with 15+ years of experience in robotics and autonomous systems.'
                },
                { 
                  name: 'Tech Pioneer', 
                  role: 'CTO', 
                  emoji: '👨‍💻',
                  bio: 'Leading technical strategy and innovation with expertise in AI, machine learning, and robotics.'
                },
                { 
                  name: 'Innovation Head', 
                  role: 'VP R&D', 
                  emoji: '🧑‍🔬',
                  bio: 'Driving research initiatives and breakthrough technologies in autonomous systems.'
                },
              ].map((member, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-center space-y-3">
                  <div className="text-5xl">{member.emoji}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{member.name}</h3>
                    <p className="text-xs text-blue-600 font-semibold mt-1">{member.role}</p>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>

            {/* Team Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">100+</p>
                <p className="text-xs text-gray-700 mt-1">Total Team Members</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">25+</p>
                <p className="text-xs text-gray-700 mt-1">PhDs & Advanced Degrees</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">15+</p>
                <p className="text-xs text-gray-700 mt-1">Years Avg Experience</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">20+</p>
                <p className="text-xs text-gray-700 mt-1">Nationalities</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Journey Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
              <p className="text-sm text-gray-600">From vision to innovation</p>
            </div>

            {/* Visual Timeline Path */}
            <div className="relative">
              {/* SVG Path Background */}
              <svg className="w-full h-96 absolute inset-0" viewBox="0 0 1000 400" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path
                  d="M 50 200 Q 250 100 450 200 T 950 200"
                  stroke="url(#pathGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="20,10"
                />
              </svg>

              {/* Timeline Items */}
              <div className="relative h-96 flex items-center">
                <div className="w-full flex justify-between px-4">
                  {[
                    { year: '2020', title: 'Founded', emoji: '🚀' },
                    { year: '2021', title: 'First Product', emoji: '🚁' },
                    { year: '2022', title: 'Expansion', emoji: '📈' },
                    { year: '2023', title: 'AI Integration', emoji: '🤖' },
                    { year: '2024', title: 'Global', emoji: '🌍' },
                  ].map((milestone, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      {/* Circle Node */}
                      <div className="relative z-10 w-16 h-16 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                        <span className="text-2xl">{milestone.emoji}</span>
                      </div>
                      {/* Label */}
                      <div className="text-center mt-2">
                        <p className="text-xs font-bold text-blue-600">{milestone.year}</p>
                        <p className="text-xs text-gray-700 font-semibold">{milestone.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Gallery Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
              <p className="text-sm text-gray-600">Our innovations in action</p>
            </div>

            <GallerySlider />
          </div>
        </main>
      </div>

      {/* Achievements Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Awards & Recognition</h2>
              <p className="text-sm text-gray-600">Industry recognition and milestones</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  icon: '🏆', 
                  title: 'Best Innovation Award', 
                  year: '2023',
                  org: 'National Technology Council',
                  desc: 'Recognized for breakthrough innovations in autonomous robotics'
                },
                { 
                  icon: '⭐', 
                  title: 'Top 10 Deep-Tech Startups', 
                  year: '2024',
                  org: 'Asia-Pacific Tech Summit',
                  desc: 'Listed among the most promising deep-tech companies in the region'
                },
                { 
                  icon: '🌟', 
                  title: 'Industry Excellence Award', 
                  year: '2023',
                  org: 'Robotics & Automation Association',
                  desc: 'Excellence in product development and customer satisfaction'
                },
                { 
                  icon: '🎖️', 
                  title: 'Make in India Champion', 
                  year: '2024',
                  org: 'Government of India',
                  desc: 'Leading indigenous technology innovator contributing to Aatmanirbhar Bharat'
                },
              ].map((award, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl flex-shrink-0">{award.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm">{award.title}</h3>
                      <p className="text-xs text-blue-600 font-semibold mt-1">{award.year} • {award.org}</p>
                      <p className="text-xs text-gray-700 mt-2">{award.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">50+</p>
                <p className="text-xs text-gray-700 mt-1">Patents Filed</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">100+</p>
                <p className="text-xs text-gray-700 mt-1">Publications & Papers</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">15+</p>
                <p className="text-xs text-gray-700 mt-1">Industry Awards</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Partnerships Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Strategic Partnerships</h2>
              <p className="text-sm text-gray-600">Collaborating with industry leaders and institutions</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Tech Corp', emoji: '🏢', type: 'Technology Partner' },
                { name: 'Innovation Labs', emoji: '🔬', type: 'Research Partner' },
                { name: 'Global Partners', emoji: '🌍', type: 'Distribution Partner' },
                { name: 'Research Institute', emoji: '📚', type: 'Academic Partner' },
              ].map((partner, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center space-y-2 hover:shadow-md transition-all duration-300">
                  <div className="text-3xl">{partner.emoji}</div>
                  <p className="text-xs font-semibold text-gray-700">{partner.name}</p>
                  <p className="text-xs text-gray-600">{partner.type}</p>
                </div>
              ))}
            </div>

            {/* Partnership Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">🤝 Collaboration</h3>
                <p className="text-xs text-gray-700">Joint development of cutting-edge solutions and technologies</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">🌐 Global Reach</h3>
                <p className="text-xs text-gray-700">Access to international markets and distribution networks</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">📈 Growth</h3>
                <p className="text-xs text-gray-700">Accelerated innovation and business expansion opportunities</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Sustainability Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Sustainability</h2>
              <p className="text-sm text-gray-600">Committed to a better future</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Carbon Neutral', desc: 'All operations are carbon neutral by 2025', emoji: '🌱' },
                { title: 'Green Tech', desc: 'Using renewable energy in all facilities', emoji: '⚡' },
                { title: 'Social Impact', desc: 'Creating employment and skill development', emoji: '👥' },
              ].map((item, idx) => (
                <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-5 space-y-2">
                  <div className="text-3xl">{item.emoji}</div>
                  <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Technology Stack Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Technology Stack</h2>
              <p className="text-sm text-gray-600">Cutting-edge tools and frameworks</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { category: 'Robotics', tech: 'ROS, SLAM, Computer Vision, Motion Planning' },
                { category: 'Drones', tech: 'Autonomous Flight Systems, GPS/RTK, Sensor Fusion' },
                { category: 'AI/ML', tech: 'TensorFlow, PyTorch, Deep Learning, NLP' },
                { category: 'Cloud', tech: 'AWS, Azure, Kubernetes, Docker' },
              ].map((item, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-5 space-y-2">
                  <h3 className="font-bold text-gray-900 text-sm">{item.category}</h3>
                  <p className="text-xs text-gray-700">{item.tech}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Research & Development Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Research & Development</h2>
              <p className="text-sm text-gray-600">Investing in innovation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                <h3 className="font-bold text-gray-900 text-sm">Current Projects</h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li>• Advanced autonomous navigation systems</li>
                  <li>• AI-powered predictive maintenance</li>
                  <li>• Swarm robotics coordination</li>
                  <li>• Edge computing solutions</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                <h3 className="font-bold text-gray-900 text-sm">Research Focus</h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li>• Machine learning optimization</li>
                  <li>• Real-time sensor processing</li>
                  <li>• Autonomous decision making</li>
                  <li>• Human-robot interaction</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Industry Certifications Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Certifications & Standards</h2>
              <p className="text-sm text-gray-600">Meeting global quality standards</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { cert: 'ISO 9001', desc: 'Quality Management' },
                { cert: 'ISO 14001', desc: 'Environmental' },
                { cert: 'ISO 45001', desc: 'Occupational Safety' },
                { cert: 'CE Certified', desc: 'European Standards' },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center space-y-1">
                  <p className="font-bold text-gray-900 text-xs">{item.cert}</p>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Global Presence Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Global Presence</h2>
              <p className="text-sm text-gray-600">Operating across multiple regions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { region: 'India', offices: 'Bangalore, Delhi, Mumbai', emoji: '🇮🇳' },
                { region: 'Asia-Pacific', offices: 'Singapore, Tokyo, Seoul', emoji: '🌏' },
                { region: 'Europe', offices: 'Berlin, London, Paris', emoji: '🇪🇺' },
              ].map((item, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-center space-y-2">
                  <div className="text-3xl">{item.emoji}</div>
                  <h3 className="font-bold text-gray-900 text-sm">{item.region}</h3>
                  <p className="text-xs text-gray-700">{item.offices}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Customer Success Stories Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Customer Success Stories</h2>
              <p className="text-sm text-gray-600">Real-world impact and results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: 'Agricultural Transformation', 
                  company: 'FarmTech Solutions',
                  result: '45% increase in crop yield',
                  emoji: '🌾'
                },
                { 
                  title: 'Disaster Response', 
                  company: 'Emergency Services',
                  result: '60% faster response time',
                  emoji: '🚨'
                },
                { 
                  title: 'Infrastructure Monitoring', 
                  company: 'Smart Cities Inc',
                  result: '80% cost reduction',
                  emoji: '🏗️'
                },
                { 
                  title: 'Environmental Protection', 
                  company: 'Green Initiative',
                  result: '50% better monitoring',
                  emoji: '🌍'
                },
              ].map((story, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-5 space-y-2">
                  <div className="text-3xl">{story.emoji}</div>
                  <h3 className="font-bold text-gray-900 text-sm">{story.title}</h3>
                  <p className="text-xs text-gray-600">{story.company}</p>
                  <p className="text-xs font-semibold text-blue-600">{story.result}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Vision for Future Section */}
      <div className="relative py-12 bg-white">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900">Vision for the Future</h2>
              <p className="text-sm text-gray-600">Our roadmap for 2025-2030</p>
            </div>

            <div className="space-y-4">
              {[
                { year: '2025', goal: 'Launch 10 new AI-powered products', icon: '🎯' },
                { year: '2026', goal: 'Expand to 15 countries globally', icon: '🌐' },
                { year: '2027', goal: 'Achieve $500M revenue milestone', icon: '💰' },
                { year: '2028', goal: 'Establish innovation centers in 5 continents', icon: '🏢' },
                { year: '2029', goal: 'Lead the autonomous systems market', icon: '👑' },
                { year: '2030', goal: 'Transform 100+ industries with our solutions', icon: '🚀' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{item.year}</p>
                    <p className="text-xs text-gray-700 mt-1">{item.goal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* CTA Section */}
      <div className="relative py-12 bg-gradient-to-r from-blue-600 to-cyan-600">
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Join Us in Building the Future
            </h2>
            <p className="text-sm text-white/90 max-w-2xl mx-auto">
              We're looking for talented individuals to help us revolutionize robotics and autonomous systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-5 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm">
                View Careers
              </button>
              <button className="px-5 py-2 border border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 text-sm">
                Contact Us
              </button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
