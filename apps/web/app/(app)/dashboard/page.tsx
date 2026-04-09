import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Compass,
  GraduationCap,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { getPublishedCatalogPaths, type CatalogPath } from "@/lib/catalog";
import { getLessonsForPath } from "@/lib/mdx";
import { getRecommendedPathSlugs } from "@/lib/learning";
import { getServerViewer } from "@/lib/viewer";
import { FreeTierShowcase } from "@/components/marketing/FreeTierShowcase";
import { AlumniHub } from "@/components/dashboard/AlumniHub";

function getRecommendedPaths(input: {
  catalogPaths: CatalogPath[];
  goal?: string;
  hostOs?: string;
  tier?: "free" | "pro";
}) {
  return getRecommendedPathSlugs(input)
    .map((slug) => input.catalogPaths.find((candidate) => candidate.slug === slug))
    .filter((path): path is CatalogPath => Boolean(path))
    .slice(0, 4);
}

export default async function DashboardPage() {
  const [viewer, catalogPaths] = await Promise.all([getServerViewer(), getPublishedCatalogPaths()]);

  if (!viewer.supabaseConfigured || !viewer.user || !viewer.profile || !viewer.supabaseContext) {
    const recommended = catalogPaths.filter((path) => path.status === "available");

    return (
      <main className="page-shell">
        <div className="grid gap-6">
          <section className="panel p-6">
            <div className="eyebrow">Dashboard</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Welcome to CLI Academy</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-fg-muted)]">
              Your personal learning dashboard. Browse paths, track progress, and continue where you left off.
            </p>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
          <article className="panel panel-lift group p-5">
            <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[rgba(22,176,168,0.12)]">
              <Compass className="size-5 text-[var(--color-accent-primary)]" />
            </div>
            <div className="text-sm font-medium text-[var(--color-fg-muted)]">Get started</div>
            <div className="mt-2 text-2xl font-semibold">Pick a path</div>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">Browse the catalog and enroll in a learning path that matches your goals.</p>
          </article>
          <article className="panel panel-lift group p-5">
            <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[rgba(22,176,168,0.12)]">
              <BookOpen className="size-5 text-[var(--color-accent-primary)]" />
            </div>
            <div className="text-sm font-medium text-[var(--color-fg-muted)]">Recommended</div>
            <div className="mt-2 text-2xl font-semibold">Start with foundations</div>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">Claude Code for Beginners is the fastest path to your first working session.</p>
          </article>
          <article className="panel panel-lift group p-5">
            <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[rgba(22,176,168,0.12)]">
              <MessageCircle className="size-5 text-[var(--color-accent-primary)]" />
            </div>
            <div className="text-sm font-medium text-[var(--color-fg-muted)]">AI Tutor</div>
            <div className="mt-2 text-2xl font-semibold">10 free / 100 pro</div>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">Ask the floating tutor anything about your current lesson, OS, or setup.</p>
          </article>
        </section>

          <section className="grid gap-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold">Recommended paths</h2>
              <Link href="/paths" className="button-secondary">
                Browse all
              </Link>
            </div>
            {recommended.map((path) => (
              <article key={path.slug} className="panel flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm text-[var(--color-fg-muted)]">{path.section}</div>
                  <h3 className="mt-1 text-xl font-semibold">{path.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{path.summary}</p>
                </div>
                <Link href={`/learn/${path.slug}`} className="button-primary">
                  Continue
                </Link>
              </article>
            ))}
          </section>
        </div>
      </main>
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const answers = viewer.profile.onboarding_answers ?? {};
  const recommended = getRecommendedPaths({
    catalogPaths,
    goal: typeof answers.primary_goal === "string" ? answers.primary_goal : undefined,
    hostOs: typeof answers.host_os === "string" ? answers.host_os : undefined,
    tier: viewer.profile.tier,
  });

  const [{ count: completedLessonsCount }, { data: enrollments }, { data: usage }, { data: streakProgress }, { data: alumni }, { data: achievements }, { data: lessonProgressRows }] = await Promise.all([
    viewer.supabaseContext.supabase
      .from("lesson_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", viewer.user.id),
    viewer.supabaseContext.supabase
      .from("enrollments")
      .select("path_id, enrolled_at")
      .eq("user_id", viewer.user.id)
      .order("enrolled_at", { ascending: false }),
    viewer.supabaseContext.supabase
      .from("tutor_usage")
      .select("message_count")
      .eq("user_id", viewer.user.id)
      .eq("used_at", today)
      .maybeSingle(),
    viewer.supabaseContext.supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", viewer.user.id)
      .maybeSingle(),
    viewer.supabaseContext.supabase
      .from("alumni_status")
      .select("*")
      .eq("user_id", viewer.user.id)
      .maybeSingle(),
    viewer.supabaseContext.supabase
      .from("achievements")
      .select("id")
      .eq("user_id", viewer.user.id),
    viewer.supabaseContext.supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", viewer.user.id),
  ]);

  const pathIds = [...new Set((enrollments ?? []).map((enrollment) => enrollment.path_id))];
  const { data: enrolledPathRows } = pathIds.length
    ? await viewer.supabaseContext.supabase
        .from("paths")
        .select("id, slug, title")
        .in("id", pathIds)
    : { data: [] as Array<{ id: string; slug: string; title: string }> };

  const completedLessonIds = [...new Set((lessonProgressRows ?? []).map((entry) => entry.lesson_id))];
  const { data: completedLessons } = completedLessonIds.length
    ? await viewer.supabaseContext.supabase
        .from("lessons")
        .select("id, slug, path_id")
        .in("id", completedLessonIds)
    : { data: [] as Array<{ id: string; slug: string; path_id: string }> };

  const enrolledPathMap = new Map((enrolledPathRows ?? []).map((path) => [path.id, path]));
  const completedLessonSlugsByPath = new Map<string, Set<string>>();

  for (const lesson of completedLessons ?? []) {
    const path = enrolledPathMap.get(lesson.path_id) ?? (enrolledPathRows ?? []).find((row) => row.id === lesson.path_id);
    if (!path) {
      continue;
    }

    const current = completedLessonSlugsByPath.get(path.slug) ?? new Set<string>();
    current.add(lesson.slug);
    completedLessonSlugsByPath.set(path.slug, current);
  }

  const enrolledCards = (enrollments ?? [])
    .map((enrollment) => {
      const path = enrolledPathMap.get(enrollment.path_id);
      if (!path) {
        return null;
      }

      return {
        enrolledAt: enrollment.enrolled_at,
        slug: path.slug,
        title: path.title,
      };
    })
    .filter(Boolean)
    .slice(0, 4) as Array<{ enrolledAt: string; slug: string; title: string }>;

  const continueLearningCandidates = [
    ...enrolledCards.map((path) => path.slug),
    ...recommended.map((path) => path.slug),
  ].filter((slug, index, array) => array.indexOf(slug) === index);

  let continueLearning:
    | {
        completedCount: number;
        href: string;
        lessonTitle: string;
        pathTitle: string;
        progressPercent: number;
        totalCount: number;
      }
    | null = null;

  for (const slug of continueLearningCandidates) {
    const catalogPath = catalogPaths.find((path) => path.slug === slug);
    if (!catalogPath) {
      continue;
    }

    const lessons = await getLessonsForPath(slug);
    if (!lessons.length) {
      continue;
    }

    const completedSlugs = completedLessonSlugsByPath.get(slug) ?? new Set<string>();
    const nextLesson = lessons.find((lesson) => !completedSlugs.has(lesson.slug));
    if (!nextLesson) {
      continue;
    }

    continueLearning = {
      completedCount: completedSlugs.size,
      href: `/learn/${slug}/${nextLesson.slug}`,
      lessonTitle: nextLesson.title,
      pathTitle: catalogPath.title,
      progressPercent: Math.round((completedSlugs.size / lessons.length) * 100),
      totalCount: lessons.length,
    };
    break;
  }

  const tutorUsedCount = usage?.message_count ?? 0;
  const tutorLimit = viewer.profile.tier === "pro" ? 100 : 10;
  const currentFocus =
    typeof answers.primary_goal === "string"
      ? answers.primary_goal.replaceAll("-", " ")
      : "setup and first success";
  const environment =
    typeof answers.target_env === "string" ? answers.target_env.replaceAll("-", " ") : "local laptop";

  const isFreeTier = viewer.profile.tier === "free";

  return (
    <main className="page-shell">
      <div className="grid gap-6">
        
        {isFreeTier ? (
          <FreeTierShowcase userName={viewer.user.email ?? "Learner"} />
        ) : (
          <AlumniHub 
            streak={streakProgress?.current_streak || 0} 
            clearanceLevel={alumni?.clearance_level || "Initiate"} 
            badgesCompleted={achievements?.length || 0} 
          />
        )}

        <section className="grid gap-5 md:grid-cols-3">
          <article className="panel panel-lift group p-5">
            <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[rgba(22,176,168,0.12)]">
              <Sparkles className="size-5 text-[var(--color-accent-primary)]" />
            </div>
            <div className="text-sm font-medium text-[var(--color-fg-muted)]">Current focus</div>
            <div className="mt-2 text-2xl font-semibold capitalize">{currentFocus}</div>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">Environment: {environment} · Tier: {viewer.profile.tier}</p>
          </article>
          <article className="panel panel-lift group p-5">
            <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[rgba(22,176,168,0.12)]">
              <CheckCircle2 className="size-5 text-[var(--color-accent-primary)]" />
            </div>
            <div className="text-sm font-medium text-[var(--color-fg-muted)]">Completed lessons</div>
            <div className="mt-2 text-4xl font-bold tracking-tight">{completedLessonsCount ?? 0}</div>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">Tracked across all enrolled paths.</p>
          </article>
          <article className="panel panel-lift group p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="relative size-12">
                <svg viewBox="0 0 36 36" className="size-12 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--color-border-subtle)" strokeWidth="2.5" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="var(--color-accent-primary)" strokeWidth="2.5"
                    strokeDasharray={`${Math.min(100, (tutorUsedCount / tutorLimit) * 100)} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <MessageCircle className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-[var(--color-accent-primary)]" />
              </div>
            </div>
            <div className="text-sm font-medium text-[var(--color-fg-muted)]">Tutor usage today</div>
            <div className="mt-2 text-2xl font-semibold">
              {tutorUsedCount} <span className="text-base font-normal text-[var(--color-fg-muted)]">/ {tutorLimit}</span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{tutorLimit - tutorUsedCount} messages remaining.</p>
          </article>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="panel p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold">Recommended next</h2>
              <Link href="/paths" className="button-secondary">
                Browse all
              </Link>
            </div>
            <div className="mt-4 grid gap-4">
              {recommended.map((path) => (
                <Link key={path.slug} href={`/learn/${path.slug}`} className="group rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4 transition hover:border-[var(--color-accent-primary)] hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-primary)]">{path.section}</div>
                      <h3 className="mt-1 text-lg font-semibold group-hover:text-[var(--color-accent-primary)] transition-colors">{path.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{path.summary}</p>
                    </div>
                    <GraduationCap className="mt-1 size-5 shrink-0 text-[var(--color-fg-muted)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-fg-muted)]">
                    <span>{path.availableLessonCount} lessons</span>
                    {path.lastReviewedAt ? <span>Reviewed {path.lastReviewedAt}</span> : null}
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <div className="grid gap-4">
            <article className="panel p-5">
              <h2 className="text-2xl font-semibold">Continue learning</h2>
              <div className="mt-4">
                {continueLearning ? (
                  <Link
                    href={continueLearning.href}
                    className="group block rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] px-4 py-4 transition hover:border-[var(--color-accent-primary)] hover:shadow-md"
                  >
                    <div className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-primary)]">
                      {continueLearning.pathTitle}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {continueLearning.lessonTitle}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                      {continueLearning.completedCount} of {continueLearning.totalCount} lessons completed
                    </p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
                      <div
                        className="h-full rounded-full bg-[var(--color-accent-primary)] transition-all duration-500"
                        style={{ width: `${continueLearning.progressPercent}%` }}
                      />
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-primary)]">
                      Resume lesson
                      <Compass className="size-4" />
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] px-4 py-4 text-sm text-[var(--color-fg-muted)]">
                    No in-progress lesson yet. Start with the first foundations lesson and the dashboard will keep your place here.
                  </div>
                )}
              </div>
            </article>

            <article className="panel p-5">
              <h2 className="text-2xl font-semibold">Recent enrollments</h2>
              <div className="mt-4 grid gap-3">
                {enrolledCards.length ? (
                  enrolledCards.map((path) => (
                    <Link
                      key={`${path.slug}-${path.enrolledAt}`}
                      href={`/learn/${path.slug}`}
                      className="group rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] px-4 py-4 transition hover:border-[var(--color-accent-primary)] hover:shadow-md"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-base font-medium group-hover:text-[var(--color-accent-primary)] transition-colors">{path.title}</div>
                          <div className="mt-1 text-sm text-[var(--color-fg-muted)]">
                            Enrolled {new Date(path.enrolledAt).toLocaleDateString()}
                          </div>
                        </div>
                        <BookOpen className="size-4 shrink-0 text-[var(--color-fg-muted)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] px-4 py-4 text-sm text-[var(--color-fg-muted)]">
                    No enrollments yet. Start with Start Here or Claude Code to create your first tracked learning path.
                  </div>
                )}
              </div>
            </article>
          </div>
        </section>


      </div>
    </main>
  );
}
