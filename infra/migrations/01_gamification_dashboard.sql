-- =============================================================================
-- Migration: 01_gamification_dashboard.sql
-- Description: Creates the progression and Alumni Command Center tables.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak   INTEGER     NOT NULL DEFAULT 0,
  longest_streak   INTEGER     NOT NULL DEFAULT 0,
  last_activity    TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.user_progress IS 'Tracks daily streaks for user engagement gamification.';

CREATE TABLE IF NOT EXISTS public.alumni_status (
  user_id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  clearance_level  TEXT        NOT NULL DEFAULT 'Initiate',
  unlocked_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.alumni_status IS 'Stores global achievements like Alumni status and Pro Clearance levels.';

CREATE TABLE IF NOT EXISTS public.achievements (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id         TEXT        NOT NULL,
  unlocked_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);
COMMENT ON TABLE public.achievements IS 'Discrete badges unlocked via MDX verification steps (like Agent Initiator).';


-- ---------------------------------------------------------------------------
-- RLS Policies
-- ---------------------------------------------------------------------------

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- 1. Read access
CREATE POLICY "user_progress_select_own" ON public.user_progress FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "alumni_status_select_own" ON public.alumni_status FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "achievements_select_own" ON public.achievements FOR SELECT USING (user_id = auth.uid());

-- 2. Write access
-- Note: In a production App, achievements and alumni_status should only be INSERT/UPDATE via service_role to avoid client cheating.
-- However, for user_progress, authenticated users can upsert their own rows.
CREATE POLICY "user_progress_update_own" ON public.user_progress FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "user_progress_insert_own" ON public.user_progress FOR INSERT WITH CHECK (user_id = auth.uid());

-- Triggers for auto-updating timestamps if standard `set_updated_at()` exists from schema.sql
DROP TRIGGER IF EXISTS trg_user_progress_updated_at ON public.user_progress;
CREATE TRIGGER trg_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
