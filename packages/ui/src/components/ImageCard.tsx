import React from 'react';

export interface ImageCardProps {
  title: string;
  description: string;
  eyebrow?: string;
  imageSlot?: React.ReactNode;
  actionSlot?: React.ReactNode;
  className?: string;
}

export function ImageCard({
  title,
  description,
  eyebrow,
  imageSlot,
  actionSlot,
  className = ''
}: ImageCardProps) {
  return (
    <div className={`group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}>
      {/* Image Area */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface-muted">
        {imageSlot}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-6">
        {eyebrow && (
          <span className="mb-2 text-xs font-bold tracking-wider uppercase text-primary">
            {eyebrow}
          </span>
        )}
        <h3 className="mb-3 text-xl font-bold text-foreground">
          {title}
        </h3>
        <p className="mb-6 flex-1 text-muted-foreground">
          {description}
        </p>
        
        {/* Action Area */}
        {actionSlot && (
          <div className="mt-auto flex items-center text-primary font-medium">
            {actionSlot}
          </div>
        )}
      </div>
    </div>
  );
}
