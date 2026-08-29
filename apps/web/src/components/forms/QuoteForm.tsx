'use client';

import { useState } from 'react';
import { submitInquiry } from '@/lib/api';

export function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [category, setCategory] = useState<'it' | 'electrical' | 'logistics' | ''>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.honeypot) {
      setStatus('success');
      return;
    }

    const categoryNames: Record<string, string> = {
      it: 'IT & Technology Solutions',
      electrical: 'Electrical Infrastructure',
      logistics: 'Freight & Logistics',
    };

    const response = await submitInquiry({
      name: data.name,
      companyName: data.companyName || undefined,
      email: data.email,
      phone: data.phone || undefined,
      subject: `Quote Request: ${categoryNames[category] || 'General'}`,
      message: `${data.message || ''}\n\n[Location: ${data.location || 'N/A'}] [Timeline: ${data.timeline || 'N/A'}]`,
      location: data.location || undefined,
      timeline: data.timeline || undefined,
      honeypot: data.honeypot,
    });

    if (response && response.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(response?.error?.message || 'Failed to submit quote request. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 bg-surface-muted border border-border rounded-2xl text-center space-y-4 shadow-sm">
        <div className="text-4xl">🎉</div>
        <h3 className="text-2xl font-bold text-primary">Quote Request Submitted</h3>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to NextHere Services. Our technical and commercial team will review your specifications and prepare a formal estimate within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-6 md:p-8 rounded-2xl shadow-sm border border-border">
      {status === 'error' && (
        <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-semibold text-foreground">Service Pillar *</label>
        <select 
          id="category" 
          name="category" 
          required 
          value={category}
          onChange={(e) => setCategory(e.target.value as 'it' | 'electrical' | 'logistics' | '')}
          disabled={status === 'submitting'}
          className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
        >
          <option value="" disabled>Select a core service pillar...</option>
          <option value="it">💻 IT & Technology Solutions</option>
          <option value="electrical">⚡ Electrical Infrastructure</option>
          <option value="logistics">🚛 Freight & Logistics</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-foreground">Contact Person *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your full name"
            disabled={status === 'submitting'}
            className="w-full px-4 py-2.5 border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-foreground">Business Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="name@company.com"
            disabled={status === 'submitting'}
            className="w-full px-4 py-2.5 border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-semibold text-foreground">Company / Organization</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Enterprise Pvt Ltd"
            disabled={status === 'submitting'}
            className="w-full px-4 py-2.5 border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-semibold text-foreground">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+91 98765 43210"
            disabled={status === 'submitting'}
            className="w-full px-4 py-2.5 border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      {category === 'it' && (
        <div className="space-y-2 p-4 bg-muted/30 rounded-xl border border-border">
          <label htmlFor="message" className="text-sm font-semibold text-foreground">IT Requirement Specifications *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Describe your requirements (e.g. system architecture, network rollout, software integration, campus networking, cloud connectivity)..."
            className="w-full px-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      )}

      {category === 'electrical' && (
        <div className="space-y-2 p-4 bg-muted/30 rounded-xl border border-border">
          <label htmlFor="message" className="text-sm font-semibold text-foreground">Electrical Project Specifications *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Describe project details (e.g. power distribution, main control panels, industrial cabling, statutory safety audit, load capacity)..."
            className="w-full px-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      )}

      {category === 'logistics' && (
        <div className="space-y-2 p-4 bg-muted/30 rounded-xl border border-border">
          <label htmlFor="message" className="text-sm font-semibold text-foreground">Logistics & Transportation Specifications *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Describe consignment details (e.g. cargo nature, origin & destination routes, vehicle type required, recurring freight schedule)..."
            className="w-full px-4 py-2.5 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      )}

      {category && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-semibold text-foreground">Project / Consignment Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g. New Delhi / Pune / Pan-India"
              disabled={status === 'submitting'}
              className="w-full px-4 py-2.5 border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="timeline" className="text-sm font-semibold text-foreground">Target Timeline</label>
            <select
              id="timeline"
              name="timeline"
              disabled={status === 'submitting'}
              className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="">Select an expected timeline...</option>
              <option value="Immediate">Immediate / Within 2 weeks</option>
              <option value="1 Month">Within 1 Month</option>
              <option value="1-3 Months">1 to 3 Months</option>
              <option value="Long-term">Recurring / Long-term contract</option>
            </select>
          </div>
        </div>
      )}

      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

      <button 
        type="submit" 
        disabled={status === 'submitting' || !category}
        className="w-full md:w-auto px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
      >
        {status === 'submitting' ? 'Submitting Quote Request...' : 'Submit Quote Request →'}
      </button>
    </form>
  );
}
