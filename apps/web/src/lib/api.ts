import { ApiResponse } from '../types/api';
import { CompanyProfile, SiteSettings } from '../types/company';
import { Industry } from '../types/industry';
import { Project } from '../types/project';
import { Insight } from '../types/insight';
import { FaqBase, ServiceBase } from '../types/base';
import { ServiceCategory } from '../types/serviceCategory';
import { ServiceDetail } from '../types/serviceDetail';
import { prisma } from '@nexthere/database';

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
        slug: 'it-consultancy',
        description: 'Systems planning, implementation, integration, and technology support services for institutions and organizations.',
        capabilities: ['IT Consultancy', 'Systems Planning', 'Technology Support', 'Facilities Management'],
        media: { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'IT Advisory' },
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
        id: 'svc-elec-1',
        title: 'Commercial Electrical Installations',
        slug: 'commercial-installations',
        description: 'Power distribution, cabling, lighting, and control panels for commercial and industrial premises.',
        capabilities: ['Power Distribution', 'Cabling', 'Control Panels', 'Lighting Systems'],
        media: { url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Electrical Installations' },
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'svc-elec-2',
        title: 'Industrial Automation & Control',
        slug: 'industrial-automation',
        description: 'Control systems, testing, commissioning, and preventive maintenance of heavy equipment.',
        capabilities: ['Control Panels', 'Automation Systems', 'Commissioning', 'Equipment Maintenance'],
        media: { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Industrial Automation' },
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'svc-elec-3',
        title: 'Testing, Inspection & Compliance',
        slug: 'testing-compliance',
        description: 'Statutory electrical safety audits, load testing, and compliance certification.',
        capabilities: ['Safety Audits', 'Load Testing', 'Statutory Compliance', 'Certification'],
        media: { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Testing & Compliance' },
        active: true,
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'cat-log',
    title: 'Freight & Logistics',
    slug: 'freight-logistics',
    description: 'Motorised road freight transportation, warehousing, inventory handling, and route coordination.',
    active: true,
    media: { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Freight Logistics' },
    createdAt: new Date().toISOString(),
    services: [
      {
        id: 'svc-log-1',
        title: 'Motorised Road Freight',
        slug: 'road-freight',
        description: 'Carriage, movement, delivery, and distribution of goods via commercial vehicles, trucks, and trailers.',
        capabilities: ['Trucks & Fleets', 'Goods Movement', 'Domestic Distribution', 'Commercial Transport'],
        media: { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Road Freight' },
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'svc-log-2',
        title: 'Warehousing & Inventory Handling',
        slug: 'warehousing',
        description: 'Storage, inventory handling, freight coordination, and allied logistics activities.',
        capabilities: ['Storage Solutions', 'Inventory Handling', 'Freight Coordination', 'Loading/Unloading'],
        media: { url: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Warehousing' },
        active: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'svc-log-3',
        title: 'Route Coordination & Support',
        slug: 'route-coordination',
        description: 'Logistics support services for domestic and commercial consignments including route management.',
        capabilities: ['Route Coordination', 'Consignment Management', 'Delivery Support', 'Logistics Operations'],
        media: { url: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Route Coordination' },
        active: true,
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

const FALLBACK_PROJECTS: any[] = [
  {
    id: 'proj-1',
    title: 'Institutional Network & Electrical Integration',
    slug: 'institutional-integration',
    status: 'PUBLISHED',
    projectStatus: 'COMPLETED',
    location: 'Pune, India',
    challenge: 'A newly constructed educational campus required a unified approach to their IT network rollout and campus-wide electrical power distribution.',
    solution: 'NextHere Services deployed a synchronized team to install main control panels, campus cabling, and establish a managed IT software environment.',
    results: 'Successfully commissioned all systems 2 weeks ahead of schedule with 100% compliance to applicable electrical safety laws.',
    coverMedia: { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Institutional Integration' },
    industry: {
      title: 'Commercial & Institutional',
      slug: 'commercial-institutional',
      shortDescription: 'Integrated IT, electrical, and facility management for institutions.',
      description: 'Comprehensive solutions for commercial institutions.',
      media: { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Commercial' },
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-2',
    title: 'Digital Fleet Management Rollout',
    slug: 'fleet-management-rollout',
    status: 'PUBLISHED',
    projectStatus: 'COMPLETED',
    location: 'New Delhi - Delhi Corridor',
    challenge: 'A manufacturing client needed to overhaul the movement of commercial consignments to reduce transit delays and inventory mismatch.',
    solution: 'We leased and deployed a fleet of commercial trucks integrated with our proprietary vehicle tracking and shipment monitoring technology.',
    results: 'Optimized route coordination resulted in a 20% reduction in delivery times and seamless inventory handling across warehouses.',
    coverMedia: { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Fleet Management' },
    industry: {
      title: 'Industrial Operations',
      slug: 'industrial',
      shortDescription: 'Automation, power distribution, and logistics for industrial units.',
      description: 'Comprehensive industrial operations support.',
      media: { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Industrial' },
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const FALLBACK_INDUSTRIES: any[] = [
  {
    id: 'ind-1',
    title: 'Commercial & Institutional',
    slug: 'commercial-institutional',
    shortDescription: 'Integrated IT, electrical, and facility management for institutions.',
    description: 'We provide end-to-end electrical installations, network infrastructure, and facilities management for large commercial premises and institutions as mandated by our core business objects.',
    media: { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Commercial & Institutional' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ind-2',
    title: 'Industrial Operations',
    slug: 'industrial',
    shortDescription: 'Automation, power distribution, and logistics for industrial units.',
    description: 'Delivering robust control panels, heavy electrical wiring, and dedicated trucking/freight operations to keep industrial supply chains and factories running seamlessly.',
    media: { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', type: 'IMAGE', altText: 'Industrial Operations' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    updatedAt: new Date().toISOString(),
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
    foundedYear: 2023,
    logo: { url: '/logo.png', altText: 'NextHere Logo', type: 'IMAGE' },
  },
  settings: {
    siteName: 'NextHere Services',
    tagline: 'Technology, Electrical Infrastructure, and Logistics. Delivered.',
    logo: { url: '/logo.png', altText: 'NextHere Logo', type: 'IMAGE' },
    favicon: { url: '/favicon.ico', altText: 'Favicon', type: 'IMAGE' },
    socialLinks: { linkedin: 'https://linkedin.com' },
    footerContent: { copyright: '© 2026 NextHere Services Private Limited' },
    defaultSEO: { title: 'NextHere Services | Official Corporate Portal' },
  },
};

// ── API IMPLEMENTATIONS ──

export async function fetchServices(): Promise<ApiResponse<ServiceBase[]> | null> {
  try {
    const data = await prisma.service.findMany({
      where: { active: true },
      include: { category: true },
    });
    if (data && data.length > 0) {
      return { success: true, data: data as unknown as ServiceBase[] };
    }
  } catch (err) {
    console.error('fetchServices error', err);
  }
  const allFallbackServices = FALLBACK_CATEGORIES.flatMap((c) => c.services || []);
  return { success: true, data: allFallbackServices as unknown as ServiceBase[] };
}

export async function fetchServiceBySlug(slug: string): Promise<ApiResponse<ServiceDetail> | null> {
  try {
    const data = await prisma.service.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (data) return { success: true, data: data as unknown as ServiceDetail };
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
    const data = await prisma.serviceCategory.findMany({
      include: { services: true },
      orderBy: { createdAt: 'asc' },
    });
    if (data && data.length > 0) {
      return { success: true, data: data as unknown as ServiceCategory[] };
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
    const [profile, settings] = await Promise.all([
      prisma.companyProfile.findFirst(),
      prisma.siteSettings.findFirst(),
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
    const data = await prisma.industry.findMany({
      include: { services: true, projects: true },
    });
    if (data && data.length > 0) {
      return { success: true, data: data as unknown as Industry[] };
    }
  } catch (err) {
    console.error('fetchIndustries error', err);
  }
  return { success: true, data: FALLBACK_INDUSTRIES as unknown as Industry[] };
}

export async function fetchIndustryBySlug(slug: string): Promise<ApiResponse<Industry> | null> {
  try {
    const data = await prisma.industry.findUnique({
      where: { slug },
      include: { services: true, projects: true },
    });
    if (data) return { success: true, data: data as unknown as Industry };
  } catch (err) {
    console.error('fetchIndustryBySlug error', err);
  }
  const ind = FALLBACK_INDUSTRIES.find((i: any) => i.slug === slug);
  if (ind) return { success: true, data: ind as unknown as Industry };
  return null;
}

export async function fetchProjects(): Promise<ApiResponse<Project[]> | null> {
  try {
    const data = await prisma.project.findMany({
      include: { industry: true },
    });
    if (data && data.length > 0) {
      return { success: true, data: data as unknown as Project[] };
    }
  } catch (err) {
    console.error('fetchProjects error', err);
  }
  return { success: true, data: FALLBACK_PROJECTS as unknown as Project[] };
}

export async function fetchProjectBySlug(slug: string): Promise<ApiResponse<Project> | null> {
  try {
    const data = await prisma.project.findUnique({
      where: { slug },
      include: { industry: true },
    });
    if (data) return { success: true, data: data as unknown as Project };
  } catch (err) {
    console.error('fetchProjectBySlug error', err);
  }
  const p = FALLBACK_PROJECTS.find((proj: any) => proj.slug === slug);
  if (p) return { success: true, data: p as unknown as Project };
  return null;
}

export async function fetchInsights(): Promise<ApiResponse<Insight[]> | null> {
  try {
    const data = await prisma.article.findMany({
      include: { industry: true },
    });
    if (data && data.length > 0) {
      return { success: true, data: data as unknown as Insight[] };
    }
  } catch (err) {
    console.error('fetchInsights error', err);
  }
  return { success: true, data: FALLBACK_INSIGHTS as unknown as Insight[] };
}

export async function fetchInsightBySlug(slug: string): Promise<ApiResponse<Insight> | null> {
  try {
    const data = await prisma.article.findUnique({
      where: { slug },
      include: { industry: true },
    });
    if (data) return { success: true, data: data as unknown as Insight };
  } catch (err) {
    console.error('fetchInsightBySlug error', err);
  }
  const a = FALLBACK_INSIGHTS.find((art: any) => art.slug === slug);
  if (a) return { success: true, data: a as unknown as Insight };
  return null;
}

export async function fetchFaqs(): Promise<ApiResponse<FaqBase[]> | null> {
  try {
    const data = await prisma.fAQ.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    if (data && data.length > 0) {
      return { success: true, data: data as unknown as FaqBase[] };
    }
  } catch (err) {
    console.error('fetchFaqs error', err);
  }
  return {
    success: true,
    data: [
      {
        id: 'faq-1',
        question: 'Do you own your transport fleet?',
        answer: 'Yes, as per our mandate, we operate, own, lease, and manage commercial vehicles, trucks, and tempos for carrying goods and providing nationwide logistics services.',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'faq-2',
        question: 'Are your electrical installations compliant with safety laws?',
        answer: 'Absolutely. All our installation, commissioning, testing, and repair works are strictly subjected to and compliant with applicable regional and national electrical laws.',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'faq-3',
        question: 'Do you offer combined IT and Electrical solutions?',
        answer: 'Yes, we provide integrated technology and electrical infrastructure solutions, including automation, monitoring, and control systems for commercial premises.',
        createdAt: new Date().toISOString(),
      },
    ] as unknown as FaqBase[],
  };
}
