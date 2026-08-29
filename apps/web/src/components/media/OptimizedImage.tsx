"use client";

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { MediaAsset } from '../../types/media';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  media: MediaAsset | null | undefined;
  fallbackSrc?: string;
  fallbackAlt?: string;
  className?: string;
  containerClassName?: string;
}

export function OptimizedImage({ 
  media, 
  fallbackSrc = '/images/hero/hero-bg.svg', 
  fallbackAlt = 'NextHere Image',
  className = '',
  containerClassName = '',
  ...props 
}: OptimizedImageProps) {
  const [error, setError] = useState(false);

  const src = (media && !error && media.url) ? media.url : fallbackSrc;
  const alt = (media && media.altText) ? media.altText : fallbackAlt;

  // Use defined width/height if available, otherwise rely on layout fill.
  const width = media?.width;
  const height = media?.height;
  
  const isFill = !width || !height;

  return (
    <div className={`relative overflow-hidden ${containerClassName} bg-surface-muted flex items-center justify-center`}>
      <Image
        src={src}
        alt={alt}
        fill={isFill}
        width={isFill ? undefined : width}
        height={isFill ? undefined : height}
        className={`object-cover transition-opacity duration-500 ${className}`}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}
