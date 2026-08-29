import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@nexthere/ui';
import { fetchProjects } from '@/lib/api';
import { Project } from '@/types/project';

export const metadata = {
  title: 'Projects | NextHere Services',
  description: 'Verified case studies and infrastructure projects delivered by NextHere Services Private Limited.',
};

const FALLBACK_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
];

export default async function ProjectsPage() {
  const res = await fetchProjects();
  const projects: Project[] = res?.success ? res.data : [];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-brand-navy" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop"
            alt="NextHere Projects"
            fill
            className="object-cover"
            priority
          />
        </div>
        <Container className="relative z-10 py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Our Work</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl">
            Projects & Case Studies
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            From campus-wide electrical integrations to technology-enabled fleet management — real projects, real results.
          </p>
        </Container>
      </div>

      {/* Projects Grid */}
      <Container className="py-20 md:py-28">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-6">🏗️</p>
            <h2 className="text-2xl font-bold mb-3">Portfolio Coming Soon</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We are curating verified case material from our recent deployments. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((p: Project, idx: number) => {
              const imgSrc = (p.coverMedia as any)?.url || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
              return (
                <article key={p.id} className="group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
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

                  {/* Content */}
                  <div className="p-7">
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{p.title}</h2>
                    {p.results && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-5 leading-relaxed">{p.results}</p>
                    )}
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      View Case Study →
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
