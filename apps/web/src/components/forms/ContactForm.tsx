'use client';

import { useState } from 'react';
import { submitLead } from '@/lib/api';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Basic honeypot check clientside
    if (data.honeypot) {
      setStatus('success');
      return;
    }

    const response = await submitLead({
      name: data.name,
      companyName: data.companyName || undefined,
      email: data.email,
      phone: data.phone || undefined,
      notes: String(data.message),
      source: 'CONTACT_FORM',
    });

    if (response && response.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(response?.error?.message || 'Failed to submit inquiry. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 bg-surface-muted border border-border rounded-lg text-center">
        <h3 className="text-xl font-bold text-primary mb-2">Thank you</h3>
        <p className="text-muted-foreground">Your inquiry has been received. The NextHere team will review your requirement and contact you shortly.</p>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            disabled={status === 'submitting'}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" 
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-medium">Company Name</label>
          <input 
            type="text" 
            id="companyName" 
            name="companyName" 
            disabled={status === 'submitting'}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            disabled={status === 'submitting'}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" 
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            disabled={status === 'submitting'}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">Message *</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows={5}
          disabled={status === 'submitting'}
          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary" 
        />
      </div>

      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full md:w-auto px-6 py-3 bg-brand-primary text-white font-medium rounded-md hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 transition-colors"
      >
        {status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}
      </button>
    </form>
  );
}
