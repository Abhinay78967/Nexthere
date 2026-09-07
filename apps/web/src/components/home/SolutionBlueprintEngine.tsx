'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  PhoneCall, 
  Layers,
  AlertTriangle,
  FileCheck2,
  TrendingUp,
  Award,
  RotateCcw
} from 'lucide-react';
import { submitLead } from '@/lib/api';

interface PainPoint {
  id: string;
  category: 'it' | 'electrical' | 'logistics';
  divisionName: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionBlueprint: string[];
  impactMetric: string;
  impactLabel: string;
  complianceTag: string;
  slaCommitment: string;
}

const PAIN_POINTS: PainPoint[] = [
  // ─── IT & TECHNOLOGY CHALLENGES ───
  {
    id: 'it-downtime',
    category: 'it',
    divisionName: 'IT & Technology Division',
    problemTitle: 'Frequent Network Latency & Server Downtime',
    problemDesc: 'Slow internal systems, dropped connectivity between branches, and unplanned server outages causing business disruption.',
    solutionTitle: 'Redundant Campus Fiber Backbone & Managed Cloud Infrastructure',
    solutionBlueprint: [
      'Deploy dual-homed optical fiber backbones with automatic failover switches',
      'Migrate mission-critical workloads to high-availability hybrid cloud architecture',
      '24/7 proactive NOC telemetry monitoring with guaranteed < 15 minute incident response',
    ],
    impactMetric: '99.99%',
    impactLabel: 'Guaranteed Infrastructure Uptime',
    complianceTag: 'ISO 27001 Aligned',
    slaCommitment: '24-Hour Technical Assessment',
  },
  {
    id: 'it-erp',
    category: 'it',
    divisionName: 'IT & Technology Division',
    problemTitle: 'Fragmented Software & Lack of Digital Fleet Visibility',
    problemDesc: 'Inability to track shipments, orders, and field operations in real time across disconnected legacy spreadsheets and systems.',
    solutionTitle: 'Custom Digital ERP & GPS Telematics Integration',
    solutionBlueprint: [
      'Engineer unified cloud ERP platform connecting inventory, fleet, and billing',
      'Integrate AIS-140 GPS telematics API for live consignment milestone tracking',
      'Automated digital Proof-of-Delivery (e-POD) with instant customer notifications',
    ],
    impactMetric: '35%+',
    impactLabel: 'Operational Cost Reduction',
    complianceTag: 'Custom API Architecture',
    slaCommitment: 'Live Prototype Demo within 48h',
  },

  // ─── ELECTRICAL INFRASTRUCTURE CHALLENGES ───
  {
    id: 'elec-penalty',
    category: 'electrical',
    divisionName: 'Electrical Infrastructure Division',
    problemTitle: 'High Electricity Board (DISCOM) Power Factor Penalties',
    problemDesc: 'Heavy commercial power bills inflated by reactive power charges, low power factor, and harmonic distortions on machinery.',
    solutionTitle: 'Automatic Power Factor Correction (APFC) & Harmonic Filters',
    solutionBlueprint: [
      'Conduct on-site digital power quality and harmonic analysis audit',
      'Design and commission microprocessor-based APFC capacitor panels maintaining 0.99 PF',
      'Eliminate DISCOM penalty surcharges and unlock state power rebate incentives',
    ],
    impactMetric: 'Up to 25%',
    impactLabel: 'Reduction in Monthly Power Bills',
    complianceTag: 'Statutory CEIG Approved',
    slaCommitment: 'Site Audit within 24 Hours',
  },
  {
    id: 'elec-tripping',
    category: 'electrical',
    divisionName: 'Electrical Infrastructure Division',
    problemTitle: 'Control Panel Tripping & Industrial Machine Downtime',
    problemDesc: 'Frequent thermal overload tripping, unbalanced phase loading, and faulty switchgear stalling factory production lines.',
    solutionTitle: 'Industrial Motor Control Centers (MCC) & Switchgear Retrofit',
    solutionBlueprint: [
      'Comprehensive infrared thermography scan to pinpoint hot spots and overload points',
      'Retrofit precision Siemens/Schneider switchgear with coordinated protection relays',
      'Equipotential earthing grid enhancement to guarantee zero equipment voltage leakage',
    ],
    impactMetric: 'Zero',
    impactLabel: 'Preventable Tripping Incidents',
    complianceTag: 'IS / IEC Standards Compliant',
    slaCommitment: 'Immediate Engineering Dispatch',
  },

  // ─── FREIGHT & LOGISTICS CHALLENGES ───
  {
    id: 'log-unreliable',
    category: 'logistics',
    divisionName: 'Road Freight & Logistics Division',
    problemTitle: 'Unreliable Transporters, Late Deliveries & Lost Cargo',
    problemDesc: 'Unverified third-party drivers arriving late, unannounced route diversions, and lack of real-time shipment transparency.',
    solutionTitle: 'Dedicated Telematics-Enabled Fleet with Strict Transit SLAs',
    solutionBlueprint: [
      'Assign dedicated NextHere verified drivers and GPS-equipped commercial mini trucks',
      'Live milestone tracking dashboard with geo-fencing alerts and automated transit updates',
      'Comprehensive transit cargo insurance protection with SLA-bound on-time delivery guarantee',
    ],
    impactMetric: '98.8%',
    impactLabel: 'On-Time Delivery Performance',
    complianceTag: 'AIS-140 GPS Compliant',
    slaCommitment: 'Same-Day Fleet Allocation',
  },
  {
    id: 'log-cost',
    category: 'logistics',
    divisionName: 'Road Freight & Logistics Division',
    problemTitle: 'Fluctuating Spot Freight Rates & High Monthly Logistics Spend',
    problemDesc: 'Unpredictable market surge pricing on daily vehicle bookings eating into manufacturing and distribution profit margins.',
    solutionTitle: 'Fixed-Rate Monthly Retainer & Optimized Route Dispatch',
    solutionBlueprint: [
      'Lock in structured, transparent monthly retainer contracts with zero hidden surge fees',
      'Intelligent multi-drop route optimization to maximize vehicle cubic capacity utilization',
      'Consolidated monthly GST-compliant billing with detailed transit analytics reports',
    ],
    impactMetric: '20-30%',
    impactLabel: 'Monthly Logistics Cost Savings',
    complianceTag: 'GST & MCA Compliant',
    slaCommitment: 'Custom Route Pricing within 12h',
  },
];

