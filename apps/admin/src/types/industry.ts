import { MediaAsset } from './media';
import { SEOData } from './seo';
import { ServiceBase, ProjectBase, ArticleBase, FaqBase } from './base';

export interface Industry {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  media?: MediaAsset | null;
  seo?: SEOData | null;
  services?: ServiceBase[];
  projects?: ProjectBase[];
  articles?: ArticleBase[];
  faqs?: FaqBase[];
}
