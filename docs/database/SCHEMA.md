# Database Schema (MVP)

This outlines the core PostgreSQL schema for the initial implementation.

## Core Entities

### `users`
*   `id`: UUID (Primary Key)
*   `email`: VARCHAR (Unique)
*   `password_hash`: VARCHAR (If not handled purely by Supabase Auth)
*   `role`: ENUM ('Super Admin', 'Administrator', 'Client', 'Viewer')
*   `organization_id`: UUID (Foreign Key -> `organizations.id`, nullable)
*   `created_at`: TIMESTAMP
*   `updated_at`: TIMESTAMP

### `organizations` (Clients/Companies)
*   `id`: UUID
*   `name`: VARCHAR
*   `industry`: VARCHAR
*   `contact_email`: VARCHAR
*   `created_at`: TIMESTAMP

### `services`
*   `id`: UUID
*   `category`: ENUM ('IT', 'Electrical', 'Logistics')
*   `title`: VARCHAR
*   `slug`: VARCHAR (Unique)
*   `description`: TEXT
*   `capabilities`: JSONB
*   `active`: BOOLEAN
*   `created_at`: TIMESTAMP

### `projects`
*   `id`: UUID
*   `service_id`: UUID (Foreign Key -> `services.id`)
*   `title`: VARCHAR
*   `slug`: VARCHAR (Unique)
*   `industry`: VARCHAR
*   `challenge`: TEXT
*   `solution`: TEXT
*   `results`: JSONB
*   `completion_date`: DATE
*   `images`: JSONB (Array of URLs)

### `leads` (Inquiries/Quotes)
*   `id`: UUID
*   `contact_name`: VARCHAR
*   `contact_email`: VARCHAR
*   `company_name`: VARCHAR
*   `service_category`: ENUM ('IT', 'Electrical', 'Logistics', 'General')
*   `requirements`: TEXT
*   `status`: ENUM ('New', 'Qualified', 'In Progress', 'Closed')
*   `ai_generated`: BOOLEAN (True if qualified by AI Advisor)
*   `ai_conversation_id`: UUID (Foreign Key -> `ai_conversations.id`, nullable)
*   `created_at`: TIMESTAMP

### `knowledge_documents` (For AI RAG)
*   `id`: UUID
*   `title`: VARCHAR
*   `content`: TEXT
*   `embedding`: VECTOR (pgvector for OpenAI embeddings)
*   `metadata`: JSONB
*   `active`: BOOLEAN
*   `created_at`: TIMESTAMP

### `ai_conversations`
*   `id`: UUID
*   `session_id`: VARCHAR
*   `status`: ENUM ('Active', 'Escalated', 'Completed')
*   `created_at`: TIMESTAMP

### `ai_messages`
*   `id`: UUID
*   `conversation_id`: UUID (Foreign Key -> `ai_conversations.id`)
*   `role`: ENUM ('User', 'Assistant', 'System')
*   `content`: TEXT
*   `created_at`: TIMESTAMP
Schema updated for Phase 1B 
  
## Leads and Inquiries (Phase 1C)  
Added Lead model with Enums (LeadStatus, LeadSource, LeadPriority) and Inquiry model with relations to Lead and Service. 
