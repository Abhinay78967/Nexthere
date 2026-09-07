'use client';

import React, { useState, useEffect } from 'react';
import { SocialPost, SocialPlatform } from '../../../../types/social';
import { fetchSocialCalendar, publishSocialPostNow, deleteSocialPost } from '../../../../lib/api';
import { LinkedinIcon, InstagramIcon, TwitterIcon } from './SocialIcons';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Send,
  Trash2,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface Props {
  onPostUpdated: () => void;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function ContentCalendar({ onPostUpdated }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarPosts, setCalendarPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const loadCalendar = async (y: number, m: number) => {
    setIsLoading(true);
    try {
      const data = await fetchSocialCalendar(y, m);
      if (data?.posts) {
        setCalendarPosts(data.posts);
      } else {
        setCalendarPosts([]);
      }
    } catch (err) {
      console.error('Error fetching calendar data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCalendar(year, month);
  }, [year, month]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handlePublishSelected = async () => {
    if (!selectedPost) return;
    setIsPublishing(true);
    try {
      const updated = await publishSocialPostNow(selectedPost.id);
      if (updated) {
        setSelectedPost(updated);
        loadCalendar(year, month);
        onPostUpdated();
      }
    } catch (err) {
      console.error('Failed to publish post:', err);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedPost) return;
    if (!confirm('Are you sure you want to delete this scheduled post?')) return;

    try {
      await deleteSocialPost(selectedPost.id);
      setSelectedPost(null);
      loadCalendar(year, month);
      onPostUpdated();
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  // Build month grid days
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarCells = [];

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarCells.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, daysInPrevMonth - i),
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      date: new Date(year, month, d),
    });
  }

  // Next month leading days (to fill 35 or 42 grid cells)
  const remainingCells = 42 - calendarCells.length;
  for (let d = 1; d <= (remainingCells >= 7 ? remainingCells % 7 : remainingCells); d++) {
    calendarCells.push({
      day: d,
      isCurrentMonth: false,
      date: new Date(year, month + 1, d),
    });
  }

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'LINKEDIN':
        return <LinkedinIcon className="w-3 h-3 text-blue-400" />;
      case 'INSTAGRAM':
        return <InstagramIcon className="w-3 h-3 text-pink-400" />;
      case 'TWITTER':
        return <TwitterIcon className="w-3 h-3 text-sky-400" />;
      default:
        return <Sparkles className="w-3 h-3 text-slate-400" />;
    }
  };

  const isToday = (cellDate: Date) => {
    const today = new Date();
    return (
      cellDate.getDate() === today.getDate() &&
      cellDate.getMonth() === today.getMonth() &&
      cellDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {MONTH_NAMES[month]} {year}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {calendarPosts.length} posts scheduled for this month
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToday}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Today
          </button>
          <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-950/60 text-center py-3">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Date Cells */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-800">
          {calendarCells.map((cell, idx) => {
            const cellDateString = cell.date.toISOString().split('T')[0];
            const postsForDay = calendarPosts.filter((p) => {
              if (!p.scheduledAt) return false;
              const pDate = new Date(p.scheduledAt).toISOString().split('T')[0];
              return pDate === cellDateString;
            });

            return (
              <div
                key={idx}
                className={`min-h-[110px] p-2 transition-colors flex flex-col justify-between ${
                  cell.isCurrentMonth ? 'bg-slate-900/60' : 'bg-slate-950/40 opacity-40'
                } ${isToday(cell.date) ? 'ring-2 ring-blue-500/50 ring-inset' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday(cell.date)
                        ? 'bg-blue-600 text-white shadow-sm'
                        : cell.isCurrentMonth
                        ? 'text-slate-300'
                        : 'text-slate-600'
                    }`}
                  >
                    {cell.day}
                  </span>
                  {postsForDay.length > 0 && (
                    <span className="text-[10px] text-blue-400 font-mono font-medium">
                      {postsForDay.length} {postsForDay.length === 1 ? 'post' : 'posts'}
                    </span>
                  )}
                </div>

                {/* Posts inside cell */}
                <div className="mt-1 space-y-1 overflow-y-auto max-h-[70px]">
                  {postsForDay.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className={`w-full text-left p-1.5 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 transition-all truncate cursor-pointer ${
                        post.status === 'PUBLISHED'
                          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 hover:bg-emerald-950/70'
                          : post.status === 'FAILED'
                          ? 'bg-red-950/40 border-red-800/60 text-red-300 hover:bg-red-950/70'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {getPlatformIcon(post.platform)}
                      <span className="truncate">{post.title || post.content.slice(0, 20)}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getPlatformIcon(selectedPost.platform)}
                <h3 className="text-base font-bold text-white">
                  {selectedPost.title || `${selectedPost.platform} Post`}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Status:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-semibold ${
                    selectedPost.status === 'PUBLISHED'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : selectedPost.status === 'SCHEDULED'
                      ? 'bg-blue-950 text-blue-300 border border-blue-800'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {selectedPost.status}
                </span>
              </div>

              {selectedPost.scheduledAt && (
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Scheduled Time:
                  </span>
                  <span className="font-mono">{new Date(selectedPost.scheduledAt).toLocaleString()}</span>
                </div>
              )}

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 max-h-[220px] overflow-y-auto">
                <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {selectedPost.content}
                </p>
              </div>

              {selectedPost.externalPostUrl && (
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 flex items-center justify-between text-xs">
                  <span className="text-blue-300">Live Post Link:</span>
                  <a
                    href={selectedPost.externalPostUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    View Post <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/50 hover:bg-red-900/50 text-red-400 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
                  >
                    Close
                  </button>

                  {selectedPost.status !== 'PUBLISHED' && (
                    <button
                      type="button"
                      disabled={isPublishing}
                      onClick={handlePublishSelected}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" /> Publish Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
