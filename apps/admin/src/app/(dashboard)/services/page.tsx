'use client';

import { useEffect, useState } from 'react';
import { 
  List, 
  Plus, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Edit2, 
  Trash2, 
  Clock, 
  AlertCircle, 
  Layers, 
  X,
  ExternalLink
} from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    slug: '',
    description: '',
    capabilities: '',
    active: true,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, [selectedCategory]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/admin/services', window.location.origin);
      if (selectedCategory !== 'ALL') url.searchParams.set('categoryId', selectedCategory);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setServices(json.data);
      } else {
        throw new Error(json.error || 'Failed to load services');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const json = await res.json();
      if (json.success) setCategories(json.data || []);
    } catch {}
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active: !currentActive }),
      });
      const json = await res.json();
      if (json.success) {
        fetchServices();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          capabilities: formData.capabilities.split(',').map((c) => c.trim()).filter(Boolean),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setFormData({
          categoryId: '',
          title: '',
          slug: '',
          description: '',
          capabilities: '',
          active: true,
        });
        fetchServices();
      } else {
        alert(json.error || 'Failed to create service');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    try {
      setSubmitting(true);
      const res = await fetch('/api/admin/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingService.id,
          categoryId: editingService.categoryId,
          title: editingService.title,
          slug: editingService.slug,
          description: editingService.description,
          capabilities: Array.isArray(editingService.capabilities)
            ? editingService.capabilities
            : (editingService.capabilities ? editingService.capabilities.split(',').map((c: string) => c.trim()).filter(Boolean) : []),
          active: editingService.active,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setIsEditModalOpen(false);
        setEditingService(null);
        fetchServices();
      } else {
        alert(json.error || 'Failed to update service');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        fetchServices();
      } else {
        alert(json.error || 'Failed to delete service');
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
            <List className="w-7 h-7 text-emerald-600" />
            Services & Solutions Catalog
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Control service offerings, descriptions, capabilities, and active visibility across IT, Electrical, and Logistics pillars.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Service
        </button>
      </div>

      {/* Pillar Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
            selectedCategory === 'ALL'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Pillars
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              selectedCategory === c.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-3.5 pl-6 pr-3 text-left text-xs font-semibold text-slate-600 uppercase">Service Name</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase">Pillar Category</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase">Capabilities</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="py-3.5 pl-3 pr-6 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-sm text-slate-500">
                    <Clock className="w-6 h-6 mx-auto animate-spin mb-2 text-emerald-600" />
                    Loading services catalog...
                  </td>
                </tr>
              ) : services.length > 0 ? (
                services.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pl-6 pr-3 text-sm">
                      <div className="font-bold text-slate-900">{service.title}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">/services/{service.ServiceCategory?.slug}/{service.slug}</div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1 max-w-md">{service.description}</p>
                    </td>
                    <td className="px-3 py-4 text-sm font-medium text-slate-700">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {service.ServiceCategory?.title}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-xs text-slate-600 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(service.capabilities) && service.capabilities.slice(0, 3).map((cap: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                            {cap}
                          </span>
                        ))}
                        {Array.isArray(service.capabilities) && service.capabilities.length > 3 && (
                          <span className="text-[11px] text-slate-400 font-bold">+{service.capabilities.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm">
                      <button
                        onClick={() => handleToggleActive(service.id, service.active)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                          service.active
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {service.active ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-slate-400" />
                            Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-4 pl-3 pr-6 text-right text-sm">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingService({
                              ...service,
                              capabilities: Array.isArray(service.capabilities) ? service.capabilities.join(', ') : '',
                            });
                            setIsEditModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-sm text-slate-500">
                    No services found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Add New Service</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateService} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Service Pillar *</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="">Select Pillar Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                  })}
                  placeholder="e.g. Dedicated Fleet Contracts"
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
                <label className="block font-medium text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive dedicated vehicle fleet logistics for retail and distribution..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Capabilities (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.capabilities}
                  onChange={(e) => setFormData({ ...formData, capabilities: e.target.value })}
                  placeholder="GPS Live Tracking, Dedicated Drivers, Fuel Management, SLA Guarantees"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="active" className="text-sm font-medium text-slate-700">Make active on website immediately</label>
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
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {isEditModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Edit Service</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditService} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Service Pillar *</label>
                <select
                  required
                  value={editingService.categoryId}
                  onChange={(e) => setEditingService({ ...editingService, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={editingService.slug}
                  onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl font-mono text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Capabilities (Comma-separated)</label>
                <input
                  type="text"
                  value={editingService.capabilities}
                  onChange={(e) => setEditingService({ ...editingService, capabilities: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="editActive"
                  checked={editingService.active}
                  onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="editActive" className="text-sm font-medium text-slate-700">Active status (visible on public site)</label>
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
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-sm disabled:opacity-50"
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
