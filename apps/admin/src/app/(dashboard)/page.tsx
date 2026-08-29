'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  List, 
  FolderKanban, 
  Lightbulb, 
  Building2, 
  HelpCircle, 
  Settings, 
  ArrowUpRight, 
  Plus, 
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Activity,
  Layers,
  Truck,
  Zap,
  Cpu,
  ShieldCheck,
  Globe
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

  const totalLeads = data?.stats?.leads?.total || 0;
  const newLeads = data?.stats?.leads?.new || 0;
  const wonLeads = data?.stats?.leads?.won || 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 text-white shadow-xl border border-slate-800">
        <div className="relative z-10 sm:flex sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> NextHere Enterprise OS
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Executive Command Center
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
              Unified operational control for IT Technology Advisory, Electrical Power Systems, and Motorised Road Freight Logistics.
            </p>
          </div>
          <div className="mt-6 sm:mt-0 flex flex-wrap gap-3">
            <Link
              href="/leads"
              className="inline-flex items-center px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-950/50 transition-all hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4 mr-2" />
              Manage Leads CRM
            </Link>
            <a
              href={process.env.NEXT_PUBLIC_PUBLIC_SITE_URL || "https://nexthere-web.vercel.app"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Public Website (Live)
            </a>
          </div>
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
              {loading ? '...' : totalLeads}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-blue-600 font-semibold">{newLeads} New Inquiries</span>
            <span className="text-emerald-600 font-semibold">{wonLeads} Converted</span>
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
            <span>Enterprise Showcase</span>
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
            <p className="text-sm font-medium text-slate-500">Industry Insights & Articles</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {loading ? '...' : (data?.stats?.articles?.total ?? 0)}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-amber-600 font-semibold">{data?.stats?.articles?.published ?? 0} Published</span>
            <span>Thought Leadership</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics & System Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pillar Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              Service Pillars Portfolio
            </h2>
            <Link href="/services" className="text-xs text-blue-600 hover:underline">View All</Link>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">IT & Technology</p>
                  <p className="text-[11px] text-slate-500">Enterprise Networks, Systems, Advisory</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-white px-2 py-1 rounded-md border border-blue-200">Active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Electrical Infrastructure</p>
                  <p className="text-[11px] text-slate-500">Power Distribution, Control Panels, Wiring</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-white px-2 py-1 rounded-md border border-amber-200">Active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Freight & Logistics</p>
                  <p className="text-[11px] text-slate-500">Commercial Fleets, Dedicated Dispatches</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-1 rounded-md border border-emerald-200">Active</span>
            </div>
          </div>
        </div>

        {/* System & Telemetry Health */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              Platform Telemetry & Health
            </h2>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live & Healthy
            </span>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" /> Supabase Database
              </span>
              <span className="text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded">Connected (HTTPS)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-indigo-600" /> Public Portal
              </span>
              <a href="https://nexthere-web.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold flex items-center gap-1">
                nexthere-web.vercel.app <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" /> Mobile Native APK
              </span>
              <span className="text-slate-700 font-semibold">Build #42073516 (Ready)</span>
            </div>
          </div>
        </div>

        {/* Quick Management Matrix */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Quick Action Matrix
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link
              href="/leads"
              className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 transition-all flex flex-col items-center text-center group"
            >
              <Users className="w-5 h-5 text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800">Leads CRM</span>
            </Link>

            <Link
              href="/services"
              className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 transition-all flex flex-col items-center text-center group"
            >
              <List className="w-5 h-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800">Services</span>
            </Link>

            <Link
              href="/projects"
              className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200/80 hover:border-purple-200 transition-all flex flex-col items-center text-center group"
            >
              <FolderKanban className="w-5 h-5 text-purple-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800">Projects</span>
            </Link>

            <Link
              href="/insights"
              className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200/80 hover:border-amber-200 transition-all flex flex-col items-center text-center group"
            >
              <Lightbulb className="w-5 h-5 text-amber-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800">Insights</span>
            </Link>

            <Link
              href="/company"
              className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 transition-all flex flex-col items-center text-center group"
            >
              <Building2 className="w-5 h-5 text-indigo-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800">Company</span>
            </Link>

            <Link
              href="/settings"
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all flex flex-col items-center text-center group"
            >
              <Settings className="w-5 h-5 text-slate-700 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800">Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Inbound Inquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Customer Inquiries</h2>
            <p className="mt-1 text-xs text-slate-500">Live stream of quotation requests and lead submissions.</p>
          </div>
          <Link
            href="/leads"
            className="mt-3 sm:mt-0 inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            View all leads & pipeline →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/75">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-500">
                    <Clock className="w-5 h-5 mx-auto animate-spin mb-2 text-blue-600" />
                    Fetching latest live inquiries...
                  </td>
                </tr>
              ) : data?.recentLeads?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-500">
                    No inquiries recorded yet. New submissions will stream here live.
                  </td>
                </tr>
              ) : (
                data?.recentLeads?.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-sm text-slate-900">{lead.name}</div>
                      <div className="text-xs text-slate-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {lead.companyName || 'Individual'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-medium text-slate-700 uppercase bg-slate-100 px-2 py-0.5 rounded">
                        {lead.priority || 'MEDIUM'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Link
                        href={`/leads`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Open CRM →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
