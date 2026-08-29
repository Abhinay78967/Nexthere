# Database Architecture

## ORM Decision: Prisma

We have selected **Prisma** as the primary Object-Relational Mapper (ORM) for the NextHere platform.

### Justification
1. **Developer Experience**: Prisma provides an industry-leading developer experience with a unified schema file (`schema.prisma`), which acts as the single source of truth for our database tables and relationships.
2. **NestJS Integration**: Prisma integrates seamlessly with NestJS via the `PrismaService`, providing a clean, strongly-typed repository pattern.
3. **TypeScript First**: It generates fully typed clients based on the schema, heavily reducing the risk of runtime errors.
4. **Migration System**: `prisma migrate` handles complex schema evolutions reliably, tracking history automatically.
5. **Supabase Compatibility**: Prisma connects directly to Supabase's PostgreSQL connection pooling via standard Postgres URLs.

## MVP Database Scope (Phase 1B)
As per the architecture guidelines, we will implement only the minimum required entities to drive the content platform:
- `organizations`
- `users`
- `services`
- `projects`
- `leads`

We will defer the implementation of advanced entities like `logistics_shipments` and `ai_knowledge` to future phases to maintain agility and focus on the corporate website content delivery.
## Migration Workflow  
Development: pnpm exec prisma migrate dev --name init  
Staging/Production: pnpm exec prisma migrate deploy 
## Local Database Setup  
Use the provided docker-compose.yml to spin up PostgreSQL locally.  
Run docker-compose up -d in the root directory. 
