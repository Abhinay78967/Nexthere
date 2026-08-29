import React from 'react';
import { Container } from '@nexthere/ui';

export const metadata = {
  title: 'Terms of Service | NextHere Services',
  description: 'Terms of Service of NextHere Services Private Limited.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <Container className="py-16 md:py-24 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">Terms of Service</h1>
      <p className="text-muted-foreground mb-10 text-sm">
        Effective Date: 1 August 2025 · NextHere Services Private Limited
      </p>

      <div className="space-y-10 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing or using the website of NextHere Services Private Limited (&quot;NextHere&quot;), you agree to be
            bound by these Terms of Service and all applicable laws of the Republic of India. If you do not agree
            with any part of these terms, please discontinue use of this website immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">2. Nature of Services</h2>
          <p className="text-muted-foreground">
            NextHere Services Private Limited provides IT consultancy, electrical infrastructure installation and
            maintenance, and motorised road freight and logistics services as authorised under our Memorandum of
            Association registered with the Ministry of Corporate Affairs (MCA), Government of India. All services
            are subject to separate written service agreements and applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">3. Website Use</h2>
          <p className="text-muted-foreground">
            This website is provided for informational purposes only. The information contained herein does not
            constitute a binding offer, contract, or representation of any kind. Actual service terms, pricing,
            and scope are negotiated and documented separately in formal agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">4. Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content on this website — including text, images, logos, design elements, and software — is the
            exclusive intellectual property of NextHere Services Private Limited or its licensors. Reproduction,
            distribution, modification, or use in any form without prior written consent is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">5. Inquiries and Lead Submissions</h2>
          <p className="text-muted-foreground">
            When you submit an inquiry, quote request, or contact form on this website, you consent to NextHere
            Services Private Limited contacting you by the means provided for the purpose of addressing your request.
            Submission of an inquiry does not create any contractual obligation on either party.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">6. Disclaimer of Warranties</h2>
          <p className="text-muted-foreground">
            This website is provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranty of any kind,
            express or implied. NextHere does not warrant that the website will be error-free, uninterrupted,
            or free of viruses or other harmful components.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">7. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            To the maximum extent permitted by applicable law, NextHere Services Private Limited shall not be
            liable for any indirect, incidental, consequential, or punitive damages arising from the use of
            this website or reliance upon its content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">8. Governing Law and Jurisdiction</h2>
          <p className="text-muted-foreground">
            These Terms of Service are governed by and construed in accordance with the laws of the Republic of India.
            Any dispute arising from or in connection with these terms shall be subject to the exclusive jurisdiction
            of the courts in New Delhi, India.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">9. Changes to These Terms</h2>
          <p className="text-muted-foreground">
            NextHere Services Private Limited reserves the right to update these Terms of Service at any time.
            Continued use of the website after changes are posted constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">10. Contact</h2>
          <p className="text-muted-foreground">
            For any questions regarding these terms, contact us at{' '}
            <a href="mailto:nexthereservices@outlook.com" className="text-primary hover:underline">
              nexthereservices@outlook.com
            </a>{' '}
            or call{' '}
            <a href="tel:+919472957044" className="text-primary hover:underline">
              +91 94729 57044
            </a>.
          </p>
        </section>
      </div>
    </Container>
  );
}
