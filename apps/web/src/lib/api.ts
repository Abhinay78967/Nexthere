import { ApiResponse } from '../types/api';
import { CompanyProfile, SiteSettings } from '../types/company';
import { Industry } from '../types/industry';
import { Project } from '../types/project';
import { Insight } from '../types/insight';
import { FaqBase, ServiceBase } from '../types/base';
import { ServiceCategory } from '../types/serviceCategory';
import { ServiceDetail } from '../types/serviceDetail';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export async function fetchServices(): Promise<ApiResponse<ServiceBase[]> | null> {
  try {
    const res = await fetch(`${API_URL}/services`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json() as Promise<ApiResponse<ServiceBase[]>>;
  } catch {
    return null;
  }
}

export async function fetchServiceBySlug(slug: string): Promise<ApiResponse<ServiceDetail> | null> {
  try {
    const res = await fetch(`${API_URL}/services/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json() as Promise<ApiResponse<ServiceDetail>>;
  } catch {
    return null;
  }
}

export async function fetchCategories(): Promise<ApiResponse<ServiceCategory[]> | null> {
  try {
    const res = await fetch(`${API_URL}/services/categories`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json() as Promise<ApiResponse<ServiceCategory[]>>;
  } catch {
    return null;
  }
}
  
export async function submitInquiry(data: Record<string, unknown>): Promise<ApiResponse<unknown>> {  
  try {  
    const res = await fetch(`${API_URL}/inquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });  
    return res.json() as Promise<ApiResponse<unknown>>;  
  } catch { return { success: false, error: { message: 'Network error. Please try again.' } }; }  
}  

export async function submitLead(data: Record<string, unknown>): Promise<ApiResponse<unknown>> {  
  try {  
    const res = await fetch(`${API_URL}/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });  
    return res.json() as Promise<ApiResponse<unknown>>;  
  } catch { return { success: false, error: { message: 'Network error. Please try again.' } }; }  
}

export async function fetchCompany(): Promise<ApiResponse<{ profile: CompanyProfile | null; settings: SiteSettings | null }> | null> {
  try {
    const res = await fetch(`${API_URL}/company`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json() as Promise<ApiResponse<{ profile: CompanyProfile | null; settings: SiteSettings | null }>>;
  } catch { return null; }
}

export async function fetchIndustries(): Promise<ApiResponse<Industry[]> | null> {
  try {
    const res = await fetch(`${API_URL}/industries`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json() as Promise<ApiResponse<Industry[]>>;
  } catch { return null; }
}

export async function fetchIndustryBySlug(slug: string): Promise<ApiResponse<Industry> | null> {
  try {
    const res = await fetch(`${API_URL}/industries/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json() as Promise<ApiResponse<Industry>>;
  } catch { return null; }
}

export async function fetchProjects(): Promise<ApiResponse<Project[]> | null> {
  try {
    const res = await fetch(`${API_URL}/projects`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json() as Promise<ApiResponse<Project[]>>;
  } catch { return null; }
}

export async function fetchProjectBySlug(slug: string): Promise<ApiResponse<Project> | null> {
  try {
    const res = await fetch(`${API_URL}/projects/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json() as Promise<ApiResponse<Project>>;
  } catch { return null; }
}

export async function fetchInsights(): Promise<ApiResponse<Insight[]> | null> {
  try {
    const res = await fetch(`${API_URL}/insights`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json() as Promise<ApiResponse<Insight[]>>;
  } catch { return null; }
}

export async function fetchInsightBySlug(slug: string): Promise<ApiResponse<Insight> | null> {
  try {
    const res = await fetch(`${API_URL}/insights/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json() as Promise<ApiResponse<Insight>>;
  } catch { return null; }
}

export async function fetchFaqs(): Promise<ApiResponse<FaqBase[]> | null> {
  try {
    const res = await fetch(`${API_URL}/faqs`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json() as Promise<ApiResponse<FaqBase[]>>;
  } catch { return null; }
}
