import { MediaAsset } from './media';
import { SEOData } from './seo';
import { ServiceBase } from './base';

export interface ProjectIndustry {
  title: string;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  projectStatus: string;
  location?: string | null;
  completionDate?: string | Date | null;
  challenge?: string | null;
  solution?: string | null;
  execution?: string | null;
  results?: string | null;
  coverMedia?: MediaAsset | null;
  gallery?: MediaAsset[] | null;
  seo?: SEOData | null;
  industry?: ProjectIndustry | null;
  services?: ServiceBase[];
}
