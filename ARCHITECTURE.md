# ARCHITECTURE.md

## Repo architecture

CLI Academy should behave like a disciplined product monorepo even if it starts as a single-product codebase.

### Main domains

- `apps/web` — frontend application
- `apps/api` — backend APIs and tutor endpoints
- `packages/*` — future shared modules
- `content/*` — curriculum source material
- `docs/*` — durable product and architecture docs
- `.claude/*` — agent control plane

## Extraction rule

Do not create a package until code is reused or clearly deserves independent ownership.
