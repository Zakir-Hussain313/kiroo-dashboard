# Database Schema

## Current State
Phase 1 — infrastructure only. No custom tables yet.

Supabase project ID: spujbdhqfelwkievnzrj

## Auth
Using Supabase built-in auth.users table.
Email + password authentication.
Single user — public signup disabled in Supabase dashboard.

## Phase 2 Tables (planned)
### leads
- id uuid PK
- created_at timestamptz
- user_id uuid FK → auth.users
- company_name text
- website_url text
- contact_name text
- contact_email text
- contact_linkedin text
- industry text
- score integer (0-100)
- status text (new | contacted | replied | qualified | dead)
- notes text
- tags text[]
- last_contacted_at timestamptz

### lead_tags (optional join table if tags get complex)

## Phase 4 Tables (planned)
### outreach
- id uuid PK
- lead_id uuid FK → leads
- platform text (linkedin | instagram | email | call)
- status text (sent | replied | follow_up | closed)
- notes text
- contacted_at timestamptz
- follow_up_at timestamptz