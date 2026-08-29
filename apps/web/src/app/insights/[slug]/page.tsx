import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchInsightBySlug } from '@/lib/api';
import { Container } from '@nexthere/ui';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const res = await fetchInsightBySlug(params.slug);
  if (!res?.success || !res.data) return { title: 'Article Not Found' };
  return {
    title: `${res.data.title} | NextHere Insights`,
    description: res.data.excerpt || '',
  };
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1920&auto=format&fit=crop';

export default async function InsightDetailPage({ params }: { params: { slug: string } }) {
  const res = await fetchInsightBySlug(params.slug);
  if (!res?.success || !res.data) notFound();

  const article = res.data;
  const imgSrc = (article.coverMedia as any)?.url || FALLBACK_IMAGE;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '21/9', maxHeight: 480 }}>
        <Image src={imgSrc} alt={article.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <Container className="absolute inset-0 flex flex-col justify-end pb-10">
          <Link href="/insights" className="text-blue-300 text-sm hover:underline mb-4 inline-block">
            ← All Insights
          </Link>
          {article.industry?.title && (
            <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block w-fit">
              {article.industry.title}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight max-w-3xl leading-snug">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-3 text-gray-300 text-sm">
            {article.author && <span>By {article.author}</span>}
            {article.author && article.publishedAt && <span>·</span>}
            {article.publishedAt && (
              <span>
                {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
        </Container>
      </div>

      {/* Article Content */}
      <Container className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {article.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 font-medium border-l-4 border-primary pl-5 italic">
              {article.excerpt}
            </p>
          )}

          <article className="prose dark:prose-invert prose-lg max-w-none">
            {article.content ? (
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">{article.content}</p>
            ) : (
              <p className="text-muted-foreground">{article.excerpt}</p>
            )}
          </article>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/insights" className="text-primary font-semibold hover:underline">
              ← Back to Insights
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm"
            >
              Discuss With Our Team
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
