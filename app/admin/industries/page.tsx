'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/admin-layout';

interface Industry {
  _id: string;
  name: string;
  description: string;
  image: string;
  learnMoreContent: string;
  solutions: Array<{ title: string; description: string }>;
  benefits: string[];
}

interface FormData {
  name: string;
  description: string;
  image: string;
  learnMoreContent: string;
  solutions: Array<{ title: string; description: string }>;
  benefits: string[];
}

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    image: '',
    learnMoreContent: '',
    solutions: [{ title: '', description: '' }],
    benefits: [''],
  });

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
    } catch (error) {
      console.error('Error fetching industries:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      learnMoreContent: '',
      solutions: [{ title: '', description: '' }],
      benefits: [''],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      image: '',
      learnMoreContent: '',
      solutions: [{ title: '', description: '' }],
      benefits: [''],
    });
    setShowForm(true);
  };

  const openEditForm = (industry: Industry) => {
    setEditingId(industry._id);
    setFormData({
      name: industry.name,
      description: industry.description,
      image: industry.image || '',
      learnMoreContent: industry.learnMoreContent,
      solutions: industry.solutions || [{ title: '', description: '' }],
      benefits: industry.benefits || [''],
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.learnMoreContent) {
      alert('Please fill in all required fields');
      return;
    }

    setUploading(true);

    try {
      const url = editingId ? `/api/industries/${editingId}` : '/api/industries';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save industry');
      }

      resetForm();
      fetchIndustries();
    } catch (error: any) {
      alert('Error: ' + (error.message || 'Failed to save industry'));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this industry?')) return;

    try {
      const response = await fetch(`/api/industries/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchIndustries();
      }
    } catch (error) {
      console.error('Error deleting industry:', error);
    }
  };

  const filteredIndustries = industries.filter(ind =>
    ind.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout currentPage="Industries">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Industries</h2>
          <Button
            onClick={openAddForm}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Industry
          </Button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[95vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingId ? 'Edit Industry' : 'Add Industry'}
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
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Industry name"
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
                        placeholder="Brief description"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                        rows={2}
                        required
                      />
                    </div>

                    {/* Learn More */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Learn More *</label>
                      <textarea
                        value={formData.learnMoreContent}
                        onChange={(e) => setFormData({ ...formData, learnMoreContent: e.target.value })}
                        placeholder="Detailed content"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                        rows={2}
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
                    {/* Solutions */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-gray-700">Solutions</label>
                        <button
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            solutions: [...formData.solutions, { title: '', description: '' }],
                          })}
                          className="p-0.5 hover:bg-blue-100 rounded text-blue-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-1 max-h-20 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                        {formData.solutions.map((solution, idx) => (
                          <div key={idx} className="flex gap-1">
                            <input
                              type="text"
                              value={solution.title}
                              onChange={(e) => {
                                const newSolutions = [...formData.solutions];
                                newSolutions[idx].title = e.target.value;
                                setFormData({ ...formData, solutions: newSolutions });
                              }}
                              placeholder="Solution"
                              className="flex-1 px-1.5 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({
                                ...formData,
                                solutions: formData.solutions.filter((_, i) => i !== idx),
                              })}
                              className="p-0.5 hover:bg-red-100 rounded text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-gray-700">Benefits</label>
                        <button
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            benefits: [...formData.benefits, ''],
                          })}
                          className="p-0.5 hover:bg-blue-100 rounded text-blue-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-1 max-h-20 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
                        {formData.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex gap-1">
                            <input
                              type="text"
                              value={benefit}
                              onChange={(e) => {
                                const newBenefits = [...formData.benefits];
                                newBenefits[idx] = e.target.value;
                                setFormData({ ...formData, benefits: newBenefits });
                              }}
                              placeholder="Benefit"
                              className="flex-1 px-1.5 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({
                                ...formData,
                                benefits: formData.benefits.filter((_, i) => i !== idx),
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
              placeholder="Search industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
          </div>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((industry) => (
            <div key={industry._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden flex items-center justify-center">
                {industry.image ? (
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">No image</div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-sm flex-1">{industry.name}</h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEditForm(industry)}
                      className="p-1.5 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(industry._id)}
                      className="p-1.5 hover:bg-red-100 rounded text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{industry.description}</p>

                {industry.solutions && industry.solutions.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Solutions:</p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {industry.solutions.slice(0, 2).map((sol, idx) => (
                        <li key={idx}>• {sol.title}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {industry.benefits && industry.benefits.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Benefits:</p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {industry.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredIndustries.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">No industries found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
