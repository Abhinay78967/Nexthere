'use client';

import React, { useState } from 'react';
import { BrandProfile, GeneratedVariant, SocialPlatform } from '../../../../types/social';
import { generateAiSocialPosts, createSocialPost, publishSocialPostNow } from '../../../../lib/api';
import { LinkedinIcon, InstagramIcon, TwitterIcon } from './SocialIcons';
import {
  Sparkles,
  Send,
  Calendar as CalendarIcon,
  Copy,
  Check,
  Zap,
  TrendingUp,
  Layers,
  ChevronLeft,
  ChevronRight,
  Clock,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
} from 'lucide-react';

interface Props {
  brands: BrandProfile[];
  onPostCreated: () => void;
}

const TONES = [
  'Authoritative & Expert',
  'Conversational & Engaging',
  'Inspirational & Thought-Provoking',
  'Value-Driven Promotional',
  'Educational / How-To',
  'Behind the Scenes / Storytelling',
];

const PROMPT_TEMPLATES = [
  '3 Mistakes companies make when modernizing legacy infrastructure',
  'How AI automation transformed our client throughput speed by 40%',
  'The hidden costs of unoptimized freight routes in 2026',
  'Why zero-trust security is non-negotiable for enterprise networks',
];

export function AiPostStudio({ brands, onPostCreated }: Props) {
  const [selectedBrandId, setSelectedBrandId] = useState<string>(brands[0]?.id || '');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState(TONES[0]);
  const [targetAudience, setTargetAudience] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([
    'LINKEDIN',
    'INSTAGRAM',
    'TWITTER',
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedVariant[]>([]);
  const [activeTab, setActiveTab] = useState<SocialPlatform>('LINKEDIN');
  const [carouselSlideIndex, setCarouselSlideIndex] = useState(0);

  const [scheduleModalPost, setScheduleModalPost] = useState<GeneratedVariant | null>(null);
  const [scheduleDateTime, setScheduleDateTime] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const togglePlatform = (p: SocialPlatform) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setActionSuccessMessage(null);
    try {
      const results = await generateAiSocialPosts({
        topic,
        brandProfileId: selectedBrandId || undefined,
        tone,
        targetAudience: targetAudience || undefined,
        platforms: selectedPlatforms,
        customInstructions: customInstructions || undefined,
      });

      if (results && results.length > 0) {
        setGeneratedPosts(results);
        setActiveTab(results[0].platform);
        setCarouselSlideIndex(0);
      }
    } catch (err) {
      console.error('Failed to generate posts:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedMap((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const handleSaveOrSchedule = async (variant: GeneratedVariant, isImmediate: boolean = false) => {
    setIsPublishing(true);
    setActionSuccessMessage(null);
    try {
      const scheduledAt = isImmediate ? null : scheduleDateTime ? new Date(scheduleDateTime).toISOString() : null;

      const created = await createSocialPost({
        brandProfileId: selectedBrandId || undefined,
        platform: variant.platform,
        contentType: variant.contentType,
        status: isImmediate ? 'PUBLISHING' : scheduledAt ? 'SCHEDULED' : 'DRAFT',
        title: variant.title,
        content: variant.content,
        carouselSlides: variant.carouselSlides,
        scheduledAt,
        aiPrompt: topic,
        tags: variant.hashtags,
      });

      if (created) {
        if (isImmediate) {
          await publishSocialPostNow(created.id);
          setActionSuccessMessage(`🚀 Successfully published post to ${variant.platform}!`);
        } else if (scheduledAt) {
          setActionSuccessMessage(`📅 Post successfully scheduled for ${new Date(scheduledAt).toLocaleString()}!`);
        } else {
          setActionSuccessMessage(`💾 Post saved as draft in Post Library!`);
        }
        setScheduleModalPost(null);
        onPostCreated();
      }
    } catch (err) {
      console.error('Error saving/scheduling post:', err);
    } finally {
      setIsPublishing(false);
    }
  };

  const currentVariant = generatedPosts.find((p) => p.platform === activeTab);
  const activeBrand = brands.find((b) => b.id === selectedBrandId) || brands[0];

  return (
    <div className="space-y-8">
      {/* Action Notification */}
      {actionSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-sm font-medium flex items-center justify-between animate-in fade-in">
          <span>{actionSuccessMessage}</span>
          <button
            onClick={() => setActionSuccessMessage(null)}
            className="text-emerald-400 hover:text-emerald-200 text-xs ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Studio Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Content Generator</h2>
              <p className="text-xs text-slate-400">Generate high-converting multi-platform social campaigns in seconds</p>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Brand Vertical */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Business Profile
              </label>
              <select
                value={selectedBrandId}
                onChange={(e) => setSelectedBrandId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Topic or Key Idea *
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. 5 reasons why proactive electrical maintenance saves millions in manufacturing..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 resize-none"
              />

              {/* Quick Inspiration Tags */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="text-[11px] text-slate-500 flex items-center gap-1 mr-1">
                  <Zap className="w-3 h-3 text-amber-400" /> Ideas:
                </span>
                {PROMPT_TEMPLATES.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTopic(item)}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-left truncate max-w-[200px]"
                    title={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Target Platforms
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'LINKEDIN' as SocialPlatform, label: 'LinkedIn', icon: LinkedinIcon, color: 'text-blue-400' },
                  { id: 'INSTAGRAM' as SocialPlatform, label: 'Instagram', icon: InstagramIcon, color: 'text-pink-400' },
                  { id: 'TWITTER' as SocialPlatform, label: 'X (Twitter)', icon: TwitterIcon, color: 'text-sky-400' },
                ].map((item) => {
                  const isChecked = selectedPlatforms.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => togglePlatform(item.id)}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-blue-900/30 border-blue-500/50 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tone Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Tone of Voice
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {TONES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Audience
                </label>
                <input
                  type="text"
                  placeholder="e.g. Enterprise CTOs"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating AI Content & Creatives...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Multi-Platform Posts
                </>
              )}
            </button>
          </form>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-7 space-y-4">
          {generatedPosts.length > 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
              {/* Platform Selector Tabs */}
              <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-2">
                {generatedPosts.map((post) => {
                  const isActive = activeTab === post.platform;
                  return (
                    <button
                      key={post.platform}
                      onClick={() => {
                        setActiveTab(post.platform);
                        setCarouselSlideIndex(0);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                      }`}
                    >
                      {post.platform === 'LINKEDIN' && <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />}
                      {post.platform === 'INSTAGRAM' && <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />}
                      {post.platform === 'TWITTER' && <TwitterIcon className="w-3.5 h-3.5 text-sky-400" />}
                      {post.platform}
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
                        {post.estimatedViralityScore}% Virality
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Current Preview Content */}
              {currentVariant && (
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  {/* Platform Specific Mockup Frame */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-inner">
                    {/* Header bar of the mockup */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                          {activeBrand?.name?.charAt(0) || 'N'}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            {activeBrand?.name || 'NextHere Official'}
                            <span className="text-[10px] text-blue-400 font-normal">● 1st</span>
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {activeBrand?.tagline || 'Enterprise Growth & Advisory'} • Just now
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-900/50">
                          <TrendingUp className="w-3 h-3" /> Best time: {currentVariant.suggestedBestTime}
                        </span>
                      </div>
                    </div>

                    {/* Instagram Carousel View (if Carousel) */}
                    {currentVariant.platform === 'INSTAGRAM' && currentVariant.carouselSlides && (
                      <div className="mb-4 bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                          <span className="flex items-center gap-1 text-pink-400 font-semibold">
                            <Layers className="w-3.5 h-3.5" /> Carousel Slide {carouselSlideIndex + 1} of{' '}
                            {currentVariant.carouselSlides.length}
                          </span>
                          <div className="flex gap-1">
                            <button
                              disabled={carouselSlideIndex === 0}
                              onClick={() => setCarouselSlideIndex((prev) => Math.max(0, prev - 1))}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white cursor-pointer"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={carouselSlideIndex === currentVariant.carouselSlides.length - 1}
                              onClick={() =>
                                setCarouselSlideIndex((prev) =>
                                  Math.min((currentVariant.carouselSlides?.length || 1) - 1, prev + 1)
                                )
                              }
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Current slide preview */}
                        {currentVariant.carouselSlides[carouselSlideIndex] && (
                          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 rounded-lg p-6 text-center space-y-3 min-h-[160px] flex flex-col justify-center">
                            <h4 className="text-base font-bold text-white">
                              {currentVariant.carouselSlides[carouselSlideIndex].heading}
                            </h4>
                            <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                              {currentVariant.carouselSlides[carouselSlideIndex].body}
                            </p>
                            <div className="pt-2 text-[10px] text-pink-400/80 font-mono italic">
                              💡 Visual Guide: {currentVariant.carouselSlides[carouselSlideIndex].visualCue}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Post Copy / Content */}
                    <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto pr-2">
                      {currentVariant.content}
                    </div>

                    {/* Mock Platform Reactions */}
                    <div className="mt-4 pt-3 border-t border-slate-900/80 flex items-center justify-between text-slate-500 text-[11px]">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" /> Like
                        </span>
                        <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" /> Comment
                        </span>
                        <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                          <Share2 className="w-3.5 h-3.5" /> Repost
                        </span>
                      </div>
                      <Bookmark className="w-3.5 h-3.5 hover:text-white" />
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleCopy(currentVariant.content, currentVariant.platform)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      {copiedMap[currentVariant.platform] ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Text
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setScheduleModalPost(currentVariant)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all cursor-pointer border border-slate-700"
                      >
                        <CalendarIcon className="w-3.5 h-3.5 text-blue-400" /> Schedule Post
                      </button>

                      <button
                        type="button"
                        disabled={isPublishing}
                        onClick={() => handleSaveOrSchedule(currentVariant, true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-600/30 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" /> Publish Now (Live/Simulator)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center p-8 bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl text-slate-500">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400 mb-3">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-slate-300">Ready to Generate Content</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Enter your topic or pick one of the recommended ideas on the left to generate viral multi-platform posts.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Post Modal */}
      {scheduleModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4 animate-in fade-in">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              Schedule Post for {scheduleModalPost.platform}
            </h3>

            <p className="text-xs text-slate-400">
              Pick your desired date and time to automatically dispatch this post.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Date & Time *
              </label>
              <input
                type="datetime-local"
                required
                value={scheduleDateTime}
                onChange={(e) => setScheduleDateTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setScheduleModalPost(null)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPublishing || !scheduleDateTime}
                onClick={() => handleSaveOrSchedule(scheduleModalPost, false)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer"
              >
                {isPublishing ? 'Scheduling...' : 'Confirm Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
