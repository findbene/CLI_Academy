"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AcademyAsset, AcademyLab, AcademyRuntime } from "@/lib/academy-content";
import {
  clearSavedAcademyResourcesWithSync,
  getMergedSavedAcademyResources,
  removeSavedAcademyResource,
  persistSavedAcademyResourcesToAccount,
  type SavedAcademyResourceType,
} from "@/lib/academy-saved-resources";

interface SavedResourcesClientProps {
  assets: AcademyAsset[];
  labs: AcademyLab[];
  pathTitles: Record<string, string>;
  runtimes: AcademyRuntime[];
}

interface SavedResourceViewModel {
  actionHref: string;
  actionLabel: string;
  lessonHref: string;
  lessonSlug: string;
  pathSlug: string;
  pathTitle: string;
  savedAt: string;
  slug: string;
  subtitle: string;
  title: string;
  type: SavedAcademyResourceType;
}

export function SavedResourcesClient({
  assets,
  labs,
  pathTitles,
  runtimes,
}: SavedResourcesClientProps) {
  const [savedVersion, setSavedVersion] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [savedEntries, setSavedEntries] = useState<Awaited<ReturnType<typeof getMergedSavedAcademyResources>>>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSavedEntries() {
      const merged = await getMergedSavedAcademyResources();
      if (!cancelled) {
        setSavedEntries(merged);
      }
    }

    if (mounted) {
      loadSavedEntries();
    }

    return () => {
      cancelled = true;
    };
  }, [mounted, savedVersion]);

  const savedItems = useMemo(() => {
    if (!mounted) {
      return [] as SavedResourceViewModel[];
    }

    return savedEntries
      .map((entry) => {
        const pathTitle = pathTitles[entry.pathSlug] ?? entry.pathSlug;

        if (entry.resourceType === "asset") {
          const asset = assets.find((candidate) => candidate.slug === entry.resourceSlug);
          if (!asset) {
            return null;
          }

          return {
            actionHref: `/asset-vault/${asset.slug}`,
            actionLabel: "Open asset",
            lessonHref: `/learn/${entry.pathSlug}/${entry.lessonSlug}`,
            lessonSlug: entry.lessonSlug,
            pathSlug: entry.pathSlug,
            pathTitle,
            savedAt: entry.savedAt,
            slug: asset.slug,
            subtitle: `${asset.type} · ${asset.supportTier}`,
            title: asset.title,
            type: "asset" as const,
          };
        }

        if (entry.resourceType === "lab") {
          const lab = labs.find((candidate) => candidate.slug === entry.resourceSlug);
          if (!lab) {
            return null;
          }

          return {
            actionHref: `/live-labs/${lab.slug}`,
            actionLabel: "Launch lab",
            lessonHref: `/learn/${entry.pathSlug}/${entry.lessonSlug}`,
            lessonSlug: entry.lessonSlug,
            pathSlug: entry.pathSlug,
            pathTitle,
            savedAt: entry.savedAt,
            slug: lab.slug,
            subtitle: `${lab.labType} · ~${lab.estimatedMinutes} min`,
            title: lab.title,
            type: "lab" as const,
          };
        }

        const runtime = runtimes.find((candidate) => candidate.slug === entry.resourceSlug);
        if (!runtime) {
          return null;
        }

        return {
          actionHref: `/runtime-lab/${runtime.slug}`,
          actionLabel: "View runtime",
          lessonHref: `/learn/${entry.pathSlug}/${entry.lessonSlug}`,
          lessonSlug: entry.lessonSlug,
          pathSlug: entry.pathSlug,
          pathTitle,
          savedAt: entry.savedAt,
          slug: runtime.slug,
          subtitle: `${runtime.supportTier} · setup ${runtime.setupComplexity}`,
          title: runtime.title,
          type: "runtime" as const,
        };
      })
      .filter((item): item is SavedResourceViewModel => Boolean(item))
      .sort((left, right) => right.savedAt.localeCompare(left.savedAt));
  }, [assets, labs, mounted, pathTitles, runtimes, savedEntries]);

  if (!mounted) {
    return (
      <section className="panel p-6">
        <div className="text-sm text-[var(--color-fg-muted)]">Loading saved resources…</div>
      </section>
    );
  }

  return (
    <section className="grid gap-6">
      <div className="panel p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="eyebrow">Saved Resources</div>
            <h1 className="mt-3 text-3xl font-semibold">Keep your best next labs, assets, and runtimes in one place</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-fg-muted)]">
              Saved items come from lesson-side recommendations, so this page becomes a lightweight learner workspace for things you want to come back to.
            </p>
          </div>
          {savedItems.length ? (
            <button
              type="button"
              className="button-secondary"
              onClick={() => {
                void clearSavedAcademyResourcesWithSync().then(() => {
                  setSavedVersion((value) => value + 1);
                });
              }}
            >
              Clear all
            </button>
          ) : null}
        </div>
      </div>

      {savedItems.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {savedItems.map((item) => (
            <article key={`${item.type}-${item.slug}-${item.pathSlug}-${item.lessonSlug}`} className="panel p-6">
              <div className="flex flex-wrap gap-2">
                <span className="badge" data-tone={item.type === "runtime" ? "warning" : "accent"}>
                  {item.type}
                </span>
                <span className="badge">{item.subtitle}</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                Saved from <span className="font-medium text-[var(--color-fg-default)]">{item.pathTitle}</span>
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">
                {new Date(item.savedAt).toLocaleDateString()}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={item.actionHref} className="button-primary">
                  {item.actionLabel}
                </Link>
                <Link href={item.lessonHref} className="button-secondary">
                  Back to lesson
                </Link>
                <button
                  type="button"
                  className="button-ghost"
                  onClick={() => {
                    removeSavedAcademyResource(item.pathSlug, item.lessonSlug, item.type, item.slug);
                    void persistSavedAcademyResourcesToAccount(
                      savedEntries.filter(
                        (entry) =>
                          !(
                            entry.pathSlug === item.pathSlug &&
                            entry.lessonSlug === item.lessonSlug &&
                            entry.resourceType === item.type &&
                            entry.resourceSlug === item.slug
                          ),
                      ),
                    ).then(() => {
                      setSavedVersion((value) => value + 1);
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="panel p-6">
          <div className="eyebrow">Nothing saved yet</div>
          <h2 className="mt-3 text-2xl font-semibold">Save resources from any lesson rail to build your workspace</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-fg-muted)]">
            When you click “Save for later” on a lesson’s recommended asset, lab, or runtime, it will appear here so you can pick it up again without hunting through the curriculum.
          </p>
          <div className="mt-5">
            <Link href="/dashboard" className="button-primary">
              Go to dashboard
            </Link>
          </div>
        </section>
      )}
    </section>
  );
}
