'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useParams } from 'next/navigation';
import { ArrowLeft, Users, Briefcase, BookOpen, Award, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ResearchDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const researchProjects = [
    {
      id: 1,
      title: 'Advanced Neural Networks for Autonomous Systems',
      category: 'ai',
      date: 'Mar 2024',
      status: 'In Progress',
      team: 8,
      description: 'Developing cutting-edge neural network architectures for real-time decision making in autonomous robotics systems.',
      fullDescription: 'This groundbreaking research focuses on developing advanced neural network architectures specifically designed for autonomous systems. Our team is working on real-time decision-making capabilities that enable robots to operate independently in complex environments.',
      image: '🧠',
      progress: 65,
      budget: '₹50 Lakh',
      publications: 3,
      patents: 1,
      collaborators: ['IIT Delhi', 'CSIR', 'Tech Startups'],
      impact: 'High',
      technologies: ['TensorFlow', 'PyTorch', 'CUDA'],
      teamMembers: ['Dr. Rajesh Kumar', 'Prof. Ananya Singh', 'Vikram Patel'],
      objectives: [
        'Develop real-time neural network inference',
        'Optimize for edge computing devices',
        'Achieve 99% accuracy in decision making',
        'Reduce latency to <100ms'
      ],
      challenges: [
        'Computational constraints on edge devices',
        'Real-time processing requirements',
        'Model optimization for deployment'
      ],
      solutions: [
        'Implemented quantization techniques',
        'Developed custom CUDA kernels',
        'Created efficient model architectures'
      ],
      timeline: [
        { phase: 'Research & Design', duration: '2 months', status: 'Completed' },
        { phase: 'Development', duration: '3 months', status: 'In Progress' },
        { phase: 'Testing & Optimization', duration: '2 months', status: 'Upcoming' },
        { phase: 'Deployment', duration: '1 month', status: 'Upcoming' }
      ]
    },
    {
      id: 2,
      title: 'Collaborative Robot Learning Framework',
      category: 'robotics',
      date: 'Feb 2024',
      status: 'In Progress',
      team: 12,
      description: 'Research on human-robot collaboration and adaptive learning systems for industrial automation.',
      fullDescription: 'This research initiative explores the intersection of human-robot collaboration and machine learning. We are developing frameworks that enable robots to learn from human feedback and adapt their behavior in real-time.',
      image: '🤖',
      progress: 45,
      budget: '₹75 Lakh',
      publications: 5,
      patents: 2,
      collaborators: ['MIT', 'Carnegie Mellon', 'Industry Partners'],
      impact: 'Very High',
      technologies: ['ROS', 'Gazebo', 'Python'],
      teamMembers: ['Prof. Meera Sharma', 'Dr. Arjun Singh', 'Priya Nair'],
      objectives: [
        'Enable safe human-robot interaction',
        'Develop adaptive learning algorithms',
        'Create intuitive control interfaces',
        'Achieve 95% task success rate'
      ],
      challenges: [
        'Safety in shared workspaces',
        'Learning from limited human feedback',
        'Real-time adaptation requirements'
      ],
      solutions: [
        'Implemented safety protocols',
        'Developed reinforcement learning models',
        'Created feedback mechanisms'
      ],
      timeline: [
        { phase: 'Framework Design', duration: '1.5 months', status: 'Completed' },
        { phase: 'Algorithm Development', duration: '2.5 months', status: 'In Progress' },
        { phase: 'Testing & Validation', duration: '2 months', status: 'Upcoming' },
        { phase: 'Industrial Trials', duration: '2 months', status: 'Upcoming' }
      ]
    },
  ];

  const project = researchProjects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Project not found</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/research" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Back to Research
          </Link>

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white mb-12">
            <div className="flex items-start justify-between mb-4">
              <div className="text-6xl">{project.image}</div>
              <span className={`text-sm font-bold px-4 py-2 rounded-full ${
                project.status === 'Completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {project.status}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-blue-100">{project.fullDescription}</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
              <p className="text-sm text-gray-600 mb-2">Team Size</p>
              <p className="text-3xl font-bold text-purple-600">{project.team}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
              <p className="text-sm text-gray-600 mb-2">Budget</p>
              <p className="text-3xl font-bold text-blue-600">{project.budget}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <p className="text-sm text-gray-600 mb-2">Publications</p>
              <p className="text-3xl font-bold text-green-600">{project.publications}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600">
              <p className="text-sm text-gray-600 mb-2">Patents</p>
              <p className="text-3xl font-bold text-orange-600">{project.patents}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-gray-900">Project Progress</h3>
              <span className="text-2xl font-bold text-purple-600">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Objectives & Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Objectives
              </h3>
              <ul className="space-y-3">
                {project.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold mt-1">✓</span>
                    <span className="text-gray-700">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-red-500" />
                Challenges
              </h3>
              <ul className="space-y-3">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">⚠</span>
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Research Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.teamMembers.map((member, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">{member}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Interested in This Research?</h2>
            <p className="text-lg text-blue-100 mb-8">Get in touch to collaborate or learn more about our research initiatives.</p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold">
              Contact Us
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
