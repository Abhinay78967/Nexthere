'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Cpu, 
  Zap, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Layers 
} from 'lucide-react';

interface DivisionData {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: any;
  color: string;
  bgGradient: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  features: string[];
  ctaLink: string;
  ctaText: string;
  secondaryCta: string;
  secondaryLink: string;
  bgImage: string;
}

const DIVISIONS: DivisionData[] = [
  {
    id: 'it',
    title: 'IT & Technology Consulting',
    subtitle: 'Enterprise Systems & Cloud Infrastructure',
    badge: 'Technology Division',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-400',
    bgGradient: 'from-blue-950 via-slate-900 to-slate-950',
    tagline: 'Architecting Scalable, Secure & Modern Digital Workflows',
    description: 'From campus fiber backbones to enterprise ERP rollouts and bespoke cloud architectures, NextHere delivers managed IT infrastructure with 99.99% availability SLAs.',
    stats: [
      { value: '99.99%', label: 'Infrastructure Uptime' },
      { value: '24/7', label: 'Proactive Monitoring' },
      { value: '40%+', label: 'Ops Efficiency Gain' },
    ],
    features: [
      'Structured Fiber & Enterprise LAN Networks',
      'Cloud Architecture & Hybrid Migration',
      'Custom ERP & Digital Logistics Systems',
      'Statutory IT Security & Compliance Audits',
    ],
    ctaLink: '/services/it-technology',
    ctaText: 'Explore IT Capabilities',
    secondaryCta: 'Request IT Proposal',
    secondaryLink: '/request-quote?division=it',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 'electrical',
    title: 'Electrical Infrastructure',
    subtitle: 'Commercial & Industrial Power Engineering',
    badge: 'Electrical Power Division',
    icon: Zap,
    color: 'from-amber-400 to-orange-500',
    bgGradient: 'from-amber-950/80 via-slate-900 to-slate-950',
    tagline: 'High-Load Power Distribution & Industrial Commissioning',
    description: 'Turnkey HT/LT electrical panels, APFC switchgear, automated motor controls, and CEIG statutory inspection approval for commercial premises and industrial plants.',
    stats: [
      { value: '100%', label: 'CEIG & Safety Pass Rate' },
      { value: '500+ kVA', label: 'Panel Handling Load' },
      { value: 'Zero', label: 'Preventable Incidents' },
    ],
    features: [
      'Commercial HT/LT Power Distribution Panels',
      'APFC, PCC & MCC Motor Control Centers',
      'Heavy Industrial Cabling & Earthing Grids',
      'Thermography & Preventative Safety Audits',
    ],
    ctaLink: '/services/electrical-infrastructure',
    ctaText: 'Explore Electrical Works',
    secondaryCta: 'Get Electrical Estimate',
    secondaryLink: '/request-quote?division=electrical',
    bgImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 'logistics',
    title: 'Freight & Road Logistics',
    subtitle: 'Motorised Commercial Fleet & Dispatch',
    badge: 'Logistics & Mobility Division',
    icon: Truck,
    color: 'from-emerald-400 to-teal-500',
    bgGradient: 'from-emerald-950/80 via-slate-900 to-slate-950',
    tagline: 'On-Demand & Dedicated Road Transport Logistics',
    description: 'GPS-telematics fleet dispatch ranging from 750kg mini trucks to multi-axle freight carriers. Serving industrial supply chains across Delhi NCR and national freight corridors.',
    stats: [
      { value: '98.8%', label: 'On-Time Dispatch Rate' },
      { value: 'Live GPS', label: 'Milestone Tracking' },
      { value: '100%', label: 'Verified Transporters' },
    ],
    features: [
      'Dedicated & On-Demand Mini Trucks (Tata Ace / 8ft)',
      'Inter-City Heavy Freight & FTL Corridors',
      'Real-Time Telematics & Milestone Notifications',
      'Enterprise SLA Contracts & Transparent Billing',
    ],
    ctaLink: '/services/freight-logistics',
    ctaText: 'Explore Logistics Fleet',
    secondaryCta: 'Consult Freight Rates',
    secondaryLink: '/request-quote?division=logistics',
    bgImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1920&auto=format&fit=crop',
  },
];

export function InteractiveHero() {
  const [activeTab, setActiveTab] = useState<string>('it');
  const currentDivision = DIVISIONS.find((p) => p.id === activeTab) || DIVISIONS[0];
  const IconComponent = currentDivision.icon;

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[92vh] flex flex-col justify-center pt-8 pb-16">
      {/* Dynamic Background Image with Smooth Crossfade */}
      {DIVISIONS.map((division) => (
        <div
          key={division.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeTab === division.id ? 'opacity-25' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={division.bgImage}
            alt={division.title}
            fill
            className="object-cover"
            priority={division.id === 'it'}
          />
        </div>
      ))}

      {/* Layered Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/90 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Top Trust Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/15 text-slate-200 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NextHere Services Private Limited · MCA Registered Enterprise</span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> MCA Registered
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" /> 24-Hour Turnaround
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Integrated Mandate
            </span>
          </div>
        </div>

        {/* 3 Strategic Divisions Interactive Tab Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl mb-12">
          {DIVISIONS.map((division) => {
            const TabIcon = division.icon;
            const isActive = activeTab === division.id;
            return (
              <button
                key={division.id}
                onClick={() => setActiveTab(division.id)}
                className={`flex items-center gap-3.5 p-4 rounded-xl text-left transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/90 to-blue-700 text-white shadow-lg shadow-blue-900/50 scale-[1.01]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                    {division.badge}
                  </p>
                  <p className="text-sm sm:text-base font-bold truncate text-white">
                    {division.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Grid for Active Division */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-400/20 text-xs font-bold uppercase tracking-wider text-blue-300">
              <IconComponent className="w-4 h-4" />
              {currentDivision.subtitle}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              {currentDivision.tagline.split(' ').slice(0, 3).join(' ')}{' '}
              <span className={`bg-gradient-to-r ${currentDivision.color} bg-clip-text text-transparent`}>
                {currentDivision.tagline.split(' ').slice(3).join(' ')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {currentDivision.description}
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentDivision.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="#solution-blueprint"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-900/40 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>Diagnose Your Challenge</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href={currentDivision.ctaLink}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all active:scale-95"
              >
                <span>{currentDivision.ctaText}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Key Performance Metrics & Glass Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Key Performance SLA</h3>
                    <p className="text-xs text-slate-400">{currentDivision.title}</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified
                </span>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-3">
                {currentDivision.stats.map((stat, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                    <p className="text-lg sm:text-2xl font-black text-white">{stat.value}</p>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Mandate Guarantee Box */}
              <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-800/40 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Unified Contract Guarantee:</strong> Combine your IT infrastructure, electrical installations, and road freight under a single SLA contract.
                </p>
              </div>

              {/* Direct Link */}
              <Link
                href="/request-quote"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs font-semibold text-slate-200 transition-colors group"
              >
                <span>Need customized commercial quotation?</span>
                <span className="text-blue-400 flex items-center group-hover:translate-x-1 transition-transform">
                  Instant Quote Form <ChevronRight className="w-4 h-4 ml-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
