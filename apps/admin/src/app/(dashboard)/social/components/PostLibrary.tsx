'use client';

import React, { useState } from 'react';
import { SocialPost, SocialPlatform, SocialPostStatus } from '../../../../types/social';
import { publishSocialPostNow, deleteSocialPost } from '../../../../lib/api';
import { LinkedinIcon, InstagramIcon, TwitterIcon } from './SocialIcons';
import {
  Sparkles,
  Send,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  Clock,
  ThumbsUp,
  MessageCircle,
  Eye,
  Search,
  Filter,
} from 'lucide-react';

interface Props {
  posts: SocialPost[];
  onPostUpdated: () => void;
}

export function PostLibrary({ posts, onPostUpdated }: Props) {
  const [filterPlatform, setFilterPlatform] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePublishNow = async (id: string) => {
    setPublishingId(id);
    try {
      await publishSocialPostNow(id);
      onPostUpdated();
    } catch (err) {
      console.error('Failed to publish post:', err);
    } finally {
      setPublishingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteSocialPost(id);
      onPostUpdated();
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (filterPlatform !== 'ALL' && post.platform !== filterPlatform) return false;
    if (filterStatus !== 'ALL' && post.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const titleMatch = post.title?.toLowerCase().includes(q);
      const contentMatch = post.content.toLowerCase().includes(q);
      if (!titleMatch && !contentMatch) return false;
    }
    return true;
  });

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'LINKEDIN':
        return <LinkedinIcon className="w-4 h-4 text-blue-400" />;
      case 'INSTAGRAM':
        return <InstagramIcon className="w-4 h-4 text-pink-400" />;
      case 'TWITTER':
        return <TwitterIcon className="w-4 h-4 text-sky-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search posts by topic or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
            {['ALL', 'LINKEDIN', 'INSTAGRAM', 'TWITTER'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPlatform(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterPlatform === p
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p === 'ALL' ? 'All Channels' : p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
            {['ALL', 'SCHEDULED', 'PUBLISHED', 'DRAFT'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterStatus === s
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-sm"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                      {getPlatformIcon(post.platform)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {post.platform}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {post.brandProfile?.name || 'NextHere'}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                      post.status === 'PUBLISHED'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80'
                        : post.status === 'SCHEDULED'
                        ? 'bg-blue-950 text-blue-300 border border-blue-800/80'
                        : post.status === 'FAILED'
                        ? 'bg-red-950 text-red-300 border border-red-800/80'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {post.status}
                  </span>
                </div>

                {/* Title */}
                {post.title && (
                  <h3 className="text-sm font-bold text-white mb-2 line-clamp-1">
                    {post.title}
                  </h3>
                )}

                {/* Content excerpt */}
                <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 mb-3 max-h-[140px] overflow-y-auto">
                  <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Scheduled / Published Date */}
                {post.scheduledAt && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-2">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span>Scheduled: {new Date(post.scheduledAt).toLocaleString()}</span>
                  </div>
                )}

                {/* Metrics snapshot if published */}
                {post.metrics && (
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-blue-400" />
                      {post.metrics.impressions || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3 text-emerald-400" />
                      {post.metrics.likes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-amber-400" />
                      {post.metrics.comments || 0}
                    </span>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(post.content, post.id)}
                    title="Copy Text"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedId === post.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(post.id)}
                    title="Delete Post"
                    className="p-1.5 rounded-lg hover:bg-red-950/60 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {post.externalPostUrl && (
                    <a
                      href={post.externalPostUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-950/60 text-blue-400 hover:bg-blue-900/60 text-xs font-medium transition-colors"
                    >
                      View Live <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {post.status !== 'PUBLISHED' && (
                    <button
                      disabled={publishingId === post.id}
                      onClick={() => handlePublishNow(post.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3 h-3" /> Publish Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl text-slate-500">
          <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-300">No Posts Found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Create or generate posts in the AI Creator Studio to populate your library.
          </p>
        </div>
      )}
    </div>
  );
}
