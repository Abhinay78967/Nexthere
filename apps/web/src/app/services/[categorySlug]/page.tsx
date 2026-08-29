import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@nexthere/ui';
import { fetchCategories } from '@/lib/api';
import { ServiceCategory } from '@/types/serviceCategory';
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/StructuredData';

interface ServiceBase { id: string; slug: string; title: string; description?: string; media?: unknown; }

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> | { categorySlug: string } }) {
  const { categorySlug } = await params;
  const res = await fetchCategories();
  const cats: ServiceCategory[] = res?.success ? res.data : [];
  const cat = cats.find(c => c.slug === categorySlug);
  if (!cat) return { title: 'Service Not Found' };
  return {
    title: `${cat.title} | NextHere Services`,
    description: cat.description || '',
    alternates: {
      canonical: `/services/${categorySlug}`,
    },
    openGraph: {
      title: `${cat.title} | NextHere Services`,
      description: cat.description || '',
      url: `/services/${categorySlug}`,
    },
  };
}

const CAT_IMAGES: Record<string, string> = {
  'it-technology': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
  'electrical-infrastructure': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1920&auto=format&fit=crop',
  'freight-logistics': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1920&auto=format&fit=crop',
};

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> | { categorySlug: string } }) {
  const { categorySlug } = await params;
  const res = await fetchCategories();
  const cats: ServiceCategory[] = res?.success ? res.data : [];
  const cat = cats.find(c => c.slug === categorySlug);
  if (!cat) notFound();

  const heroImg = (cat.media as any)?.url || CAT_IMAGES[categorySlug] || CAT_IMAGES['it-technology'];
  const capabilities = cat.services?.map((s: any) => s.title) || [];

  return (
    <div className="bg-background min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/services' },
          { name: cat.title, item: `/services/${categorySlug}` },
        ]}
      />
      <ServiceSchema
        title={cat.title}
        description={cat.description || ''}
        url={`/services/${categorySlug}`}
        category="Service Pillar"
        capabilities={capabilities}
      />
      {/* Hero */}
      <div className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-brand-navy" />
        <div className="absolute inset-0 opacity-25">
          <Image src={heroImg} alt={cat.title} fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent" />
        <Container className="relative z-10 py-20 md:py-28">
          <Link href="/services" className="text-blue-400 text-sm hover:underline mb-4 inline-block">
            ← All Services
          </Link>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Service Pillar</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">{cat.title}</h1>
          {cat.description && (
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">{cat.description}</p>
          )}
        </Container>
      </div>

      {/* Services List */}
      <Container className="py-20 md:py-28">
        <h2 className="text-2xl font-bold mb-10 text-foreground">Available Solutions & Capabilities</h2>
        {(!cat.services || cat.services.length === 0) ? (
          <div className="text-center py-16 bg-surface-muted rounded-2xl border border-border">
            <p className="text-muted-foreground">Solutions under this pillar will be displayed shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cat.services.map((service: ServiceBase) => {
              const svcImg = (service.media as any)?.url || heroImg;
              return (
                <Link
                  key={service.id}
                  href={`/services/${cat.slug}/${service.slug}`}
                  className="group block bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={svcImg}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      View Details →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Container>

      {/* Bottom CTA */}
      <div className="border-t border-border bg-surface-muted">
        <Container className="py-16 text-center">
          <h2 className="text-2xl font-bold mb-3 text-foreground">Need this service for your operations?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Contact our engineering and advisory team for custom specifications and quotations.
          </p>
          <Link
            href="/request-quote"
            className="inline-flex h-11 items-center px-8 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow"
          >
            Request a Quote
          </Link>
        </Container>
      </div>
    </div>
  );
}
