'use client';

import { useEffect, useState } from 'react';
import { 
  Database, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Clock, 
  AlertCircle, 
  X,
  Layers,
  FolderKanban
} from 'lucide-react';

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    status: 'PUBLISHED',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/industries');
      const json = await res.json();
      if (json.success) {
        setIndustries(json.data);
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIndustry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch('/api/admin/industries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setFormData({ title: '', slug: '', shortDescription: '', description: '', status: 'PUBLISHED' });
        fetchIndustries();
      } else {
        alert(json.error || 'Failed to create industry');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditIndustry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIndustry) return;
    try {
      setSubmitting(true);
      const res = await fetch('/api/admin/industries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingIndustry),
      });
      const json = await res.json();
      if (json.success) {
        setIsEditModalOpen(false);
        setEditingIndustry(null);
        fetchIndustries();
      } else {
        alert(json.error || 'Failed to update industry');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteIndustry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this industry?')) return;
    try {
      const res = await fetch(`/api/admin/industries?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        fetchIndustries();
      } else {
        alert(json.error || 'Failed to delete industry');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-7 h-7 text-indigo-600" />
            Industry Verticals
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Define target sectors, commercial verticals, and specialized domain solutions.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Industry
        </button>
      </div>

      {/* Grid of Industries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 py-16 text-center text-sm text-slate-500 bg-white rounded-2xl border">
            <Clock className="w-6 h-6 mx-auto animate-spin mb-2 text-indigo-600" />
            Loading industries...
          </div>
        ) : industries.length > 0 ? (
          industries.map((ind) => (
            <div key={ind.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {ind.status}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingIndustry(ind);
                        setIsEditModalOpen(true);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteIndustry(ind.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{ind.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">/industries/{ind.slug}</p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {ind.shortDescription || ind.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  {ind.Service?.length || 0} Linked Services
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
                  {ind.Project?.length || 0} Linked Projects
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-16 text-center text-sm text-slate-500 bg-white rounded-2xl border">
            No industry verticals defined yet.
          </div>
        )}
      </div>

      {/* Add Industry Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Add Industry Vertical</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateIndustry} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Industry Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                  })}
                  placeholder="e.g. Healthcare & Pharmaceuticals"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl font-mono text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Specialized temperature-controlled logistics and clean room power..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Overview Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed multi-paragraph breakdown of domain capabilities..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Industry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Industry Modal */}
      {isEditModalOpen && editingIndustry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Edit Industry</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditIndustry} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Industry Title *</label>
                <input
                  type="text"
                  required
                  value={editingIndustry.title}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={editingIndustry.slug}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, slug: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl font-mono text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={editingIndustry.shortDescription || ''}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Description</label>
                <textarea
                  rows={4}
                  value={editingIndustry.description || ''}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
