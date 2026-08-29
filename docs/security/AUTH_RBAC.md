# Authentication & RBAC Model

## Authentication
Authentication is managed via **Supabase Auth** for the MVP.
*   The Next.js frontend will use `@supabase/ssr` to manage sessions securely via cookies.
*   The NestJS backend will validate the Supabase JWT on protected routes using a custom `JwtAuthGuard`.

## Role-Based Access Control (RBAC)

The `users` table contains a `role` ENUM. We enforce authorization at the NestJS layer using a `@Roles()` decorator.

### Defined Roles

1.  **Super Admin**
    *   Full access to all systems, settings, and destructive actions.
    *   Can manage other admins.
2.  **Administrator**
    *   Can manage CMS content (Services, Projects, Insights).
    *   Can view and process Leads.
    *   Can update the AI Knowledge Base.
3.  **Client**
    *   Can login to the Client Portal.
    *   Can view their organization's projects, quotations, and logistics tracking.
    *   Cannot access CMS or other clients' data.
4.  **Viewer / Public**
    *   Unauthenticated users.
    *   Read-only access to public CMS endpoints (`GET /services`, `GET /projects`).
    *   Can submit leads (`POST /leads`).

## Data Isolation (Row Level Security - RLS)
If Supabase PostgREST APIs are used directly from the frontend (e.g., for Realtime logistics), RLS policies must be strictly defined:
*   `leads`: `INSERT` allowed for public, `SELECT` restricted to Admin.
*   `projects`: `SELECT` allowed for public where `active = true`.
*   `logistics_shipments`: `SELECT` allowed only for authenticated `Client` whose `organization_id` matches the shipment's `client_id`.
