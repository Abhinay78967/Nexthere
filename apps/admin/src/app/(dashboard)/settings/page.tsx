'use client';

import { useEffect, useState } from 'react';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Clock, 
  Globe, 
  Share2, 
  Search,
  Sparkles
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({
    siteName: '',
    tagline: '',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/nexthere-services',
      twitter: 'https://twitter.com/nexthereservices',
      instagram: 'https://instagram.com/nexthereservices',
      youtube: 'https://youtube.com/@nexthereservices',
    },
    defaultSEO: {
      title: 'NextHere Services | IT, Electrical & Logistics Enterprise Platform',
      description: 'Unified commercial IT advisory, electrical power systems, and motorised road freight logistics solutions in India.',
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/settings');
      const json = await res.json();
      if (json.success && json.data) {
        setSettings({
          ...json.data,
          socialLinks: json.data.socialLinks || {
            linkedin: 'https://linkedin.com/company/nexthere-services',
            twitter: 'https://twitter.com/nexthereservices',
            instagram: 'https://instagram.com/nexthereservices',
            youtube: 'https://youtube.com/@nexthereservices',
          },
          defaultSEO: json.data.defaultSEO || {
            title: 'NextHere Services | IT, Electrical & Logistics Enterprise Platform',
            description: 'Unified commercial IT advisory, electrical power systems, and motorised road freight logistics solutions in India.',
          },
        });
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSavedSuccess(false);
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const json = await res.json();
      if (json.success) {
        setSettings(json.data);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      } else {
        alert(json.error || 'Failed to save site settings');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-7 h-7 text-slate-700" />
            Global Site Settings & SEO
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure global website metadata, search engine indexing parameters, and social presence links.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-sm font-semibold animate-fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          Site settings successfully saved in database!
        </div>
      )}

      {loading ? (
        <div className="py-24 text-center text-sm text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <Clock className="w-8 h-8 mx-auto animate-spin mb-3 text-slate-700" />
          Loading settings...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: General Info */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Website Branding
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Global headers, browser tabs, and banner titles.</p>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Website Title</label>
                <input
                  type="text"
                  required
                  value={settings.siteName || ''}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  placeholder="NextHere Services"
                  className="w-full px-3.5 py-2.5 border rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Corporate Tagline</label>
                <input
                  type="text"
                  value={settings.tagline || ''}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  placeholder="Technology, Electrical Infrastructure, and Logistics. Delivered."
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Search Engine Optimization (SEO) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                Global Search Engine Optimization (SEO)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Default Google Search snippet and social share metadata.</p>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Default Meta Title</label>
                <input
                  type="text"
                  value={settings.defaultSEO?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    defaultSEO: { ...settings.defaultSEO, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Default Meta Description</label>
                <textarea
                  rows={3}
                  value={settings.defaultSEO?.description || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    defaultSEO: { ...settings.defaultSEO, description: e.target.value }
                  })}
                  className="w-full p-3.5 border rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Social Presence Links */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-600" />
                Official Social Media Channels
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Rendered across website footer and contact channels.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-blue-600" /> LinkedIn URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks?.linkedin || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                  })}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-sky-500" /> Twitter / X URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks?.twitter || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                  })}
                  placeholder="https://twitter.com/..."
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-pink-600" /> Instagram URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks?.instagram || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                  })}
                  placeholder="https://instagram.com/..."
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-red-600" /> YouTube URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks?.youtube || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, youtube: e.target.value }
                  })}
                  placeholder="https://youtube.com/@..."
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg shadow-slate-900/30 transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? 'Saving Settings...' : 'Save Site Settings'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
