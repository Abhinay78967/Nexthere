# NextHere Platform — Production Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCTION ARCHITECTURE                       │
│                                                                  │
│  nexthere.in  ──────────▶  Vercel (apps/web)     Port 443       │
│  admin.nexthere.in  ────▶  Vercel (apps/admin)   Port 443       │
│  api.nexthere.in    ────▶  Railway/Render (apps/api)            │
│                              │                                   │
│                              ▼                                   │
│                     Supabase PostgreSQL                          │
│                     (Production Database)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 1 — Set Up Supabase (Production Database + Auth)

1. Go to **https://supabase.com** → Sign up / Login
2. Click **"New Project"**
   - Organisation: NextHere Services
   - Project name: `nexthere-production`
   - Database password: Generate a strong one, **save it securely**
   - Region: **South Asia (Mumbai / Singapore)** — closest to Delhi
3. Wait ~2 minutes for the project to provision.
4. Go to **Project Settings → Database**
   - Copy the **"Connection String (URI)"** — this is your `DATABASE_URL`
   - It looks like: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`
5. Go to **Project Settings → API**
   - Copy `Project URL` → this is `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role` key → this is `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2 — Run Database Migrations on Production

After you have the production `DATABASE_URL`, run from your local machine:

```bash
# Set the production DATABASE_URL temporarily
$env:DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Push schema to production database
cd packages/database
npx prisma migrate deploy

# Seed the production database with real data
node prisma/seed-real.js
```

---

## Step 3 — Deploy NestJS API to Railway

Railway is the fastest option for Node.js backends (free tier available).

1. Go to **https://railway.app** → Login with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select this repository → Set **Root Directory** to `apps/api`
4. Railway auto-detects Node.js.

Set these **Environment Variables** in Railway:
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@[SUPABASE_HOST]:5432/postgres
PORT=3001
NEXT_PUBLIC_APP_URL=https://nexthere.in
NODE_ENV=production
```

5. After deploy, Railway gives you a public URL like `https://nexthere-api.up.railway.app`
6. **Note this URL** — it is your production `NEXT_PUBLIC_API_URL`

> **Alternative**: Render.com — same process, set root dir to `apps/api`

---

## Step 4 — Deploy Public Website to Vercel

1. Go to **https://vercel.com** → Login with GitHub
2. Click **"Add New Project"** → Import this GitHub repository
3. Set:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && pnpm turbo build --filter=web...`
   - **Install Command**: `cd ../.. && pnpm install --frozen-lockfile`

4. Set **Environment Variables**:
```
NEXT_PUBLIC_API_URL=https://nexthere-api.up.railway.app/api/v1
NEXT_PUBLIC_APP_URL=https://nexthere.in
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
```

5. Click **Deploy**. Vercel will build and deploy automatically.

---

## Step 5 — Deploy Admin Dashboard to Vercel

1. In Vercel, **"Add New Project"** again → Same repository
2. Set:
   - **Root Directory**: `apps/admin`
   - **Build Command**: `cd ../.. && pnpm turbo build --filter=admin...`

3. Set **Environment Variables**:
```
NEXT_PUBLIC_API_URL=https://nexthere-api.up.railway.app/api/v1
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

---

## Step 6 — Domain Mapping

### If you have a domain (e.g. nexthere.in from GoDaddy/Namecheap):

**For Public Website (nexthere.in):**
1. Vercel → web project → Settings → Domains → Add `nexthere.in` and `www.nexthere.in`
2. In your domain registrar, update DNS:
   - `A` record: `76.76.21.21` (Vercel IP)
   - `CNAME www`: `cname.vercel-dns.com`

**For Admin (admin.nexthere.in):**
1. Vercel → admin project → Settings → Domains → Add `admin.nexthere.in`
2. In DNS: `CNAME admin` → `cname.vercel-dns.com`

**For API (api.nexthere.in):**
1. Railway → Settings → Custom Domain → `api.nexthere.in`
2. In DNS: `CNAME api` → `[your-railway-app].up.railway.app`

---

## Step 7 — Create Super Admin User

After production database is seeded, create your admin login:

1. Go to your **Supabase Dashboard** → Authentication → Users
2. Click **"Invite User"** → Enter `nexthereservices@outlook.com`
3. You'll receive a magic link at that email.
4. In Supabase SQL Editor, run:
```sql
UPDATE "User" 
SET role = 'SUPER_ADMIN' 
WHERE email = 'nexthereservices@outlook.com';
```

Now you can log in to `https://admin.nexthere.in` with your Outlook credentials.

---

## Step 8 — Update API CORS for Production

After deploying, update `apps/api/src/main.ts` CORS origins:
```typescript
const allowedOrigins = [
  'https://nexthere.in',
  'https://www.nexthere.in',
  'https://admin.nexthere.in',
];
```

Then redeploy the API.

---

## Environment Variables Summary

| Variable | Where Used | Value Source |
|---|---|---|
| `DATABASE_URL` | API (Railway) | Supabase → Settings → Database → URI |
| `NEXT_PUBLIC_API_URL` | Web, Admin (Vercel) | Railway deployment URL + `/api/v1` |
| `NEXT_PUBLIC_APP_URL` | API (Railway) | Your domain `https://nexthere.in` |
| `NEXT_PUBLIC_SUPABASE_URL` | Web, Admin | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Web, Admin | Supabase → Settings → API → anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin only | Supabase → Settings → API → service_role key |

---

## Pre-Deployment Checklist

- [ ] Supabase project created (Mumbai/Singapore region)
- [ ] DATABASE_URL obtained from Supabase
- [ ] `npx prisma migrate deploy` run on production DB
- [ ] `node prisma/seed-real.js` run on production DB  
- [ ] NestJS API deployed to Railway with correct env vars
- [ ] Railway URL noted as `NEXT_PUBLIC_API_URL`
- [ ] Public website deployed to Vercel (`apps/web`)
- [ ] Admin dashboard deployed to Vercel (`apps/admin`)
- [ ] Custom domain mapped (if available)
- [ ] Super admin user created in Supabase Auth
- [ ] API CORS updated with production domains
- [ ] Test contact form submission end-to-end
- [ ] Test all pages load with real data

---

## What You Need to Provide

To complete deployment, share the following with your engineer:

1. **GitHub repository URL** (or push this code to GitHub first)
2. **Supabase credentials** (DATABASE_URL, Project URL, Keys)
3. **Domain name** (if purchased — e.g. nexthere.in)
4. **Railway/Render API URL** (after deploying the API)
