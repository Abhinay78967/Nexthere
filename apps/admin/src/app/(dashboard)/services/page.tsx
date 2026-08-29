'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { LayoutList, CheckCircle2, XCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Session expired. Please log in again.');
        return;
      }

      const res = await fetch('http://localhost:3001/api/v1/admin/services', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch services');
      const json = await res.json();
      setServices(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (id: string, currentlyActive: boolean) => {
    // Basic optimistic update could go here
    try {
      const { data: { session } } = await supabase.auth.getSession();
      // The API endpoint currently only publishes (sets active to true). 
      // We'll need a toggle endpoint or we can just call it to publish for now.
      // Assuming we have a publish endpoint, we'll hit it. 
      if (!currentlyActive) {
        await fetch(`http://localhost:3001/api/v1/admin/services/${id}/publish`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        fetchServices();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Services Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your service catalog. You can publish drafted services to make them visible on the public website.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-blue-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            Add Service
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-md flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Service Name</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr><td colSpan={4} className="py-10 text-center text-sm text-gray-500">Loading services...</td></tr>
                  ) : services.length === 0 ? (
                    <tr><td colSpan={4} className="py-10 text-center text-sm text-gray-500">No services found.</td></tr>
                  ) : services.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="font-medium text-gray-900 flex items-center">
                          <LayoutList className="w-4 h-4 mr-2 text-gray-400" />
                          {service.title}
                        </div>
                        <div className="text-gray-500 text-xs mt-1">/{service.slug}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {service.category?.name || 'Uncategorized'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        {service.active ? (
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            <Eye className="w-3 h-3 mr-1" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            <EyeOff className="w-3 h-3 mr-1" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {!service.active && (
                          <button
                            onClick={() => togglePublish(service.id, service.active)}
                            className="text-blue-600 hover:text-blue-900 font-semibold bg-blue-50 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors"
                          >
                            Publish Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
