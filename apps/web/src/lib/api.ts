import { ApiResponse } from '../types/api';
import { CompanyProfile, SiteSettings } from '../types/company';
import { Industry } from '../types/industry';
import { Project } from '../types/project';
import { Insight } from '../types/insight';
import { FaqBase, ServiceBase } from '../types/base';
import { ServiceCategory } from '../types/serviceCategory';
import { ServiceDetail } from '../types/serviceDetail';
import { prisma } from '@nexthere/database';

export async function fetchServices(): Promise<ApiResponse<ServiceBase[]> | null> {
  try {
    const data = await prisma.service.findMany({
      where: { active: true },
      include: { category: true },
    });
    return { success: true, data: data as unknown as ServiceBase[] };
  } catch (err) {
    console.error('fetchServices error', err);
    return null;
  }
}

export async function fetchServiceBySlug(slug: string): Promise<ApiResponse<ServiceDetail> | null> {
  try {
    const data = await prisma.service.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!data) return null;
    return { success: true, data: data as unknown as ServiceDetail };
  } catch (err) {
    console.error('fetchServiceBySlug error', err);
    return null;
  }
}

export async function fetchCategories(): Promise<ApiResponse<ServiceCategory[]> | null> {
  try {
    const data = await prisma.serviceCategory.findMany({
      include: { services: true },
      orderBy: { createdAt: 'asc' },
    });
    return { success: true, data: data as unknown as ServiceCategory[] };
  } catch (err) {
    console.error('fetchCategories error', err);
    return null;
  }
}

export async function submitInquiry(data: Record<string, unknown>): Promise<ApiResponse<unknown>> {
  try {
    if (typeof window !== 'undefined') {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    }
    return { success: true, data: { status: 'submitted' } };
  } catch {
    return { success: false, error: { message: 'Network error. Please try again.' } };
  }
}

export async function submitLead(data: Record<string, unknown>): Promise<ApiResponse<unknown>> {
  try {
    if (typeof window !== 'undefined') {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    }
    return { success: true, data: { status: 'submitted' } };
  } catch {
    return { success: false, error: { message: 'Network error. Please try again.' } };
  }
}

export async function fetchCompany(): Promise<ApiResponse<{ profile: CompanyProfile | null; settings: SiteSettings | null }> | null> {
  try {
    const [profile, settings] = await Promise.all([
      prisma.companyProfile.findFirst(),
      prisma.siteSettings.findFirst(),
    ]);
    return {
      success: true,
      data: {
        profile: profile as unknown as CompanyProfile | null,
        settings: settings as unknown as SiteSettings | null,
      },
    };
  } catch (err) {
    console.error('fetchCompany error', err);
    return null;
  }
}

export async function fetchIndustries(): Promise<ApiResponse<Industry[]> | null> {
  try {
    const data = await prisma.industry.findMany({
      include: { services: true, projects: true },
    });
    return { success: true, data: data as unknown as Industry[] };
  } catch (err) {
    console.error('fetchIndustries error', err);
    return null;
  }
}

export async function fetchIndustryBySlug(slug: string): Promise<ApiResponse<Industry> | null> {
  try {
    const data = await prisma.industry.findUnique({
      where: { slug },
      include: { services: true, projects: true },
    });
    if (!data) return null;
    return { success: true, data: data as unknown as Industry };
  } catch (err) {
    console.error('fetchIndustryBySlug error', err);
    return null;
  }
}

export async function fetchProjects(): Promise<ApiResponse<Project[]> | null> {
  try {
    const data = await prisma.project.findMany({
      include: { industry: true },
    });
    return { success: true, data: data as unknown as Project[] };
  } catch (err) {
    console.error('fetchProjects error', err);
    return null;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<ApiResponse<Project> | null> {
  try {
    const data = await prisma.project.findUnique({
      where: { slug },
      include: { industry: true },
    });
    if (!data) return null;
    return { success: true, data: data as unknown as Project };
  } catch (err) {
    console.error('fetchProjectBySlug error', err);
    return null;
  }
}

export async function fetchInsights(): Promise<ApiResponse<Insight[]> | null> {
  try {
    const data = await prisma.article.findMany({
      include: { industry: true },
    });
    return { success: true, data: data as unknown as Insight[] };
  } catch (err) {
    console.error('fetchInsights error', err);
    return null;
  }
}

export async function fetchInsightBySlug(slug: string): Promise<ApiResponse<Insight> | null> {
  try {
    const data = await prisma.article.findUnique({
      where: { slug },
      include: { industry: true },
    });
    if (!data) return null;
    return { success: true, data: data as unknown as Insight };
  } catch (err) {
    console.error('fetchInsightBySlug error', err);
    return null;
  }
}

export async function fetchFaqs(): Promise<ApiResponse<FaqBase[]> | null> {
  try {
    const data = await prisma.fAQ.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return { success: true, data: data as unknown as FaqBase[] };
  } catch (err) {
    console.error('fetchFaqs error', err);
    return null;
  }
}
