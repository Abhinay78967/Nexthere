export type MediaType = 'COMPANY' | 'STOCK' | 'CONCEPT' | 'PLACEHOLDER';

export interface MediaAsset {
  url: string;
  type: MediaType;
  altText: string;
  width?: number;
  height?: number;
  caption?: string;
}

export function parseMedia(json: unknown): MediaAsset | null {
  if (!json || typeof json !== 'object') return null;
  const data = json as Record<string, unknown>;
  if (!data.url || typeof data.url !== 'string') return null;
  
  return {
    url: data.url,
    type: (data.type as MediaType) || 'PLACEHOLDER',
    altText: (data.altText as string) || 'NextHere visual asset',
    width: data.width as number | undefined,
    height: data.height as number | undefined,
    caption: data.caption as string | undefined,
  };
}
