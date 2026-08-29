import { MediaAsset } from './media';
import { ServiceBase } from './base';

export interface ServiceDetail extends ServiceBase {
  description?: string | null;
  capabilities?: unknown | null;
  media?: MediaAsset | null;
  category?: {
    title: string;
    slug: string;
    media?: MediaAsset | null;
  } | null;
}
