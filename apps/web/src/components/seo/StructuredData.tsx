import React from 'react';
import { CompanyProfile, SiteSettings } from '@/types/company';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://nexthere-web.vercel.app';

export function OrganizationSchema({ profile, settings }: { profile?: CompanyProfile | null; settings?: SiteSettings | null }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': `${BASE_URL}/#organization`,
    name: profile?.legalName || 'NextHere Services Private Limited',
    alternateName: ['NextHere', 'NextHere Services'],
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: profile?.shortDescription || 'Integrated enterprise solutions across IT consultancy, commercial electrical installations, and motorised road freight logistics.',
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'House No Pvt.129, Plot No 75-A, Kh.No. 15/7, 1st Floor, Salempur Mazra, Burari Extn, Street No 5, Village Burari',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110084',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.7532',
      longitude: '77.1982',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    knowsAbout: [
      'IT Consultancy',
      'Computer Systems & Network Infrastructure',
      'Commercial Electrical Installations',
      'Power Distribution & Control Panels',
      'Industrial Automation',
      'Motorised Road Freight Transportation',
      'Digital Fleet Management Systems',
      'Warehousing & Inventory Handling',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: profile?.primaryPhone || '+91 94729 57044',
        email: profile?.primaryEmail || 'nexthereservices@outlook.com',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'IN',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/nexthere-services',
      'https://twitter.com/NextHereService',
      'https://wa.me/919472957044',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'NextHere Services',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    description: 'Enterprise IT, Electrical Infrastructure, and Road Freight Logistics Solutions.',
    inLanguage: 'en-IN',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; item: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((el, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: el.name,
      item: el.item.startsWith('http') ? el.item : `${BASE_URL}${el.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQPageSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs || faqs.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ServiceSchema({
  title,
  description,
  url,
  category,
  capabilities,
}: {
  title: string;
  description: string;
  url: string;
  category?: string;
  capabilities?: string[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: description,
    url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
    provider: {
      '@type': 'Corporation',
      name: 'NextHere Services Private Limited',
      url: BASE_URL,
    },
    serviceType: category || 'Enterprise Technical Service',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: capabilities && capabilities.length > 0 ? {
      '@type': 'OfferCatalog',
      name: `${title} Capabilities`,
      itemListElement: capabilities.map((cap, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: cap,
        },
      })),
    } : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  url,
  image,
  publishedAt,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt?: string;
  author?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
    image: image || `${BASE_URL}/logo.png`,
    datePublished: publishedAt || '2025-08-01T00:00:00Z',
    dateModified: publishedAt || '2026-08-29T00:00:00Z',
    author: {
      '@type': 'Person',
      name: author || 'NextHere Advisory Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NextHere Services Private Limited',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${BASE_URL}${url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function CaseStudySchema({
  title,
  description,
  url,
  location,
  results,
}: {
  title: string;
  description: string;
  url: string;
  location?: string;
  results?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description: description,
    url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
    about: location ? `Project in ${location}` : 'Enterprise Project',
    author: {
      '@type': 'Organization',
      name: 'NextHere Services Private Limited',
    },
    review: results ? {
      '@type': 'Review',
      reviewBody: results,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Organization',
        name: 'Enterprise Client',
      },
    } : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
