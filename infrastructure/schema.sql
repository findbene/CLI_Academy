-- =============================================================================
-- CLI Academy — Supabase PostgreSQL Schema
-- =============================================================================
-- Platform: Supabase (PostgreSQL 15+)
-- Auth:      Supabase Auth (auth.users)
-- Payments:  Stripe (free / pro tiers)
-- Storage:   Supabase Storage (file_url references)
--
-- Sections:
--   1. Extensions
--   2. Helper Functions
--   3. Tables
--   4. Indexes
--   5. Row Level Security (RLS)
--   6. Triggers
--   7. Seed Data
-- =============================================================================


-- =============================================================================
-- 1. EXTENSIONS
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- =============================================================================
-- 2. HELPER FUNCTIONS
-- =============================================================================

-- Automatically bumps updated_at to now() on any UPDATE.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


-- =============================================================================
-- 3. TABLES
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 3.1  profiles
--      One row per auth user.  Created automatically via trigger (see §6).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id                      UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier                    TEXT        NOT NULL DEFAULT 'free'
                            CHECK (tier IN ('free', 'pro')),
  stripe_customer_id      TEXT        UNIQUE,
  stripe_subscription_id  TEXT        UNIQUE,
  subscription_status     TEXT,       -- e.g. 'active', 'past_due', 'canceled'
  onboarding_completed    BOOLEAN     NOT NULL DEFAULT FALSE,
  onboarding_answers      JSONB,      -- OnboardingAnswers shape
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.profiles                      IS 'Extended user profile; mirrors auth.users 1-to-1.';
COMMENT ON COLUMN public.profiles.tier                 IS 'Current entitlement tier: free or pro.';
COMMENT ON COLUMN public.profiles.onboarding_answers   IS 'Structured onboarding survey — host_os, target_env, primary_role, skill_level, primary_goal.';
COMMENT ON COLUMN public.profiles.subscription_status  IS 'Mirrors Stripe subscription status string.';


