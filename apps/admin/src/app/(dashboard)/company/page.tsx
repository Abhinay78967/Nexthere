'use client';

import { useEffect, useState } from 'react';
import { 
  Building2, 
  Save, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Calendar,
  Sparkles
} from 'lucide-react';

export default function CompanyPage() {
  const [profile, setProfile] = useState<any>({
    legalName: '',
    displayName: '',
    shortDescription: '',
    longDescription: '',
    mission: '',
    vision: '',
    primaryEmail: '',
    primaryPhone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    foundedYear: 2025,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/company');
      const json = await res.json();
      if (json.success && json.data) {
        setProfile(json.data);
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
      const res = await fetch('/api/admin/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const json = await res.json();
      if (json.success) {
        setProfile(json.data);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      } else {
        alert(json.error || 'Failed to save company profile');
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
            <Building2 className="w-7 h-7 text-blue-600" />
            Company Master Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Maintain official corporate registration records, contact points, and mission statements.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-sm font-semibold animate-fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          Company master profile successfully updated in database!
        </div>
      )}

      {loading ? (
        <div className="py-24 text-center text-sm text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <Clock className="w-8 h-8 mx-auto animate-spin mb-3 text-blue-600" />
          Loading company profile from database...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: Legal & Corporate Identity */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Legal & Brand Identity
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Corporate legal entity name and consumer-facing brand.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Legal Registered Name</label>
                <input
                  type="text"
                  required
                  value={profile.legalName || ''}
                  onChange={(e) => setProfile({ ...profile, legalName: e.target.value })}
                  placeholder="NextHere Services Private Limited"
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Display / Brand Name</label>
                <input
                  type="text"
                  required
                  value={profile.displayName || ''}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  placeholder="NextHere Services"
                  className="w-full px-3.5 py-2.5 border rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Founded Year</label>
                <input
                  type="number"
                  value={profile.foundedYear || 2025}
                  onChange={(e) => setProfile({ ...profile, foundedYear: parseInt(e.target.value) || 2025 })}
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-sm">Short Description (Tagline overview)</label>
              <input
                type="text"
                value={profile.shortDescription || ''}
                onChange={(e) => setProfile({ ...profile, shortDescription: e.target.value })}
                placeholder="Providing integrated IT advisory, electrical infrastructure, and road freight logistics solutions."
                className="w-full px-3.5 py-2.5 border rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-sm">Full Corporate Overview</label>
              <textarea
                rows={4}
                value={profile.longDescription || ''}
                onChange={(e) => setProfile({ ...profile, longDescription: e.target.value })}
                placeholder="Full multi-paragraph description of the triad business model..."
                className="w-full p-3.5 border rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Card 2: Contact & Registered Office */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Contact & Registered Office Address
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Used across legal policies, footer, and inquiry routing.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Official Email</label>
                <input
                  type="email"
                  required
                  value={profile.primaryEmail || ''}
                  onChange={(e) => setProfile({ ...profile, primaryEmail: e.target.value })}
                  placeholder="nexthereservices@outlook.com"
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Support Helpline</label>
                <input
                  type="text"
                  required
                  value={profile.primaryPhone || ''}
                  onChange={(e) => setProfile({ ...profile, primaryPhone: e.target.value })}
                  placeholder="+91 94729 57044"
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-sm">Registered Street Address</label>
              <input
                type="text"
                value={profile.address || ''}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                placeholder="House No Pvt.129, Plot No 75-A, Kh.No. 15/7, 1st Floor, Salempur Mazra, Burari Extn"
                className="w-full px-3.5 py-2.5 border rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={profile.city || ''}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  placeholder="New Delhi"
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">State / Province</label>
                <input
                  type="text"
                  value={profile.state || ''}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  placeholder="Delhi"
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Country</label>
                <input
                  type="text"
                  value={profile.country || ''}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  placeholder="India"
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Mission & Vision */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Mission & Vision Statements
              </h2>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mission Statement</label>
                <textarea
                  rows={2}
                  value={profile.mission || ''}
                  onChange={(e) => setProfile({ ...profile, mission: e.target.value })}
                  placeholder="To deliver reliable, technology-enabled business solutions across IT networks, electrical installations, and commercial transportation."
                  className="w-full p-3.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Vision Statement</label>
                <textarea
                  rows={2}
                  value={profile.vision || ''}
                  onChange={(e) => setProfile({ ...profile, vision: e.target.value })}
                  placeholder="To be the most trusted integrated service provider for businesses seeking robust infrastructure and logistics support."
                  className="w-full p-3.5 border rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? 'Saving Changes...' : 'Save Master Profile'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
