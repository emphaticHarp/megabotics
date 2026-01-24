'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/admin-layout';

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  highlights: string[];
}

interface FormData {
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  highlights: string[];
}

export default function AdminFeaturedProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    image: '',
    category: '',
    technologies: [''],
    highlights: [''],
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/featured-projects');
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      category: '',
      technologies: [''],
      highlights: [''],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      category: '',
      technologies: [''],
      highlights: [''],
    });
    setShowForm(true);
  };

  const openEditForm = (project: Project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      category: project.category,
      technologies: project.technologies || [''],
      highlights: project.highlights || [''],
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    setUploading(true);

    try {
      const url = editingId ? `/api/featured-projects/${editingId}` : '/api/featured-projects';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      resetForm();
      fetchProjects();
    } catch (error: any) {
      alert('Error: ' + (error.message || 'Failed to save project'));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/featured-projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const filteredProjects = projects.filter(proj =>
    proj.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout currentPage="Featured Projects">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
          <Button
            onClick={openAddForm}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </Button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[95vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingId ? 'Edit Project' : 'Add Project'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* LEFT COLUMN */}
                  <div className="space-y-3">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Project title"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Project description"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                        rows={2}
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Category *</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g., AI, Web, Mobile"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://example.com/image.png"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <p className="text-xs text-gray-500 mt-1">Paste image URL here</p>
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="space-y-3">
                    {/* Technologies */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-gray-700">Technologies</label>
                        <button
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            technologies: [...formData.technologies, ''],
                          })}
                          className="p-0.5 hover:bg-blue-100 rounded text-blue-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-1 max-h-20 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                        {formData.technologies.map((tech, idx) => (
                          <div key={idx} className="flex gap-1">
                            <input
                              type="text"
                              value={tech}
                              onChange={(e) => {
                                const newTechs = [...formData.technologies];
                                newTechs[idx] = e.target.value;
                                setFormData({ ...formData, technologies: newTechs });
                              }}
                              placeholder="Technology"
                              className="flex-1 px-1.5 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({
                                ...formData,
                                technologies: formData.technologies.filter((_, i) => i !== idx),
                              })}
                              className="p-0.5 hover:bg-red-100 rounded text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-gray-700">Highlights</label>
                        <button
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            highlights: [...formData.highlights, ''],
                          })}
                          className="p-0.5 hover:bg-blue-100 rounded text-blue-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-1 max-h-20 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                        {formData.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex gap-1">
                            <input
                              type="text"
                              value={highlight}
                              onChange={(e) => {
                                const newHighlights = [...formData.highlights];
                                newHighlights[idx] = e.target.value;
                                setFormData({ ...formData, highlights: newHighlights });
                              }}
                              placeholder="Highlight"
                              className="flex-1 px-1.5 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({
                                ...formData,
                                highlights: formData.highlights.filter((_, i) => i !== idx),
                              })}
                              className="p-0.5 hover:bg-red-100 rounded text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loader */}
                {uploading && (
                  <div className="flex items-center justify-center py-4">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
                  <Button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : editingId ? 'Update' : 'Upload'}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    disabled={uploading}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white disabled:opacity-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">No image</div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">{project.title}</h3>
                    <p className="text-xs text-blue-600 font-medium">{project.category}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEditForm(project)}
                      className="p-1.5 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-1.5 hover:bg-red-100 rounded text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{project.description}</p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Tech:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Highlights:</p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx}>• {highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">No projects found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
