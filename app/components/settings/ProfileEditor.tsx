"use client";

import { useState } from "react";
import { Pencil, Save, Loader2 } from "lucide-react";

const GOAL_OPTIONS = [
  { value: "learn-basics", label: "Learn the basics" },
  { value: "automate-work", label: "Automate work" },
  { value: "build-projects", label: "Build projects" },
  { value: "explore-agents", label: "Explore agents" },
  { value: "career-growth", label: "Career growth" },
];

const OS_OPTIONS = [
  { value: "windows", label: "Windows" },
  { value: "macos", label: "macOS" },
  { value: "linux", label: "Linux" },
];

interface ProfileEditorProps {
  initialGoal: string;
  initialOS: string;
}

export function ProfileEditor({ initialGoal, initialOS }: ProfileEditorProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [goal, setGoal] = useState(initialGoal);
  const [os, setOs] = useState(initialOS);
  const [savedGoal, setSavedGoal] = useState(initialGoal);
  const [savedOS, setSavedOS] = useState(initialOS);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ primary_goal: goal, host_os: os }),
      });

      if (res.ok) {
        setSavedGoal(goal);
        setSavedOS(os);
        setEditing(false);
      }
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setGoal(savedGoal);
    setOs(savedOS);
    setEditing(false);
  }

  if (!editing) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4">
          <div className="text-sm font-medium">Primary goal</div>
          <div className="mt-2 text-sm text-[var(--color-fg-muted)]">
            {GOAL_OPTIONS.find((g) => g.value === savedGoal)?.label ?? (savedGoal.replaceAll("-", " ") || "Not set yet")}
          </div>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-4">
          <div className="text-sm font-medium">Operating system</div>
          <div className="mt-2 text-sm text-[var(--color-fg-muted)]">
            {OS_OPTIONS.find((o) => o.value === savedOS)?.label ?? (savedOS || "Not set yet")}
          </div>
        </div>
        <div className="md:col-span-2">
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-subtle)] px-4 py-2 text-sm text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-default)] hover:text-[var(--color-fg-default)]"
          >
            <Pencil className="size-3.5" />
            Edit preferences
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent-primary)]/30 bg-[var(--color-accent-primary)]/5 p-4">
        <label className="text-sm font-medium" htmlFor="profile-goal">
          Primary goal
        </label>
        <select
          id="profile-goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="mt-2 w-full rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-default)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent-primary)]"
        >
          <option value="">Select a goal…</option>
          {GOAL_OPTIONS.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent-primary)]/30 bg-[var(--color-accent-primary)]/5 p-4">
        <label className="text-sm font-medium" htmlFor="profile-os">
          Operating system
        </label>
        <select
          id="profile-os"
          value={os}
          onChange={(e) => setOs(e.target.value)}
          className="mt-2 w-full rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-default)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent-primary)]"
        >
          <option value="">Select OS…</option>
          {OS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3 md:col-span-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="button-primary inline-flex items-center gap-2"
        >
          {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
          Save changes
        </button>
        <button
          onClick={handleCancel}
          disabled={saving}
          className="rounded-xl border border-[var(--color-border-subtle)] px-4 py-2 text-sm text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg-default)]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
