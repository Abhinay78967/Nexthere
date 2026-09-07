'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  PhoneCall, 
  MessageSquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { FaqBase } from '@/types/base';

interface InteractiveFaqProps {
  initialFaqs?: FaqBase[];
}

const DEFAULT_FAQS = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is NextHere Services Private Limited and how does the triad model work?',
    answer: 'NextHere Services Private Limited is a registered corporate enterprise in New Delhi offering a unified triad of business solutions: Enterprise IT Systems & Advisory, Commercial & Industrial Electrical Infrastructure, and Motorised Road Freight Logistics. We allow businesses to engage a single accountable contractor for technology, power systems, and physical supply chain movements under unified SLA billing.',
  },
  {
    id: 'faq-2',
    category: 'Logistics',
    question: 'What types of commercial freight vehicles can I book or contract with NextHere Logistics?',
    answer: 'Our fleet ranges from 750 kg Tata Ace mini trucks for intra-city distribution to 8ft Bolero pickups, 14ft Canters (3.5 Ton), and 19ft to 32ft heavy multi-axle freight carriers for inter-state industrial corridors. We support both on-demand dispatches and dedicated monthly SLA fleet arrangements with real-time GPS tracking.',
  },
  {
    id: 'faq-3',
    category: 'IT & Technology',
    question: 'Do you offer end-to-end IT network cabling and server deployment for commercial offices?',
    answer: 'Yes. We deliver complete structured fiber LAN cabling, server room deployment, WiFi 6 access point architecture, cloud firewall provisioning, and ongoing IT systems maintenance backed by 24/7 technical support.',
  },
  {
    id: 'faq-4',
    category: 'Electrical',
    question: 'Are your electrical installation services certified for industrial safety and CEIG approvals?',
    answer: 'Absolutely. All electrical distribution panels (APFC, PCC, MCC), heavy power cabling, and switchgear commissioning strictly comply with national electrical standards, safety codes, and statutory CEIG inspection approvals.',
  },
  {
    id: 'faq-5',
    category: 'Commercial',
    question: 'How fast can I receive a customized commercial estimate or quote?',
    answer: 'Our engineering and commercial team processes inquiries within 24 business hours. For urgent transport dispatch or power audit requirements, you can also reach our helpline directly at +91 94729 57044 or connect via WhatsApp.',
  },
];

export function InteractiveFaq({ initialFaqs }: InteractiveFaqProps) {
  const faqs = initialFaqs && initialFaqs.length > 0 ? initialFaqs : DEFAULT_FAQS;
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || 'faq-1');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'General', 'Logistics', 'IT & Technology', 'Electrical'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = categoryFilter === 'All' || 
      faq.category?.toLowerCase() === categoryFilter.toLowerCase() ||
      (categoryFilter === 'IT & Technology' && faq.category?.includes('IT'));
    
    const matchesSearch = searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full py-20 md:py-28 bg-surface-muted border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Clear Answers to Commercial Mandates
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Everything you need to know about our service triad, execution SLAs, and corporate engagements.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. fleet capacity, electrical safety, turnaround)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  categoryFilter === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-surface border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-10 rounded-2xl bg-surface border border-border text-center space-y-3">
              <p className="text-muted-foreground text-sm">No matching questions found for &ldquo;{searchQuery}&rdquo;.</p>
              <button
                onClick={() => { setSearchQuery(''); setCategoryFilter('All'); }}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-surface border-primary/40 shadow-md ring-1 ring-primary/20'
                      : 'bg-surface border-border hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                  >
                    <span className="font-bold text-sm sm:text-base text-foreground">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-primary/10 text-primary' : 'bg-surface-muted text-muted-foreground'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/60 pt-4 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-8 rounded-3xl bg-surface border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-bold text-base text-foreground">Still have questions regarding your project?</h4>
            <p className="text-xs text-muted-foreground">Our technical desk is ready to assist you with tailored engineering advice.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+919472957044"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-surface-muted hover:bg-muted text-xs font-semibold text-foreground transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-primary" />
              <span>Call Helpline</span>
            </a>
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold shadow-sm transition-colors"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
