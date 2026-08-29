# NextHere Platform

Enterprise multi-tenant IT Advisory, Electrical Infrastructure & Freight Logistics monorepo.

## Applications
- `apps/web`: Public corporate website (Next.js App Router, SSR/ISR)
- `apps/admin`: Corporate operations & lead management portal (Next.js, Supabase Auth)
- `apps/api`: Production REST backend (NestJS, Prisma, PostgreSQL)
- `packages/database`: Prisma ORM schema, migrations, and seed scripts
- `packages/ui`: Shared Tailwind & React design system components

## Production Status
- Database: Supabase PostgreSQL (Migrated & Seeded)
- Build: Turborepo + pnpm
- Deployment: Vercel & Railway
