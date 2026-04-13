"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, FolderOpen, Lock } from "lucide-react";
import type { SearchEntry } from "@/app/api/search/route";

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;

  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

function buildSearchableText(entry: SearchEntry) {
  return [
    entry.title,
    entry.description,
    entry.pathTitle,
    entry.section,
    entry.difficulty,
    entry.format,
    entry.audience,
    ...(entry.metadata ?? []),
    ...(entry.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

function scoreMatch(query: string, entry: SearchEntry): number {
  const q = query.toLowerCase();
  const title = entry.title.toLowerCase();
  const desc = entry.description.toLowerCase();
  const searchText = buildSearchableText(entry).toLowerCase();

  if (title === q) return 100;
  if (title.startsWith(q)) return 90;
  if (title.includes(q)) return 70;
  if (searchText.includes(q)) return 55;
  if (desc.includes(q)) return 40;
  // Fuzzy matched but not a substring
  return 20;
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const openRef = useRef(false);
  // Sync ref in an effect so event-handler closures read the latest open state
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Fetch search index on first open
  useEffect(() => {
    if (!open || entries.length > 0) return;
    fetch("/api/search")
      .then((res) => res.json())
      .then((data: SearchEntry[]) => setEntries(data))
      .catch(() => {});
  }, [open, entries.length]);

  // Cmd+K / Ctrl+K shortcut + custom open event
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (openRef.current) {
          setOpen(false);
        } else {
          setQuery("");
          setSelectedIndex(0);
          setOpen(true);
        }
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function handleOpenSearch() {
      setQuery("");
      setSelectedIndex(0);
      setOpen(true);
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search", handleOpenSearch);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, []);

  // Focus input when dialog opens (state resets are handled in the open event handlers)
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = query.length < 1
    ? entries.slice(0, 12)
    : entries
        .filter((e) => fuzzyMatch(query, buildSearchableText(e)))
        .sort((a, b) => scoreMatch(query, b) - scoreMatch(query, a))
        .slice(0, 20);

  // Selection resets to 0 in the onChange handler when query changes

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      navigate(filtered[selectedIndex].href);
    }
  }

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* dialog */}
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Search CLI Academy"
      >
        {/* input bar */}
        <div className="flex items-center gap-3 border-b border-[var(--color-border-subtle)] px-4 py-3">
          <Search className="size-4 shrink-0 text-[var(--color-fg-muted)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Search paths and lessons…"
            className="flex-1 bg-transparent text-sm text-[var(--color-fg-default)] outline-none placeholder:text-[var(--color-fg-muted)]"
            aria-label="Search"
          />
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-[var(--color-fg-muted)] transition hover:bg-[var(--color-bg-panel-subtle)]"
            aria-label="Close search"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && query.length > 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[var(--color-fg-muted)]">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((entry, i) => (
              <button
                key={entry.href}
                onClick={() => navigate(entry.href)}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  i === selectedIndex
                    ? "bg-[var(--color-accent-primary)] text-white"
                    : "text-[var(--color-fg-default)] hover:bg-[var(--color-bg-panel-subtle)]"
                }`}
              >
                <span className="mt-0.5 shrink-0">
                  {entry.type === "path" ? (
                    <FolderOpen className="size-4" />
                  ) : (
                    <BookOpen className="size-4" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">{entry.title}</span>
                    {entry.tier === "pro" && (
                      <Lock className="size-3 shrink-0 opacity-60" />
                    )}
                  </span>
                  <span
                    className={`mt-1 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.12em] ${
                      i === selectedIndex ? "text-white/70" : "text-[var(--color-fg-muted)]"
                    }`}
                  >
                    {entry.section ? <span>{entry.section}</span> : null}
                    {entry.difficulty ? <span>{entry.difficulty}</span> : null}
                    {entry.lessonNumber ? <span>Lesson {entry.lessonNumber}</span> : null}
                    {entry.estimatedHours ? <span>{entry.estimatedHours}</span> : null}
                  </span>
                  <span
                    className={`mt-1 line-clamp-2 text-xs ${
                      i === selectedIndex ? "text-white/70" : "text-[var(--color-fg-muted)]"
                    }`}
                  >
                    {entry.type === "lesson" && entry.pathTitle
                      ? `${entry.pathTitle} · ${entry.description}`
                      : entry.description}
                  </span>
                  {entry.type === "path" && entry.audience ? (
                    <span
                      className={`mt-1 line-clamp-1 text-xs ${
                        i === selectedIndex ? "text-white/60" : "text-[var(--color-fg-muted)]"
                      }`}
                    >
                      Best for: {entry.audience}
                    </span>
                  ) : null}
                </span>
              </button>
            ))
          )}
        </div>

        {/* footer hint */}
        <div className="border-t border-[var(--color-border-subtle)] px-4 py-2 text-xs text-[var(--color-fg-muted)]">
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-1.5 py-0.5 font-mono text-[10px]">
              ↑↓
            </kbd>{" "}
            navigate
          </span>
          <span className="mx-2">·</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-1.5 py-0.5 font-mono text-[10px]">
              ↵
            </kbd>{" "}
            open
          </span>
          <span className="mx-2">·</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-1.5 py-0.5 font-mono text-[10px]">
              esc
            </kbd>{" "}
            close
          </span>
        </div>
      </div>
    </div>
  );
}

/** Small trigger button for the sidebar / header */
export function SearchTrigger() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
      className="flex w-full items-center gap-2 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel-subtle)] px-4 py-2.5 text-left text-sm text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-default)] hover:text-[var(--color-fg-default)]"
      aria-label="Search"
    >
      <Search className="size-4" />
      <span className="flex-1">Search…</span>
      <kbd className="hidden rounded border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-1.5 py-0.5 font-mono text-[10px] sm:inline-block">
        ⌘K
      </kbd>
    </button>
  );
}
