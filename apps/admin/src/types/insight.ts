import { MediaAsset } from './media';
import { SEOData } from './seo';

export interface InsightIndustry {
  title: string;
  slug: string;
}

export interface Insight {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  coverMedia?: MediaAsset | null;
  author?: string | null;
  publishedAt?: string | Date | null;
  tags?: string[];
  seo?: SEOData | null;
  industry?: InsightIndustry | null;
}
