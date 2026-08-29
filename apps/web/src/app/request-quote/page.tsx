import React from 'react';
import { Container } from '@nexthere/ui';
import { QuoteForm } from '@/components/forms/QuoteForm';

export const metadata = {
  title: 'Request a Quote | NextHere Services',
  description: 'Request a customized commercial quote for IT consultancy, electrical installations, or road freight logistics.',
};

export default function RequestQuotePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-surface-muted/50 py-16 md:py-20">
        <Container className="text-center max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Estimates & Proposals</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Request a Commercial Quote
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tell us about your project or logistics scope. Our specialists will review your requirements and provide a structured proposal within 1 business day.
          </p>
        </Container>
      </div>

      {/* Main Grid */}
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Why Work With Us */}
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-foreground">Why NextHere?</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">Rapid 24-Hour SLA</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Formal estimates and engineering feasibility reviewed within 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                    🛡️
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">Statutory & Safety Compliant</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Full compliance with safety codes, labor standards, and transportation laws.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                    🤝
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">Single Integrated Mandate</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Combine IT, electrical cabling, and freight dispatch under a single contract.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Consultation Box */}
            <div className="bg-surface-muted rounded-2xl border border-border p-6 space-y-3">
              <h3 className="font-bold text-sm text-foreground">Prefer direct consultation?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You can reach our commercial desk directly via phone or email for immediate mandates.
              </p>
              <div className="pt-2 space-y-1.5 text-xs">
                <a href="tel:+919472957044" className="text-primary font-semibold hover:underline block">
                  📞 +91 94729 57044
                </a>
                <a href="mailto:nexthereservices@outlook.com" className="text-primary font-semibold hover:underline block break-all">
                  ✉️ nexthereservices@outlook.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div className="lg:col-span-2 space-y-6">
            <QuoteForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
