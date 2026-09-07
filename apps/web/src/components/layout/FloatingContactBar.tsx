'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  MessageSquare, 
  X, 
  ChevronUp, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export function FloatingContactBar() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = "https://wa.me/919472957044?text=Hi%20NextHere%20Services%2C%20I%20would%20like%20to%20inquire%20about%20your%20IT%2C%20electrical%2C%20or%20logistics%20solutions.";

  return (
    <aside aria-label="Quick contact and support channels" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Action Card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-3xl bg-slate-950 text-white p-5 shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                NextHere Direct Desk
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close contact drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Need an urgent freight dispatch, electrical audit, or IT system consultation? Connect with our commercial team in real time.
          </p>

          <div className="space-y-2.5">
            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/50 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  💬
                </div>
                <span>Chat on WhatsApp</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Direct Call CTA */}
            <a
              href="tel:+919472957044"
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+91 94729 57044</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Instant Call</span>
            </a>

            {/* Request Quote Link */}
            <Link
              href="/request-quote"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-semibold text-xs transition-all"
            >
              <span>Submit Formal RFP / Quote</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            </Link>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> MCA Registered
            </span>
            <span>24h Turnaround</span>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-800 backdrop-blur-md transition-all hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Commercial Desk Online</span>
          </a>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-13 h-13 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isOpen
              ? 'bg-slate-900 text-white rotate-90 border border-slate-700'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white hover:scale-110 shadow-emerald-950/40 ring-4 ring-emerald-500/20'
          }`}
          aria-label={isOpen ? "Close live assistance menu" : "Open live assistance menu"}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-emerald-600" />
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