-- ---------------------------------------------------------------------------
-- 3.2  paths
--      Learning path catalog — content authored by admins.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.paths (
  id                      UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                    TEXT        NOT NULL UNIQUE,
  title                   TEXT        NOT NULL,
  description             TEXT        NOT NULL DEFAULT '',
  tier_required           TEXT        NOT NULL DEFAULT 'free'
                            CHECK (tier_required IN ('free', 'pro')),
  is_published            BOOLEAN     NOT NULL DEFAULT FALSE,
  version_label           TEXT        NOT NULL DEFAULT '',
  last_reviewed_at        DATE,
  supported_tool_versions JSONB       NOT NULL DEFAULT '{}',
  is_deprecated           BOOLEAN     NOT NULL DEFAULT FALSE,
  sort_order              INTEGER     NOT NULL DEFAULT 0,
  category                TEXT,
  difficulty              TEXT        NOT NULL DEFAULT 'beginner'
                            CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_hours         NUMERIC(5,1) NOT NULL DEFAULT 0,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.paths                IS 'Top-level learning paths shown in the catalog.';
COMMENT ON COLUMN public.paths.sort_order     IS 'Ascending display order in the catalog.';
COMMENT ON COLUMN public.paths.version_label  IS 'Human-readable version string, e.g. claude-code@1.x.';


-- ---------------------------------------------------------------------------
-- 3.3  modules
--      Ordered groups of lessons within a path.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.modules (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  path_id      UUID        NOT NULL REFERENCES public.paths(id) ON DELETE CASCADE,
  title        TEXT        NOT NULL,
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  is_published BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.modules IS 'Ordered sections inside a learning path.';


-- ---------------------------------------------------------------------------
-- 3.4  lessons
--      Atomic content units — belong to a module and (denormalized) a path.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lessons (
  id                      UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id               UUID        NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  path_id                 UUID        NOT NULL REFERENCES public.paths(id)   ON DELETE CASCADE,
  slug                    TEXT        NOT NULL,
  title                   TEXT        NOT NULL,
  description             TEXT        NOT NULL DEFAULT '',
  estimated_minutes       INTEGER     NOT NULL DEFAULT 10,
  tier_required           TEXT        NOT NULL DEFAULT 'free'
                            CHECK (tier_required IN ('free', 'pro')),
  is_published            BOOLEAN     NOT NULL DEFAULT FALSE,
  version_label           TEXT        NOT NULL DEFAULT '',
  last_reviewed_at        DATE,
  reviewed_by             TEXT,       -- author name / handle
  supported_tool_versions JSONB       NOT NULL DEFAULT '{}',
  is_deprecated           BOOLEAN     NOT NULL DEFAULT FALSE,
  supersedes_lesson_id    UUID        REFERENCES public.lessons(id) ON DELETE SET NULL,
  has_safety_warning      BOOLEAN     NOT NULL DEFAULT FALSE,
  sort_order              INTEGER     NOT NULL DEFAULT 0,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (path_id, slug)
);

COMMENT ON TABLE  public.lessons                       IS 'Individual lesson units inside a module.';
COMMENT ON COLUMN public.lessons.supersedes_lesson_id  IS 'If set, this lesson replaces the referenced deprecated lesson.';
COMMENT ON COLUMN public.lessons.has_safety_warning    IS 'When true, UI renders a visible safety callout before lesson content.';


-- ---------------------------------------------------------------------------
-- 3.5  enrollments
--      Records which user enrolled in which path, and how/when.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enrollments (
  id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  path_id             UUID        NOT NULL REFERENCES public.paths(id) ON DELETE CASCADE,
  enrolled_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  tier_at_enrollment  TEXT        NOT NULL DEFAULT 'free'
                        CHECK (tier_at_enrollment IN ('free', 'pro')),
  source              TEXT        NOT NULL DEFAULT 'free'
                        CHECK (source IN ('stripe', 'manual', 'free')),
  UNIQUE (user_id, path_id)
);

COMMENT ON TABLE  public.enrollments                  IS 'User-to-path enrollment records.';
COMMENT ON COLUMN public.enrollments.tier_at_enrollment IS 'Snapshot of user tier at the moment of enrollment.';
COMMENT ON COLUMN public.enrollments.source             IS 'How the enrollment was created: stripe checkout, manual admin grant, or free access.';


-- ---------------------------------------------------------------------------
-- 3.6  lesson_progress
--      One row per completed lesson per user.  Upsertable on (user_id, lesson_id).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id        UUID        NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completion_data  JSONB       NOT NULL DEFAULT '{}',
  -- completion_data shape:
  --   { quiz_score?: number, quiz_answers?: {[key:string]:string},
  --     lab_verified?: boolean, lab_output?: string }
  UNIQUE (user_id, lesson_id)
);

COMMENT ON TABLE  public.lesson_progress                IS 'Tracks per-lesson completion per user.';
COMMENT ON COLUMN public.lesson_progress.completion_data IS 'Optional evidence payload: quiz results or lab verification output.';


-- ---------------------------------------------------------------------------
-- 3.7  quiz_attempts
--      Full history of quiz submissions — every attempt, not just the last.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id    UUID        NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  answers      JSONB       NOT NULL DEFAULT '{}',
  score        INTEGER     NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  passed       BOOLEAN     NOT NULL DEFAULT FALSE,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.quiz_attempts IS 'Full history of quiz attempts; multiple rows per user per lesson are allowed.';


-- ---------------------------------------------------------------------------
-- 3.8  lab_verifications
--      Outcome of automated or manual lab verification steps.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lab_verifications (
  id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id           UUID        NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  verified            BOOLEAN     NOT NULL DEFAULT FALSE,
  verification_output TEXT,
  verified_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.lab_verifications IS 'Records the result of lab verification checks per user per lesson.';


-- ---------------------------------------------------------------------------
-- 3.9  assets  (named "assets" — the TypeScript interface calls it AcademyAsset)
--      Downloadable files: PDFs, runbooks, config templates, etc.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assets (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  path_id       UUID        REFERENCES public.paths(id) ON DELETE SET NULL,
  title         TEXT        NOT NULL,
  description   TEXT        NOT NULL DEFAULT '',
  file_url      TEXT        NOT NULL,
  asset_type    TEXT        NOT NULL
                  CHECK (asset_type IN ('pdf', 'runbook', 'config', 'checklist', 'diagram')),
  tier_required TEXT        NOT NULL DEFAULT 'free'
                  CHECK (tier_required IN ('free', 'pro')),
  version_label TEXT        NOT NULL DEFAULT '',
  file_size_kb  INTEGER     NOT NULL DEFAULT 0 CHECK (file_size_kb >= 0),
  is_published  BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.assets           IS 'Downloadable assets (PDFs, runbooks, configs, etc.) attached to paths or global.';
COMMENT ON COLUMN public.assets.file_url  IS 'Supabase Storage public URL or signed URL for the asset file.';
COMMENT ON COLUMN public.assets.path_id   IS 'NULL means the asset is global (not path-specific).';


-- ---------------------------------------------------------------------------
-- 3.10  tutor_usage
--       One row per (user_id, used_at date).  Upserted by the FastAPI backend
--       on every tutor message to enforce daily rate limits.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tutor_usage (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  used_at       DATE        NOT NULL DEFAULT CURRENT_DATE,
  message_count INTEGER     NOT NULL DEFAULT 0 CHECK (message_count >= 0),
  UNIQUE (user_id, used_at)
);

COMMENT ON TABLE  public.tutor_usage               IS 'Daily tutor message usage counter per user. One row per (user, day), upserted atomically.';
COMMENT ON COLUMN public.tutor_usage.message_count IS 'Running total of tutor messages sent on used_at. Limits: free=10, pro=100.';


-- ---------------------------------------------------------------------------
-- 3.11  app_events
--       Telemetry / analytics event log.  Append-only — no updates.
--       user_id is nullable to capture pre-auth events (page views, etc.).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.app_events (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type  TEXT        NOT NULL,
  event_data  JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.app_events            IS 'Append-only telemetry log. Never update rows; always insert.';
COMMENT ON COLUMN public.app_events.user_id    IS 'NULL for anonymous / pre-auth events.';
COMMENT ON COLUMN public.app_events.event_type IS 'Event name — see EventType union in types/index.ts.';


-- =============================================================================
-- 4. INDEXES
-- =============================================================================

-- profiles
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer     ON public.profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_subscription ON public.profiles(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_profiles_tier                ON public.profiles(tier);

-- paths
CREATE INDEX IF NOT EXISTS idx_paths_slug        ON public.paths(slug);
CREATE INDEX IF NOT EXISTS idx_paths_published   ON public.paths(is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_paths_tier        ON public.paths(tier_required);
CREATE INDEX IF NOT EXISTS idx_paths_category    ON public.paths(category);

-- modules
CREATE INDEX IF NOT EXISTS idx_modules_path_id ON public.modules(path_id, sort_order);

-- lessons
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON public.lessons(module_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_lessons_path_id   ON public.lessons(path_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_lessons_slug      ON public.lessons(slug);
CREATE INDEX IF NOT EXISTS idx_lessons_published ON public.lessons(is_published);

-- enrollments
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id  ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_path_id  ON public.enrollments(path_id);

-- lesson_progress
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id   ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON public.lesson_progress(lesson_id);

-- quiz_attempts
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_lesson ON public.quiz_attempts(user_id, lesson_id);

-- lab_verifications
CREATE INDEX IF NOT EXISTS idx_lab_verifications_user_lesson ON public.lab_verifications(user_id, lesson_id);

-- assets
CREATE INDEX IF NOT EXISTS idx_assets_path_id      ON public.assets(path_id);
CREATE INDEX IF NOT EXISTS idx_assets_tier         ON public.assets(tier_required);
CREATE INDEX IF NOT EXISTS idx_assets_published    ON public.assets(is_published);

-- tutor_usage
CREATE INDEX IF NOT EXISTS idx_tutor_usage_user_date ON public.tutor_usage(user_id, used_at);

-- app_events
CREATE INDEX IF NOT EXISTS idx_app_events_user_id    ON public.app_events(user_id);
CREATE INDEX IF NOT EXISTS idx_app_events_event_type ON public.app_events(event_type);
CREATE INDEX IF NOT EXISTS idx_app_events_created_at ON public.app_events(created_at DESC);


-- =============================================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on every user-facing table.
ALTER TABLE public.profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paths            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_usage      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_events       ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- 5.1  profiles
-- ---------------------------------------------------------------------------
-- Users read and update only their own profile.
-- Service role (used by backend and admin functions) bypasses RLS automatically.

CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- INSERT is handled exclusively by the trigger (create_profile_for_new_user).
-- No direct INSERT policy needed for end-users.

-- ---------------------------------------------------------------------------
-- 5.2  paths  —  public read for published; no user writes
-- ---------------------------------------------------------------------------
CREATE POLICY "paths_select_published"
  ON public.paths FOR SELECT
  USING (is_published = TRUE);

-- ---------------------------------------------------------------------------
-- 5.3  modules  —  public read for published
-- ---------------------------------------------------------------------------
CREATE POLICY "modules_select_published"
  ON public.modules FOR SELECT
  USING (is_published = TRUE);

-- ---------------------------------------------------------------------------
-- 5.4  lessons  —  public read for published
-- ---------------------------------------------------------------------------
CREATE POLICY "lessons_select_published"
  ON public.lessons FOR SELECT
  USING (is_published = TRUE);

-- ---------------------------------------------------------------------------
-- 5.5  enrollments  —  users see and manage only their own rows
-- ---------------------------------------------------------------------------
CREATE POLICY "enrollments_select_own"
  ON public.enrollments FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "enrollments_insert_own"
  ON public.enrollments FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Updates are performed by the backend service role (e.g., Stripe webhook),
-- not directly by end-users.

-- ---------------------------------------------------------------------------
-- 5.6  lesson_progress  —  users see and write only their own rows
-- ---------------------------------------------------------------------------
CREATE POLICY "lesson_progress_select_own"
  ON public.lesson_progress FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "lesson_progress_insert_own"
  ON public.lesson_progress FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "lesson_progress_update_own"
  ON public.lesson_progress FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 5.7  quiz_attempts  —  users see and insert only their own rows
-- ---------------------------------------------------------------------------
CREATE POLICY "quiz_attempts_select_own"
  ON public.quiz_attempts FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "quiz_attempts_insert_own"
  ON public.quiz_attempts FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 5.8  lab_verifications  —  users see and insert only their own rows
-- ---------------------------------------------------------------------------
CREATE POLICY "lab_verifications_select_own"
  ON public.lab_verifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "lab_verifications_insert_own"
  ON public.lab_verifications FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 5.9  assets  —  public read for published rows
-- ---------------------------------------------------------------------------
CREATE POLICY "assets_select_published"
  ON public.assets FOR SELECT
  USING (is_published = TRUE);

-- ---------------------------------------------------------------------------
-- 5.10  tutor_usage  —  users see and write only their own rows
-- ---------------------------------------------------------------------------
CREATE POLICY "tutor_usage_select_own"
  ON public.tutor_usage FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "tutor_usage_insert_own"
  ON public.tutor_usage FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "tutor_usage_update_own"
  ON public.tutor_usage FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 5.11  app_events  —  authenticated users may INSERT only; no SELECT
-- ---------------------------------------------------------------------------
CREATE POLICY "app_events_insert_authenticated"
  ON public.app_events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Anonymous clients can also insert pre-auth events (page_view, etc.)
CREATE POLICY "app_events_insert_anon"
  ON public.app_events FOR INSERT
  WITH CHECK (auth.role() = 'anon');


-- =============================================================================
-- 6. TRIGGERS
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 6.1  Auto-create profile when a new user signs up
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.create_profile_for_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, tier, created_at, updated_at)
  VALUES (NEW.id, 'free', NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Drop existing trigger before recreating (idempotent migrations).
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_profile_for_new_user();

-- ---------------------------------------------------------------------------
-- 6.2  updated_at maintenance triggers
-- ---------------------------------------------------------------------------

-- profiles
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- paths
DROP TRIGGER IF EXISTS trg_paths_updated_at ON public.paths;
CREATE TRIGGER trg_paths_updated_at
  BEFORE UPDATE ON public.paths
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- modules
DROP TRIGGER IF EXISTS trg_modules_updated_at ON public.modules;
CREATE TRIGGER trg_modules_updated_at
  BEFORE UPDATE ON public.modules
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- lessons
DROP TRIGGER IF EXISTS trg_lessons_updated_at ON public.lessons;
CREATE TRIGGER trg_lessons_updated_at
  BEFORE UPDATE ON public.lessons
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- assets
DROP TRIGGER IF EXISTS trg_assets_updated_at ON public.assets;
CREATE TRIGGER trg_assets_updated_at
  BEFORE UPDATE ON public.assets
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- =============================================================================
-- 7. SEED DATA
-- =============================================================================
-- Paths, modules, and lessons matching app/lib/data/paths.ts exactly.
-- UUIDs are stable constants so this block is safe to re-run (ON CONFLICT DO NOTHING).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 7.1  Paths
-- ---------------------------------------------------------------------------
INSERT INTO public.paths
  (id, slug, title, description, tier_required, is_published, version_label,
   last_reviewed_at, supported_tool_versions, is_deprecated, sort_order,
   category, difficulty, estimated_hours)
VALUES
  -- claude-code-beginners
  (
    'a1000000-0000-0000-0000-000000000001',
    'claude-code-beginners',
    'Claude Code for Beginners',
    'Start from zero and reach productive confidence with Claude Code. Covers installation, your first CLAUDE.md, basic agent workflows, and safe prompting habits — no prior CLI experience required.',
    'free', TRUE, 'claude-code@1.x', '2026-03-15',
    '{"claude-code": "1.x"}', FALSE, 1, 'Foundations', 'beginner', 4.0
  ),
  -- claude-code-windows
  (
    'a2000000-0000-0000-0000-000000000002',
    'claude-code-windows',
    'Claude Code on Windows',
    'A Windows-first guide to running Claude Code with WSL2 or PowerShell. Covers environment setup, path quirks, file permissions, and Windows-specific gotchas that trip up most tutorials.',
    'free', TRUE, 'claude-code@1.x', '2026-03-20',
    '{"claude-code": "1.x"}', FALSE, 2, 'Foundations', 'beginner', 3.0
  ),
  -- claude-code-macos
  (
    'a3000000-0000-0000-0000-000000000003',
    'claude-code-macos',
    'Claude Code on macOS',
    'Get Claude Code running cleanly on macOS with Homebrew, correct Node versions, and zsh configuration. Includes Apple Silicon and Intel-specific notes.',
    'free', TRUE, 'claude-code@1.x', '2026-03-20',
    '{"claude-code": "1.x"}', FALSE, 3, 'Foundations', 'beginner', 2.0
  ),
  -- mcp-mastery
  (
    'a4000000-0000-0000-0000-000000000004',
    'mcp-mastery',
    'MCP Server Mastery',
    'Master the Model Context Protocol from first principles. Learn to install community MCP servers, configure them safely in Claude Code, and build your first custom server from scratch.',
    'pro', TRUE, 'mcp@2025', '2026-02-28',
    '{"mcp": "2025"}', FALSE, 4, 'Agent Infrastructure', 'intermediate', 6.0
  ),
  -- vps-deployment
  (
    'a5000000-0000-0000-0000-000000000005',
    'vps-deployment',
    'Claude Code on a VPS',
    'Run Claude Code headlessly on a remote VPS for always-on agent workflows. Covers SSH setup, process management with PM2, reverse proxy configuration, and hardening your server.',
    'pro', TRUE, 'claude-code@1.x', '2026-03-01',
    '{"claude-code": "1.x"}', FALSE, 5, 'Self-Hosting', 'advanced', 8.0
  ),
  -- workflow-automation
  (
    'a6000000-0000-0000-0000-000000000006',
    'workflow-automation',
    'AI Workflow Automation',
    'Design and ship repeatable agent workflows without code. Learn to chain Claude Code tasks, schedule automation runs, handle errors gracefully, and build workflows that actually stay working.',
    'pro', TRUE, 'claude-code@1.x', '2026-03-10',
    '{"claude-code": "1.x"}', FALSE, 6, 'Workflows', 'intermediate', 5.0
  )
ON CONFLICT (slug) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 7.2  Modules  (one module per path — expandable to multi-module later)
-- ---------------------------------------------------------------------------
INSERT INTO public.modules (id, path_id, title, sort_order, is_published)
VALUES
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Getting Started with Claude Code', 1, TRUE),
  ('b2000000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000002', 'Windows Setup Guide',              1, TRUE),
  ('b3000000-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000003', 'macOS Setup Guide',               1, TRUE),
  ('b4000000-0000-0000-0000-000000000004', 'a4000000-0000-0000-0000-000000000004', 'MCP Fundamentals',                1, TRUE),
  ('b5000000-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005', 'VPS Deployment Guide',            1, TRUE),
  ('b6000000-0000-0000-0000-000000000006', 'a6000000-0000-0000-0000-000000000006', 'Workflow Automation Foundations', 1, TRUE)
ON CONFLICT (id) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 7.3  Lessons
-- ---------------------------------------------------------------------------

-- claude-code-beginners (module b1, path a1)
INSERT INTO public.lessons
  (id, module_id, path_id, slug, title, description,
   estimated_minutes, tier_required, is_published, version_label,
   last_reviewed_at, supported_tool_versions, is_deprecated, has_safety_warning, sort_order)
VALUES
  ('c1010000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'what-is-claude-code',           'What Is Claude Code',               'An overview of Claude Code: what it is, how it differs from the Claude chat interface, and why it matters for developers and non-developers alike.',
   15, 'free', TRUE, 'claude-code@1.x', '2026-03-15', '{"claude-code": "1.x"}', FALSE, FALSE, 1),

  ('c1020000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'installing-on-your-machine',    'Installing Claude Code on Your Machine', 'Step-by-step installation instructions for Claude Code on any OS. Covers prerequisites, Node.js, and your first successful launch.',
   20, 'free', TRUE, 'claude-code@1.x', '2026-03-15', '{"claude-code": "1.x", "node": ">=18"}', FALSE, FALSE, 2),

  ('c1030000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'your-first-claudemd',           'Your First CLAUDE.md',              'Why CLAUDE.md exists, what goes in it, and how to write one that meaningfully shapes agent behavior for your project.',
   20, 'free', TRUE, 'claude-code@1.x', '2026-03-15', '{"claude-code": "1.x"}', FALSE, FALSE, 3),

  ('c1040000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'basic-chat-and-file-edits',     'Basic Chat and File Edits',         'Learn the fundamental Claude Code interaction loop: asking questions, editing files, and reviewing diffs before accepting them.',
   25, 'free', TRUE, 'claude-code@1.x', '2026-03-15', '{"claude-code": "1.x"}', FALSE, FALSE, 4),

  ('c1050000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'understanding-context-windows', 'Understanding Context Windows',     'What a context window is, why it fills up, and practical strategies to keep Claude Code effective on long sessions.',
   15, 'free', TRUE, 'claude-code@1.x', '2026-03-15', '{"claude-code": "1.x"}', FALSE, FALSE, 5),

  ('c1060000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'safe-prompting-habits',         'Safe Prompting Habits',             'The habits that separate confident Claude Code users from those who create messes: staged approvals, scoped tasks, and knowing when to stop.',
   20, 'free', TRUE, 'claude-code@1.x', '2026-03-15', '{"claude-code": "1.x"}', FALSE, TRUE, 6),

  ('c1070000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'reading-agent-output',          'Reading Agent Output',              'How to interpret Claude Code''s output: thinking blocks, tool calls, file diffs, and error messages.',
   15, 'free', TRUE, 'claude-code@1.x', '2026-03-15', '{"claude-code": "1.x"}', FALSE, FALSE, 7),

  ('c1080000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'next-steps',                    'Next Steps',                        'Where to go after the basics: recommended paths, community resources, and how to keep your Claude Code skills sharp.',
   10, 'free', TRUE, 'claude-code@1.x', '2026-03-15', '{"claude-code": "1.x"}', FALSE, FALSE, 8)

ON CONFLICT (path_id, slug) DO NOTHING;


-- claude-code-windows (module b2, path a2)
INSERT INTO public.lessons
  (id, module_id, path_id, slug, title, description,
   estimated_minutes, tier_required, is_published, version_label,
   last_reviewed_at, supported_tool_versions, is_deprecated, has_safety_warning, sort_order)
VALUES
  ('c2010000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000002',
   'windows-environment-options',   'Windows Environment Options',       'A comparison of the three ways to run Claude Code on Windows: WSL2, PowerShell/Git Bash, and Docker. Understand the tradeoffs before you choose.',
   15, 'free', TRUE, 'claude-code@1.x', '2026-03-20', '{"claude-code": "1.x"}', FALSE, FALSE, 1),

  ('c2020000-0000-0000-0000-000000000002', 'b2000000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000002',
   'wsl2-setup',                    'WSL2 Setup',                        'Install and configure WSL2 with Ubuntu, install Node.js via nvm, and get Claude Code running in the Linux subsystem.',
   30, 'free', TRUE, 'claude-code@1.x', '2026-03-20', '{"claude-code": "1.x", "wsl": "2"}', FALSE, FALSE, 2),

  ('c2030000-0000-0000-0000-000000000003', 'b2000000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000002',
   'powershell-alternative',        'PowerShell Alternative',            'Run Claude Code directly in PowerShell or Git Bash without WSL2. Useful on locked-down corporate machines.',
   20, 'free', TRUE, 'claude-code@1.x', '2026-03-20', '{"claude-code": "1.x"}', FALSE, FALSE, 3),

  ('c2040000-0000-0000-0000-000000000004', 'b2000000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000002',
   'path-and-permissions',          'PATH and Permissions',              'Fix the most common Windows permission and PATH problems that block Claude Code from running correctly.',
   20, 'free', TRUE, 'claude-code@1.x', '2026-03-20', '{"claude-code": "1.x"}', FALSE, FALSE, 4),

  ('c2050000-0000-0000-0000-000000000005', 'b2000000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000002',
   'windows-file-system-quirks',    'Windows File System Quirks',        'Line endings, case sensitivity, symlinks, and drive letter paths — the Windows file system behaviors that trip up Claude Code users.',
   15, 'free', TRUE, 'claude-code@1.x', '2026-03-20', '{"claude-code": "1.x"}', FALSE, FALSE, 5),

  ('c2060000-0000-0000-0000-000000000006', 'b2000000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000002',
   'first-run-on-windows',          'Your First Run on Windows',         'Verify your Windows setup end-to-end: launch Claude Code, complete a real task, and confirm everything is working.',
   20, 'free', TRUE, 'claude-code@1.x', '2026-03-20', '{"claude-code": "1.x"}', FALSE, FALSE, 6)

ON CONFLICT (path_id, slug) DO NOTHING;


-- claude-code-macos (module b3, path a3)
INSERT INTO public.lessons
  (id, module_id, path_id, slug, title, description,
   estimated_minutes, tier_required, is_published, version_label,
   last_reviewed_at, supported_tool_versions, is_deprecated, has_safety_warning, sort_order)
VALUES
  ('c3010000-0000-0000-0000-000000000001', 'b3000000-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000003',
   'macos-prerequisites',           'macOS Prerequisites',               'What you need before installing Claude Code on macOS: Xcode Command Line Tools, Homebrew, and a supported Node version.',
   10, 'free', TRUE, 'claude-code@1.x', '2026-03-20', '{"claude-code": "1.x"}', FALSE, FALSE, 1),

  ('c3020000-0000-0000-0000-000000000002', 'b3000000-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000003',
   'homebrew-and-node',             'Homebrew and Node',                 'Install Homebrew, use it to install nvm, then install and pin the correct Node.js version for Claude Code.',
   20, 'free', TRUE, 'claude-code@1.x', '2026-03-20', '{"claude-code": "1.x", "node": ">=18"}', FALSE, FALSE, 2),

  ('c3030000-0000-0000-0000-000000000003', 'b3000000-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000003',
   'zsh-configuration',             'zsh Configuration',                 'Configure your .zshrc for a clean Claude Code experience: PATH, nvm hooks, and avoiding common shell initialization pitfalls.',
   15, 'free', TRUE, 'claude-code@1.x', '2026-03-20', '{"claude-code": "1.x"}', FALSE, FALSE, 3),

  ('c3040000-0000-0000-0000-000000000004', 'b3000000-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000003',
   'apple-silicon-notes',           'Apple Silicon Notes',               'M1/M2/M3-specific considerations: Rosetta 2, native ARM binaries, and performance differences you should know about.',
   10, 'free', TRUE, 'claude-code@1.x', '2026-03-20', '{"claude-code": "1.x"}', FALSE, FALSE, 4),

  ('c3050000-0000-0000-0000-000000000005', 'b3000000-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000003',
   'first-run-on-macos',            'Your First Run on macOS',           'End-to-end verification: launch Claude Code on macOS, complete a real task, and confirm everything is running natively.',
   15, 'free', TRUE, 'claude-code@1.x', '2026-03-20', '{"claude-code": "1.x"}', FALSE, FALSE, 5)

ON CONFLICT (path_id, slug) DO NOTHING;


-- mcp-mastery (module b4, path a4)
INSERT INTO public.lessons
  (id, module_id, path_id, slug, title, description,
   estimated_minutes, tier_required, is_published, version_label,
   last_reviewed_at, supported_tool_versions, is_deprecated, has_safety_warning, sort_order)
VALUES
  ('c4010000-0000-0000-0000-000000000001', 'b4000000-0000-0000-0000-000000000004', 'a4000000-0000-0000-0000-000000000004',
   'what-is-mcp',                   'What Is MCP',                       'A plain-English introduction to the Model Context Protocol: why it exists, what problem it solves, and how it fits into Claude Code.',
   15, 'pro', TRUE, 'mcp@2025', '2026-02-28', '{"mcp": "2025"}', FALSE, FALSE, 1),

  ('c4020000-0000-0000-0000-000000000002', 'b4000000-0000-0000-0000-000000000004', 'a4000000-0000-0000-0000-000000000004',
   'how-mcp-servers-work',          'How MCP Servers Work',              'Understand the MCP server lifecycle: initialization, tool registration, request routing, and response handling.',
   20, 'pro', TRUE, 'mcp@2025', '2026-02-28', '{"mcp": "2025"}', FALSE, FALSE, 2),

  ('c4030000-0000-0000-0000-000000000003', 'b4000000-0000-0000-0000-000000000004', 'a4000000-0000-0000-0000-000000000004',
   'installing-community-servers',  'Installing Community Servers',      'Find, evaluate, and install MCP servers from the community. Learn to read server documentation and assess trustworthiness.',
   25, 'pro', TRUE, 'mcp@2025', '2026-02-28', '{"mcp": "2025"}', FALSE, FALSE, 3),

  ('c4040000-0000-0000-0000-000000000004', 'b4000000-0000-0000-0000-000000000004', 'a4000000-0000-0000-0000-000000000004',
   'security-considerations',       'Security Considerations',           'MCP servers run code on your machine. Learn the threat model and how to audit servers before trusting them with your environment.',
   20, 'pro', TRUE, 'mcp@2025', '2026-02-28', '{"mcp": "2025"}', FALSE, TRUE, 4),

  ('c4050000-0000-0000-0000-000000000005', 'b4000000-0000-0000-0000-000000000004', 'a4000000-0000-0000-0000-000000000004',
   'configuring-in-claude-code',    'Configuring Servers in Claude Code','Add MCP servers to your Claude Code settings, understand config file locations, and manage multiple server profiles.',
   20, 'pro', TRUE, 'mcp@2025', '2026-02-28', '{"mcp": "2025", "claude-code": "1.x"}', FALSE, FALSE, 5),

  ('c4060000-0000-0000-0000-000000000006', 'b4000000-0000-0000-0000-000000000004', 'a4000000-0000-0000-0000-000000000004',
   'building-your-first-server',    'Building Your First MCP Server',    'Build a minimal MCP server from scratch in Node.js. Covers tool definitions, input schemas, and returning structured results.',
   40, 'pro', TRUE, 'mcp@2025', '2026-02-28', '{"mcp": "2025", "node": ">=18"}', FALSE, FALSE, 6),

  ('c4070000-0000-0000-0000-000000000007', 'b4000000-0000-0000-0000-000000000004', 'a4000000-0000-0000-0000-000000000004',
   'testing-and-debugging',         'Testing and Debugging MCP Servers', 'Techniques for testing your MCP server locally, inspecting protocol messages, and debugging tool call failures.',
   25, 'pro', TRUE, 'mcp@2025', '2026-02-28', '{"mcp": "2025"}', FALSE, FALSE, 7),

  ('c4080000-0000-0000-0000-000000000008', 'b4000000-0000-0000-0000-000000000004', 'a4000000-0000-0000-0000-000000000004',
   'production-patterns',           'Production MCP Patterns',           'Patterns for running MCP servers reliably in production: process management, health checks, and graceful restarts.',
   25, 'pro', TRUE, 'mcp@2025', '2026-02-28', '{"mcp": "2025"}', FALSE, FALSE, 8),

  ('c4090000-0000-0000-0000-000000000009', 'b4000000-0000-0000-0000-000000000004', 'a4000000-0000-0000-0000-000000000004',
   'advanced-tool-definitions',     'Advanced Tool Definitions',         'Design rich tool schemas with optional parameters, enums, arrays, and nested objects to give Claude precise control over your tools.',
   30, 'pro', TRUE, 'mcp@2025', '2026-02-28', '{"mcp": "2025"}', FALSE, FALSE, 9)

ON CONFLICT (path_id, slug) DO NOTHING;


-- vps-deployment (module b5, path a5)
INSERT INTO public.lessons
  (id, module_id, path_id, slug, title, description,
   estimated_minutes, tier_required, is_published, version_label,
   last_reviewed_at, supported_tool_versions, is_deprecated, has_safety_warning, sort_order)
VALUES
  ('c5010000-0000-0000-0000-000000000001', 'b5000000-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005',
   'vps-requirements',              'VPS Requirements',                  'Choose the right VPS provider and spec for headless Claude Code: CPU, RAM, storage minimums, and OS recommendations.',
   15, 'pro', TRUE, 'claude-code@1.x', '2026-03-01', '{"claude-code": "1.x"}', FALSE, FALSE, 1),

  ('c5020000-0000-0000-0000-000000000002', 'b5000000-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005',
   'ssh-key-setup',                 'SSH Key Setup',                     'Generate an SSH key pair, add the public key to your VPS, and configure your local SSH config for password-less logins.',
   20, 'pro', TRUE, 'claude-code@1.x', '2026-03-01', '{"claude-code": "1.x"}', FALSE, FALSE, 2),

  ('c5030000-0000-0000-0000-000000000003', 'b5000000-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005',
   'provisioning-your-server',      'Provisioning Your Server',          'Initial server provisioning: create a non-root user, set up sudo access, and configure basic system settings.',
   25, 'pro', TRUE, 'claude-code@1.x', '2026-03-01', '{"claude-code": "1.x"}', FALSE, FALSE, 3),

  ('c5040000-0000-0000-0000-000000000004', 'b5000000-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005',
   'installing-dependencies',       'Installing Dependencies',           'Install Node.js, npm, and Claude Code on your VPS. Handle version pinning and verify the installation.',
   20, 'pro', TRUE, 'claude-code@1.x', '2026-03-01', '{"claude-code": "1.x", "node": ">=18"}', FALSE, FALSE, 4),

  ('c5050000-0000-0000-0000-000000000005', 'b5000000-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005',
   'headless-claude-code',          'Running Claude Code Headlessly',    'Configure Claude Code to run without a terminal UI — essential for scripted and scheduled agent workflows on a VPS.',
   25, 'pro', TRUE, 'claude-code@1.x', '2026-03-01', '{"claude-code": "1.x"}', FALSE, TRUE, 5),

  ('c5060000-0000-0000-0000-000000000006', 'b5000000-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005',
   'process-management-pm2',        'Process Management with PM2',       'Use PM2 to keep Claude Code agent processes alive across reboots, manage logs, and monitor resource usage.',
   25, 'pro', TRUE, 'claude-code@1.x', '2026-03-01', '{"claude-code": "1.x", "pm2": "latest"}', FALSE, FALSE, 6),

  ('c5070000-0000-0000-0000-000000000007', 'b5000000-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005',
   'reverse-proxy-nginx',           'Reverse Proxy with Nginx',          'Set up Nginx as a reverse proxy in front of Claude Code''s API interface. Covers SSL termination and basic authentication.',
   30, 'pro', TRUE, 'claude-code@1.x', '2026-03-01', '{"claude-code": "1.x", "nginx": "latest"}', FALSE, TRUE, 7),

  ('c5080000-0000-0000-0000-000000000008', 'b5000000-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005',
   'firewall-and-hardening',        'Firewall and Server Hardening',     'Lock down your VPS with UFW, disable root SSH login, configure fail2ban, and apply OS-level security patches.',
   30, 'pro', TRUE, 'claude-code@1.x', '2026-03-01', '{"claude-code": "1.x"}', FALSE, TRUE, 8),

  ('c5090000-0000-0000-0000-000000000009', 'b5000000-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005',
   'monitoring-and-alerts',         'Monitoring and Alerts',             'Set up basic VPS monitoring with uptime checks, disk and memory alerts, and log aggregation for your Claude Code processes.',
   25, 'pro', TRUE, 'claude-code@1.x', '2026-03-01', '{"claude-code": "1.x"}', FALSE, FALSE, 9),

  ('c5100000-0000-0000-0000-000000000010', 'b5000000-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005',
   'backup-strategies',             'Backup Strategies',                 'Automated backup strategies for VPS-hosted Claude Code: config snapshots, cron-based backups, and off-site storage.',
   20, 'pro', TRUE, 'claude-code@1.x', '2026-03-01', '{"claude-code": "1.x"}', FALSE, FALSE, 10)

ON CONFLICT (path_id, slug) DO NOTHING;


-- workflow-automation (module b6, path a6)
INSERT INTO public.lessons
  (id, module_id, path_id, slug, title, description,
   estimated_minutes, tier_required, is_published, version_label,
   last_reviewed_at, supported_tool_versions, is_deprecated, has_safety_warning, sort_order)
VALUES
  ('c6010000-0000-0000-0000-000000000001', 'b6000000-0000-0000-0000-000000000006', 'a6000000-0000-0000-0000-000000000006',
   'workflow-thinking',             'Workflow Thinking',                 'Learn the mental model behind durable agent workflows: inputs, outputs, side effects, and failure modes before writing a single task.',
   15, 'pro', TRUE, 'claude-code@1.x', '2026-03-10', '{"claude-code": "1.x"}', FALSE, FALSE, 1),

  ('c6020000-0000-0000-0000-000000000002', 'b6000000-0000-0000-0000-000000000006', 'a6000000-0000-0000-0000-000000000006',
   'chaining-agent-tasks',          'Chaining Agent Tasks',              'Compose multi-step Claude Code workflows: pass outputs between tasks, handle intermediate state, and keep chains readable.',
   30, 'pro', TRUE, 'claude-code@1.x', '2026-03-10', '{"claude-code": "1.x"}', FALSE, FALSE, 2),

  ('c6030000-0000-0000-0000-000000000003', 'b6000000-0000-0000-0000-000000000006', 'a6000000-0000-0000-0000-000000000006',
   'scheduling-with-cron',          'Scheduling with Cron',              'Schedule recurring Claude Code workflows with cron on Linux/macOS or Task Scheduler on Windows.',
   20, 'pro', TRUE, 'claude-code@1.x', '2026-03-10', '{"claude-code": "1.x"}', FALSE, FALSE, 3),

  ('c6040000-0000-0000-0000-000000000004', 'b6000000-0000-0000-0000-000000000006', 'a6000000-0000-0000-0000-000000000006',
   'error-handling-patterns',       'Error Handling Patterns',           'Design workflows that degrade gracefully: retries, fallbacks, notifications on failure, and partial-completion recovery.',
   25, 'pro', TRUE, 'claude-code@1.x', '2026-03-10', '{"claude-code": "1.x"}', FALSE, FALSE, 4),

  ('c6050000-0000-0000-0000-000000000005', 'b6000000-0000-0000-0000-000000000006', 'a6000000-0000-0000-0000-000000000006',
   'state-and-memory',              'State and Memory in Workflows',     'Persist state between workflow runs using files, environment variables, and simple key-value stores. Know the tradeoffs of each approach.',
   25, 'pro', TRUE, 'claude-code@1.x', '2026-03-10', '{"claude-code": "1.x"}', FALSE, FALSE, 5),

  ('c6060000-0000-0000-0000-000000000006', 'b6000000-0000-0000-0000-000000000006', 'a6000000-0000-0000-0000-000000000006',
   'testing-workflows',             'Testing Workflows',                 'Test your agent workflows before relying on them: dry runs, sandboxed execution, diff reviews, and regression checks.',
   20, 'pro', TRUE, 'claude-code@1.x', '2026-03-10', '{"claude-code": "1.x"}', FALSE, FALSE, 6),

  ('c6070000-0000-0000-0000-000000000007', 'b6000000-0000-0000-0000-000000000006', 'a6000000-0000-0000-0000-000000000006',
   'real-world-examples',           'Real-World Workflow Examples',      'Walk through five complete, real workflow examples: daily digest, code review assistant, data pipeline, content pipeline, and report generator.',
   35, 'pro', TRUE, 'claude-code@1.x', '2026-03-10', '{"claude-code": "1.x"}', FALSE, FALSE, 7)

ON CONFLICT (path_id, slug) DO NOTHING;


-- =============================================================================
-- END OF SCHEMA
-- =============================================================================
