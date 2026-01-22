'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  title: string;
  budget: string | number;
  duration: string | number;
  roi: string | number;
  team: number;
  impact: string;
  rating: number;
  status: string;
  technologies: string[];
}

interface ProjectComparisonProps {
  projects: Project[];
  onClose: () => void;
}

export function ProjectComparison({ projects, onClose }: ProjectComparisonProps) {
  if (projects.length < 2) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Projects</h2>
          <p className="text-gray-600 mb-6">Please select at least 2 projects to compare.</p>
          <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Project Comparison</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50">Metric</th>
                {projects.map((project) => (
                  <th key={project.id} className="text-left py-3 px-4 font-semibold text-gray-900 bg-blue-50">
                    {project.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold text-gray-900">Status</td>
                {projects.map((project) => (
                  <td key={project.id} className="py-3 px-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold text-gray-900">Budget</td>
                {projects.map((project) => (
                  <td key={project.id} className="py-3 px-4 text-gray-700">
                    ₹{typeof project.budget === 'number' ? `${(project.budget / 100000).toFixed(0)} Lakh` : project.budget}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold text-gray-900">Duration</td>
                {projects.map((project) => (
                  <td key={project.id} className="py-3 px-4 text-gray-700">
                    {typeof project.duration === 'number' ? `${project.duration} months` : project.duration}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold text-gray-900">ROI</td>
                {projects.map((project) => (
                  <td key={project.id} className="py-3 px-4 text-green-600 font-semibold">
                    {typeof project.roi === 'number' ? `${project.roi}%` : project.roi}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold text-gray-900">Team Size</td>
                {projects.map((project) => (
                  <td key={project.id} className="py-3 px-4 text-gray-700">
                    {project.team} members
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold text-gray-900">Rating</td>
                {projects.map((project) => (
                  <td key={project.id} className="py-3 px-4">
                    <span className="text-yellow-500 font-semibold">★ {project.rating}</span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold text-gray-900">Impact</td>
                {projects.map((project) => (
                  <td key={project.id} className="py-3 px-4 text-gray-700">
                    {project.impact}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold text-gray-900">Technologies</td>
                {projects.map((project) => (
                  <td key={project.id} className="py-3 px-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-gray-600">+{project.technologies.length - 3} more</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
