-- Migration 02: Atomic tutor daily-limit increment via PostgreSQL RPC
--
-- Purpose: Replace the read-then-write race condition in daily_limit.py with an
-- atomic PostgreSQL function. Concurrent requests from the same user now either
-- all count correctly or are blocked when the limit is reached — no overage.
--
-- Usage (from Supabase service-role client):
--   SELECT increment_tutor_usage('user-uuid', 10);
--   -- Returns: current count after increment, or raises an exception when limit exceeded.

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
