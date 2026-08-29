import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchCompany } from '@/lib/api';
import { Container } from '@nexthere/ui';
import { OrganizationSchema } from '@/components/seo/StructuredData';

export async function generateMetadata() {
  const companyData = await fetchCompany();
  const profile = companyData?.success ? companyData.data.profile : null;
  return {
    title: `About Us | NextHere Services`,
    description: profile?.shortDescription || 'Learn about NextHere Services Private Limited — IT consultancy, electrical infrastructure, and logistics.',
  };
}

const STATS = [
  { label: 'Year Founded', value: '2023' },
  { label: 'Service Pillars', value: '3' },
  { label: 'MOA Clauses', value: '12' },
  { label: 'Registered In', value: 'India' },
];

const VALUES = [
  { icon: '🛡️', title: 'Compliance First', desc: 'Every service we deliver is within the bounds of our MCA-registered Memorandum of Association.' },
  { icon: '🔧', title: 'Integrated Delivery', desc: 'One partner for IT, electrical, and logistics — reducing vendor overhead for our clients.' },
  { icon: '📈', title: 'Results Oriented', desc: 'From reducing shipment delays 20% to commissioning campuses ahead of schedule, we measure success by outcomes.' },
  { icon: '🤝', title: 'Long-Term Partnership', desc: 'We build relationships, not transactions. Our SLA-backed support continues long after deployment.' },
];

export default async function AboutPage() {
  const companyData = await fetchCompany();
  const profile = companyData?.success ? companyData.data.profile : null;
  const settings = companyData?.success ? companyData.data.settings : null;

  return (
    <>
      {profile && <OrganizationSchema profile={profile} settings={settings} />}
      <div className="bg-background min-h-screen">

        {/* Hero */}
        <div className="relative border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-brand-navy" />
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1920&auto=format&fit=crop"
              alt="NextHere Office"
              fill
              className="object-cover"
              priority
            />
          </div>
          <Container className="relative z-10 py-20 md:py-28">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Company</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl">
              About {profile?.displayName || 'NextHere Services'}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              {profile?.shortDescription || 'Providing integrated IT advisory, electrical infrastructure, and road freight logistics solutions.'}
            </p>
          </Container>
        </div>

        {/* Stats Bar */}
        <div className="border-b border-border bg-surface-muted">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {STATS.map((s) => (
                <div key={s.label} className="py-8 px-6 text-center">
                  <p className="text-3xl font-extrabold text-primary mb-1">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* Mission & Vision */}
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Who We Are</p>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="prose dark:prose-invert text-muted-foreground space-y-4">
                <p className="text-lg leading-relaxed">
                  {profile?.longDescription || 'NextHere Services Private Limited is a registered enterprise delivering three core pillars: IT consultancy, commercial electrical installations, and motorised road freight logistics.'}
                </p>
                <p className="text-lg leading-relaxed">
                  Incorporated under the Companies Act, our Memorandum of Association authorises us to take on integrated projects across IT systems, electrical infrastructure, and supply chain logistics — allowing a single trusted partner to handle complex, multi-domain mandates.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-surface rounded-2xl border border-border p-8">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {profile?.mission || 'To deliver reliable, technology-enabled business solutions across IT networks, electrical installations, and commercial transportation.'}
                </p>
              </div>
              <div className="bg-surface rounded-2xl border border-border p-8">
                <div className="text-3xl mb-4">🔭</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {profile?.vision || 'To be the most trusted integrated service provider for businesses seeking robust infrastructure and logistics support.'}
                </p>
              </div>
            </div>
          </div>
        </Container>

        {/* Values */}
        <div className="border-t border-border bg-surface-muted">
          <Container className="py-20 md:py-28">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Principles</p>
              <h2 className="text-3xl font-bold text-foreground">What We Stand For</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-surface rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border">
          <Container className="py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Registered Office</p>
                <h2 className="text-3xl font-bold text-foreground mb-8">Contact & Legal Details</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Registered Address</p>
                      <p className="text-muted-foreground text-sm">
                        {profile?.address ? `${profile.address},` : 'House No Pvt.129, Plot No 75-A, Kh.No. 15/7,'}<br />
                        {profile?.address ? '' : '1st Floor, Salempur Mazra, Burari Extn, Street No 5,'}<br />
                        Village Burari, New Delhi, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📧</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a href={`mailto:${profile?.primaryEmail || 'nexthereservices@outlook.com'}`} className="text-primary hover:underline text-sm">
                        {profile?.primaryEmail || 'nexthereservices@outlook.com'}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📞</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <a href={`tel:${profile?.primaryPhone || '+919472957044'}`} className="text-primary hover:underline text-sm">
                        {profile?.primaryPhone || '+91 94729 57044'}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🏛️</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Legal Name</p>
                      <p className="text-muted-foreground text-sm">{profile?.legalName || 'NextHere Services Private Limited'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="flex items-center justify-between p-6 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group"
                >
                  <div>
                    <p className="font-bold text-lg">Start a Conversation</p>
                    <p className="text-primary-foreground/80 text-sm">Tell us about your project</p>
                  </div>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/services"
                  className="flex items-center justify-between p-6 rounded-2xl border border-border bg-surface hover:shadow-lg transition-all group"
                >
                  <div>
                    <p className="font-bold text-lg text-foreground">Explore Services</p>
                    <p className="text-muted-foreground text-sm">IT, Electrical & Logistics</p>
                  </div>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </Container>
        </div>

      </div>
    </>
  );
}
