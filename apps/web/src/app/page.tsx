import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@nexthere/ui';
import { fetchIndustries, fetchProjects, fetchInsights, fetchCompany, fetchFaqs } from '@/lib/api';
import { Industry } from '@/types/industry';
import { Project } from '@/types/project';
import { Insight } from '@/types/insight';
import { FaqBase } from '@/types/base';
import { FAQPageSchema } from '@/components/seo/StructuredData';
import { InteractiveHero } from '@/components/home/InteractiveHero';
import { InstantEstimator } from '@/components/home/InstantEstimator';
import { FleetShowcase } from '@/components/home/FleetShowcase';
import { InteractiveFaq } from '@/components/home/InteractiveFaq';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Cpu, 
  Truck, 
  Clock, 
  Layers, 
  Users, 
  Award,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'NextHere Services | Enterprise IT, Electrical Infrastructure & Logistics',
  description: 'NextHere Services delivers integrated enterprise solutions across IT consultancy, commercial electrical installations, and motorised road freight logistics in India.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NextHere Services | Enterprise IT, Electrical & Logistics',
    description: 'Integrated enterprise capabilities across technology, electrical infrastructure, and freight logistics.',
    url: '/',
  },
};

export default async function HomePage() {
  const [industriesRes, projectsRes, insightsRes, companyRes, faqsRes] = await Promise.all([
    fetchIndustries(),
    fetchProjects(),
    fetchInsights(),
    fetchCompany(),
    fetchFaqs(),
  ]);

  const industries: Industry[] = industriesRes?.success ? industriesRes.data : [];
  const projects: Project[] = projectsRes?.success ? projectsRes.data : [];
  const insights: Insight[] = insightsRes?.success ? insightsRes.data : [];
  const faqs: FaqBase[] = faqsRes?.success ? faqsRes.data : [];
  const profile = companyRes?.success && companyRes.data ? companyRes.data.profile : null;

  const TRUST_METRICS = [
    { label: 'MCA Registered Corporate', value: 'MCA India', icon: ShieldCheck, desc: 'Ministry of Corporate Affairs compliant' },
    { label: 'SLA Response Time', value: '< 24 Hours', icon: Clock, desc: 'Rapid technical & freight estimates' },
    { label: 'Core Business Pillars', value: 'IT • Power • Fleet', icon: Layers, desc: 'Unified single-contract accountability' },
    { label: 'Operational Footprint', value: 'Pan-India', icon: Truck, desc: 'Delhi NCR hub & national corridors' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {faqs.length > 0 && <FAQPageSchema faqs={faqs} />}

      {/* ───── 1. INTERACTIVE HERO ───── */}
      <InteractiveHero />

      {/* ───── 2. TRUST METRICS RIBBON ───── */}
      <section className="border-y border-border bg-surface py-8">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TRUST_METRICS.map((metric, i) => {
              const MetricIcon = metric.icon;
              return (
                <div key={i} className="flex items-start gap-3.5 p-3 rounded-2xl bg-surface-muted/60 border border-border/50">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                    <MetricIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-extrabold text-foreground leading-tight">{metric.value}</p>
                    <p className="text-xs font-semibold text-muted-foreground mt-0.5">{metric.label}</p>
                    <p className="text-[11px] text-muted-foreground/80 mt-0.5 hidden sm:block">{metric.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───── 3. THREE CORE SERVICE PILLARS OVERVIEW ───── */}
      <section className="w-full py-20 md:py-32 border-b border-border bg-background">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" /> Integrated Triad Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Three Pillars. One Corporate Mandate.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Eliminate vendor fragmentation. We unify high-load electrical infrastructure, enterprise IT networks, and motorised freight transportation under a single contract.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* IT Pillar Card */}
            <div className="group rounded-3xl border border-border bg-surface p-7 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <Cpu className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Pillar 01</span>
                  <h3 className="text-xl font-extrabold text-foreground mt-1 group-hover:text-primary transition-colors">
                    IT & Technology Solutions
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Turnkey enterprise networking, campus fiber backbones, cloud systems, and bespoke digital logistics platforms with proactive monitoring.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span>Structured Fiber & LAN Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span>Digital Dispatch Telematics Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span>24/7 Managed IT Support SLAs</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-border mt-6">
                <Link
                  href="/services/it-technology"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore IT Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Electrical Pillar Card */}
            <div className="group rounded-3xl border border-border bg-surface p-7 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Zap className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Pillar 02</span>
                  <h3 className="text-xl font-extrabold text-foreground mt-1 group-hover:text-primary transition-colors">
                    Electrical Infrastructure
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Commercial & industrial HT/LT power distribution, automated motor control panels (APFC/PCC/MCC), and statutory safety certifications.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>Industrial Switchgear & Power Panels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>Statutory CEIG & Safety Approvals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>Thermography & Energy Audits</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-border mt-6">
                <Link
                  href="/services/electrical-infrastructure"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Electrical Works</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Freight Pillar Card */}
            <div className="group rounded-3xl border border-border bg-surface p-7 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Truck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Pillar 03</span>
                  <h3 className="text-xl font-extrabold text-foreground mt-1 group-hover:text-primary transition-colors">
                    Freight & Road Logistics
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    GPS-enabled commercial vehicles ranging from 750kg mini trucks to 18-ton multi-axle freight carriers for reliable supply chain movement.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>Dedicated Intra-City Mini Trucks (Tata Ace)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>Inter-City Freight & FTL Corridors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>Live GPS Telematics & Milestone Alerts</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-border mt-6">
                <Link
                  href="/services/freight-logistics"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Freight Fleet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── 4. COMMERCIAL FLEET SHOWCASE ───── */}
      <FleetShowcase />

      {/* ───── 5. INSTANT ESTIMATOR WIDGET ───── */}
      <InstantEstimator />

      {/* ───── 6. SELECTED PROJECTS & PROVEN TRACK RECORD ───── */}
      <section className="w-full py-20 md:py-32 border-b border-border bg-background">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest mb-3">
                <Award className="w-3.5 h-3.5" /> Proven Track Record
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Featured Case Studies
              </h2>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                Explore how our integrated engineering and freight teams solve complex commercial challenges.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <span>View all portfolio projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 2).map((p: Project) => {
              const imgSrc = (p.coverMedia as any)?.url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop';
              return (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="group bg-surface rounded-3xl border border-border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-950">
                      <Image
                        src={imgSrc}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      {p.industry?.title && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {p.industry.title}
                          </span>
                        </div>
                      )}
                      {p.location && (
                        <div className="absolute bottom-4 left-4 text-xs font-medium text-white/90">
                          📍 {p.location}
                        </div>
                      )}
                    </div>

                    <div className="p-7 space-y-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      {p.challenge && (
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {p.challenge}
                        </p>
                      )}

                      {p.results && (
                        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-xs">
                          <strong className="text-primary font-bold">Results: </strong>
                          <span className="text-foreground font-medium">{p.results}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-7 pt-0 flex items-center justify-between text-xs font-bold text-primary">
                    <span>Read Full Case Study</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───── 7. INDUSTRY VERTICALS ───── */}
      {industries.length > 0 && (
        <section className="w-full py-20 md:py-28 bg-surface-muted border-b border-border">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Target Sectors</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  Industries We Empower
                </h2>
              </div>
              <Link href="/industries" className="text-xs font-bold text-primary hover:underline">
                Explore All Verticals →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industries.slice(0, 2).map((ind: Industry) => {
                const imgSrc = (ind.media as any)?.url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop';
                return (
                  <Link
                    key={ind.id}
                    href={`/industries/${ind.slug}`}
                    className="group bg-surface rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
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
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">{ind.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">{ind.shortDescription}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ───── 8. INTERACTIVE FAQ SECTION ───── */}
      <InteractiveFaq initialFaqs={faqs} />

      {/* ───── 9. FINAL HIGH-CONVERTING CTA BANNER ───── */}
      <section className="w-full py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_10%,rgba(14,165,233,0.2),rgba(0,0,0,0))]" />
        
        <Container className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-400/20 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" /> Start Your Engagement
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Accelerate Your Enterprise Infrastructure & Logistics?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Contact NextHere Services Private Limited for structured quotations, project feasibility reviews, or dedicated fleet SLA contracting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/request-quote"
              className="inline-flex h-13 items-center justify-center px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-950/60 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <span>Request a Commercial Quote</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center px-8 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all active:scale-95"
            >
              <span>Speak to Advisory Team</span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
