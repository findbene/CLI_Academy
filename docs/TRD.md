# Technical Requirements Document

Project: CLI Academy
Version: 1.0
Status: recovery planning

## 1. Architecture Summary

CLI Academy is an independent monorepo intended to contain:

- a rebuilt Next.js frontend
- a FastAPI backend
- Supabase for auth, database, and storage
- Stripe for billing
- Python-based tutor and internal agent services
- an MDX-driven content system with structured metadata

Current snapshot reality:

- `app/` needs rebuilding
- `backend/` is a thin scaffold
- `infrastructure/schema.sql` is a useful baseline
- `content/` contains substantial lesson drafts

## 2. System Context

```text
User
  -> Next.js frontend
      -> Backend API
          -> Supabase
          -> Stripe
          -> Tutor service
          -> Internal job queue / agent orchestration later
```

## 3. Frontend

Target home: `app/`

Responsibilities:

- marketing pages
- auth UX
- onboarding
- dashboard
- setup-first path catalog
- path details
- lesson player
- floating tutor shell
- troubleshooting center
- compatibility matrix
- downloads
- checkout initiation

## 4. Backend

Current home: `backend/`

Responsibilities:

- authenticated API
- enrollment and progress logic
- entitlement logic
- tutor proxy/orchestration
- troubleshooting and compatibility endpoints
- downloads endpoints
- event ingestion
- release note and content freshness services later

## 5. Internal Agent System

Planned home: `agents/`

Responsibilities:

- tutoring
- setup coaching
- troubleshooting
- safety analysis
- content support jobs
- growth and retention jobs later

See `docs/AGENT_SWARM.md` for the deeper operating model.

## 6. Content System

Planned home: `content/`

Content should be Git-native, reviewable, and metadata-rich.

Each lesson should support:

- freshness metadata
- platform metadata
- risk level
- quiz metadata
- lab metadata
- downloadable asset linkage

## 7. Phase 1 Core Data Model

Schema v1 already defines entities for:

- users
- user_profiles
- paths
- modules
- lessons
- enrollments
- lesson_progress
- lab_verifications
- downloads/assets
- tutor_usage
- app_events

Schema v2 should add:

- tracks
- courses
- lesson_steps
- content_versions
- freshness_reviews
- tutor_contexts
- compatibility_matrix
- troubleshooting_guides
- issue_signatures
- release_notes
- known_issues
- certificates
- role_recommendations

Phase 4 adds:

- orgs
- org_members
- team_assignments

## 8. Security Requirements

- no secrets in browser
- server-side enforcement for billing and gated access
- rate-limited tutor usage
- visible warnings for risky instructions
- safe examples only in content
- auditability for content-changing internal agents later

## 9. Canonical Tutor Policy

- Free: 10/day
- Pro: 100/day

This must be enforced server-side.

## 10. Suggested Repo Structure

```text
.
|-- README.md
|-- CLAUDE.md
|-- TASKS.md
|-- DECISIONS.md
|-- .agents/
|-- docs/
|-- app/
|-- backend/
|-- agents/
|-- content/
|-- infrastructure/
`-- scripts/
```

## 11. Deployment Plan

### Frontend

- Vercel

### Backend

- Railway or Fly.io

### Database/Auth/Storage

- Supabase

### Billing

- Stripe

## 12. Observability

Phase 1:

- structured backend logs
- app event ingestion
- billing event logs
- tutor usage tracking

Phase 2:

- Sentry
- PostHog
- funnel reporting

## 13. Internal Agent Operating Rules

- use one shared LLM client abstraction
- define explicit tool allowlists
- separate learner-facing agents from internal maintenance agents
- avoid autonomous content publication without approval in early phases

## 14. Build Sequence

1. align docs to the setup-first recovery plan
2. rebuild frontend shell
3. extend backend beyond tutor/auth scaffold
4. design and implement schema v2
5. implement learning, troubleshooting, and downloads surfaces
6. harden tutor with rate limiting and retrieval
7. implement billing and gating
8. add trust, compatibility, and analytics layers
