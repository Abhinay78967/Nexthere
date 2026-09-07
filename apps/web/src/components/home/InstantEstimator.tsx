'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  Cpu, 
  Zap, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  Calendar,
  Send,
  Building,
  RotateCcw
} from 'lucide-react';
import { submitLead } from '@/lib/api';

export function InstantEstimator() {
  const [step, setStep] = useState<number>(1);
  const [pillar, setPillar] = useState<'it' | 'electrical' | 'logistics'>('it');
  
  // Configuration fields
  const [city, setCity] = useState<string>('Delhi NCR');
  const [scale, setScale] = useState<string>('Standard Enterprise');
  const [timeline, setTimeline] = useState<string>('Within 2 Weeks');

  // Contact capture fields
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  
  // Submission state
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getPillarSummary = () => {
    switch (pillar) {
      case 'it':
        return {
          title: 'IT & Technology Infrastructure',
          icon: Cpu,
          color: 'text-blue-500',
          estimateRange: 'Tailored Corporate SLA',
          turnaround: '24-48 Hours Discovery & Quote',
          specs: ['Network Architecture', 'Server & Cloud Provisioning', 'Hardware & Software Sourcing'],
        };
      case 'electrical':
        return {
          title: 'Electrical Power & Panel Systems',
          icon: Zap,
          color: 'text-amber-500',
          estimateRange: 'Turnkey Commissioning',
          turnaround: '24 Hours Feasibility Review',
          specs: ['LT/HT Switchgear Sizing', 'Statutory CEIG Approvals', 'Safety Compliance Testing'],
        };
      case 'logistics':
        return {
          title: 'Road Freight & Transport Logistics',
          icon: Truck,
          color: 'text-emerald-500',
          estimateRange: 'Dynamic Freight Rate',
          turnaround: 'Same-Day Dedicated Fleet Dispatch',
          specs: ['Mini Truck (Tata Ace) to Multi-Axle', 'Live GPS Tracking', 'Transit Milestone Alerts'],
        };
    }
  };

  const currentSummary = getPillarSummary();
  const PillarIcon = currentSummary.icon;

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
        source: 'HOMEPAGE_ESTIMATOR',
        notes: `[Instant Estimator Lead] Pillar: ${currentSummary.title} | Location: ${city} | Scale: ${scale} | Target Timeline: ${timeline}`,
      });

      if (response && response.success) {
        setSubmitted(true);
      } else {
        throw new Error((response as any)?.error?.message || 'Failed to submit estimate request');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission error. Please call +91 94729 57044 directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setName('');
    setPhone('');
    setEmail('');
    setCompany('');
  };

  return (
    <section className="w-full py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-bold uppercase tracking-widest text-blue-400">
            <Calculator className="w-3.5 h-3.5" /> Instant Commercial Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Calculate Scope & Request a Fast Estimate
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Configure your IT, electrical, or freight requirements in 3 easy steps for transparent SLAs and structured pricing.
          </p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Step Indicator */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {step}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Step {step} of 3
                </p>
                <p className="text-sm sm:text-base font-bold text-white">
                  {step === 1 && 'Select Service Pillar'}
                  {step === 2 && 'Configure Project & Route Scope'}
                  {step === 3 && 'Estimate Review & Fast Callback'}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <span className={`w-8 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-blue-600' : 'bg-slate-800'}`} />
              <span className={`w-8 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-blue-600' : 'bg-slate-800'}`} />
              <span className={`w-8 h-2 rounded-full transition-colors ${step >= 3 ? 'bg-blue-600' : 'bg-slate-800'}`} />
            </div>
          </div>

          {/* STEP 1: Select Pillar */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* IT Pillar */}
                <button
                  onClick={() => setPillar('it')}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    pillar === 'it'
                      ? 'border-blue-500 bg-blue-950/50 shadow-lg shadow-blue-900/30 ring-2 ring-blue-500/50'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">IT & Technology</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Network architecture, campus fiber LAN, cloud infrastructure, and ERP consulting.
                  </p>
                </button>

                {/* Electrical Pillar */}
                <button
                  onClick={() => setPillar('electrical')}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    pillar === 'electrical'
                      ? 'border-amber-500 bg-amber-950/40 shadow-lg shadow-amber-900/30 ring-2 ring-amber-500/50'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Electrical Infrastructure</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    HT/LT control panels, commercial wiring, APFC switchgear, and safety certifications.
                  </p>
                </button>

                {/* Logistics Pillar */}
                <button
                  onClick={() => setPillar('logistics')}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    pillar === 'logistics'
                      ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-900/30 ring-2 ring-emerald-500/50'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Road Freight & Logistics</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Mini truck dispatches, dedicated transport fleet, inter-state corridors, and GPS tracking.
                  </p>
                </button>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-900/40 transition-all hover:-translate-y-0.5"
                >
                  <span>Continue to Scope Details</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Configure Scope */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Operational Location / Route
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Delhi NCR (Delhi, Gurugram, Noida)">Delhi NCR (Delhi, Gurugram, Noida)</option>
                    <option value="Northern Region (Haryana, Punjab, UP, Rajasthan)">Northern Region (Haryana, Punjab, UP, Rajasthan)</option>
                    <option value="Western Industrial Hub (Maharashtra, Gujarat)">Western Industrial Hub (Maharashtra, Gujarat)</option>
                    <option value="Pan-India Multi-City Mandate">Pan-India Multi-City Mandate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Scope Scale / Fleet Volume
                  </label>
                  <select
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Small / Pilot (Single Site or 1-2 Vehicles)">Small / Pilot (Single Site or 1-2 Vehicles)</option>
                    <option value="Standard Enterprise (Mid-Size Facility or Regular Fleet)">Standard Enterprise (Mid-Size Facility or Regular Fleet)</option>
                    <option value="Large Industrial / Multi-Plant Turnkey Mandate">Large Industrial / Multi-Plant Turnkey Mandate</option>
                    <option value="Recurring Monthly Retainer / Annual SLA">Recurring Monthly Retainer / Annual SLA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Target Execution Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Immediate / Emergency (Within 48 Hours)">Immediate / Emergency (Within 48 Hours)</option>
                    <option value="Within 2 Weeks">Within 2 Weeks</option>
                    <option value="1 Month Planning Cycle">1 Month Planning Cycle</option>
                    <option value="Q3/Q4 Strategic Project">Q3/Q4 Strategic Project</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-900/40 transition-all hover:-translate-y-0.5"
                >
                  <span>Review Estimate & Finalize</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Capture Contact */}
          {step === 3 && (
            <div className="animate-fade-in">
              {submitted ? (
                <div className="p-8 sm:p-12 text-center space-y-5 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">
                    Estimate Request Successfully Received!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>. Our commercial engineering team has received your <strong className="text-white">{currentSummary.title}</strong> parameters for {city}. We are preparing a structured proposal and will contact you within 1 business day.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <a
                      href="https://wa.me/919472957044?text=Hi%20NextHere%20Services%2C%20I%20just%20submitted%20an%20instant%20estimate%20on%20your%20website%20and%20would%20like%20to%20discuss%20urgently."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all"
                    >
                      <span>Chat on WhatsApp Directly</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Calculate Another Estimate
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Estimate Summary Box */}
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                        <PillarIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold">Selected Pillar</p>
                        <p className="text-sm font-bold text-white">{currentSummary.title}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">Scope & Location</p>
                      <p className="text-sm font-bold text-white">{city}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{scale}</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">Expected Response</p>
                      <p className="text-sm font-bold text-emerald-400">{currentSummary.turnaround}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{timeline}</p>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Official Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rajesh@enterprise.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Company / Enterprise Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Sharma Logistics Pvt Ltd"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors"
                    >
                      ← Back to Scope
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      {submitting ? 'Submitting Request...' : 'Get Official Proposal & Callback →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
