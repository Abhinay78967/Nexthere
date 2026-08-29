import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@nexthere/ui';
import { fetchIndustries, fetchProjects, fetchInsights, fetchCompany } from '@/lib/api';
import { Industry } from '@/types/industry';
import { Project } from '@/types/project';
import { Insight } from '@/types/insight';

export default async function HomePage() {
  const [industriesRes, projectsRes, insightsRes, companyRes] = await Promise.all([
    fetchIndustries(),
    fetchProjects(),
    fetchInsights(),
    fetchCompany()
  ]);

  const industries: Industry[] = industriesRes?.success ? industriesRes.data : [];
  const projects: Project[] = projectsRes?.success ? projectsRes.data : [];
  const insights: Insight[] = insightsRes?.success ? insightsRes.data : [];
  const profile = companyRes?.success && companyRes.data ? companyRes.data.profile : null;

  const SERVICES_SNAPSHOT = [
    {
      icon: '💻',
      title: 'IT & Technology Solutions',
      desc: 'Computer consultancy, systems planning, network infrastructure, and technology-enabled business solutions.',
      href: '/services/it-technology',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    },
    {
      icon: '⚡',
      title: 'Electrical Infrastructure',
      desc: 'Installation, commissioning, testing, and maintenance of commercial and industrial electrical systems.',
      href: '/services/electrical-infrastructure',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop',
    },
    {
      icon: '🚛',
      title: 'Freight & Logistics',
      desc: 'Motorised road freight transportation, warehousing, inventory handling, and route coordination.',
      href: '/services/freight-logistics',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const TRUST_BADGES = [
    { label: 'MCA Registered', icon: '🏛️' },
    { label: 'ISO Committed', icon: '✅' },
    { label: 'Law Compliant', icon: '⚖️' },
    { label: 'Pan-India Ops', icon: '🇮🇳' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ───── HERO ───── */}
      <section className="relative w-full flex items-center justify-center min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-brand-navy" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop"
            alt="NextHere global infrastructure"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent" />

        <Container className="relative z-10 py-20">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              MCA Registered · New Delhi, India
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Technology.<br />
              Infrastructure.<br />
              <span className="text-blue-400">Mobility.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
              {profile?.shortDescription || 'NextHere Services Private Limited delivers integrated IT advisory, electrical infrastructure installation, and motorised road freight logistics for commercial and industrial clients.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-semibold text-white shadow-lg hover:bg-primary/90 transition-colors"
              >
                Request a Consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-8 text-base font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── TRUST STRIP ───── */}
      <div className="border-y border-border bg-surface-muted">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-8 py-5">
            {TRUST_BADGES.map(b => (
              <div key={b.label} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ───── THREE SERVICE PILLARS ───── */}
      <section className="w-full py-20 md:py-32 border-b border-border">
        <Container>
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Three Core Service Pillars</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Registered under our Memorandum of Association — covering IT, electrical, and logistics as single integrated mandate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES_SNAPSHOT.map(s => (
              <Link key={s.title} href={s.href} className="group block">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 shadow-lg">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-3xl">{s.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-primary">
                  Learn more <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── INDUSTRIES ───── */}
      {industries.length > 0 && (
        <section className="w-full py-20 md:py-32 bg-surface-muted border-b border-border">
          <Container>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Sectors</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Industries We Serve</h2>
              </div>
              <Link href="/industries" className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                All industries →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industries.slice(0, 2).map((ind: Industry) => {
                const imgSrc = (ind.media as any)?.url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop';
                return (
                  <Link key={ind.id} href={`/industries/${ind.slug}`} className="group block bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={imgSrc}
                        alt={ind.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{ind.title}</h3>
                      <p className="text-muted-foreground text-sm">{ind.shortDescription}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ───── PROJECTS ───── */}
      <section className="w-full py-20 md:py-32 border-b border-border">
        <Container>
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Work</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Selected Projects</h2>
            </div>
            <Link href="/projects" className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              View all projects →
            </Link>
          </div>
          {projects.length === 0 ? (
            <div className="p-12 bg-surface-muted rounded-xl border border-border text-center max-w-xl mx-auto">
              <p className="text-muted-foreground">Portfolio case studies will be published soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.slice(0, 2).map((p: Project) => {
                const imgSrc = (p.coverMedia as any)?.url || 'https://images.unsplash.com/photo-1541888087616-5ca7336fbf43?q=80&w=800&auto=format&fit=crop';
                return (
                  <Link key={p.id} href={`/projects/${p.slug}`} className="group block bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={imgSrc}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      {p.industry?.title && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {p.industry.title}
                          </span>
                        </div>
                      )}
                      {p.location && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-sm">
                          <span>📍</span>
                          <span>{p.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                      {p.results && <p className="text-muted-foreground text-sm line-clamp-2">{p.results}</p>}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* ───── INSIGHTS ───── */}
      {insights.length > 0 && (
        <section className="w-full py-20 md:py-32 bg-surface-muted border-b border-border">
          <Container>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Thought Leadership</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Insights</h2>
              </div>
              <Link href="/insights" className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                View all insights →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insights.slice(0, 3).map((a: Insight) => {
                const imgSrc = (a.coverMedia as any)?.url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop';
                return (
                  <Link key={a.id} href={`/insights/${a.slug}`} className="group block bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={imgSrc}
                        alt={a.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{a.industry?.title || 'Editorial'}</p>
                      <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{a.title}</h3>
                      {a.excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ───── CTA ───── */}
      <section className="w-full py-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ready to streamline your operations?
            </h2>
            <p className="text-gray-300 text-lg">
              Get in touch with our team for a no-obligation consultation on IT, electrical, or logistics requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-base font-semibold text-brand-navy hover:bg-gray-100 transition-colors"
              >
                Request a Quote
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-8 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
