import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProjectBySlug } from '@/lib/api';
import { Container } from '@nexthere/ui';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params;
  const res = await fetchProjectBySlug(slug);
  if (!res?.success || !res.data) return { title: 'Project Not Found' };
  return {
    title: `${res.data.title} | NextHere Projects`,
    description: res.data.results || res.data.challenge || '',
  };
}

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: 'Completed ✅',
  IN_PROGRESS: 'In Progress 🔧',
  PLANNED: 'Planned 📋',
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params;
  const res = await fetchProjectBySlug(slug);
  if (!res?.success || !res.data) notFound();

  const project = res.data;
  const imgSrc = (project.coverMedia as any)?.url ||
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop';

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '21/9', maxHeight: 520 }}>
        <Image src={imgSrc} alt={project.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <Container className="absolute inset-0 flex flex-col justify-end pb-10">
          <Link href="/projects" className="text-blue-300 text-sm hover:underline mb-4 inline-block">
            ← All Projects
          </Link>
          {project.industry?.title && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block w-fit">
              {project.industry.title}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{project.title}</h1>
          {project.location && (
            <p className="text-gray-300 mt-2 text-sm">📍 {project.location}</p>
          )}
        </Container>
      </div>

      {/* Content */}
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {project.challenge && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span> The Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{project.challenge}</p>
              </section>
            )}
            {project.solution && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">💡</span> Our Solution
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{project.solution}</p>
              </section>
            )}
            {project.results && (
              <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-primary">
                  <span className="text-3xl">📈</span> Results & Impact
                </h2>
                <p className="text-foreground leading-relaxed text-lg font-medium">{project.results}</p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-5 text-foreground">Project Summary</h3>
              <ul className="space-y-4 text-sm divide-y divide-border">
                {project.industry && (
                  <li className="pt-3 first:pt-0">
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Industry</p>
                    <p className="font-semibold text-foreground">{project.industry.title}</p>
                  </li>
                )}
                {project.location && (
                  <li className="pt-3">
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Location</p>
                    <p className="font-semibold text-foreground">{project.location}</p>
                  </li>
                )}
                <li className="pt-3">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Status</p>
                  <p className="font-semibold text-foreground">{STATUS_LABELS[project.projectStatus] || project.projectStatus}</p>
                </li>
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
              <h3 className="font-bold text-foreground mb-2">Have a similar project?</h3>
              <p className="text-xs text-muted-foreground mb-4">Let our specialists assess your requirements and deliver SLA-backed execution.</p>
              <Link
                href="/request-quote"
                className="block w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
