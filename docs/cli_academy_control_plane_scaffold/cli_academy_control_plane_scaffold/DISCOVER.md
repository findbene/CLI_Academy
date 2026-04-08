# DISCOVER.md

## Findings from the current tree

- the root is too flat
- multiple hidden folders represent overlapping agent memory/control concerns
- active product code and archived/support material are mixed at root
- `app/` already contains a substantial frontend surface and its own local docs
- `backend/` is a compact API service that cleanly fits `apps/api/`
- `content/paths/` is already the product curriculum backbone

## Open questions

- which hidden agent files are still active and which are historical
- whether `agents/` contains runtime code or only notes
- whether some `app/lib` modules should become `packages/`
