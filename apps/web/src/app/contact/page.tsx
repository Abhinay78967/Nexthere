import React from 'react';
import { Container } from '@nexthere/ui';
import { ContactForm } from '@/components/forms/ContactForm';
import { fetchCompany } from '@/lib/api';

export const metadata = {
  title: 'Contact Us | NextHere Services',
  description: 'Get in touch with NextHere Services Private Limited for IT consultancy, electrical installations, and freight logistics.',
};

export default async function ContactPage() {
  const companyData = await fetchCompany();
  const profile = companyData?.success ? companyData.data.profile : null;

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-surface-muted/50 py-16 md:py-20">
        <Container className="text-center max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Contact NextHere Services
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have a project in mind or need operational advisory? Our team is ready to evaluate your requirements.
          </p>
        </Container>
      </div>

      {/* Main Grid */}
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Direct Contact Details */}
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-foreground">Official Communications</h2>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg flex-shrink-0">
                  📞
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Support</p>
                  <a
                    href="tel:+919472957044"
                    className="text-base font-semibold text-foreground hover:text-primary transition-colors block mt-0.5"
                  >
                    {profile?.primaryPhone || '+91 94729 57044'}
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Mon - Sat: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg flex-shrink-0">
                  ✉️
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Direct Email</p>
                  <a
                    href="mailto:nexthereservices@outlook.com"
                    className="text-base font-semibold text-foreground hover:text-primary transition-colors block mt-0.5 break-all"
                  >
                    {profile?.primaryEmail || 'nexthereservices@outlook.com'}
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Responses within 24 hours</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg flex-shrink-0">
                  📍
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Registered Office</p>
                  <p className="text-sm text-foreground mt-0.5 leading-relaxed">
                    {profile?.address || 'House No Pvt.129, Plot No 75-A, Kh.No. 15/7, 1st Floor, Salempur Mazra, Burari Extn, Street No 5, Village Burari'}
                    <br />
                    {profile?.city || 'New Delhi'} - 110084, India
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Quote Promo */}
            <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-2">Need a fast quote?</h3>
              <p className="text-xs opacity-90 mb-4 leading-relaxed">
                If you have specific technical or logistics quantities, use our structured quote builder.
              </p>
              <a
                href="/request-quote"
                className="inline-flex w-full items-center justify-center py-2.5 px-4 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-gray-100 transition-colors shadow"
              >
                Request a Custom Quote →
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
              <p className="text-sm text-muted-foreground mb-8">
                Fill in the details below and an advisory specialist will reach out promptly.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
