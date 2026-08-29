# AI Gateway Architecture

The AI Gateway serves as the centralized interface between the NextHere platform and external Large Language Models (LLMs). For the MVP, OpenAI is the configured provider.

## Architecture Diagram

```text
[Next.js Frontend]
       │ (REST /ai/chat)
       ▼
[NestJS AI Controller]
       │
       ▼
[AI Gateway Service] ──(Retrieves Context)──> [Vector DB (pgvector)]
       │
       ▼
[Provider Adapter (OpenAI)]
       │
       ▼
[OpenAI API (gpt-4o-mini / gpt-4o)]
```

## Core Principles
1.  **Provider Agnosticism**: The business logic (`AI Gateway Service`) must not import OpenAI SDK directly. It uses an internal `IAIProvider` interface.
2.  **RAG Implementation**: 
    *   User queries are embedded using `text-embedding-3-small`.
    *   Similar documents are retrieved from the `knowledge_documents` table via `pgvector`.
    *   Retrieved context is injected into the system prompt.
3.  **Safety Guardrails**: System prompts strictly forbid the AI from inventing services, pricing, or guaranteeing timelines.
4.  **Lead Generation**: If the AI detects a strong intent for a quotation or consultation, it can trigger a structured output (Tool Call / Function Call) to create a draft `Lead` record in the database.
