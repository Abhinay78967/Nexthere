import { ApiResponse } from '../types/api';
import { CompanyProfile, SiteSettings } from '../types/company';
import { Industry } from '../types/industry';
import { Project } from '../types/project';
import { Insight } from '../types/insight';
import { FaqBase, ServiceBase } from '../types/base';
import { ServiceCategory } from '../types/serviceCategory';
import { ServiceDetail } from '../types/serviceDetail';
import { supabase } from '@/lib/supabase-client';

// ── REAL DATA FALLBACK CONSTANTS (MCA MOA COMPLIANT) ──

const FALLBACK_CATEGORIES: any[] = [
  {
    id: 'cat-it',
    title: 'IT & Technology Solutions',
    slug: 'it-technology',
    description: 'Computer consultancy, systems planning, networks, and technology-enabled business solutions.',
    active: true,
    media: { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'IT Solutions' },
    createdAt: new Date().toISOString(),
    services: [
      {
        id: 'svc-it-1',
        title: 'IT Advisory & Consultancy',
        slug: 'it-advisory-consultancy',
        description: 'Strategic IT roadmap design, system architecture analysis, and enterprise software advisory.',
        capabilities: ['System Planning', 'Digital Strategy', 'IT Architecture', 'Vendor Selection'],
        media: { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'IT Advisory' },
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'svc-it-2',
        title: 'Network & Infrastructure Management',
        slug: 'network-infrastructure',
        description: 'Design, development, and maintenance of computer systems, networks, and software environments.',
        capabilities: ['Network Maintenance', 'Data Systems', 'IT Infrastructure', 'Software Environments'],
        media: { url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Network Management' },
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'svc-it-3',
        title: 'Digital Logistics Systems',
        slug: 'digital-logistics-systems',
        description: 'Technology-enabled transport solutions including fleet management and shipment monitoring.',
        capabilities: ['Vehicle Tracking', 'Route Management', 'Fleet Management', 'Shipment Monitoring'],
        media: { url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Digital Logistics' },
        active: true,
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'cat-elec',
    title: 'Electrical Infrastructure',
    slug: 'electrical-infrastructure',
    description: 'Installation, commissioning, and maintenance of commercial and industrial electrical systems.',
    active: true,
    media: { url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Electrical Infrastructure' },
    createdAt: new Date().toISOString(),
    services: [
      {
        id: 'svc-el-1',
        title: 'Commercial Electrical Installations',
        slug: 'commercial-electrical-installations',
        description: 'Complete electrical wiring, panels, switchgear, and power distribution for commercial buildings.',
        capabilities: ['HT/LT Distribution', 'Switchgear Setup', 'Lighting Systems', 'Statutory Compliance'],
        media: { url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Commercial Electrical' },
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'svc-el-2',
        title: 'Industrial Power Systems & Panels',
        slug: 'industrial-power-systems',
        description: 'Industrial motor controls, automation panels, and power backup commissioning for factory premises.',
        capabilities: ['Control Panels (APFC/PCC)', 'Industrial Wiring', 'Motor Control Centers', 'Power Backup'],
        media: { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Industrial Power' },
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'svc-el-3',
        title: 'Electrical Safety Audits & Maintenance',
        slug: 'electrical-safety-audits',
        description: 'Comprehensive electrical health checkups, thermography, and scheduled maintenance contracts.',
        capabilities: ['Safety Audits', 'Thermography Scans', 'Harmonic Analysis', 'AMC Support'],
        media: { url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Electrical Safety' },
        active: true,
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'cat-log',
    title: 'Freight & Logistics',
    slug: 'freight-logistics',
    description: 'Motorised road freight transport and commercial logistics for business goods and cargo.',
    active: true,
    media: { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Freight & Logistics' },
    createdAt: new Date().toISOString(),
    services: [
      {
        id: 'svc-lg-1',
        title: 'Motorised Road Freight Transport',
        slug: 'motorised-road-freight',
        description: 'FTL and LTL freight movement across industrial corridors with GPS-enabled fleet management.',
        capabilities: ['Full Truck Load (FTL)', 'GPS Live Tracking', 'Scheduled Dispatch', 'Cargo Insurance Support'],
        media: { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Road Freight' },
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'svc-lg-2',
        title: 'Commercial Logistics & Distribution',
        slug: 'commercial-logistics-distribution',
        description: 'End-to-end transport logistics for manufacturing, retail, and commercial supply chains.',
        capabilities: ['Route Optimization', 'Hub-to-Hub Transport', 'Dedicated Fleet', 'POD Digital Verification'],
        media: { url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Commercial Logistics' },
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'svc-lg-3',
        title: 'Specialized Equipment & Cargo Movement',
        slug: 'specialized-cargo-movement',
        description: 'Safe transport and heavy hauling for sensitive machinery, electrical equipment, and project cargo.',
        capabilities: ['Heavy Cargo', 'Machinery Transport', 'Tailgate Loading', 'On-site Rigging Support'],
        media: { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Specialized Cargo' },
        active: true,
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

const FALLBACK_PROJECTS: any[] = [
  {
    id: 'proj-1',
    title: 'Enterprise Campus IT & Electrical Infrastructure',
    slug: 'enterprise-campus-infrastructure',
    industry: { title: 'Commercial & Institutional', slug: 'commercial-institutional' },
    location: 'NCR, India',
    projectStatus: 'COMPLETED',
    challenge: 'A 50,000 sq.ft. commercial facility required complete dual-tier structured cabling, server room deployment, and high-load electrical switchgear commissioning with zero business disruption.',
    solution: 'NextHere engineered an integrated solution deploying fiber backbone networks, APFC panels, and scheduled power distribution over a phased 60-day execution roadmap.',
    results: 'Delivered 100% on schedule with statutory CEIG approvals and 99.99% infrastructure uptime.',
    coverMedia: { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Commercial Project' },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-2',
    title: 'Industrial Manufacturing Freight & Logistics Corridor',
    slug: 'industrial-freight-corridor',
    industry: { title: 'Industrial Operations', slug: 'industrial' },
    location: 'Delhi - Haryana - Rajasthan Route',
    projectStatus: 'COMPLETED',
    challenge: 'An automotive parts manufacturer faced unpredictable delivery schedules and lack of real-time consignment visibility on inter-state transit routes.',
    solution: 'Deployed a dedicated fleet with GPS telematics, digital dispatch scheduling, and SLA-bound milestone notifications.',
    results: 'Achieved 98.6% on-time transit performance and reduced freight handling losses to zero.',
    coverMedia: { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Logistics Project' },
    createdAt: new Date().toISOString(),
  },
];

const FALLBACK_INDUSTRIES: any[] = [
  {
    id: 'ind-1',
    title: 'Commercial & Institutional',
    slug: 'commercial-institutional',
    shortDescription: 'Turnkey IT, electrical, and facility solutions for corporate offices and educational campuses.',
    description: 'We provide turnkey electrical installations, enterprise network infrastructure, and facilities technology for commercial complexes, business parks, and institutional campuses.',
    media: { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Commercial & Institutional' },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ind-2',
    title: 'Industrial Operations',
    slug: 'industrial',
    shortDescription: 'Automation, power distribution, and logistics for industrial units.',
    description: 'Delivering robust control panels, heavy electrical wiring, and dedicated trucking/freight operations to keep industrial supply chains and factories running seamlessly.',
    media: { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Industrial Operations' },
    createdAt: new Date().toISOString(),
  },
];

const FALLBACK_INSIGHTS: any[] = [
  {
    id: 'art-1',
    title: 'Integrating IT with Electrical Infrastructure for Modern Industries',
    slug: 'integrating-it-electrical',
    excerpt: 'How commercial and industrial premises are benefiting from integrated technology and electrical automation systems.',
    content: 'In line with our commitment to providing integrated technology and electrical infrastructure solutions, we explore how automation, monitoring, and control systems are revolutionizing commercial operations. By combining enterprise IT systems with robust electrical infrastructure and reliable supply chain logistics, modern companies achieve unprecedented operational uptime.',
    author: 'NextHere Advisory Team',
    publishedAt: new Date().toISOString(),
    coverMedia: { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Integrating IT & Electrical' },
    industry: {
      title: 'Industrial Operations',
      slug: 'industrial',
      shortDescription: 'Automation, power distribution, and logistics for industrial units.',
    },
    createdAt: new Date().toISOString(),
  },
];

const FALLBACK_COMPANY: any = {
  profile: {
    displayName: 'NextHere Services',
    legalName: 'NextHere Services Private Limited',
    shortDescription: 'Providing integrated IT advisory, electrical infrastructure, and road freight logistics solutions.',
    longDescription: 'NextHere Services Private Limited is a registered enterprise offering a unique triad of business solutions. We specialize in comprehensive IT consultancy and systems management, commercial and industrial electrical installations, and nationwide motorised road freight logistics.',
    mission: 'To deliver reliable, technology-enabled business solutions across IT networks, electrical installations, and commercial transportation.',
    vision: 'To be the most trusted integrated service provider for businesses seeking robust infrastructure and logistics support.',
    primaryEmail: 'nexthereservices@outlook.com',
    primaryPhone: '+91 94729 57044',
    address: 'House No Pvt.129, Plot No 75-A, Kh.No. 15/7, 1st Floor, Salempur Mazra, Burari Extn, Street No 5, Village Burari',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    foundedYear: 2025,
    logo: { url: '/logo.png', altText: 'NextHere Logo', type: 'IMAGE' },
  },
  settings: {
    siteName: 'NextHere Services',
    tagline: 'Technology, Electrical Infrastructure, and Logistics. Delivered.',
    logo: { url: '/logo.png', altText: 'NextHere Logo', type: 'IMAGE' },
    favicon: { url: '/favicon.ico', altText: 'Favicon', type: 'IMAGE' },
    socialLinks: { linkedin: 'https://linkedin.com' },
    footerContent: { copyright: '© 2026 NextHere Services Private Limited' },
  },
};

// ── API IMPLEMENTATIONS WITH SUPABASE SYNC ──

export async function fetchServices(): Promise<ApiResponse<ServiceBase[]> | null> {
  try {
    const { data, error } = await supabase
      .from('Service')
      .select('*, ServiceCategory(id, title, slug)')
      .eq('active', true)
      .order('createdAt', { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped = data.map((s) => ({
        ...s,
        category: s.ServiceCategory,
      }));
      return { success: true, data: mapped as unknown as ServiceBase[] };
    }
  } catch (err) {
    console.error('fetchServices error', err);
  }
  const allFallbackServices = FALLBACK_CATEGORIES.flatMap((c) => c.services || []);
  return { success: true, data: allFallbackServices as unknown as ServiceBase[] };
}

export async function fetchServiceBySlug(slug: string): Promise<ApiResponse<ServiceDetail> | null> {
  try {
    const { data, error } = await supabase
      .from('Service')
      .select('*, ServiceCategory(id, title, slug, description)')
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return {
        success: true,
        data: {
          ...data,
          category: data.ServiceCategory,
        } as unknown as ServiceDetail,
      };
    }
  } catch (err) {
    console.error('fetchServiceBySlug error', err);
  }
  for (const cat of FALLBACK_CATEGORIES) {
    const s = cat.services?.find((svc: any) => svc.slug === slug);
    if (s) {
      return {
        success: true,
        data: {
          ...s,
          category: { id: cat.id, title: cat.title, slug: cat.slug, description: cat.description },
        } as unknown as ServiceDetail,
      };
    }
  }
  return null;
}

export async function fetchCategories(): Promise<ApiResponse<ServiceCategory[]> | null> {
  try {
    const { data, error } = await supabase
      .from('ServiceCategory')
      .select('*, Service(*)')
      .order('createdAt', { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped = data.map((cat) => ({
        ...cat,
        services: cat.Service || [],
      }));
      return { success: true, data: mapped as unknown as ServiceCategory[] };
    }
  } catch (err) {
    console.error('fetchCategories error', err);
  }
  return { success: true, data: FALLBACK_CATEGORIES as unknown as ServiceCategory[] };
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
    const [{ data: profile }, { data: settings }] = await Promise.all([
      supabase.from('CompanyProfile').select('*').limit(1).single(),
      supabase.from('SiteSettings').select('*').limit(1).single(),
    ]);
    if (profile) {
      return {
        success: true,
        data: {
          profile: profile as unknown as CompanyProfile | null,
          settings: settings as unknown as SiteSettings | null,
        },
      };
    }
  } catch (err) {
    console.error('fetchCompany error', err);
  }
  return { success: true, data: FALLBACK_COMPANY as unknown as { profile: CompanyProfile; settings: SiteSettings } };
}

export async function fetchIndustries(): Promise<ApiResponse<Industry[]> | null> {
  try {
    const { data, error } = await supabase
      .from('Industry')
      .select('*')
      .order('createdAt', { ascending: true });

    if (!error && data && data.length > 0) {
      return { success: true, data: data as unknown as Industry[] };
    }
  } catch (err) {
    console.error('fetchIndustries error', err);
  }
  return { success: true, data: FALLBACK_INDUSTRIES as unknown as Industry[] };
}

export async function fetchIndustryBySlug(slug: string): Promise<ApiResponse<Industry> | null> {
  try {
    const { data, error } = await supabase
      .from('Industry')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!error && data) return { success: true, data: data as unknown as Industry };
  } catch (err) {
    console.error('fetchIndustryBySlug error', err);
  }
  const ind = FALLBACK_INDUSTRIES.find((i: any) => i.slug === slug);
  if (ind) return { success: true, data: ind as unknown as Industry };
  return null;
}

export async function fetchProjects(): Promise<ApiResponse<Project[]> | null> {
  try {
    const { data, error } = await supabase
      .from('Project')
      .select('*, Industry(id, title)')
      .order('createdAt', { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped = data.map((p) => ({
        ...p,
        industry: p.Industry,
      }));
      return { success: true, data: mapped as unknown as Project[] };
    }
  } catch (err) {
    console.error('fetchProjects error', err);
  }
  return { success: true, data: FALLBACK_PROJECTS as unknown as Project[] };
}

export async function fetchProjectBySlug(slug: string): Promise<ApiResponse<Project> | null> {
  try {
    const { data, error } = await supabase
      .from('Project')
      .select('*, Industry(id, title)')
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return {
        success: true,
        data: {
          ...data,
          industry: data.Industry,
        } as unknown as Project,
      };
    }
  } catch (err) {
    console.error('fetchProjectBySlug error', err);
  }
  const p = FALLBACK_PROJECTS.find((proj: any) => proj.slug === slug);
  if (p) return { success: true, data: p as unknown as Project };
  return null;
}

export async function fetchInsights(): Promise<ApiResponse<Insight[]> | null> {
  try {
    const { data, error } = await supabase
      .from('Article')
      .select('*, Industry(id, title)')
      .order('createdAt', { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped = data.map((a) => ({
        ...a,
        industry: a.Industry,
      }));
      return { success: true, data: mapped as unknown as Insight[] };
    }
  } catch (err) {
    console.error('fetchInsights error', err);
  }
  return { success: true, data: FALLBACK_INSIGHTS as unknown as Insight[] };
}

export async function fetchInsightBySlug(slug: string): Promise<ApiResponse<Insight> | null> {
  try {
    const { data, error } = await supabase
      .from('Article')
      .select('*, Industry(id, title)')
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return {
        success: true,
        data: {
          ...data,
          industry: data.Industry,
        } as unknown as Insight,
      };
    }
  } catch (err) {
    console.error('fetchInsightBySlug error', err);
  }
  const a = FALLBACK_INSIGHTS.find((art: any) => art.slug === slug);
  if (a) return { success: true, data: a as unknown as Insight };
  return null;
}

export async function fetchFaqs(): Promise<ApiResponse<FaqBase[]> | null> {
  try {
    const { data, error } = await supabase
      .from('FAQ')
      .select('*')
      .order('displayOrder', { ascending: true });

    if (!error && data && data.length > 0) {
      return { success: true, data: data as unknown as FaqBase[] };
    }
  } catch (err) {
    console.error('fetchFaqs error', err);
  }
  return { success: true, data: [] };
}
