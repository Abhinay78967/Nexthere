import React from 'react';
import { CompanyProfile, SiteSettings } from '@/types/company';

export function OrganizationSchema({ profile, settings }: { profile: CompanyProfile | null, settings: SiteSettings | null }) {
  if (!profile) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": profile.legalName || settings?.siteName || "NextHere",
    "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "logo": settings?.logo?.url || undefined,
    "description": profile.shortDescription || undefined,
    "contactPoint": profile.primaryPhone || profile.primaryEmail ? [{
      "@type": "ContactPoint",
      "telephone": profile.primaryPhone || undefined,
      "email": profile.primaryEmail || undefined,
      "contactType": "customer service"
    }] : undefined
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string, item: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((el, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": el.name,
      "item": el.item
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
