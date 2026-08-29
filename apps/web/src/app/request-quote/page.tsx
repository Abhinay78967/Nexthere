import React from 'react';
import { Container } from '@nexthere/ui';
import { QuoteForm } from '@/components/forms/QuoteForm';

export const metadata = {
  title: 'Request a Quote | NextHere',
  description: 'Request a tailored quote for your IT, Electrical, or Logistics project.',
};

export default function RequestQuotePage() {
  return (
    <div className="bg-background min-h-screen py-16 md:py-24">
      <Container>
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Request a Quote</h1>
            <p className="text-xl text-muted-foreground">
              Provide details about your project and we&apos;ll prepare a custom solution.
            </p>
          </div>
          <QuoteForm />
        </div>
      </Container>
    </div>
  );
}
