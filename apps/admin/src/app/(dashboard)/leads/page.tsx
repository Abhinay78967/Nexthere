'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Edit3, 
  Mail, 
  Phone, 
  Building, 
  X,
  Send,
  Calendar
} from 'lucide-react';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLead, setActiveLead] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Add lead form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    serviceCategoryId: '',
    status: 'NEW',
    priority: 'MEDIUM',
    notes: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLeads();
    fetchCategories();
  }, [selectedStatus]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/admin/leads', window.location.origin);
      if (selectedStatus !== 'ALL') url.searchParams.set('status', selectedStatus);
      if (searchQuery) url.searchParams.set('search', searchQuery);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setLeads(json.data);
      } else {
        throw new Error(json.error || 'Failed to load leads');
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          companyName: '',
          serviceCategoryId: '',
          status: 'NEW',
          priority: 'MEDIUM',
          notes: '',
          message: '',
        });
        fetchLeads();
      } else {
        alert(json.error || 'Failed to create lead');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        if (activeLead && activeLead.id === id) {
          setActiveLead({ ...activeLead, status: newStatus });
        }
        fetchLeads();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUpdatePriority = async (id: string, newPriority: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, priority: newPriority }),
      });
      const json = await res.json();
      if (json.success) {
        if (activeLead && activeLead.id === id) {
          setActiveLead({ ...activeLead, priority: newPriority });
        }
        fetchLeads();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSaveNotes = async (id: string, notes: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, notes }),
      });
      const json = await res.json();
      if (json.success) {
        alert('Notes updated successfully');
        fetchLeads();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setIsDetailModalOpen(false);
        fetchLeads();
      } else {
        alert(json.error || 'Failed to delete lead');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">New</span>;
      case 'CONTACTED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">Contacted</span>;
      case 'QUALIFIED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">Qualified</span>;
      case 'WON':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Won</span>;
      case 'LOST':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Lost</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-800">URGENT</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-100 text-orange-800">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">MEDIUM</span>;
      case 'LOW':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">LOW</span>;
      default:
        return <span>{priority}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            Leads & Inquiries CRM
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track and manage all customer quotation inquiries, project consultation requests, and business opportunities.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Lead Manually
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedStatus === status
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800"
          >
            Search
          </button>
        </form>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-3.5 pl-6 pr-3 text-left text-xs font-semibold text-slate-600 uppercase">Customer</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase">Service Category</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase">Priority</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase">Source</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="py-3.5 pl-3 pr-6 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-sm text-slate-500">
                    <Clock className="w-6 h-6 mx-auto animate-spin mb-2 text-blue-600" />
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pl-6 pr-3 text-sm">
                      <div className="font-bold text-slate-900">{lead.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {lead.phone}
                        </div>
                      )}
                      {lead.companyName && (
                        <div className="text-xs font-medium text-blue-600 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3" /> {lead.companyName}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-4 text-sm text-slate-700">
                      <span className="font-medium">{lead.ServiceCategory?.title || lead.Service?.title || 'General Consultation'}</span>
                    </td>
                    <td className="px-3 py-4 text-sm">
                      {getPriorityBadge(lead.priority)}
                    </td>
                    <td className="px-3 py-4 text-sm">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        className="text-xs font-semibold rounded-lg border border-slate-200 bg-white px-2.5 py-1 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="QUALIFIED">Qualified</option>
                        <option value="WON">Won</option>
                        <option value="LOST">Lost</option>
                      </select>
                    </td>
                    <td className="px-3 py-4 text-xs font-medium text-slate-500">
                      {lead.source}
                    </td>
                    <td className="px-3 py-4 text-xs text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-4 pl-3 pr-6 text-right text-sm">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setActiveLead(lead);
                            setIsDetailModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-sm text-slate-500">
                    No leads found matching criteria. Click &quot;Add Lead Manually&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900">Add New Lead</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateLead} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@company.com"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Company / Org</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Logistics Ltd"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Service Pillar</label>
                  <select
                    value={formData.serviceCategoryId}
                    onChange={(e) => setFormData({ ...formData, serviceCategoryId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="">Select Service Pillar</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="QUALIFIED">Qualified</option>
                    <option value="WON">Won</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Customer Requirements / Inquiry Message</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Need 5x 14ft container mini trucks for daily Delhi-NCR distribution..."
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
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {isDetailModalOpen && activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <h3 className="font-bold text-xl text-slate-900">{activeLead.name}</h3>
                <p className="text-xs text-slate-500 mt-1">Lead ID: {activeLead.id}</p>
              </div>
              <button onClick={() => setIsDetailModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metadata Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Status</span>
                <select
                  value={activeLead.status}
                  onChange={(e) => handleUpdateStatus(activeLead.id, e.target.value)}
                  className="font-bold bg-white border rounded px-2 py-1 text-slate-800"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="QUALIFIED">Qualified</option>
                  <option value="WON">Won</option>
                  <option value="LOST">Lost</option>
                </select>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Priority</span>
                <select
                  value={activeLead.priority}
                  onChange={(e) => handleUpdatePriority(activeLead.id, e.target.value)}
                  className="font-bold bg-white border rounded px-2 py-1 text-slate-800"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Source</span>
                <span className="font-bold text-slate-700">{activeLead.source}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Pillar</span>
                <span className="font-bold text-slate-700">{activeLead.ServiceCategory?.title || 'General'}</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 text-sm">
              <h4 className="font-bold text-slate-900">Contact Information</h4>
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl border border-slate-100 bg-white">
                <div>
                  <span className="text-xs text-slate-400 block">Email</span>
                  <a href={`mailto:${activeLead.email}`} className="font-medium text-blue-600 hover:underline">
                    {activeLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Phone</span>
                  <a href={`tel:${activeLead.phone}`} className="font-medium text-slate-800">
                    {activeLead.phone || 'Not provided'}
                  </a>
                </div>
                {activeLead.companyName && (
                  <div className="col-span-2">
                    <span className="text-xs text-slate-400 block">Company Name</span>
                    <span className="font-medium text-slate-800">{activeLead.companyName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Inquiries */}
            {activeLead.Inquiry && activeLead.Inquiry.length > 0 && (
              <div className="space-y-2 text-sm">
                <h4 className="font-bold text-slate-900">Inquiry Messages</h4>
                <div className="space-y-2">
                  {activeLead.Inquiry.map((inq: any) => (
                    <div key={inq.id} className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                      <div className="font-semibold text-blue-900 text-xs mb-1">{inq.subject}</div>
                      <p className="text-slate-700 text-sm whitespace-pre-wrap">{inq.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Notes */}
            <div className="space-y-2 text-sm">
              <h4 className="font-bold text-slate-900">Internal Operational Notes</h4>
              <textarea
                rows={3}
                defaultValue={activeLead.notes || ''}
                onBlur={(e) => handleSaveNotes(activeLead.id, e.target.value)}
                placeholder="Add meeting notes, agreed quotation rates, or follow-up details (auto-saves on focus out)..."
                className="w-full p-3 border rounded-xl text-sm"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-between items-center pt-4 border-t">
              <button
                onClick={() => handleDeleteLead(activeLead.id)}
                className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Delete Lead
              </button>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
