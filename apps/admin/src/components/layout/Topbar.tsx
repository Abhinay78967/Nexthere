'use client';

import { createClient } from '../../lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, Bell } from 'lucide-react';

export function Topbar() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow-sm border-b border-gray-200">
      <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center">
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight"></h1>
        </div>
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          <button className="text-gray-400 hover:text-gray-500 transition-colors">
            <Bell className="h-6 w-6" />
          </button>
          
          <div className="h-8 w-px bg-gray-200" aria-hidden="true" />
          
          <button
            onClick={handleLogout}
            className="group flex items-center space-x-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
