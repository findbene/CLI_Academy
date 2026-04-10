"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { AssetCard } from "@/components/assets/AssetCard";
import type { DownloadSurfaceAsset } from "@/lib/assets";

interface DownloadsFilterProps {
  downloads: DownloadSurfaceAsset[];
}

const tierFilters = [
  { label: "All", value: "all" },
  { label: "Free", value: "free" },
  { label: "Pro", value: "pro" },
] as const;

const categoryFilters = [
  { label: "All categories", value: "all" },
  { label: "Checklists", value: "Checklist" },
  { label: "Quick references", value: "Quick reference" },
  { label: "Templates", value: "Template" },
  { label: "Starter packs", value: "Starter pack" },
  { label: "Library assets", value: "Library asset" },
] as const;

export function DownloadsFilter({ downloads }: DownloadsFilterProps) {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return downloads.filter((d) => {
      if (tier !== "all" && d.tier !== tier) return false;
      if (category !== "all" && d.categoryLabel !== category) return false;
      if (q && !d.title.toLowerCase().includes(q) && !d.summary.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [downloads, query, tier, category]);

  const hasActiveFilters = query.trim() !== "" || tier !== "all" || category !== "all";

  return (
    <>
      {/* Search and filter bar */}
      <div className="panel p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-fg-muted)]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search downloads..."
              className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-lesson)] py-2.5 pl-10 pr-4 text-sm placeholder:text-[var(--color-fg-muted)]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="size-4 text-[var(--color-fg-muted)]" />
            {tierFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={tier === f.value}
                onClick={() => {
                  setTier(f.value);
                  setCategory("all"); // Prevent overlapping filter trap
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  tier === f.value
                    ? "bg-[var(--color-accent-primary)] text-white"
                    : "bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg-default)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter pills */}
        <div className="mt-3 flex flex-wrap gap-2">
          {categoryFilters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={category === f.value}
              onClick={() => {
                setCategory(f.value);
                setTier("all"); // Prevent overlapping filter trap
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                category === f.value
                  ? "bg-[var(--color-bg-panel-subtle)] text-[var(--color-fg-default)] ring-1 ring-[var(--color-border-subtle)]"
                  : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-panel-subtle)] hover:text-[var(--color-fg-default)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          {filtered.map((download) => (
            <AssetCard key={download.slug} asset={download} />
          ))}
        </section>
      ) : (
        <div className="mt-6 panel p-8 text-center">
          <p className="text-sm text-[var(--color-fg-muted)]">
            {hasActiveFilters
              ? "No downloads match your filters. Try broadening your search."
              : "No downloads available yet."}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => { setQuery(""); setTier("all"); setCategory("all"); }}
              className="mt-3 text-sm font-medium text-[var(--color-accent-primary)] hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </>
  );
}
