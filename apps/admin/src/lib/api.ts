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

// ---------------------------------------------------------
// SOCIAL GROWTH & AUTOMATION API CLIENTS
// ---------------------------------------------------------

export async function fetchSocialStats(): Promise<any | null> {
  try {
    const res = await fetch(`${API_URL}/social/stats`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchSocialBrands(): Promise<any[]> {
  try {
    const res = await fetch(`${API_URL}/social/brands`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function createSocialBrand(data: any): Promise<any | null> {
  try {
    const res = await fetch(`${API_URL}/social/brands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchSocialPosts(params?: { platform?: string; status?: string; brandProfileId?: string; search?: string }): Promise<any[]> {
  try {
    const query = new URLSearchParams();
    if (params?.platform) query.set('platform', params.platform);
    if (params?.status) query.set('status', params.status);
    if (params?.brandProfileId) query.set('brandProfileId', params.brandProfileId);
    if (params?.search) query.set('search', params.search);

    const res = await fetch(`${API_URL}/social/posts?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function generateAiSocialPosts(data: {
  topic: string;
  brandProfileId?: string;
  targetAudience?: string;
  tone?: string;
  platforms?: string[];
  callToAction?: string;
  customInstructions?: string;
}): Promise<any[]> {
  try {
    const res = await fetch(`${API_URL}/social/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function createSocialPost(data: any): Promise<any | null> {
  try {
    const res = await fetch(`${API_URL}/social/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function updateSocialPost(id: string, data: any): Promise<any | null> {
  try {
    const res = await fetch(`${API_URL}/social/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function deleteSocialPost(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/social/posts/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function publishSocialPostNow(id: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_URL}/social/posts/${id}/publish-now`, {
      method: 'POST',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchSocialCalendar(year?: number, month?: number): Promise<any | null> {
  try {
    const query = new URLSearchParams();
    if (year !== undefined) query.set('year', year.toString());
    if (month !== undefined) query.set('month', month.toString());

    const res = await fetch(`${API_URL}/social/calendar?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchSocialAccounts(): Promise<any[]> {
  try {
    const res = await fetch(`${API_URL}/social/accounts`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function createSocialAccount(data: any): Promise<any | null> {
  try {
    const res = await fetch(`${API_URL}/social/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function updateSocialAccount(id: string, data: any): Promise<any | null> {
  try {
    const res = await fetch(`${API_URL}/social/accounts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function deleteSocialAccount(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/social/accounts/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function testSocialAccountConnection(id: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_URL}/social/accounts/${id}/test`, {
      method: 'POST',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function simulateInboundLead(data: any): Promise<any | null> {
  try {
    const res = await fetch(`${API_URL}/social/webhooks/inbound`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}


