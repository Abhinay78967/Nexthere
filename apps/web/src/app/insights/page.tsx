import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@nexthere/ui';
import { fetchInsights } from '@/lib/api';
import { Insight } from '@/types/insight';

export const metadata = {
  title: 'Insights & Articles | NextHere Services',
  description: 'Thought leadership, technical articles, and industry insights from NextHere Services.',
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop';

export default async function InsightsPage() {
  const res = await fetchInsights();
  const articles: Insight[] = res?.success ? res.data : [];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-brand-navy" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src={FALLBACK_IMAGE}
            alt="Insights"
            fill
            className="object-cover"
            priority
          />
        </div>
        <Container className="relative z-10 py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Thought Leadership</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl">
            Insights & Articles
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Perspectives on IT systems integration, electrical infrastructure, and logistics technology from our team.
          </p>
        </Container>
      </div>

      {/* Articles */}
      <Container className="py-20 md:py-28">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-6">📝</p>
            <h2 className="text-2xl font-bold mb-3">Articles Coming Soon</h2>
            <p className="text-muted-foreground">Our editorial team is preparing the first insights. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a: Insight) => {
              const imgSrc = (a.coverMedia as any)?.url || FALLBACK_IMAGE;
              return (
                <article key={a.id} className="group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={a.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {a.industry?.title && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {a.industry.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Editorial</p>
                    <h2 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">{a.title}</h2>
                    {a.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-5 leading-relaxed">{a.excerpt}</p>
                    )}
                    <Link
                      href={`/insights/${a.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      Read Article →
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
