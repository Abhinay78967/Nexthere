'use client';

import { useEffect, useState } from 'react';
import { 
  Lightbulb, 
  Plus, 
  Search, 
  Calendar, 
  User, 
  Clock, 
  Edit2, 
  Trash2, 
  X,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function InsightsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    author: 'NextHere Editorial Team',
    industryId: '',
    excerpt: '',
    content: '',
    tags: 'Logistics, Technology, Electrical',
    status: 'PUBLISHED',
    coverMedia: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchArticles();
    fetchIndustries();
  }, [selectedStatus]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/admin/insights', window.location.origin);
      if (selectedStatus !== 'ALL') url.searchParams.set('status', selectedStatus);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) setArticles(json.data);
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

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch('/api/admin/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setFormData({
          title: '',
          slug: '',
          author: 'NextHere Editorial Team',
          industryId: '',
          excerpt: '',
          content: '',
          tags: 'Logistics, Technology, Electrical',
          status: 'PUBLISHED',
          coverMedia: '',
        });
        fetchArticles();
      } else {
        alert(json.error || 'Failed to create article');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    try {
      setSubmitting(true);
      const res = await fetch('/api/admin/insights', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingArticle.id,
          title: editingArticle.title,
          slug: editingArticle.slug,
          author: editingArticle.author,
          industryId: editingArticle.industryId,
          excerpt: editingArticle.excerpt,
          content: editingArticle.content,
          tags: Array.isArray(editingArticle.tags)
            ? editingArticle.tags
            : (editingArticle.tags ? editingArticle.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []),
          status: editingArticle.status,
          coverMedia: editingArticle.coverMedia,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setIsEditModalOpen(false);
        setEditingArticle(null);
        fetchArticles();
      } else {
        alert(json.error || 'Failed to update article');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/admin/insights?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        fetchArticles();
      } else {
        alert(json.error || 'Failed to delete article');
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
            <Lightbulb className="w-7 h-7 text-amber-600" />
            Insights & Technical Articles
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Publish thought leadership, industry whitepapers, and operational announcements.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Write New Article
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {['ALL', 'PUBLISHED', 'DRAFT'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              selectedStatus === st
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center text-sm text-slate-500 bg-white rounded-2xl border">
            <Clock className="w-6 h-6 mx-auto animate-spin mb-2 text-amber-600" />
            Loading insights and articles...
          </div>
        ) : articles.length > 0 ? (
          articles.map((art) => (
            <div key={art.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-6 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    art.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {art.status}
                  </span>
                  {art.Industry?.title && (
                    <span className="text-xs font-medium text-slate-500">· {art.Industry.title}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{art.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">/insights/{art.slug}</p>
                {art.excerpt && (
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl line-clamp-2">
                    {art.excerpt}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {art.author}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(art.publishedAt || art.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  {Array.isArray(art.tags) && art.tags.map((t: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingArticle({
                      ...art,
                      tags: Array.isArray(art.tags) ? art.tags.join(', ') : '',
                      coverMedia: art.coverMedia?.url || (typeof art.coverMedia === 'string' ? art.coverMedia : ''),
                    });
                    setIsEditModalOpen(true);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteArticle(art.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center text-sm text-slate-500 bg-white rounded-2xl border">
            No articles found matching criteria.
          </div>
        )}
      </div>

      {/* Add Article Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Write New Article</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateArticle} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                  })}
                  placeholder="e.g. Next-Generation Road Freight Logistics Optimization in 2026"
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
                  <label className="block font-medium text-slate-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Summary displayed in search and previews..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Article Body Content</label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full markdown or text body of the article..."
                  className="w-full px-3 py-2 border rounded-xl font-sans"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Logistics, Tech, Fleet, India"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
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
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-semibold shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Article Modal */}
      {isEditModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Edit Article</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditArticle} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.slug}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={editingArticle.author || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Short Excerpt</label>
                <textarea
                  rows={2}
                  value={editingArticle.excerpt || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Article Body Content</label>
                <textarea
                  rows={6}
                  value={editingArticle.content || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tags</label>
                  <input
                    type="text"
                    value={editingArticle.tags || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, tags: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={editingArticle.status}
                    onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
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
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-semibold shadow-sm disabled:opacity-50"
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
