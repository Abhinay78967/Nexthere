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

  const SOCIAL_LINKS = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/nexthere-services",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.63 1.63 0 1 0 0-3.26 1.63 1.63 0 0 0 0 3.26m1.4 9.74V10.13H5.06v8.37z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      href: "https://twitter.com/NextHereService",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/919472957044?text=Hi%20NextHere%20Services%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 0 1-5.82 2.41c-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.11.82.83-3.03-.19-.3a8.21 8.21 0 0 1-1.26-4.49c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.76 2.68 4.25 3.76.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full border-t border-border bg-background py-14">
      <div className="container mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Company Column */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <img src="/logo.png" alt="NextHere Logo" className="h-10 w-auto bg-white p-1 rounded shadow-sm" />
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            <strong className="text-foreground font-semibold">{profile?.legalName || 'NextHere Services Private Limited'}</strong>
            <br />
            {settings?.tagline || 'Integrated IT advisory, commercial electrical installations, and motorised road freight logistics.'}
          </p>
          
          {/* Social Links */}
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Connect With Us</p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-lg border border-border bg-surface flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:shadow-sm transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Services Column */}
        <div>
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-4">Services</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link href="/services" className="hover:text-primary transition-colors">All Services Catalog</Link></li>
            {categories.map((cat: any) => (
              <li key={cat.id}>
                <Link href={`/services/${cat.slug}`} className="hover:text-primary transition-colors">
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-4">Company</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/projects" className="hover:text-primary transition-colors">Projects & Case Studies</Link></li>
            <li><Link href="/industries" className="hover:text-primary transition-colors">Industries We Serve</Link></li>
            <li><Link href="/insights" className="hover:text-primary transition-colors">Insights & Articles</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/request-quote" className="hover:text-primary transition-colors font-medium text-primary">Request a Quote →</Link></li>
          </ul>
        </div>

        {/* Legal & Office Column */}
        <div>
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-4">Registered Office</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            House No Pvt.129, Plot No 75-A, Kh.No. 15/7, 1st Floor, Burari, New Delhi - 110084, India
          </p>
          <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-2">Legal</h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="container mx-auto px-4 sm:px-8 mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>
          &copy; {new Date().getFullYear()} {profile?.legalName || 'NextHere Services Private Limited'}. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span>CIN / MCA Registered</span>
          <span>•</span>
          <span>Pan-India Operations</span>
          <span>•</span>
          <span>New Delhi, India</span>
        </div>
      </div>
    </footer>
  );
}
