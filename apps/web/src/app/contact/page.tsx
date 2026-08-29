import React from 'react';
import { Container } from '@nexthere/ui';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata = {
  title: 'Contact Us | NextHere',
  description: 'Get in touch with NextHere for IT, Electrical, and Logistics solutions.',
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen py-16 md:py-24">
      <Container>
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              We&apos;re here to help. Send us your inquiry and our team will get back to you promptly.
            </p>
          </div>
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
