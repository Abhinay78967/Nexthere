'use client';

import React, { useState } from 'react';
import { SocialAccount, BrandProfile, SocialPlatform, InboundCaptureResult } from '../../../../types/social';
import {
  createSocialAccount,
  deleteSocialAccount,
  testSocialAccountConnection,
  simulateInboundLead,
} from '../../../../lib/api';
import { LinkedinIcon, InstagramIcon, TwitterIcon } from './SocialIcons';
import {
  Share2,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Zap,
  Activity,
  MessageSquare,
  UserCheck,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  accounts: SocialAccount[];
  brands: BrandProfile[];
  onAccountUpdated: () => void;
}

export function ConnectedAccountsManager({ accounts, brands, onAccountUpdated }: Props) {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [testingId, setTestingId] = useState<string | null>(null);

  // Inbound Simulation State
  const [simSenderHandle, setSimSenderHandle] = useState('enterprise_buyer_rahul');
  const [simMessage, setSimMessage] = useState(
    'Hi NextHere, we need a complete cloud infrastructure audit & pricing for our 500-user organization. How soon can we schedule?'
  );
  const [simPlatform, setSimPlatform] = useState<SocialPlatform>('LINKEDIN');
  const [simResult, setSimResult] = useState<InboundCaptureResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    brandProfileId: brands[0]?.id || '',
    platform: 'LINKEDIN' as SocialPlatform,
    accountName: '',
    accountHandle: '',
    accessToken: '',
    useSimulator: true,
  });

  const handleTestConnection = async (id: string) => {
    setTestingId(id);
    try {
      const res = await testSocialAccountConnection(id);
      if (res) {
        setTestResults((prev) => ({ ...prev, [id]: res }));
      }
    } catch (err) {
      console.error('Failed to test connection:', err);
    } finally {
      setTestingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to disconnect this channel?')) return;
    try {
      await deleteSocialAccount(id);
      onAccountUpdated();
    } catch (err) {
      console.error('Failed to delete account:', err);
    }
  };

  const handleConnectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.accountName || !formData.accountHandle) return;

    setIsSubmitting(true);
    try {
      await createSocialAccount({
        brandProfileId: formData.brandProfileId || undefined,
        platform: formData.platform,
        accountName: formData.accountName,
        accountHandle: formData.accountHandle.replace(/^@/, ''),
        accessToken: formData.useSimulator ? null : formData.accessToken || null,
        isActive: true,
      });

      setShowConnectModal(false);
      setFormData({
        brandProfileId: brands[0]?.id || '',
        platform: 'LINKEDIN',
        accountName: '',
        accountHandle: '',
        accessToken: '',
        useSimulator: true,
      });
      onAccountUpdated();
    } catch (err) {
      console.error('Error connecting account:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSimulateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simMessage.trim()) return;

    setIsSimulating(true);
    try {
      const result = await simulateInboundLead({
        platform: simPlatform,
        eventType: 'COMMENT',
        senderHandle: simSenderHandle,
        messageText: simMessage,
      });
      if (result) {
        setSimResult(result);
      }
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'LINKEDIN':
        return <LinkedinIcon className="w-5 h-5 text-blue-400" />;
      case 'INSTAGRAM':
        return <InstagramIcon className="w-5 h-5 text-pink-400" />;
      case 'TWITTER':
        return <TwitterIcon className="w-5 h-5 text-sky-400" />;
      default:
        return <Share2 className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-10">
      {/* Channels Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-500" />
              Connected Social Channels & APIs
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Manage live production credentials or utilize sandbox simulator channels for automated publishing.
            </p>
          </div>
          <button
            onClick={() => setShowConnectModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Connect New Channel
          </button>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((acc) => {
            const result = testResults[acc.id];
            const isLive = Boolean(acc.accessToken);

            return (
              <div
                key={acc.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                      {getPlatformIcon(acc.platform)}
                    </div>
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                        isLive
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-blue-950 text-blue-400 border border-blue-800'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'}`} />
                      {isLive ? 'LIVE PRODUCTION' : 'SANDBOX SIMULATOR'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{acc.accountName}</h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">@{acc.accountHandle}</div>

                  {acc.brandProfile && (
                    <div className="mt-3 text-xs px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800/80 inline-block font-medium">
                      🏢 {acc.brandProfile.name}
                    </div>
                  )}

                  {/* Test Result Message */}
                  {result && (
                    <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 animate-in fade-in">
                      <div className="flex items-center justify-between text-emerald-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Handshake Verified
                        </span>
                        <span className="font-mono text-[10px]">{result.latencyMs}ms</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">{result.message}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    disabled={testingId === acc.id}
                    onClick={() => handleTestConnection(acc.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Activity className={`w-3.5 h-3.5 text-blue-400 ${testingId === acc.id ? 'animate-spin' : ''}`} />
                    {testingId === acc.id ? 'Testing...' : 'Test Connection'}
                  </button>

                  <button
                    onClick={() => handleDelete(acc.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                    title="Disconnect"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-World Inbound Lead Capture & DM Auto-Responder Sandbox */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Inbound Comment-to-Lead & DM Auto-Responder
            </h2>
            <p className="text-xs text-slate-400">
              When users interact on social media, the AI detects intent, creates a real CRM Lead in your database, and sends an automated instant response.
            </p>
          </div>
        </div>

        <form onSubmit={handleSimulateLead} className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 border border-slate-800/80 p-6 rounded-2xl">
          <div className="lg:col-span-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Channel
              </label>
              <select
                value={simPlatform}
                onChange={(e) => setSimPlatform(e.target.value as SocialPlatform)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="LINKEDIN">LinkedIn Comment/DM</option>
                <option value="INSTAGRAM">Instagram Comment/DM</option>
                <option value="TWITTER">X / Twitter Mention</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Prospective Client Handle
              </label>
              <input
                type="text"
                value={simSenderHandle}
                onChange={(e) => setSimSenderHandle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSimulating || !simMessage.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSimulating ? 'Processing Intent & CRM Sync...' : 'Simulate Inbound Event'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Inbound Comment / DM Content
              </label>
              <textarea
                rows={3}
                value={simMessage}
                onChange={(e) => setSimMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {simResult ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4" /> CRM Lead Successfully Captured!
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700 font-mono">
                    Intent: {simResult.intentDetected}
                  </span>
                </div>

                <div className="text-xs text-slate-300">
                  <span className="text-slate-400">Automated Reply Sent:</span>
                  <div className="mt-1 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-emerald-200 text-xs italic">
                    "{simResult.autoReplyText}"
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  ✅ Viewable in the Admin Portal under <strong className="text-white">Leads</strong> management.
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900 border border-dashed border-slate-800 text-slate-500 text-xs flex items-center justify-center text-center">
                Click "Simulate Inbound Event" above to see the autonomous Lead Capture & Auto-Reply pipeline in action.
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Connect Channel Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-500" />
                Connect Social Media Channel
              </h3>
              <button
                onClick={() => setShowConnectModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConnectSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Platform *
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as SocialPlatform })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="LINKEDIN">LinkedIn (Company Page / Profile)</option>
                  <option value="INSTAGRAM">Instagram (Professional Account)</option>
                  <option value="TWITTER">X / Twitter Handle</option>
                  <option value="FACEBOOK">Facebook Page</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Associated Business Brand
                </label>
                <select
                  value={formData.brandProfileId}
                  onChange={(e) => setFormData({ ...formData, brandProfileId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Account Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NextHere Solutions"
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Handle / Username *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. nexthere_official"
                    value={formData.accountHandle}
                    onChange={(e) => setFormData({ ...formData, accountHandle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* Mode Toggle */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Execution Mode:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, useSimulator: true })}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        formData.useSimulator
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Simulator Sandbox
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, useSimulator: false })}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        !formData.useSimulator
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Live API Key
                    </button>
                  </div>
                </div>

                {!formData.useSimulator && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                      Live OAuth Access Token / Bearer Token
                    </label>
                    <input
                      type="password"
                      placeholder="Paste your production API Token"
                      value={formData.accessToken}
                      onChange={(e) => setFormData({ ...formData, accessToken: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowConnectModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Connecting...' : 'Connect Channel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
