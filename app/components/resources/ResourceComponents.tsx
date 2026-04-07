"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Star,
  Clock,
  ChevronDown,
  Sparkles,
  Play,
} from "lucide-react";
import type { ResourceItem, ResourceCategory, DifficultyLevel, ResourceTier } from "@/lib/data/resources";

// ─── Resource Card ────────────────────────────────────────────
export function ResourceCard({ item }: { item: ResourceItem }) {
  const difficultyColor: Record<DifficultyLevel, string> = {
    beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
    intermediate: "bg-amber-50 text-amber-700 border-amber-200",
    advanced: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <Link
      href={`/resources/${item.category}/${item.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-6 transition-all duration-300 hover:border-[var(--color-accent-primary)] hover:shadow-[0_8px_30px_var(--color-accent-glow)]"
    >
      {item.featured && (
        <div className="absolute right-4 top-4">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent-subtle-strong)] to-[var(--color-accent-subtle-faint)] text-[var(--color-accent-primary)]">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-[var(--color-fg-default)] transition-colors group-hover:text-[var(--color-accent-primary)]">
            {item.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
            <span>{item.subcategory}</span>
            <span className="text-[var(--color-border-strong)]">·</span>
            <span>{item.author}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">
        {item.description}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-2 py-0.5 text-[0.6875rem] text-[var(--color-fg-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-4">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium ${difficultyColor[item.difficulty]}`}>
            {item.difficulty}
          </span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium ${item.tier === "free" ? "bg-emerald-50 text-emerald-700" : "bg-violet-50 text-violet-700"}`}>
            {item.tier === "free" ? "Free" : "Pro"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {item.videoUrl && (
            <button
              type="button"
              aria-label={`Watch ${item.title} demo video`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(item.videoUrl, "_blank", "noopener,noreferrer");
              }}
              className="flex size-8 items-center justify-center rounded-lg text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-panel-subtle)] hover:text-[var(--color-accent-primary)]"
            >
              <Play className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            aria-label={`Download ${item.title} files`}
            onClick={(e) => e.stopPropagation()}
            className="flex size-8 items-center justify-center rounded-lg text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-panel-subtle)] hover:text-[var(--color-accent-primary)]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Formats */}
      <div className="mt-3 flex items-center gap-1.5">
        {item.formats.map((fmt) => (
          <span
            key={fmt}
            className="inline-flex items-center rounded bg-[var(--color-bg-code)] px-1.5 py-0.5 font-mono text-[0.625rem] uppercase text-[var(--color-fg-inverse)]"
          >
            .{fmt}
          </span>
        ))}
      </div>

      {/* Last updated */}
      <div className="mt-2 flex items-center gap-1 text-[0.6875rem] text-[var(--color-fg-muted)]">
        <Clock className="h-3 w-3" />
        Updated {item.lastUpdated}
      </div>
    </Link>
  );
}

// ─── Resource Grid with Filters ───────────────────────────────
interface ResourceGridProps {
  items: ResourceItem[];
  category: ResourceCategory;
  title: string;
  description: string;
}

export function ResourceGrid({ items, title, description }: ResourceGridProps) {
  const [search, setSearch] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  const [selectedTier, setSelectedTier] = useState<ResourceTier | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const subcategories = useMemo(
    () => [...new Set(items.map((i) => i.subcategory))].sort(),
    [items],
  );

  const filtered = useMemo(() => {
    let result = items;
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(lower) ||
          i.description.toLowerCase().includes(lower) ||
          i.tags.some((t) => t.includes(lower)),
      );
    }
    if (selectedSubcategory) {
      result = result.filter((i) => i.subcategory === selectedSubcategory);
    }
    if (selectedDifficulty) {
      result = result.filter((i) => i.difficulty === selectedDifficulty);
    }
    if (selectedTier) {
      result = result.filter((i) => i.tier === selectedTier);
    }
    return result;
  }, [items, search, selectedSubcategory, selectedDifficulty, selectedTier]);

  const featured = filtered.filter((i) => i.featured);
  const rest = filtered.filter((i) => !i.featured);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="eyebrow mb-2">Resource Hub</div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-fg-default)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--color-fg-muted)]">{description}</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-fg-muted)]" />
          <input
            type="text"
            placeholder={`Search ${items.length} resources...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-fg-default)] outline-none transition-colors focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-ring)]"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-4 py-2.5 text-sm text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"
        >
          <Filter className="h-4 w-4" />
          Filters
          <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Filter Pills */}
      {showFilters && (
        <div className="mb-6 flex flex-wrap gap-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-4">
          {/* Subcategory */}
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-fg-muted)]">Category</div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                aria-pressed={!selectedSubcategory}
                onClick={() => setSelectedSubcategory(null)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${!selectedSubcategory ? "bg-[var(--color-accent-primary)] text-white" : "bg-[var(--color-bg-panel)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg-default)]"}`}
              >
                All
              </button>
              {subcategories.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  aria-pressed={selectedSubcategory === sub}
                  onClick={() => setSelectedSubcategory(selectedSubcategory === sub ? null : sub)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selectedSubcategory === sub ? "bg-[var(--color-accent-primary)] text-white" : "bg-[var(--color-bg-panel)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg-default)]"}`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-fg-muted)]">Difficulty</div>
            <div className="flex gap-1.5">
              {(["beginner", "intermediate", "advanced"] as DifficultyLevel[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={selectedDifficulty === d}
                  onClick={() => setSelectedDifficulty(selectedDifficulty === d ? null : d)}
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${selectedDifficulty === d ? "bg-[var(--color-accent-primary)] text-white" : "bg-[var(--color-bg-panel)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg-default)]"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Tier */}
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-fg-muted)]">Tier</div>
            <div className="flex gap-1.5">
              {(["free", "pro"] as ResourceTier[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={selectedTier === t}
                  onClick={() => setSelectedTier(selectedTier === t ? null : t)}
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${selectedTier === t ? "bg-[var(--color-accent-primary)] text-white" : "bg-[var(--color-bg-panel)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg-default)]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4 text-sm text-[var(--color-fg-muted)]">
        Showing {filtered.length} of {items.length} resources
      </div>

      {/* Featured Section */}
      {featured.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--color-fg-default)]">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            Featured
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <ResourceCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      {rest.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <ResourceCard key={item.slug} item={item} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="mb-4 h-12 w-12 text-[var(--color-fg-muted)] opacity-40" />
          <h3 className="text-lg font-medium text-[var(--color-fg-default)]">No resources found</h3>
          <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Category Navigation Tabs ─────────────────────────────────
interface CategoryTabsProps {
  activeCategory: ResourceCategory | "all";
}

const categoryMeta: { key: ResourceCategory | "all"; label: string; href: string }[] = [
  { key: "all", label: "All Resources", href: "/resources" },
  { key: "skills", label: "Skills", href: "/resources/skills" },
  { key: "mcps", label: "MCPs", href: "/resources/mcps" },
  { key: "agents", label: "Agents", href: "/resources/agents" },
  { key: "plugins", label: "Plugins & Tips", href: "/resources/plugins" },
  { key: "clis", label: "CLIs", href: "/resources/clis" },
];

export function CategoryTabs({ activeCategory }: CategoryTabsProps) {
  return (
    <div className="mb-8 flex gap-1 overflow-x-auto rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] p-1">
      {categoryMeta.map(({ key, label, href }) => (
        <Link
          key={key}
          href={href}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            activeCategory === key
              ? "bg-[var(--color-bg-panel)] text-[var(--color-fg-default)] shadow-sm"
              : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg-default)]"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

// ─── Video Badge Component ────────────────────────────────────
export function VideoBadge({ duration }: { duration?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2.5 py-0.5 text-[0.6875rem] font-medium text-white">
      <Play className="h-3 w-3" />
      {duration ?? "Video"}
    </span>
  );
}

// ─── Curriculum Progress Ring ─────────────────────────────────
export function ProgressRing({ progress, size = 48 }: { progress: number; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-border-subtle)"
        strokeWidth={3}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-accent-primary)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeOffset}
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}

// ─── Stat Card ────────────────────────────────────────────────
export function StatCard({ label, value, icon: Icon, trend }: { label: string; value: string; icon: React.ElementType; trend?: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-5 transition-all duration-200 hover:shadow-[var(--shadow-1)]">
      <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent-subtle-strong)] to-[var(--color-accent-subtle-faint)] text-[var(--color-accent-primary)]">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight text-[var(--color-fg-default)]">{value}</div>
        <div className="text-sm text-[var(--color-fg-muted)]">{label}</div>
      </div>
      {trend && (
        <div className="ml-auto text-xs font-medium text-emerald-600">{trend}</div>
      )}
    </div>
  );
}
