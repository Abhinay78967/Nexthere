import React from 'react';
import { notFound } from 'next/navigation';
import { Container } from '@nexthere/ui';
import { fetchServiceBySlug } from '../../../../lib/api';
import { ServiceInquiryForm } from '../../../../components/forms/ServiceInquiryForm';
import { OptimizedImage } from '../../../../components/media/OptimizedImage';
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/StructuredData';

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string; serviceSlug: string }> | { categorySlug: string; serviceSlug: string } }) {
  const { categorySlug, serviceSlug } = await params;
  const res = await fetchServiceBySlug(serviceSlug);
  if (!res || !res.success) return { title: 'Service Not Found' };
  
  return {
    title: `${res.data.title} | NextHere Services`,
    description: res.data.description,
    alternates: {
      canonical: `/services/${categorySlug}/${serviceSlug}`,
    },
    openGraph: {
      title: `${res.data.title} | NextHere Services`,
      description: res.data.description,
      url: `/services/${categorySlug}/${serviceSlug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ categorySlug: string; serviceSlug: string }> | { categorySlug: string; serviceSlug: string } }) {
  const { categorySlug, serviceSlug } = await params;
  const res = await fetchServiceBySlug(serviceSlug);
  
  if (!res || !res.success || !res.data) {
    notFound();
  }

  const service = res.data;

  // Validate the category matches if provided
  if (service.category?.slug && service.category.slug !== categorySlug) {
    // Tolerant fallback
  }

  const media = service.media || {
    url: `/images/services/${categorySlug}-placeholder.svg`,
    type: 'PLACEHOLDER',
    altText: `${service.title} concept`
  };

  const capabilities = Array.isArray(service.capabilities) ? service.capabilities : [];

  return (
    <article className="flex flex-col min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/services' },
          { name: service.category?.title || 'Pillar', item: `/services/${categorySlug}` },
          { name: service.title, item: `/services/${categorySlug}/${serviceSlug}` },
        ]}
      />
      <ServiceSchema
        title={service.title}
        description={service.description || ''}
        url={`/services/${categorySlug}/${serviceSlug}`}
        category={service.category?.title || 'Enterprise Technical Service'}
        capabilities={capabilities}
      />
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 hidden lg:block opacity-20 w-1/2 left-1/2">
          <OptimizedImage
            media={media}
            priority
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-transparent z-0 hidden lg:block" />
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-primary-foreground/10 text-sm font-semibold mb-6 uppercase tracking-wider">
                {service.category?.title || 'Service Pillar'}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white drop-shadow-md">
                {service.title}
              </h1>
              <p className="text-xl opacity-90 leading-relaxed text-gray-200">
                {service.description}
              </p>
            </div>
            <div className="lg:hidden w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-primary-foreground/20">
              <OptimizedImage
                media={media}
                priority
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-background flex-grow">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">Capabilities</h2>
                {service.capabilities ? (
                  <div className="flex flex-wrap gap-3">
                    {Array.isArray(service.capabilities)
                      ? service.capabilities.map((cap: string, i: number) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20"
                          >
                            {cap}
                          </span>
                        ))
                      : <p className="text-muted-foreground">Capability details available on consultation.</p>
                    }
                  </div>
                ) : (
                  <p className="text-muted-foreground">Capability details available on consultation.</p>
                )}
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">Our Process</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { n: '1', t: 'Requirement Assessment', d: 'We evaluate your specific business, operational, and compliance needs.' },
                    { n: '2', t: 'Solution Design', d: 'Our team designs a tailored solution aligned with your budget and timeline.' },
                    { n: '3', t: 'Execution & Commissioning', d: 'Skilled professionals deploy and commission with minimal disruption to operations.' },
                    { n: '4', t: 'Support & Handover', d: 'Full documentation and ongoing SLA-backed support after project completion.' },
                  ].map(step => (
                    <div key={step.n} className="flex gap-4 p-5 rounded-xl border border-border bg-surface">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm">
                        {step.n}
                      </div>
                      <div>
                        <p className="font-bold text-foreground mb-1">{step.t}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
                <h3 className="text-xl font-bold mb-4">Ready to start?</h3>
                <p className="text-muted-foreground mb-6">
                  Request a consultation for {service.title}.
                </p>
                <ServiceInquiryForm serviceId={service.id} serviceTitle={service.title} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
