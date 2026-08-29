import Link from "next/link";
import React from "react";
import { fetchCompany, fetchCategories } from "../../lib/api";

export async function Footer() {
  const [companyData, categoriesData] = await Promise.all([
    fetchCompany(),
    fetchCategories()
  ]);
  
  const profile = (companyData?.success ? companyData.data.profile : null);
  const settings = (companyData?.success ? companyData.data.settings : null);
  const categories = (categoriesData?.success ? categoriesData.data : []);

  return (
    <footer className="w-full border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src="/logo.png" alt="NextHere Logo" className="h-10 w-auto mb-4 bg-white p-1 rounded" />
          <p className="mt-4 text-sm text-muted-foreground">
            {profile?.legalName || 'NextHere Services Private Limited'}<br />
            {settings?.tagline || 'Technology, Infrastructure, Mobility. Delivered.'}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/services" className="hover:text-primary">All Services</Link></li>
            {categories.map((cat: any) => (
              <li key={cat.id}><Link href={`/services/${cat.slug}`} className="hover:text-primary">{cat.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link href="/projects" className="hover:text-primary">Projects</Link></li>
            <li><Link href="/insights" className="hover:text-primary">Insights</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link href="/cookies" className="hover:text-primary">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-8 mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {profile?.legalName || 'NextHere Services Private Limited'}. All rights reserved.
      </div>
    </footer>
  );
}