export function SolutionBlueprintEngine() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'it' | 'electrical' | 'logistics'>('all');
  const [selectedPainPoint, setSelectedPainPoint] = useState<PainPoint>(PAIN_POINTS[0]);
  
  // Lead capture state
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [customNote, setCustomNote] = useState<string>('');
  
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const filteredPainPoints = selectedCategory === 'all'
    ? PAIN_POINTS
    : PAIN_POINTS.filter((p) => p.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const response = await submitLead({
        name,
        email,
        phone,
        companyName: company || undefined,
        source: 'SOLUTION_BLUEPRINT_ENGINE',
        notes: `[Diagnostic Blueprint Request]\nDivision: ${selectedPainPoint.divisionName}\nSelected Pain-Point: ${selectedPainPoint.problemTitle}\nEngineering Solution: ${selectedPainPoint.solutionTitle}\nClient Note: ${customNote || 'N/A'}`,
      });

      if (response && response.success) {
        setSubmitted(true);
      } else {
        throw new Error((response as any)?.error?.message || 'Failed to submit proposal request');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission error. Please call +91 94729 57044 directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setCompany('');
    setCustomNote('');
  };

  const whatsappMessage = encodeURIComponent(
    `Hi NextHere Services, I visited your website and need an engineering solution for: "${selectedPainPoint.problemTitle}". Please share a tailored assessment.`
  );

  return (
    <section id="solution-blueprint" className="w-full py-20 md:py-32 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-bold uppercase tracking-widest text-blue-400">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Solution Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Select Your Business Challenge. See NextHere&apos;s Instant Engineering Blueprint.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            We don&apos;t give vague estimates. We diagnose your exact operational friction point and deliver a structured technical intervention.
          </p>

          {/* Division Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center pt-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Challenges
            </button>
            <button
              onClick={() => setSelectedCategory('it')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedCategory === 'it'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" /> IT & Technology
            </button>
            <button
              onClick={() => setSelectedCategory('electrical')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedCategory === 'electrical'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Electrical Power
            </button>
            <button
              onClick={() => setSelectedCategory('logistics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedCategory === 'logistics'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-emerald-400" /> Road Logistics
            </button>
          </div>
        </div>

        {/* 2-Column Problem Diagnostic & Solution Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Challenges List (Selectable Cards) */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Click a challenge to view blueprint:
            </p>
            <div className="space-y-3">
              {filteredPainPoints.map((item) => {
                const isSelected = selectedPainPoint.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPainPoint(item)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-slate-900 to-blue-950 border-blue-500 shadow-xl shadow-blue-950/60 ring-2 ring-blue-500/40 scale-[1.01]'
                        : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${
                        item.category === 'it' ? 'text-blue-400' : item.category === 'electrical' ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {item.divisionName}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                          Active Blueprint
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {item.problemTitle}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.problemDesc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Engineering Solution Blueprint & Proposal Request */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
              
              {/* Solution Header */}
              <div className="border-b border-slate-800 pb-6 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    <FileCheck2 className="w-3.5 h-3.5" /> NextHere Engineering Solution Blueprint
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {selectedPainPoint.complianceTag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white pt-1">
                  {selectedPainPoint.solutionTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Addressing friction point: <span className="text-slate-100 font-semibold">&ldquo;{selectedPainPoint.problemTitle}&rdquo;</span>
                </p>
              </div>

              {/* Technical Action Steps */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Technical Intervention Strategy:
                </p>
                <div className="space-y-2.5">
                  {selectedPainPoint.solutionBlueprint.map((step, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SLA & Impact Metrics Ribbon */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/40 text-center">
                  <p className="text-2xl sm:text-3xl font-black text-blue-400">{selectedPainPoint.impactMetric}</p>
                  <p className="text-xs text-slate-300 mt-1 font-semibold">{selectedPainPoint.impactLabel}</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-center">
                  <p className="text-lg sm:text-xl font-black text-emerald-400">{selectedPainPoint.slaCommitment}</p>
                  <p className="text-xs text-slate-300 mt-1 font-semibold">Discovery & Roadmap SLA</p>
                </div>
              </div>

              {/* Request Custom Proposal Form */}
              <div className="pt-4 border-t border-slate-800">
                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                      ✓
                    </div>
                    <h4 className="text-lg font-bold text-white">Engineering Assessment Request Dispatched</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{name}</strong>. Our senior technical team for <strong className="text-white">{selectedPainPoint.divisionName}</strong> has logged your assessment request and will contact you within 24 hours.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                      <a
                        href={`https://wa.me/919472957044?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
                      >
                        <span>Open WhatsApp for Urgent Response</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Explore Another Challenge</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Request Bespoke Engineering Proposal & Site Assessment:
                      </p>
                      <a
                        href={`https://wa.me/919472957044?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                      >
                        Quick WhatsApp Chat →
                      </a>
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name *"
                        className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone / WhatsApp *"
                        className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Business Email *"
                        className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company Name (Optional)"
                        className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="Add any specific requirements (e.g. site location, machine load, delivery routes)..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                    />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-900/40 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      <span>{submitting ? 'Submitting Assessment Request...' : 'Get Custom Engineering Blueprint & Quote →'}</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
