'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  List, 
  FolderKanban, 
  Lightbulb, 
  ArrowUpRight, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.error || 'Failed to load stats');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">Executive Portal Live</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">NextHere Command Center</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Real-time management for IT Consultancy, Electrical Infrastructure & Road Freight Logistics pillars.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/leads"
            className="inline-flex items-center px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-950/50 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 mr-2" />
            View Leads
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_PUBLIC_SITE_URL || "https://nexthere-web.vercel.app"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Public Website
          </a>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Leads */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <Link href="/leads" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
              Manage <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500">Inbound Customer Leads</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {loading ? '...' : (data?.stats?.leads?.total ?? 0)}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-blue-600 font-semibold">{data?.stats?.leads?.new ?? 0} New Inquiries</span>
            <span className="text-emerald-600 font-semibold">{data?.stats?.leads?.won ?? 0} Won</span>
          </div>
        </div>

        {/* Card 2: Services */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <List className="w-6 h-6" />
            </div>
            <Link href="/services" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center">
              Manage <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500">Active Solutions & Fleet</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {loading ? '...' : (data?.stats?.services?.total ?? 0)}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-emerald-600 font-semibold">{data?.stats?.services?.active ?? 0} Published</span>
            <span>3 Pillars (IT, Elec, Freight)</span>
          </div>
        </div>

        {/* Card 3: Projects */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <FolderKanban className="w-6 h-6" />
            </div>
            <Link href="/projects" className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center">
              Manage <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500">Case Studies & Projects</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {loading ? '...' : (data?.stats?.projects?.total ?? 0)}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-purple-600 font-semibold">{data?.stats?.projects?.completed ?? 0} Completed</span>
            <span>Enterprise Portfolio</span>
          </div>
        </div>

        {/* Card 4: Insights */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Lightbulb className="w-6 h-6" />
            </div>
            <Link href="/insights" className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center">
              Manage <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500">Published Insights & FAQs</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {loading ? '...' : ((data?.stats?.insights?.total ?? 0) + (data?.stats?.faqs?.total ?? 0))}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-amber-600 font-semibold">{data?.stats?.insights?.published ?? 0} Articles</span>
            <span>{data?.stats?.faqs?.total ?? 0} FAQs</span>
          </div>
        </div>
      </div>

      {/* Quick Access Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/services"
          className="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <List className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Manage Services & Rates</h3>
            <p className="text-xs text-slate-500 mt-1">Add, update pricing, or edit descriptions for all 3 business pillars.</p>
          </div>
        </Link>

        <Link
          href="/company"
          className="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Company Master Profile</h3>
            <p className="text-xs text-slate-500 mt-1">Update registered office address, phone, email, and corporate info.</p>
          </div>
        </Link>

        <Link
          href="/leads"
          className="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Customer Leads & Quotes</h3>
            <p className="text-xs text-slate-500 mt-1">Respond to customer quote requests and update CRM status.</p>
          </div>
        </Link>
      </div>

      {/* Recent Inbound Leads Stream */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Customer Inquiries</h2>
            <p className="text-xs text-slate-500 mt-0.5">Real-time inquiries received from website contact and quotation forms.</p>
          </div>
          <Link
            href="/leads"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all leads <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/75">
              <tr>
                <th className="py-3.5 pl-6 pr-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer Name</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Contact Info</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Service Category</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Received At</th>
                <th className="relative py-3.5 pl-3 pr-6 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-slate-500">
                    <Clock className="w-5 h-5 mx-auto animate-spin mb-2 text-blue-600" />
                    Loading latest inquiries...
                  </td>
                </tr>
              ) : data?.recentLeads?.length > 0 ? (
                data.recentLeads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pl-6 pr-3 text-sm font-semibold text-slate-900">
                      <div>{lead.name}</div>
                      {lead.companyName && <div className="text-xs font-normal text-slate-500">{lead.companyName}</div>}
                    </td>
                    <td className="px-3 py-4 text-sm text-slate-600">
                      <div>{lead.email}</div>
                      {lead.phone && <div className="text-xs text-slate-500">{lead.phone}</div>}
                    </td>
                    <td className="px-3 py-4 text-sm text-slate-600">
                      <span className="font-medium">{lead.ServiceCategory?.title || lead.Service?.title || 'General Inquiry'}</span>
                    </td>
                    <td className="px-3 py-4 text-sm">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-3 py-4 text-xs text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-4 pl-3 pr-6 text-right text-sm">
                      <Link
                        href="/leads"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200/60 inline-flex items-center"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-slate-500">
                    No inquiries received yet. Submit a test quote from the website to see it appear live!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
