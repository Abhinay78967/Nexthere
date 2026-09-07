'use client';

import React, { useState, useEffect } from 'react';
import { BrandProfile, SocialPost, SocialStats, SocialAccount } from '../../../types/social';
import { fetchSocialStats, fetchSocialBrands, fetchSocialPosts, fetchSocialAccounts } from '../../../lib/api';
import { AiPostStudio } from './components/AiPostStudio';
import { ContentCalendar } from './components/ContentCalendar';
import { PostLibrary } from './components/PostLibrary';
import { BrandProfilesManager } from './components/BrandProfilesManager';
import { ConnectedAccountsManager } from './components/ConnectedAccountsManager';
import {
  Sparkles,
  Calendar,
  Layers,
  Building,
  TrendingUp,
  Eye,
  ThumbsUp,
  Clock,
  CheckCircle2,
  RefreshCw,
  Share2,
} from 'lucide-react';

export default function SocialGrowthPage() {
  const [activeTab, setActiveTab] = useState<'studio' | 'calendar' | 'library' | 'brands' | 'channels'>('studio');
  const [stats, setStats] = useState<SocialStats | null>(null);
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [statsData, brandsData, postsData, accountsData] = await Promise.all([
        fetchSocialStats(),
        fetchSocialBrands(),
        fetchSocialPosts(),
        fetchSocialAccounts(),
      ]);

      if (statsData) setStats(statsData);
      if (brandsData) setBrands(brandsData);
      if (postsData) setPosts(postsData);
      if (accountsData) setAccounts(accountsData);
    } catch (err) {
      console.error('Failed to load social growth data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Autonomous Growth Engine
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Social Media & Brand Growth Hub
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage multi-business social presence, generate viral B2B & consumer campaigns with AI, and automate scheduling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            title="Refresh Data"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Create with AI
          </button>
        </div>
      </div>

      {/* KPI Stats Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-slate-400 font-medium">Scheduled Posts</span>
            <div className="text-2xl font-bold text-white mt-1">
              {stats?.scheduledCount ?? posts.filter((p) => p.status === 'SCHEDULED').length}
            </div>
            <span className="text-[11px] text-blue-400 font-mono mt-0.5 inline-block">Active Pipeline</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-slate-400 font-medium">Published Posts</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              {stats?.publishedCount ?? posts.filter((p) => p.status === 'PUBLISHED').length}
            </div>
            <span className="text-[11px] text-emerald-400/80 font-mono mt-0.5 inline-block">Live on Feed</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-slate-400 font-medium">Est. Impressions</span>
            <div className="text-2xl font-bold text-white mt-1">
              {stats?.estimatedImpressions ? stats.estimatedImpressions.toLocaleString() : '12.4k+'}
            </div>
            <span className="text-[11px] text-emerald-400 font-mono mt-0.5 inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +28% this month
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-slate-400 font-medium">Connected Channels</span>
            <div className="text-2xl font-bold text-white mt-1">
              {accounts.length || 3}
            </div>
            <span className="text-[11px] text-slate-400 font-mono mt-0.5 inline-block">Active Dispatches</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="border-b border-slate-800 flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'studio', label: 'AI Creator Studio', icon: Sparkles },
          { id: 'calendar', label: 'Content Calendar', icon: Calendar },
          { id: 'library', label: 'Post Library', icon: Layers },
          { id: 'brands', label: 'Brand Presets', icon: Building },
          { id: 'channels', label: 'Connected Channels', icon: Share2 },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.id === 'library' && posts.length > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {posts.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      <div>
        {activeTab === 'studio' && (
          <AiPostStudio brands={brands} onPostCreated={loadAllData} />
        )}

        {activeTab === 'calendar' && (
          <ContentCalendar onPostUpdated={loadAllData} />
        )}

        {activeTab === 'library' && (
          <PostLibrary posts={posts} onPostUpdated={loadAllData} />
        )}

        {activeTab === 'brands' && (
          <BrandProfilesManager brands={brands} onBrandCreated={loadAllData} />
        )}

        {activeTab === 'channels' && (
          <ConnectedAccountsManager
            accounts={accounts}
            brands={brands}
            onAccountUpdated={loadAllData}
          />
        )}
      </div>
    </div>
  );
}

