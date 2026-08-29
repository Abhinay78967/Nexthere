import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchInsightBySlug } from '@/lib/api';
import { Container } from '@nexthere/ui';
import { notFound } from 'next/navigation';
import { BreadcrumbSchema, ArticleSchema } from '@/components/seo/StructuredData';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params;
  const res = await fetchInsightBySlug(slug);
  if (!res?.success || !res.data) return { title: 'Article Not Found' };
  return {
    title: `${res.data.title} | NextHere Insights`,
    description: res.data.excerpt || '',
    alternates: {
      canonical: `/insights/${slug}`,
    },
    openGraph: {
      title: `${res.data.title} | NextHere Insights`,
      description: res.data.excerpt || '',
      url: `/insights/${slug}`,
    },
  };
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1920&auto=format&fit=crop';

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params;
  const res = await fetchInsightBySlug(slug);
  if (!res?.success || !res.data) notFound();

  const article = res.data;
  const imgSrc = (article.coverMedia as any)?.url || FALLBACK_IMAGE;

  return (
    <div className="bg-background min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Insights', item: '/insights' },
          { name: article.title, item: `/insights/${slug}` },
        ]}
      />
      <ArticleSchema
        title={article.title}
        description={article.excerpt || article.title}
        url={`/insights/${slug}`}
        image={imgSrc}
        publishedAt={article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined}
        author={article.author || undefined}
      />
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
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-gray-300 text-sm">
            {article.author && <span>By {article.author}</span>}
            {article.publishedAt && (
              <>
                <span>·</span>
                <span>{new Date(article.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </>
            )}
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {article.excerpt && (
            <p className="text-xl text-foreground font-medium leading-relaxed mb-10 border-l-4 border-primary pl-6 py-1 bg-surface-muted rounded-r-xl">
              {article.excerpt}
            </p>
          )}

          <article className="prose dark:prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
            {article.content ? (
              <p className="whitespace-pre-wrap">{article.content}</p>
            ) : (
              <p>{article.excerpt}</p>
            )}
          </article>

          {/* Footer Back Link & CTA */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/insights" className="text-primary font-semibold hover:underline text-sm">
              ← Back to All Insights
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm shadow"
            >
              Discuss with Our Specialists
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
