import React from 'react';
import { Container } from '@nexthere/ui';

export const metadata = {
  title: 'Privacy Policy | NextHere Services',
  description: 'Privacy Policy of NextHere Services Private Limited — how we collect, use, and protect your data.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <Container className="py-16 md:py-24 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">Privacy Policy</h1>
      <p className="text-muted-foreground mb-10 text-sm">
        Effective Date: 1 August 2025 · NextHere Services Private Limited
      </p>

      <div className="space-y-10 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">1. Introduction</h2>
          <p className="text-muted-foreground">
            NextHere Services Private Limited (&quot;NextHere&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting
            the personal information of every individual who interacts with our website or services. This Privacy Policy
            describes how we collect, use, disclose, and safeguard your information in accordance with the Information
            Technology Act, 2000 and applicable data protection principles under Indian law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">2. Information We Collect</h2>
          <p className="text-muted-foreground mb-3">We collect the following categories of information:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li><strong className="text-foreground">Contact Information:</strong> Name, email address, phone number, and company name provided through our inquiry or quote forms.</li>
            <li><strong className="text-foreground">Project Information:</strong> Details regarding IT, electrical, or logistics requirements you voluntarily submit.</li>
            <li><strong className="text-foreground">Usage Data:</strong> Browser type, IP address, and pages visited, collected automatically via standard server logs for security and analytical purposes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>To respond to inquiries and provide requested services.</li>
            <li>To prepare quotations and service proposals.</li>
            <li>To improve our website and service offerings.</li>
            <li>To comply with applicable legal and regulatory obligations under Indian law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">4. Data Sharing</h2>
          <p className="text-muted-foreground">
            We do not sell, rent, or trade your personal information to any third party. Data may be shared with
            trusted operational partners (such as hosting providers) solely to the extent necessary to deliver
            our services, under strict confidentiality obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">5. Data Retention</h2>
          <p className="text-muted-foreground">
            We retain your information for as long as reasonably necessary to fulfil the purposes described in this policy,
            or as required by applicable law. Inquiry data is retained for a minimum of 2 years for business continuity
            and legal compliance purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">6. Data Security</h2>
          <p className="text-muted-foreground">
            We implement industry-standard technical and organisational measures to protect your personal information
            against unauthorised access, disclosure, alteration, or destruction. Our database and API infrastructure
            is hosted on enterprise-grade cloud services with encryption in transit and at rest.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">7. Your Rights</h2>
          <p className="text-muted-foreground">
            You have the right to access, rectify, or request deletion of your personal information held by us.
            To exercise these rights, please contact us at{' '}
            <a href="mailto:nexthereservices@outlook.com" className="text-primary hover:underline">
              nexthereservices@outlook.com
            </a>.
            We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">8. Contact Us</h2>
          <address className="text-muted-foreground not-italic space-y-1">
            <p className="font-semibold text-foreground">NextHere Services Private Limited</p>
            <p>House No Pvt.129, Plot No 75-A, Kh.No. 15/7,<br />
              1st Floor, Salempur Mazra, Burari Extn,<br />
              Street No 5, Village Burari, New Delhi – 110084</p>
            <p>
              Email:{' '}
              <a href="mailto:nexthereservices@outlook.com" className="text-primary hover:underline">
                nexthereservices@outlook.com
              </a>
            </p>
            <p>
              Phone:{' '}
              <a href="tel:+919472957044" className="text-primary hover:underline">
                +91 94729 57044
              </a>
            </p>
          </address>
        </section>
      </div>
    </Container>
  );
}
