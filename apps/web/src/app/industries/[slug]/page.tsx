import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchIndustryBySlug } from '@/lib/api';
import { Container } from '@nexthere/ui';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params;
  const res = await fetchIndustryBySlug(slug);
  if (!res?.success || !res.data) return { title: 'Industry Not Found' };
  return {
    title: `${res.data.title} | NextHere Industries`,
    description: res.data.shortDescription || '',
  };
}

const FALLBACK_IMAGES: Record<string, string> = {
  'commercial-institutional': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop',
  'industrial': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop',
};
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop';

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params;
  const res = await fetchIndustryBySlug(slug);
  if (!res?.success || !res.data) notFound();

  const industry = res.data;
  const imgSrc = (industry.media as any)?.url || FALLBACK_IMAGES[slug] || FALLBACK_IMG;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '21/9', maxHeight: 480 }}>
        <Image src={imgSrc} alt={industry.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <Container className="absolute inset-0 flex flex-col justify-end pb-10">
          <Link href="/industries" className="text-blue-300 text-sm hover:underline mb-4 inline-block">
            ← All Industries
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{industry.title}</h1>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Sector Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {industry.description || industry.shortDescription}
              </p>
            </div>

            {/* Services for this Industry */}
            {industry.services && industry.services.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground">Relevant Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {industry.services.map((s: any) => (
                    <div key={s.id} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-md transition-all">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="font-semibold text-foreground text-sm">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Projects */}
            {industry.projects && industry.projects.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Case Studies</h2>
                <div className="space-y-4">
                  {industry.projects.map((p: any) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.slug}`}
                      className="flex items-center justify-between p-5 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-md transition-all group"
                    >
                      <div>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                        {p.location && <p className="text-xs text-muted-foreground mt-1">📍 {p.location}</p>}
                      </div>
                      <span className="text-primary font-bold group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-foreground">Work With Us</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Need tailored IT, electrical, or logistics support for the {industry.title.toLowerCase()} sector?
              </p>
              <Link
                href="/request-quote"
                className="block w-full text-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm shadow"
              >
                Request a Quote
              </Link>
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 rounded-xl border border-border mt-3 font-semibold text-sm hover:bg-surface-muted transition-colors text-foreground"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
