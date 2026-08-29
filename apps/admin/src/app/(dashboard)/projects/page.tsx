'use client';

import { useEffect, useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Edit2, 
  Trash2, 
  X,
  ExternalLink
} from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    industryId: '',
    location: '',
    projectStatus: 'COMPLETED',
    challenge: '',
    solution: '',
    execution: '',
    results: '',
    coverMedia: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchIndustries();
  }, [selectedStatus]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/admin/projects', window.location.origin);
      if (selectedStatus !== 'ALL') url.searchParams.set('status', selectedStatus);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) setProjects(json.data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchIndustries = async () => {
    try {
      const res = await fetch('/api/admin/industries');
      const json = await res.json();
      if (json.success) setIndustries(json.data || []);
    } catch {}
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setFormData({
          title: '',
          slug: '',
          industryId: '',
          location: '',
          projectStatus: 'COMPLETED',
          challenge: '',
          solution: '',
          execution: '',
          results: '',
          coverMedia: '',
        });
        fetchProjects();
      } else {
        alert(json.error || 'Failed to create project');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      setSubmitting(true);
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });
      const json = await res.json();
      if (json.success) {
        setIsEditModalOpen(false);
        setEditingProject(null);
        fetchProjects();
      } else {
        alert(json.error || 'Failed to update project');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        fetchProjects();
      } else {
        alert(json.error || 'Failed to delete project');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Completed</span>;
      case 'ONGOING':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Ongoing</span>;
      case 'PLANNED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Planned</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FolderKanban className="w-7 h-7 text-purple-600" />
            Projects & Case Studies
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Showcase enterprise execution records, verified client results, and technical delivery highlights.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {['ALL', 'COMPLETED', 'ONGOING', 'PLANNED'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              selectedStatus === st
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 py-16 text-center text-sm text-slate-500 bg-white rounded-2xl border">
            <Clock className="w-6 h-6 mx-auto animate-spin mb-2 text-purple-600" />
            Loading project case studies...
          </div>
        ) : projects.length > 0 ? (
          projects.map((proj) => (
            <div key={proj.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(proj.projectStatus)}
                    {proj.Industry?.title && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {proj.Industry.title}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProject({
                          ...proj,
                          coverMedia: proj.coverMedia?.url || (typeof proj.coverMedia === 'string' ? proj.coverMedia : ''),
                        });
                        setIsEditModalOpen(true);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{proj.title}</h3>
                {proj.location && (
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {proj.location}
                  </p>
                )}

                {proj.challenge && (
                  <div className="mt-3 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Challenge: </span>
                    <span className="line-clamp-2">{proj.challenge}</span>
                  </div>
                )}

                {proj.results && (
                  <div className="mt-2 p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-950 font-medium">
                    📈 {proj.results}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>/projects/{proj.slug}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-16 text-center text-sm text-slate-500 bg-white rounded-2xl border">
            No projects found in this category.
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Add Project Case Study</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                  })}
                  placeholder="e.g. Turnkey Warehouse Electrical Distribution & Automation"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
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
                  <label className="block font-medium text-slate-700 mb-1">Industry Vertical</label>
                  <select
                    value={formData.industryId}
                    onChange={(e) => setFormData({ ...formData, industryId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="">Select Industry</option>
                    {industries.map((ind) => (
                      <option key={ind.id} value={ind.id}>{ind.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Manesar, Haryana"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.projectStatus}
                    onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="COMPLETED">Completed</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="PLANNED">Planned</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Client Challenge</label>
                <textarea
                  rows={2}
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="Need 2.5 MVA substation commissioning with strict zero disruption SLA..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Our Engineering Solution</label>
                <textarea
                  rows={2}
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="Designed custom HT/LT panel architecture with automated redundancy..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Measurable Results / Impact</label>
                <input
                  type="text"
                  value={formData.results}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  placeholder="Completed 12 days ahead of schedule with zero safety incidents and 99.99% uptime."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Cover Image URL (Unsplash or CDN)</label>
                <input
                  type="text"
                  value={formData.coverMedia}
                  onChange={(e) => setFormData({ ...formData, coverMedia: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 border rounded-xl font-mono text-xs"
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
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {isEditModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Edit Project</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditProject} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Industry Vertical</label>
                  <select
                    value={editingProject.industryId || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, industryId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="">Select Industry</option>
                    {industries.map((ind) => (
                      <option key={ind.id} value={ind.id}>{ind.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingProject.location || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={editingProject.projectStatus}
                    onChange={(e) => setEditingProject({ ...editingProject, projectStatus: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="COMPLETED">Completed</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="PLANNED">Planned</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Client Challenge</label>
                <textarea
                  rows={2}
                  value={editingProject.challenge || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Our Engineering Solution</label>
                <textarea
                  rows={2}
                  value={editingProject.solution || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Measurable Results / Impact</label>
                <input
                  type="text"
                  value={editingProject.results || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingProject.coverMedia || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, coverMedia: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl font-mono text-xs"
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
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold shadow-sm disabled:opacity-50"
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
