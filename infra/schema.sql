-- Full database schema including all migrations. Keep this file in sync with any new migrations.
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


-- ---------------------------------------------------------------------------
-- 3.12  user_progress
--       Daily streak tracking for gamification. One row per user.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak   INTEGER     NOT NULL DEFAULT 0,
  longest_streak   INTEGER     NOT NULL DEFAULT 0,
  last_activity    TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.user_progress IS 'Tracks daily streaks for user engagement gamification.';


-- ---------------------------------------------------------------------------
-- 3.13  alumni_status
--       Clearance level progression: Initiate → Operative → Agent → Commander.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.alumni_status (
  user_id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  clearance_level  TEXT        NOT NULL DEFAULT 'Initiate',
  unlocked_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.alumni_status IS 'Stores global achievements like Alumni status and Pro Clearance levels.';


-- ---------------------------------------------------------------------------
-- 3.14  achievements
--       Discrete badges unlocked via MDX verification steps.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.achievements (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id         TEXT        NOT NULL,
  unlocked_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);
COMMENT ON TABLE public.achievements IS 'Discrete badges unlocked via MDX verification steps (like Agent Initiator).';


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

-- ---------------------------------------------------------------------------
-- 5.12  user_progress  —  users see and write only their own rows
-- ---------------------------------------------------------------------------
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_progress_select_own"  ON public.user_progress FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "user_progress_insert_own"  ON public.user_progress FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "user_progress_update_own"  ON public.user_progress FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 5.13  alumni_status  —  users read only; service_role writes (prevents client cheating)
-- ---------------------------------------------------------------------------
ALTER TABLE public.alumni_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "alumni_status_select_own"  ON public.alumni_status FOR SELECT USING (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 5.14  achievements  —  users read only; service_role writes (prevents client cheating)
-- ---------------------------------------------------------------------------
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "achievements_select_own"   ON public.achievements FOR SELECT USING (user_id = auth.uid());


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

-- user_progress
DROP TRIGGER IF EXISTS trg_user_progress_updated_at ON public.user_progress;
CREATE TRIGGER trg_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- =============================================================================
-- 6.3  increment_tutor_usage RPC (from migration 02_atomic_tutor_limit.sql)
--      Atomically increments daily tutor usage for a user or raises an
--      exception when the limit is reached. Replaces read-then-write pattern.
--      Usage: SELECT increment_tutor_usage('user-uuid', 10);
-- =============================================================================

CREATE OR REPLACE FUNCTION increment_tutor_usage(
  p_user_id  UUID,
  p_limit    INT
)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_today      DATE := CURRENT_DATE;
  v_new_count  INT;
BEGIN
  INSERT INTO tutor_usage (user_id, used_at, message_count)
  VALUES (p_user_id, v_today, 1)
  ON CONFLICT (user_id, used_at)
  DO UPDATE
    SET message_count = tutor_usage.message_count + 1
    WHERE tutor_usage.message_count < p_limit
  RETURNING message_count INTO v_new_count;

  IF v_new_count IS NULL THEN
    -- The WHERE clause blocked the update — limit already reached.
    RAISE EXCEPTION 'daily_limit_reached' USING ERRCODE = 'P0001';
  END IF;

  RETURN v_new_count;
END;
$$;

-- Grant execute permission to the service role used by the API.
GRANT EXECUTE ON FUNCTION increment_tutor_usage(UUID, INT) TO service_role;


-- =============================================================================
-- 7. SEED DATA
-- =============================================================================

-- Learning path data is synced programmatically via apps/web/lib/supabase/curriculum-sync.ts on demand. No static seeds needed.

-- =============================================================================
-- END OF SCHEMA
-- =============================================================================
