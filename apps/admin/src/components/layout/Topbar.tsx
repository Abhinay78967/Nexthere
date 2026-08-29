'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, ExternalLink, Shield, User } from 'lucide-react';

export function Topbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setUserEmail(user.email);
        }
      } catch {}
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Logout error:', err);
    }
    router.push('/login');
    router.refresh();
  };

  const publicSiteUrl = process.env.NEXT_PUBLIC_PUBLIC_SITE_URL || 'https://nexthere-web.vercel.app';

  return (
    <div className="sticky top-0 z-20 flex h-16 flex-shrink-0 bg-white shadow-xs border-b border-slate-200">
      <div className="flex flex-1 justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            NextHere Control Plane
          </span>
        </div>
        <div className="ml-4 flex items-center space-x-3">
          {/* Live Website Link */}
          <a
            href={publicSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Website (Live)</span>
          </a>

          <div className="h-6 w-px bg-slate-200" aria-hidden="true" />

          {/* User Badge */}
          {userEmail && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-xs font-medium text-blue-900">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>{userEmail}</span>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200/60 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
