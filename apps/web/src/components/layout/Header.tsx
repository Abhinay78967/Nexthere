import Link from "next/link";
import React from "react";
import { fetchCategories } from "../../lib/api";

interface CategoryMenuItem { id: string; slug: string; title: string; }

export async function Header() {
  let categories: CategoryMenuItem[] = [];
  try {
    const res = await fetchCategories();
    if (res && res.success) {
      categories = res.data;
    }
  } catch (error) {
    console.error('Failed to load categories for header');
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="NextHere Logo" className="h-8 w-auto bg-white p-1 rounded" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/about" className="transition-colors hover:text-primary">About</Link>
            <div className="group relative">
              <Link href="/services" className="flex items-center gap-1 transition-colors hover:text-primary">
                Services
              </Link>
              <div className="absolute top-full left-0 hidden w-64 flex-col rounded-md border border-border bg-background p-2 shadow-md group-hover:flex">
                {categories.length > 0 ? (
                  categories.map((cat: any) => (
                    <Link key={cat.id} href={`/services/${cat.slug}`} className="block rounded p-2 hover:bg-muted text-foreground">
                      {cat.title}
                    </Link>
                  ))
                ) : (
                  <>
                    <Link href="/services/it-technology" className="block rounded p-2 hover:bg-muted text-foreground">IT & Technology Solutions</Link>
                    <Link href="/services/electrical-infrastructure" className="block rounded p-2 hover:bg-muted text-foreground">Electrical Infrastructure</Link>
                    <Link href="/services/freight-logistics" className="block rounded p-2 hover:bg-muted text-foreground">Freight & Logistics</Link>
                  </>
                )}
              </div>
            </div>
            <Link href="/projects" className="transition-colors hover:text-primary">Projects</Link>
            <Link href="/industries" className="transition-colors hover:text-primary">Industries</Link>
            <Link href="/insights" className="transition-colors hover:text-primary">Insights</Link>
            <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/request-quote" className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            Request a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
