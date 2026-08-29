# API Specification (MVP)

The NestJS backend will expose a versioned REST API.

## Base URL
`/api/v1`

## Authentication

### `POST /auth/login`
Authenticates a user and returns a JWT session (or delegates to Supabase Auth).
*   **Body**: `{ email, password }`
*   **Response**: `{ access_token, user: { id, role, email } }`

## Services (CMS Content)

### `GET /services`
Returns a list of all active services.
*   **Query Params**: `?category=IT|Electrical|Logistics`
*   **Response**: `[{ id, title, slug, category, description }]`

### `GET /services/:slug`
Returns detailed information for a specific service.

## Projects & Case Studies

### `GET /projects`
Returns a list of past projects.
*   **Query Params**: `?service_id=...&industry=...`
*   **Response**: `[{ id, title, slug, industry, completion_date, images }]`

### `GET /projects/:slug`
Returns details of a specific project.

## Leads & Inquiries (Phase 1C)

### `POST /inquiries`
Submits a new inquiry with associated lead creation (Public endpoint).
*   **Body**: `{ name, companyName, email, phone, subject, message, serviceId, location, timeline, budgetRange, honeypot }`
*   **Response**: `{ success: true, data: { submissionId } }`
*   **Notes**: Transactional creation. Employs rate-limiting, honeypot spam protection, and DTO validation.

### `POST /leads`
Submits a new raw lead (Public endpoint).
*   **Body**: `{ name, companyName, email, phone, requirements, honeypot }`
*   **Response**: `{ success: true, data: { submissionId } }`
*   **Notes**: Employs rate-limiting, honeypot spam protection, and DTO validation.

### `GET /leads`
Returns a list of leads (Protected: Admin, Sales).
*   **Notes**: Deferred until authentication/RBAC is implemented. Returns 404 for now to prevent data exposure.

## AI Gateway

### `POST /ai/chat`
Interacts with the AI Advisor.
*   **Body**: `{ session_id, message }`
*   **Response**: `{ conversation_id, message, action: 'Respond' | 'Escalate' | 'Create_Lead' }`
Added Services and Projects endpoints  
  
