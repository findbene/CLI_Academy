"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button type="button" className="flex size-9 items-center justify-center rounded-xl text-transparent" disabled />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex size-9 items-center justify-center rounded-xl text-[var(--color-fg-muted)] transition hover:bg-[var(--color-bg-panel-subtle)] hover:text-[var(--color-fg-default)]"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}
