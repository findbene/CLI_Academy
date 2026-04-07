import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Download,
  Star,
  Clock,
  Tag,
  Play,
  BookOpen,
  Sparkles,
  Plug,
  Bot,
  Puzzle,
  Terminal,
  User,
} from "lucide-react";
import {
  ALL_RESOURCES,
  getResourceBySlug,
  getResourcesByCategory,
  RESOURCE_CATEGORIES,
  type ResourceCategory,
  type DifficultyLevel,
} from "@/lib/data/resources";
import { CategoryTabs } from "@/components/resources/ResourceComponents";

// ─── Static Params ────────────────────────────────────────────
const validCategories: ResourceCategory[] = ["skills", "mcps", "agents", "plugins", "clis"];

export function generateStaticParams() {
  return ALL_RESOURCES.map((r) => ({
    category: r.category,
    slug: r.slug,
  }));
}

// ─── Dynamic Metadata ─────────────────────────────────────────
type PageProps = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return { title: "Not Found — CLI Academy" };
  return {
    title: `${resource.title} | Resource Hub — CLI Academy`,
    description: resource.description,
  };
}

// ─── Icon Helper ──────────────────────────────────────────────
const categoryIconMap: Record<ResourceCategory, typeof Sparkles> = {
  skills: Sparkles,
  mcps: Plug,
  agents: Bot,
  plugins: Puzzle,
  clis: Terminal,
};

const difficultyColor: Record<DifficultyLevel, string> = {
  beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  advanced: "bg-rose-50 text-rose-700 border-rose-200",
};

// ─── Page ─────────────────────────────────────────────────────
export default async function ResourceDetailPage({ params }: PageProps) {
  const { category, slug } = await params;

  if (!validCategories.includes(category as ResourceCategory)) notFound();

  const resource = getResourceBySlug(slug);
  if (!resource || resource.category !== category) notFound();

  const Icon = categoryIconMap[resource.category];
  const categoryMeta = RESOURCE_CATEGORIES.find((c) => c.key === resource.category);

  // Related resources: same subcategory, excluding self
  const related = getResourcesByCategory(resource.category)
    .filter((r) => r.slug !== resource.slug && r.subcategory === resource.subcategory)
    .slice(0, 3);

  return (
    <div className="page-shell">
      <CategoryTabs activeCategory={resource.category} />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--color-fg-muted)]">
        <Link
          href="/resources"
          className="transition-colors hover:text-[var(--color-accent-primary)]"
        >
          Resources
        </Link>
        <span>/</span>
        <Link
          href={`/resources/${resource.category}`}
          className="transition-colors hover:text-[var(--color-accent-primary)]"
        >
          {categoryMeta?.label ?? resource.category}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-fg-default)]">{resource.title}</span>
      </nav>

      {/* Hero */}
      <div className="mb-10 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-8 sm:p-10">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent-subtle-strong)] to-[var(--color-accent-subtle-faint)] text-[var(--color-accent-primary)]">
            <Icon className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-[var(--color-fg-default)] sm:text-3xl">
                {resource.title}
              </h1>
              {resource.featured && (
                <Star className="h-5 w-5 shrink-0 fill-amber-400 text-amber-400" />
              )}
            </div>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg">
              {resource.description}
            </p>
          </div>
        </div>

        {/* Metadata row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${difficultyColor[resource.difficulty]}`}
          >
            {resource.difficulty}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              resource.tier === "free"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-violet-50 text-violet-700"
            }`}
          >
            {resource.tier === "free" ? "Free" : "Pro"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-fg-muted)]">
            <User className="h-3 w-3" />
            {resource.author}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-fg-muted)]">
            <Clock className="h-3 w-3" />
            Updated {resource.lastUpdated}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-fg-muted)]">
            <Tag className="h-3 w-3" />
            {resource.subcategory}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          {resource.formats.map((fmt) => (
            <button
              key={fmt}
              className="button-primary inline-flex items-center gap-2 text-sm"
            >
              <Download className="h-4 w-4" />
              Download .{fmt}
            </button>
          ))}
          {resource.videoUrl && (
            <a
              href={resource.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary inline-flex items-center gap-2 text-sm"
            >
              <Play className="h-4 w-4" />
              Watch Video
            </a>
          )}
        </div>
      </div>

      {/* Tags section */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-fg-default)]">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-3 py-1.5 text-sm text-[var(--color-fg-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Related Paths */}
      {resource.relatedPaths && resource.relatedPaths.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-fg-default)]">
            Related Learning Paths
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {resource.relatedPaths.map((pathSlug) => (
              <Link
                key={pathSlug}
                href={`/paths/${pathSlug}`}
                className="group flex items-center gap-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-4 transition-all hover:border-[var(--color-accent-primary)] hover:shadow-sm"
              >
                <BookOpen className="h-5 w-5 shrink-0 text-[var(--color-accent-primary)]" />
                <span className="text-sm font-medium text-[var(--color-fg-default)] transition-colors group-hover:text-[var(--color-accent-primary)]">
                  {pathSlug
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Resources */}
      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-fg-default)]">
            More {resource.subcategory} Resources
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => {
              const RelIcon = categoryIconMap[r.category];
              return (
                <Link
                  key={r.slug}
                  href={`/resources/${r.category}/${r.slug}`}
                  className="group flex flex-col rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-5 transition-all hover:border-[var(--color-accent-primary)] hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent-subtle-strong)] to-[var(--color-accent-subtle-faint)] text-[var(--color-accent-primary)]">
                      <RelIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[var(--color-fg-default)] transition-colors group-hover:text-[var(--color-accent-primary)]">
                        {r.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-[var(--color-fg-muted)]">
                        {r.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="border-t border-[var(--color-border-subtle)] pt-6">
        <Link
          href={`/resources/${resource.category}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-primary)] transition-colors hover:text-[var(--color-accent-primary-hover)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {categoryMeta?.label ?? "Resources"}
        </Link>
      </div>
    </div>
  );
}
