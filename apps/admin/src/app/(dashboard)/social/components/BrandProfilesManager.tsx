'use client';

import React, { useState } from 'react';
import { BrandProfile } from '../../../../types/social';
import { createSocialBrand } from '../../../../lib/api';
import { Building, Plus, Tag, MessageSquare, Target, Globe, CheckCircle2, Sparkles } from 'lucide-react';

interface Props {
  brands: BrandProfile[];
  onBrandCreated: () => void;
}

export function BrandProfilesManager({ brands, onBrandCreated }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    toneOfVoice: 'Authoritative, Engaging & Growth-Oriented',
    targetAudience: 'Business Leaders, Tech Decision Makers & Enterprise Buyers',
    defaultHashtags: 'NextHere, BusinessGrowth, EnterpriseTech',
    websiteUrl: 'https://nexthere.in',
    ctaText: 'Get in touch with our team at nexthere.in',
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData((prev) => ({ ...prev, name, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) return;

    setIsSubmitting(true);
    try {
      const hashtagsArray = formData.defaultHashtags
        .split(/[,#\s]+/)
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean);

      await createSocialBrand({
        ...formData,
        defaultHashtags: hashtagsArray,
      });

      setShowModal(false);
      setFormData({
        name: '',
        slug: '',
        tagline: '',
        toneOfVoice: 'Authoritative, Engaging & Growth-Oriented',
        targetAudience: 'Business Leaders, Tech Decision Makers & Enterprise Buyers',
        defaultHashtags: 'NextHere, BusinessGrowth, EnterpriseTech',
        websiteUrl: 'https://nexthere.in',
        ctaText: 'Get in touch with our team at nexthere.in',
      });
      onBrandCreated();
    } catch (err) {
      console.error('Error creating brand profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-500" />
            Business Brand Presets
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Configure multi-business profiles with custom voice, target audience, and hashtags for AI generation.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Business Preset
        </button>
      </div>

      {/* Grid of Brands */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-6 flex flex-col justify-between group shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg">
                  {brand.name.charAt(0)}
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700">
                  {brand.slug}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mt-4 group-hover:text-blue-400 transition-colors">
                {brand.name}
              </h3>
              {brand.tagline && (
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{brand.tagline}</p>
              )}

              <div className="mt-5 space-y-3">
                {brand.toneOfVoice && (
                  <div className="flex items-start gap-2 text-xs text-slate-300">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-500 font-medium">Tone:</span> {brand.toneOfVoice}
                    </div>
                  </div>
                )}

                {brand.targetAudience && (
                  <div className="flex items-start gap-2 text-xs text-slate-300">
                    <Target className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-500 font-medium">Audience:</span> {brand.targetAudience}
                    </div>
                  </div>
                )}

                {brand.websiteUrl && (
                  <div className="flex items-center gap-2 text-xs text-blue-400 truncate">
                    <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{brand.websiteUrl}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Tag className="w-3 h-3 text-slate-500 mr-1 shrink-0" />
                {brand.defaultHashtags?.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
                {(brand.defaultHashtags?.length || 0) > 3 && (
                  <span className="text-[10px] text-slate-500">
                    +{(brand.defaultHashtags?.length || 0) - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                New Business Brand Preset
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Business / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextHere Cloud & AI"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Autonomous AI for Enterprise Growth"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Tone of Voice
                  </label>
                  <input
                    type="text"
                    value={formData.toneOfVoice}
                    onChange={(e) => setFormData({ ...formData, toneOfVoice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Default Hashtags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.defaultHashtags}
                  onChange={(e) => setFormData({ ...formData, defaultHashtags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Website URL
                  </label>
                  <input
                    type="text"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Call To Action (CTA)
                  </label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Saving...' : 'Create Preset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
