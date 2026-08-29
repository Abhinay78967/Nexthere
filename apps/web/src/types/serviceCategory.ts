import { MediaAsset } from './media';
import { ServiceBase } from './base';

export interface ServiceCategory {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  media?: MediaAsset | null;
  services?: ServiceBase[];
}
