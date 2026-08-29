import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@nexthere/ui';
import { fetchCategories } from '@/lib/api';
import { ServiceCategory } from '@/types/serviceCategory';
import { ServiceBase } from '@/types/base';

export const metadata = {
  title: 'Our Services | NextHere Services',
  description: 'Integrated enterprise solutions across IT consultancy, commercial electrical installations, and nationwide road freight logistics.',
};

const CATEGORY_IMAGES: Record<string, string> = {
  'it-technology': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  'electrical-infrastructure': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
  'freight-logistics': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop',
};

const CATEGORY_ICONS: Record<string, string> = {
  'it-technology': '💻',
  'electrical-infrastructure': '⚡',
  'freight-logistics': '🚛',
};

export default async function ServicesPage() {
  let categories: ServiceCategory[] = [];
  try {
    const res = await fetchCategories();
    if (res?.success) categories = res.data;
  } catch {}

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-brand-navy" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop"
            alt="NextHere Services"
            fill
            className="object-cover"
            priority
          />
        </div>
        <Container className="relative z-10 py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">What We Do</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl">
            Integrated Services Across IT, Electrical & Logistics
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            NextHere Services Private Limited delivers three core service pillars — built to streamline operations and provide end-to-end reliability for commercial, industrial, and institutional clients.
          </p>
        </Container>
      </div>

      {/* Service Categories */}
      <Container className="py-20 md:py-28">
        {categories.length === 0 ? (
          <div className="p-8 bg-surface-muted rounded-lg border border-border text-center">
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        ) : (
          <div className="space-y-24">
            {categories.map((category: ServiceCategory, idx: number) => {
              const imgSrc = (category.media as any)?.url || CATEGORY_IMAGES[category.slug] || CATEGORY_IMAGES['it-technology'];
              const icon = CATEGORY_ICONS[category.slug] || '🔧';
              const isEven = idx % 2 === 0;

              return (
                <div key={category.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                  {/* Image */}
                  <div className="lg:w-1/2 w-full">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={imgSrc}
                        alt={category.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="text-3xl">{icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 w-full space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Service Pillar {idx + 1}</p>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground">{category.title}</h2>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">{category.description}</p>

                    {category.services && category.services.length > 0 && (
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">Available Solutions</p>
                        <ul className="space-y-3">
                          {category.services.map((service: ServiceBase) => (
                            <li key={service.id}>
                              <Link
                                href={`/services/${category.slug}/${service.slug}`}
                                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                              >
                                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-125 transition-transform" />
                                <span className="text-foreground font-medium group-hover:text-primary transition-colors">{service.title}</span>
                                <span className="ml-auto text-muted-foreground group-hover:text-primary transition-colors">→</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Request a Consultation →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>

      {/* CTA */}
      <div className="border-t border-border bg-surface-muted">
        <Container className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Our team handles IT, electrical, and logistics projects of all sizes — from a single office to industrial-scale deployments.</p>
          <Link href="/contact" className="inline-flex h-12 items-center px-8 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
            Get in Touch
          </Link>
        </Container>
      </div>
    </div>
  );
}
