-- Companion resources seed
-- Defines 5 priority companion assets for the highest-traffic paths (01, 02, 03).
--
-- Status: PLANNED — physical asset files and actual URLs are not yet created.
-- This file establishes the intended schema and content so the companion system
-- can be implemented without losing the original intent.
--
-- To deploy once assets exist:
--   psql $DATABASE_URL < infra/seeds/companion_resources.sql
--
-- Prerequisites:
--   Run infra/schema.sql first to ensure companion_resources table exists.
--   Create physical asset files and update the urls below before running.

INSERT INTO companion_resources (id, title, type, url, path_slug, description, tier) VALUES
  (
    'cr-01-practice-repo',
    'CLI Academy Practice Repo',
    'github',
    'https://github.com/cli-academy/practice-repo',
    '01-start-here',
    'A minimal sandbox repo pre-configured for the Start Here path exercises.',
    'free'
  ),
  (
    'cr-02-terminal-cheatsheet',
    'Terminal Cheat Sheet',
    'pdf',
    '/assets/resources/terminal-cheat-sheet.pdf',
    '02-terminal-and-file-system-foundations-for-normal-people',
    'One-page reference for the most-used terminal commands covered in Path 02.',
    'free'
  ),
  (
    'cr-03-claude-code-reference',
    'Claude Code Quick Reference',
    'pdf',
    '/assets/resources/claude-code-reference.pdf',
    '03-claude-code',
    'Quick-reference card for Claude Code slash commands, flags, and session loop.',
    'free'
  ),
  (
    'cr-01-safety-checklist',
    'Safety Checklist Template',
    'template',
    '/assets/resources/safety-checklist.md',
    '01-start-here',
    'Markdown template for the personal safety checklist exercise in Path 01.',
    'free'
  ),
  (
    'cr-01-setup-script',
    'Workspace Setup Script',
    'script',
    '/assets/resources/setup.sh',
    '01-start-here',
    'Shell script that creates the standard CLI Academy workspace layout.',
    'free'
  )
ON CONFLICT (id) DO NOTHING;

-- TODO before deploying:
-- 1. Create the physical PDF, script, and template files in apps/web/public/assets/resources/
-- 2. Create the practice repo on GitHub and update the url above
-- 3. Verify companion_resources table schema matches these columns
-- 4. Run this seed against production Supabase
