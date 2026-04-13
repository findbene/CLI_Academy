import { NextResponse } from "next/server";
import { applySupabaseHeaders, createSupabaseServerClient } from "@/lib/supabase/server";

const CLEARANCE_MILESTONES: Array<[number, string]> = [
  [30, "Commander"],
  [14, "Agent"],
  [7, "Operative"],
  [0, "Initiate"],
];

function clearanceForStreak(streak: number): string {
  for (const [days, level] of CLEARANCE_MILESTONES) {
    if (streak >= days) return level;
  }
  return "Initiate";
}

/**
 * POST /api/gamification/streak
 *
 * Idempotent daily-streak increment. Safe to call on every lesson completion —
 * calling it multiple times on the same calendar day is a no-op for the counter.
 *
 * Also promotes clearance_level in alumni_status based on streak milestones.
 */
export async function POST() {
  const supabaseContext = await createSupabaseServerClient();

  if (!supabaseContext) {
    return NextResponse.json({ ok: false, message: "Not configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabaseContext.supabase.auth.getUser();

  if (!user) {
    return applySupabaseHeaders(
      NextResponse.json({ ok: false, message: "Unauthenticated." }, { status: 401 }),
      supabaseContext.responseHeaders,
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  const { data: progress } = await supabaseContext.supabase
    .from("user_progress")
    .select("current_streak, longest_streak, last_activity")
    .eq("user_id", user.id)
    .maybeSingle();

  let currentStreak = 0;
  let longestStreak = 0;

  if (progress) {
    const lastActivity = progress.last_activity ? String(progress.last_activity).slice(0, 10) : "";
    currentStreak = progress.current_streak ?? 0;
    longestStreak = progress.longest_streak ?? 0;

    if (lastActivity === today) {
      // Already counted today — idempotent return
    } else if (lastActivity) {
      const delta =
        (new Date(today).getTime() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24);
      currentStreak = Math.round(delta) === 1 ? currentStreak + 1 : 1;
    } else {
      currentStreak = 1;
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    await supabaseContext.supabase
      .from("user_progress")
      .update({ current_streak: currentStreak, longest_streak: longestStreak, last_activity: today })
      .eq("user_id", user.id);
  } else {
    currentStreak = 1;
    longestStreak = 1;
    await supabaseContext.supabase.from("user_progress").insert({
      user_id: user.id,
      current_streak: 1,
      longest_streak: 1,
      last_activity: today,
    });
  }

  const clearanceLevel = clearanceForStreak(currentStreak);

  // Upsert alumni_status — award Operative+ and promote clearance level (never demote)
  if (currentStreak >= 7) {
    const { data: alumni } = await supabaseContext.supabase
      .from("alumni_status")
      .select("clearance_level")
      .eq("user_id", user.id)
      .maybeSingle();

    if (alumni) {
      const milestoneOrder = CLEARANCE_MILESTONES.map(([, l]) => l);
      const storedRank = milestoneOrder.indexOf(alumni.clearance_level ?? "Initiate");
      const newRank = milestoneOrder.indexOf(clearanceLevel);
      // Lower index = higher rank in the milestones array
      if (storedRank < 0 || newRank < storedRank) {
        await supabaseContext.supabase
          .from("alumni_status")
          .update({ clearance_level: clearanceLevel })
          .eq("user_id", user.id);
      }
    } else {
      await supabaseContext.supabase.from("alumni_status").insert({
        user_id: user.id,
        clearance_level: clearanceLevel,
      });
    }
  }

  const response = NextResponse.json({
    ok: true,
    current_streak: currentStreak,
    clearance_level: clearanceLevel,
  });

  return applySupabaseHeaders(response, supabaseContext.responseHeaders);
}
