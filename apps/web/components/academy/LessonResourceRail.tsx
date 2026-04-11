"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AcademyAsset, AcademyLab, AcademyRuntime } from "@/lib/academy-content";
import {
  getMergedSavedAcademyResources,
  isAcademyResourceSaved,
  toggleSavedAcademyResourceWithSync,
  type SavedAcademyResourceType,
} from "@/lib/academy-saved-resources";

interface LessonResourceRailProps {
  assets: Array<AcademyAsset & { note?: string }>;
  labs: Array<AcademyLab & { note?: string }>;
  lessonSlug: string;
  pathSlug: string;
  runtimes: Array<AcademyRuntime & { note?: string }>;
}

function SaveButton({
  lessonSlug,
  onToggle,
  pathSlug,
  resourceSlug,
  resourceType,
}: {
  lessonSlug: string;
  onToggle: () => Promise<boolean>;
  pathSlug: string;
  resourceSlug: string;
  resourceType: SavedAcademyResourceType;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSavedState() {
      await getMergedSavedAcademyResources();
      if (!cancelled) {
        setSaved(isAcademyResourceSaved(pathSlug, lessonSlug, resourceType, resourceSlug));
      }
    }

    loadSavedState();

    return () => {
      cancelled = true;
    };
  }, [lessonSlug, pathSlug, resourceSlug, resourceType]);

  return (
    <button
      type="button"
      className="button-ghost"
      onClick={async () => {
        setSaved(await onToggle());
      }}
    >
      {saved ? "Saved" : "Save for later"}
    </button>
  );
}

function RailCard({
  badgeTone,
  badges,
  ctaHref,
  ctaLabel,
  note,
  pathSlug,
  lessonSlug,
  resourceSlug,
  resourceType,
  secondaryHref,
  secondaryLabel,
  title,
}: {
  badgeTone?: "accent" | "warning" | "danger";
  badges: string[];
  ctaHref: string;
  ctaLabel: string;
  lessonSlug: string;
  note?: string;
  pathSlug: string;
  resourceSlug: string;
  resourceType: SavedAcademyResourceType;
  secondaryHref?: string;
  secondaryLabel?: string;
  title: string;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-4">
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <span key={`${resourceSlug}-${badge}-${index}`} className="badge" data-tone={index === 0 ? badgeTone : undefined}>
            {badge}
          </span>
        ))}
      </div>
      <div className="mt-3 text-sm font-semibold">{title}</div>
      {note ? <p className="mt-2 text-sm leading-6 text-[var(--color-fg-muted)]">{note}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href={ctaHref} className="button-secondary">
          {ctaLabel}
        </Link>
        {secondaryHref && secondaryLabel ? (
          <Link href={secondaryHref} className="button-ghost">
            {secondaryLabel}
          </Link>
        ) : null}
        <SaveButton
          lessonSlug={lessonSlug}
          onToggle={() => toggleSavedAcademyResourceWithSync(pathSlug, lessonSlug, resourceType, resourceSlug)}
          pathSlug={pathSlug}
          resourceSlug={resourceSlug}
          resourceType={resourceType}
        />
      </div>
    </div>
  );
}

export function LessonResourceRail({
  assets,
  labs,
  lessonSlug,
  pathSlug,
  runtimes,
}: LessonResourceRailProps) {
  if (!assets.length && !labs.length && !runtimes.length) {
    return null;
  }

  return (
    <div className="panel p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Recommended next</div>
          <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
            Open or save the next most useful asset, lab, or runtime for this lesson.
          </p>
        </div>
        <Link href="/saved" className="button-ghost">
          View saved
        </Link>
      </div>
      <div className="mt-4 grid gap-3">
        {labs.slice(0, 1).map((lab) => (
          <RailCard
            key={`rail-lab-${lab.slug}`}
            badgeTone="accent"
            badges={[lab.labType, `~${lab.estimatedMinutes} min`]}
            ctaHref={`/live-labs/${lab.slug}`}
            ctaLabel="Launch lab"
            lessonSlug={lessonSlug}
            note={lab.note}
            pathSlug={pathSlug}
            resourceSlug={lab.slug}
            resourceType="lab"
            secondaryHref="/live-labs"
            secondaryLabel="All labs"
            title={lab.title}
          />
        ))}

        {assets.slice(0, 1).map((asset) => (
          <RailCard
            key={`rail-asset-${asset.slug}`}
            badgeTone={asset.supportTier === "free" ? "accent" : "warning"}
            badges={[asset.type, asset.supportTier]}
            ctaHref={`/asset-vault/${asset.slug}`}
            ctaLabel="Open asset"
            lessonSlug={lessonSlug}
            note={asset.note}
            pathSlug={pathSlug}
            resourceSlug={asset.slug}
            resourceType="asset"
            secondaryHref="/asset-vault"
            secondaryLabel="Asset Vault"
            title={asset.title}
          />
        ))}

        {runtimes.slice(0, 1).map((runtime) => {
          const compareTarget = runtime.slug === "openclaw" ? "hermes-agent" : "openclaw";

          return (
            <RailCard
              key={`rail-runtime-${runtime.slug}`}
              badgeTone={
                runtime.supportTier === "stable"
                  ? "accent"
                  : runtime.supportTier === "emerging"
                    ? "warning"
                    : "danger"
              }
              badges={[runtime.supportTier, `Setup: ${runtime.setupComplexity}`]}
              ctaHref={`/runtime-lab/${runtime.slug}`}
              ctaLabel="View runtime"
              lessonSlug={lessonSlug}
              note={runtime.note}
              pathSlug={pathSlug}
              resourceSlug={runtime.slug}
              resourceType="runtime"
              secondaryHref={`/runtime-lab/compare?runtimes=${runtime.slug},${compareTarget}`}
              secondaryLabel="Compare"
              title={runtime.title}
            />
          );
        })}
      </div>
    </div>
  );
}
