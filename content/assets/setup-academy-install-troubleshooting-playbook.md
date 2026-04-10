# Setup Academy Install And Troubleshooting Playbook

Use this when setup fails in the real world.

## Triage Order

1. Confirm the surface
   - Claude Code
   - Claude Cowork
   - OpenClaw or runtime
2. Confirm the platform
   - Windows
   - macOS
   - Linux or WSL
3. Confirm the failure type
   - command not found
   - auth failed
   - PATH mismatch
   - Docker/runtime failed to boot
   - permissions or sandbox issue

## Claude Code Repair Flow

### Command not found

- close and reopen the shell
- run the version check again
- confirm which shell you are in
- repair PATH before reinstalling

### Auth failed

- confirm account/session state
- clear stale env assumptions
- retry the clean auth path
- only after that move to reset or reinstall

### Config or doctor failure

- capture the exact error text
- run the doctor or health check
- separate config issues from network/auth issues

## Cowork Repair Flow

- confirm the source folder exists
- confirm you gave the right folder, not a parent folder full of noise
- reduce the task to one deliverable and rerun

## Runtime Repair Flow

- confirm Docker or runtime prerequisites first
- test read-only behavior before write actions
- disable extra channels and integrations until the base runtime is healthy

## Evidence Discipline

Keep:

- one screenshot
- one exact error message
- one note about what you already tried

This makes tutor help and human review dramatically faster.
