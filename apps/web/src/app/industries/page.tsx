import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@nexthere/ui';
import { fetchIndustries } from '@/lib/api';
import { Industry } from '@/types/industry';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export const metadata = {
  title: 'Industries We Serve | NextHere Services',
  description: 'Commercial, institutional, and industrial sector expertise from NextHere Services Private Limited.',
  alternates: {
    canonical: '/industries',
  },
  openGraph: {
    title: 'Industries We Serve | NextHere Services',
    description: 'Commercial, institutional, and industrial sector expertise from NextHere Services Private Limited.',
    url: '/industries',
  },
};

const FALLBACK_IMAGES: Record<string, string> = {
  'commercial-institutional': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
  'industrial': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
};

export default async function IndustriesPage() {
  const res = await fetchIndustries();
  const industries: Industry[] = res?.success ? res.data : [];

  return (
    <div className="bg-background min-h-screen">
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'Industries', item: '/industries' }]} />
      {/* Hero */}
      <div className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-brand-navy" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
            alt="Industries We Serve"
            fill
            className="object-cover"
            priority
          />
        </div>
        <Container className="relative z-10 py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Sectors</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl">
            Industries We Serve
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Our integrated IT, electrical, and logistics capabilities make NextHere a trusted partner for commercial, institutional, and industrial operations.
          </p>
        </Container>
      </div>

      {/* Industries */}
      <Container className="py-20 md:py-28">
        {industries.length === 0 ? (
          <div className="p-8 bg-surface-muted rounded-lg border border-border text-center">
            <p className="text-muted-foreground">Industry information is being updated.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {industries.map((ind: Industry) => {
              const imgSrc = (ind.media as any)?.url || FALLBACK_IMAGES[ind.slug] || FALLBACK_IMAGES['commercial-institutional'];
              return (
                <article key={ind.id} className="group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={ind.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="p-7">
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{ind.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{ind.shortDescription}</p>
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      View Capabilities →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
