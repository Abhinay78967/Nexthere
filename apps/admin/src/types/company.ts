import { MediaAsset } from './media';
import { SEOData } from './seo';

export interface CompanyProfile {
  legalName: string | null;
  displayName: string;
  shortDescription: string | null;
  longDescription: string | null;
  mission: string | null;
  vision: string | null;
  primaryEmail: string | null;
  primaryPhone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  logo: MediaAsset | null;
  foundedYear: number | null;
}

export interface SiteSettings {
  siteName: string;
  tagline: string | null;
  logo: MediaAsset | null;
  favicon: MediaAsset | null;
  socialLinks: Record<string, string> | null;
  defaultSEO: SEOData | null;
  footerContent: string | null;
}
