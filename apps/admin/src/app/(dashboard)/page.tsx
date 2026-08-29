'use client';

import { Users, FileText, CheckCircle, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    leads: 0,
    services: 0,
    projects: 0,
  });
  
  useEffect(() => {
    async function loadStats() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        const headers = { Authorization: `Bearer ${session.access_token}` };
        
        const [leadsRes, servicesRes, projectsRes] = await Promise.all([
          fetch(`${apiUrl}/admin/leads`, { headers }),
          fetch(`${apiUrl}/admin/services`, { headers }),
          fetch(`${apiUrl}/admin/projects`, { headers }),
        ]);

        const [leads, services, projects] = await Promise.all([
          leadsRes.json(),
          servicesRes.json(),
          projectsRes.json()
        ]);

        setStats({ 
          leads: leads.data?.length || 0, 
          services: services.data?.filter((s: any) => s.active)?.length || 0, 
          projects: projects.data?.length || 0 
        });
      } catch (err) {
        console.error('Failed to load stats', err);
      }
    }
    
    loadStats();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Welcome back, Admin 👋
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Here's what's happening with your NextHere platform today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Card 1 */}
        <div className="relative overflow-hidden rounded-xl bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 border border-gray-100">
          <dt>
            <div className="absolute rounded-md bg-blue-600 p-3">
              <Users className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">Total Leads</p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stats.leads}</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <TrendingUp className="h-4 w-4 mr-1 flex-shrink-0 self-center text-green-500" />
              <span className="sr-only">Active</span>
              Real-time
            </p>
          </dd>
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden rounded-xl bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 border border-gray-100">
          <dt>
            <div className="absolute rounded-md bg-indigo-600 p-3">
              <FileText className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">Published Services</p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stats.services}</p>
          </dd>
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden rounded-xl bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 border border-gray-100">
          <dt>
            <div className="absolute rounded-md bg-emerald-600 p-3">
              <CheckCircle className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">Total Projects</p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stats.projects}</p>
          </dd>
        </div>
      </div>

      {/* Quick Action Section */}
      <div className="bg-white shadow rounded-xl border border-gray-100 overflow-hidden mb-8">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-gray-500" />
            Quick Overview
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
            <AlertCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Live Database Connected</h3>
          <p>Your platform is now connected to the real PostgreSQL database and showing live metrics.</p>
        </div>
      </div>
    </div>
  );
}
