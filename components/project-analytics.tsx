'use client';

import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface ProjectAnalyticsProps {
  projects: any[];
}

export function ProjectAnalytics({ projects }: ProjectAnalyticsProps) {
  // Calculate statistics
  const stats = {
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'Completed').length,
    ongoingProjects: projects.filter(p => p.status === 'Ongoing').length,
    averageROI: Math.round(
      projects.reduce((sum, p) => {
        const roi = typeof p.roi === 'number' ? p.roi : parseInt(p.roi);
        return sum + roi;
      }, 0) / projects.length
    ),
    totalBudget: projects.reduce((sum, p) => {
      const budget = typeof p.budget === 'number' ? p.budget : parseInt(p.budget);
      return sum + budget;
    }, 0),
    averageTeamSize: Math.round(
      projects.reduce((sum, p) => sum + p.team, 0) / projects.length
    ),
    averageRating: (
      projects.reduce((sum, p) => sum + p.rating, 0) / projects.length
    ).toFixed(1),
  };

  // Category breakdown
  const categoryStats = projects.reduce((acc: any, project) => {
    if (!acc[project.category]) {
      acc[project.category] = { count: 0, totalROI: 0, totalBudget: 0 };
    }
    acc[project.category].count += 1;
    acc[project.category].totalROI += typeof project.roi === 'number' ? project.roi : parseInt(project.roi);
    acc[project.category].totalBudget += typeof project.budget === 'number' ? project.budget : parseInt(project.budget);
    return acc;
  }, {});

  const categoryAverageROI = Object.entries(categoryStats).map(([category, data]: any) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    avgROI: Math.round(data.totalROI / data.count),
    count: data.count,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <BarChart3 className="w-8 h-8 text-blue-600" />
        Project Analytics
      </h2>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-l-4 border-blue-600">
          <p className="text-sm text-gray-600 mb-2">Total Projects</p>
          <p className="text-3xl font-bold text-blue-600">{stats.totalProjects}</p>
          <p className="text-xs text-gray-500 mt-2">{stats.completedProjects} completed, {stats.ongoingProjects} ongoing</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-l-4 border-green-600">
          <p className="text-sm text-gray-600 mb-2">Average ROI</p>
          <p className="text-3xl font-bold text-green-600">{stats.averageROI}%</p>
          <p className="text-xs text-gray-500 mt-2">Across all projects</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-l-4 border-purple-600">
          <p className="text-sm text-gray-600 mb-2">Total Budget</p>
          <p className="text-3xl font-bold text-purple-600">₹{(stats.totalBudget / 10000000).toFixed(1)} Cr</p>
          <p className="text-xs text-gray-500 mt-2">Deployed across projects</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border-l-4 border-orange-600">
          <p className="text-sm text-gray-600 mb-2">Avg Team Size</p>
          <p className="text-3xl font-bold text-orange-600">{stats.averageTeamSize}</p>
          <p className="text-xs text-gray-500 mt-2">Members per project</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            Projects by Category
          </h3>
          <div className="space-y-3">
            {categoryAverageROI.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{cat.category}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(cat.count / stats.totalProjects) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-semibold text-gray-700">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Average ROI by Category
          </h3>
          <div className="space-y-3">
            {categoryAverageROI.map((cat) => (
              <div key={`roi-${cat.category}`} className="flex items-center justify-between">
                <p className="font-semibold text-gray-900">{cat.category}</p>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${Math.min((cat.avgROI / 500) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-green-600 w-12 text-right">{cat.avgROI}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">{stats.averageRating}</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">{Math.round((stats.completedProjects / stats.totalProjects) * 100)}%</p>
            <p className="text-gray-600">Completion Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-600 mb-2">₹{(Math.round(stats.totalBudget / stats.totalProjects) / 100000).toFixed(1)} Lakh</p>
            <p className="text-gray-600">Avg Budget per Project</p>
          </div>
        </div>
      </div>
    </div>
  );
}
