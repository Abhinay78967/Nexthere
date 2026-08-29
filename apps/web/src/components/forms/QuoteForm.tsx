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

    const response = await submitInquiry({
      name: data.name,
      companyName: data.companyName || undefined,
      email: data.email,
      phone: data.phone || undefined,
      subject: `Quote Request: ${category.toUpperCase()}`,
      message: data.message,
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
      <div className="p-8 bg-surface-muted border border-border rounded-lg text-center">
        <h3 className="text-xl font-bold text-primary mb-2">Thank you</h3>
        <p className="text-muted-foreground">Your quote request has been received. The NextHere team will review your requirement and contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-6 md:p-8 rounded-lg shadow-sm border border-border">
      {status === 'error' && (
        <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md">
          {errorMsg}
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">Service Category *</label>
        <select 
          id="category" 
          name="category" 
          required 
          value={category}
          onChange={(e) => setCategory(e.target.value as 'it' | 'electrical' | 'logistics' | '')}
          disabled={status === 'submitting'}
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
          <option value="" disabled>Select a category</option>
          <option value="it">IT Services</option>
          <option value="electrical">Electrical Services</option>
          <option value="logistics">Logistics</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Name *</label>
          <input type="text" id="name" name="name" required disabled={status === 'submitting'} className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email *</label>
          <input type="email" id="email" name="email" required disabled={status === 'submitting'} className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-medium">Company Name</label>
          <input type="text" id="companyName" name="companyName" disabled={status === 'submitting'} className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Phone</label>
          <input type="tel" id="phone" name="phone" disabled={status === 'submitting'} className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
      </div>

      {category === 'it' && (
        <div className="space-y-2 p-4 bg-muted/30 rounded-md border border-border">
          <label htmlFor="message" className="text-sm font-medium">IT Requirement Details *</label>
          <textarea id="message" name="message" required rows={4} placeholder="Describe your IT infrastructure, networking, or integration needs..." className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
      )}

      {category === 'electrical' && (
        <div className="space-y-2 p-4 bg-muted/30 rounded-md border border-border">
          <label htmlFor="message" className="text-sm font-medium">Electrical Project Details *</label>
          <textarea id="message" name="message" required rows={4} placeholder="Describe your electrical installation, maintenance, or power infrastructure needs..." className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
      )}

      {category === 'logistics' && (
        <div className="space-y-2 p-4 bg-muted/30 rounded-md border border-border">
          <label htmlFor="message" className="text-sm font-medium">Logistics & Transportation Details *</label>
          <textarea id="message" name="message" required rows={4} placeholder="Describe cargo type, approximate weight, and destination..." className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
      )}

      {category && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">Location</label>
            <input type="text" id="location" name="location" disabled={status === 'submitting'} className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" />
          </div>
          <div className="space-y-2">
            <label htmlFor="timeline" className="text-sm font-medium">Timeline</label>
            <select id="timeline" name="timeline" disabled={status === 'submitting'} className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-brand-primary">
              <option value="">Select a timeline...</option>
              <option value="ASAP">Immediate / ASAP</option>
              <option value="1-3 Months">1-3 Months</option>
              <option value="3-6 Months">3-6 Months</option>
              <option value="6+ Months">6+ Months</option>
            </select>
          </div>
        </div>
      )}

      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

      <button 
        type="submit" 
        disabled={status === 'submitting' || !category}
        className="w-full md:w-auto px-6 py-3 bg-brand-primary text-white font-medium rounded-md hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 transition-colors"
      >
        {status === 'submitting' ? 'Submitting...' : 'Request Quote'}
      </button>
    </form>
  );
}
