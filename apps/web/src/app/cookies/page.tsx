import React from 'react';
import { Container } from '@nexthere/ui';

export const metadata = {
  title: 'Cookie Policy | NextHere Services',
  description: 'Cookie Policy of NextHere Services Private Limited.',
};

export default function CookiesPage() {
  return (
    <Container className="py-16 md:py-24 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">Cookie Policy</h1>
      <p className="text-muted-foreground mb-10 text-sm">
        Effective Date: 1 August 2025 · NextHere Services Private Limited
      </p>

      <div className="space-y-10 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">What Are Cookies?</h2>
          <p className="text-muted-foreground">
            Cookies are small text files that are placed on your device by a website server when you visit. They are
            widely used to make websites work efficiently, as well as to provide anonymous statistical information
            to the website owner.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">How NextHere Uses Cookies</h2>
          <p className="text-muted-foreground mb-4">
            NextHere Services Private Limited uses a minimal and strictly necessary set of cookies for the operation
            of this website. We do <strong>not</strong> use advertising cookies, tracking pixels, or share cookie data
            with any third-party advertising network.
          </p>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface-muted">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Cookie Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Purpose</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 text-foreground font-medium">Session Cookies</td>
                  <td className="px-4 py-3 text-muted-foreground">Maintain your session while navigating the website</td>
                  <td className="px-4 py-3 text-muted-foreground">Session (deleted on browser close)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-foreground font-medium">Security Cookies</td>
                  <td className="px-4 py-3 text-muted-foreground">Protect against CSRF attacks on our contact and inquiry forms</td>
                  <td className="px-4 py-3 text-muted-foreground">Session</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Third-Party Cookies</h2>
          <p className="text-muted-foreground">
            This website does not load any third-party advertising, social media tracking, or analytics cookies.
            Images on this website may be served from Unsplash&apos;s CDN; please refer to Unsplash&apos;s own cookie
            and privacy policy for details on any cookies they may set.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Managing and Disabling Cookies</h2>
          <p className="text-muted-foreground">
            You can control and delete cookies through your browser settings. Most browsers allow you to refuse
            all cookies or to accept only certain cookies. Please note that if you disable cookies, some features
            of this website (such as form submission) may not function correctly.
          </p>
          <p className="text-muted-foreground mt-3">
            For guidance on managing cookies in popular browsers:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
            <li>Google Chrome: Settings → Privacy and Security → Cookies</li>
            <li>Mozilla Firefox: Options → Privacy &amp; Security → Cookies</li>
            <li>Microsoft Edge: Settings → Privacy, Search, and Services → Cookies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Contact Us</h2>
          <p className="text-muted-foreground">
            For any questions about our use of cookies, contact us at{' '}
            <a href="mailto:nexthereservices@outlook.com" className="text-primary hover:underline">
              nexthereservices@outlook.com
            </a>.
          </p>
        </section>
      </div>
    </Container>
  );
}
