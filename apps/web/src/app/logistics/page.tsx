import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@nexthere/ui';
import { InteractiveBookingApp } from '@/components/logistics/InteractiveBookingApp';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'NextHere Logistics | Instant Mini-Truck & Commercial Freight Booking',
  description: 'Book 2-Wheelers, 3-Wheelers, Tata Ace (Chota Hathi), 8ft Pickup & Tata 407 online with instant fare estimates, standardized helpers, and live GPS tracking.',
  alternates: {
    canonical: '/logistics',
  },
  openGraph: {
    title: 'NextHere Logistics | Instant Mini-Truck & Freight Booking',
    description: 'On-demand commercial vehicle booking with upfront transparent fares, live tracking, and zero driver cancellations.',
    url: '/logistics',
  },
};

const LOGISTICS_FAQS = [
  {
    q: 'How does NextHere Logistics calculate trip fares?',
    a: 'Fares are calculated based on vehicle base fare (which includes standard base kilometers), rate per extra kilometer, and optional transparent helper/stair add-ons. No hidden cash surcharges or driver bargaining.',
  },
  {
    q: 'Can I book labour or helpers for loading and unloading?',
    a: 'Yes. You can select "Driver Only", "Driver + 1 Helper", or "2 Full Labour Helpers" directly in the app. Floor and stair charges are standardized and itemized in your digital invoice.',
  },
  {
    q: 'What vehicles are available for instant on-demand booking?',
    a: 'Our on-demand fleet includes 2-Wheeler (Bike Courier 20kg), 3-Wheeler Tempo (500kg), 3-Wheeler Electric EV, Tata Ace Chota Hathi (750kg), 8ft Pickup Bolero (1200kg), Tata 407 (2500kg), and 14ft/19ft Container Trucks.',
  },
  {
    q: 'Do you offer monthly credit or GST billing for businesses?',
    a: 'Yes, our B2B Enterprise tier supports 15-day and 30-day consolidated monthly invoicing with 100% GST input credit and automated e-Way bill sync.',
  },
];

export default function LogisticsBookingPage() {
  return (
    <div className="bg-background min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/services' },
          { name: 'Freight & Logistics', item: '/services/freight-logistics' },
          { name: 'On-Demand Booking', item: '/logistics' },
        ]}
      />

      {/* Hero Header */}
      <div className="relative border-b border-border bg-brand-navy py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1920&auto=format&fit=crop"
            alt="NextHere Logistics Fleet"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent" />

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white text-xs font-semibold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              On-Demand Freight · Pan-India Dispatch
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Instant Mini-Truck & Freight Booking
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              Book 2W, 3W, Tata Ace, 8ft Pickup & Heavy Trucks in seconds. Transparent rates, standardized helper assistance, and live GPS consignment tracking.
            </p>
          </div>
        </Container>
      </div>

      {/* Trust Strip */}
      <div className="border-b border-border bg-surface-muted py-4">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-muted-foreground">
            <span className="flex items-center gap-1.5">⚡ Instant Driver Dispatch</span>
            <span>•</span>
            <span className="flex items-center gap-1.5">🛡️ 100% Upfront Transparent Fares</span>
            <span>•</span>
            <span className="flex items-center gap-1.5">🤝 Standardized Loading Labour</span>
            <span>•</span>
            <span className="flex items-center gap-1.5">📍 Real-Time Telematics Tracking</span>
          </div>
        </Container>
      </div>

      {/* Interactive Booking Experience */}
      <Container className="py-12 md:py-20">
        <InteractiveBookingApp />
      </Container>

      {/* Logistics FAQs */}
      <div className="border-t border-border bg-surface-muted py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Need Help?</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {LOGISTICS_FAQS.map((faq, i) => (
                <div key={i} className="p-6 bg-background rounded-2xl border border-border space-y-2">
                  <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                    <span className="text-primary font-mono font-extrabold">Q:</span> {faq.q}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-5">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl text-center space-y-3">
              <h3 className="text-lg font-bold text-foreground">Need a Dedicated Fleet or Enterprise Contract?</h3>
              <p className="text-xs text-muted-foreground max-w-lg mx-auto">
                NextHere provides dedicated commercial trucks on monthly lease with customized driver allocation and GST billing.
              </p>
              <Link
                href="/request-quote"
                className="inline-flex h-10 items-center px-6 rounded-lg bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-colors"
              >
                Request Enterprise Freight Quote
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
