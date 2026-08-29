import React from 'react';
import Link from 'next/link';
import { Container } from '@nexthere/ui';

export default function NotFound() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <Container className="text-center py-20">
        <p className="text-9xl font-black text-primary/15 mb-4 leading-none">404</p>
        <h1 className="text-3xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center px-8 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center px-8 rounded-md border border-border font-semibold hover:bg-surface-muted transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </Container>
    </div>
  );
}
