import { MetadataRoute } from 'next';
import { fetchServices, fetchIndustries, fetchProjects, fetchInsights } from '@/lib/api';
import { Industry } from '@/types/industry';
import { Project } from '@/types/project';
import { Insight } from '@/types/insight';

interface ServiceBase {
  slug: string;
  category?: {
    slug: string;
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nexthere-web.vercel.app';

  const [servicesRes, industriesRes, projectsRes, insightsRes] = await Promise.all([
    fetchServices(),
    fetchIndustries(),
    fetchProjects(),
    fetchInsights()
  ]);

  const services: ServiceBase[] = servicesRes?.success ? servicesRes.data : [];
  const industries: Industry[] = industriesRes?.success ? industriesRes.data : [];
  const projects: Project[] = projectsRes?.success ? projectsRes.data : [];
  const insights: Insight[] = insightsRes?.success ? insightsRes.data : [];

  const routes = [
    '',
    '/about',
    '/services',
    '/services/it-technology',
    '/services/electrical-infrastructure',
    '/services/freight-logistics',
    '/industries',
    '/projects',
    '/insights',
    '/contact',
    '/request-quote',
    '/privacy',
    '/terms',
    '/cookies',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const dynamicRoutes = [
    ...services.map((s: ServiceBase) => ({
      url: `${baseUrl}/services/${s.category?.slug || 'general'}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...industries.map((i: Industry) => ({
      url: `${baseUrl}/industries/${i.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...projects.map((p: Project) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...insights.map((a: Insight) => ({
      url: `${baseUrl}/insights/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  ];

  return [...routes, ...dynamicRoutes];
}
