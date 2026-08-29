'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, Settings, List, Users, FolderKanban, Lightbulb, MessageCircleQuestion, Database } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Services', href: '/services', icon: List },
  { name: 'Industries', href: '/industries', icon: Database },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
  { name: 'FAQs', href: '/faqs', icon: MessageCircleQuestion },
  { name: 'Company', href: '/company', icon: Building2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 border-r border-slate-800 shadow-xl">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-800 bg-slate-950/50">
        <span className="text-xl font-bold tracking-tight text-white flex items-center">
          <img src="/logo.png" alt="NextHere Logo" className="h-8 w-auto bg-white p-1 rounded mr-3" />
          Admin
        </span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
        <nav className="flex-1 space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
