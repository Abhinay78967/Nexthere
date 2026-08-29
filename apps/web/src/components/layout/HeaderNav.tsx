'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CategoryMenuItem {
  id: string;
  slug: string;
  title: string;
}

interface HeaderNavProps {
  categories: CategoryMenuItem[];
}

export function HeaderNav({ categories }: HeaderNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu whenever navigation occurs
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const serviceCategories = categories.length > 0 ? categories : [
    { id: 'cat-it', slug: 'it-technology', title: 'IT & Technology Solutions' },
    { id: 'cat-elec', slug: 'electrical-infrastructure', title: 'Electrical Infrastructure' },
    { id: 'cat-log', slug: 'freight-logistics', title: 'Freight & Logistics' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="NextHere Logo" className="h-8 w-auto bg-white p-1 rounded shadow-sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/about"
              className={`transition-colors hover:text-primary ${pathname === '/about' ? 'text-primary font-semibold' : 'text-foreground/80'}`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div className="group relative">
              <Link
                href="/services"
                className={`flex items-center gap-1 transition-colors hover:text-primary ${pathname?.startsWith('/services') ? 'text-primary font-semibold' : 'text-foreground/80'}`}
              >
                Services
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-full left-0 hidden w-72 flex-col rounded-xl border border-border bg-background p-2 shadow-xl group-hover:flex z-50 animate-in fade-in-50 duration-150">
                <Link
                  href="/services"
                  className="block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:bg-muted/50 transition-colors"
                >
                  All Services Catalog →
                </Link>
                <div className="my-1 border-t border-border" />
                {serviceCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/services/${cat.slug}`}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/projects"
              className={`transition-colors hover:text-primary ${pathname?.startsWith('/projects') ? 'text-primary font-semibold' : 'text-foreground/80'}`}
            >
              Projects
            </Link>
            <Link
              href="/industries"
              className={`transition-colors hover:text-primary ${pathname?.startsWith('/industries') ? 'text-primary font-semibold' : 'text-foreground/80'}`}
            >
              Industries
            </Link>
            <Link
              href="/insights"
              className={`transition-colors hover:text-primary ${pathname?.startsWith('/insights') ? 'text-primary font-semibold' : 'text-foreground/80'}`}
            >
              Insights
            </Link>
            <Link
              href="/contact"
              className={`transition-colors hover:text-primary ${pathname === '/contact' ? 'text-primary font-semibold' : 'text-foreground/80'}`}
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Right CTA & Mobile Hamburger Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/request-quote"
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            Request a Quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center p-2 rounded-lg text-foreground hover:bg-muted focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-3 pb-6 shadow-2xl space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/about"
              className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
            >
              About Us
            </Link>

            {/* Mobile Services Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                <span>Services</span>
                <svg className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-surface-muted/50 rounded-lg my-1">
                  <Link
                    href="/services"
                    className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                  >
                    View All Services →
                  </Link>
                  {serviceCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/services/${cat.slug}`}
                      className="block px-3 py-2 rounded-md text-sm text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/projects"
              className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
            >
              Projects & Case Studies
            </Link>
            <Link
              href="/industries"
              className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
            >
              Industries
            </Link>
            <Link
              href="/insights"
              className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
            >
              Insights & Articles
            </Link>
            <Link
              href="/contact"
              className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          <div className="pt-2 border-t border-border space-y-3">
            <Link
              href="/request-quote"
              className="flex w-full items-center justify-center py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-center shadow hover:bg-primary/90 transition-colors"
            >
              Request a Quote
            </Link>

            <div className="flex items-center justify-between text-xs text-muted-foreground px-2 pt-1">
              <a href="tel:+919472957044" className="hover:text-primary flex items-center gap-1">
                📞 +91 94729 57044
              </a>
              <a href="mailto:nexthereservices@outlook.com" className="hover:text-primary flex items-center gap-1">
                ✉️ Email Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
