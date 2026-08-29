import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchIndustryBySlug } from '@/lib/api';
import { Container } from '@nexthere/ui';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const res = await fetchIndustryBySlug(params.slug);
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

export default async function IndustryDetailPage({ params }: { params: { slug: string } }) {
  const res = await fetchIndustryBySlug(params.slug);
  if (!res?.success || !res.data) notFound();

  const industry = res.data;
  const imgSrc = (industry.media as any)?.url || FALLBACK_IMAGES[params.slug] || FALLBACK_IMG;

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
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {industry.description || industry.shortDescription}
            </p>

            {industry.services && industry.services.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Relevant Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(industry.services as any[]).map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-md transition-all"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="font-medium text-foreground">{s.title}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {industry.projects && industry.projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
                <div className="space-y-3">
                  {(industry.projects as any[]).map((p) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.slug}`}
                      className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-md transition-all group"
                    >
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">{p.title}</span>
                      <span className="text-primary group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="font-bold text-lg mb-4">Work With Us</h3>
              <p className="text-muted-foreground text-sm mb-5">
                Tell us about your {industry.title.toLowerCase()} requirements.
              </p>
              <Link
                href="/request-quote"
                className="block w-full text-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors mb-3"
              >
                Request a Quote
              </Link>
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 rounded-xl border border-border font-semibold hover:bg-surface-muted transition-colors text-sm"
              >
                Contact Us
              </Link>
            </div>
            <Link
              href="/industries"
              className="block w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors py-2"
            >
              ← All Industries
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
