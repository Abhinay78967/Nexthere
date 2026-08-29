'use client';

import { useEffect, useState } from 'react';
import { 
  MessageCircleQuestion, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Clock, 
  X,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    displayOrder: 0,
    status: 'PUBLISHED',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/faqs');
      const json = await res.json();
      if (json.success) setFaqs(json.data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setFormData({ question: '', answer: '', category: 'General', displayOrder: 0, status: 'PUBLISHED' });
        fetchFaqs();
      } else {
        alert(json.error || 'Failed to create FAQ');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    try {
      setSubmitting(true);
      const res = await fetch('/api/admin/faqs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq),
      });
      const json = await res.json();
      if (json.success) {
        setIsEditModalOpen(false);
        setEditingFaq(null);
        fetchFaqs();
      } else {
        alert(json.error || 'Failed to update FAQ');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        fetchFaqs();
      } else {
        alert(json.error || 'Failed to delete FAQ');
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
            <MessageCircleQuestion className="w-7 h-7 text-cyan-600" />
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage customer guidance, rate explanations, safety protocols, and operational FAQs.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center text-sm text-slate-500 bg-white rounded-2xl border">
            <Clock className="w-6 h-6 mx-auto animate-spin mb-2 text-cyan-600" />
            Loading FAQs...
          </div>
        ) : faqs.length > 0 ? (
          faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-6 items-start">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200">
                    {faq.category || 'General'}
                  </span>
                  <span className="text-xs text-slate-400">Order: #{faq.displayOrder}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 pl-7 leading-relaxed whitespace-pre-wrap">
                  {faq.answer}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingFaq(faq);
                    setIsEditModalOpen(true);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center text-sm text-slate-500 bg-white rounded-2xl border">
            No FAQs created yet.
          </div>
        )}
      </div>

      {/* Add FAQ Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Add New FAQ</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateFaq} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. How does NextHere calculate mini truck freight rates?"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Clear and helpful answer for customers..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="General, Logistics, IT, Electrical"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
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
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-semibold shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {isEditModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Edit FAQ</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditFaq} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingFaq.category || ''}
                    onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingFaq.displayOrder}
                    onChange={(e) => setEditingFaq({ ...editingFaq, displayOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
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
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-semibold shadow-sm disabled:opacity-50"
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
