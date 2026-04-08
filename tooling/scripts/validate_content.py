#!/usr/bin/env python3
"""
validate_content.py
===================
Validates every MDX lesson file under content/paths/**/*.mdx.

Checks performed
----------------
  - Frontmatter parses (starts with ``---``)
  - Required fields present: title, description, slug, lesson_number,
    estimated_minutes, tier_required
  - Correct field types (lesson_number and estimated_minutes are integers)
  - ``slug`` matches the filename (without .mdx)
  - ``tier_required`` is one of {free, pro}
  - ``lesson_number`` is >= 1 and unique within the path
  - ``estimated_minutes`` is >= 1
  - ``last_reviewed_at`` is a valid YYYY-MM-DD date (warn if > 365 days old)
  - Lessons where ``has_safety_warning = true`` contain a <WarnBlock>
  - Body is non-empty
  - No placeholder "lorem ipsum" text in body

Usage
-----
    python tooling/scripts/validate_content.py

Exits 0 on success (warnings do not fail), 1 when errors are found.
"""

from __future__ import annotations

import re
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

CONTENT_DIR = Path(__file__).parent.parent.parent / "content" / "paths"

REQUIRED_FIELDS: dict[str, type] = {
    "title": str,
    "description": str,
    "slug": str,
    "lesson_number": int,
    "estimated_minutes": int,
    "tier_required": str,
}

VALID_TIERS = {"free", "pro"}
STALE_THRESHOLD_DAYS = 365

# Lessons where has_safety_warning=true MUST contain a WarnBlock component
WARN_BLOCK_PATTERN = re.compile(r"<WarnBlock")


# ---------------------------------------------------------------------------
# Frontmatter parsing (dependency-free, mirrors app/lib/mdx.ts)
# ---------------------------------------------------------------------------

def _parse_scalar(raw: str) -> object:
    trimmed = raw.strip()
    if (trimmed.startswith('"') and trimmed.endswith('"')) or (
        trimmed.startswith("'") and trimmed.endswith("'")
    ):
        return trimmed[1:-1]
    if trimmed == "true":
        return True
    if trimmed == "false":
        return False
    if re.fullmatch(r"\d+", trimmed):
        return int(trimmed)
    return trimmed


def _split_frontmatter(source: str) -> tuple[str, str]:
    if not source.startswith("---"):
        return "", source
    end_index = source.find("\n---", 3)
    if end_index == -1:
        return "", source
    return source[4:end_index].strip(), source[end_index + 4:].strip()


def _parse_frontmatter(text: str) -> dict[str, object]:
    parsed: dict[str, object] = {}
    for line in text.splitlines():
        if not line.strip() or line.startswith("  ") or line.startswith("- "):
            continue
        m = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", line)
        if not m:
            continue
        parsed[m.group(1)] = _parse_scalar(m.group(2))
    return parsed


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def validate_lesson(path: Path) -> list[tuple[str, str]]:
    """Return list of (level, message) tuples. level = 'error' | 'warning'."""
    issues: list[tuple[str, str]] = []
    name = path.name

    try:
        source = path.read_text(encoding="utf-8")
    except OSError as exc:
        return [("error", f"{name}: cannot read file -- {exc}")]

    fm_text, body = _split_frontmatter(source)

    if not fm_text:
        return [("error", f"{name}: no YAML frontmatter (file must start with ---)")]

    fm = _parse_frontmatter(fm_text)

    # Required fields + types
    for field, expected_type in REQUIRED_FIELDS.items():
        value = fm.get(field)
        if value is None:
            issues.append(("error", f"{name}: missing required field `{field}`"))
            continue
        if not isinstance(value, expected_type):
            issues.append((
                "error",
                f"{name}: `{field}` is {type(value).__name__!r}, expected {expected_type.__name__!r}",
            ))

    # Slug must match filename
    fm_slug = str(fm.get("slug", ""))
    if fm_slug and fm_slug != path.stem:
        issues.append(("error", f"{name}: slug {fm_slug!r} != filename {path.stem!r}"))

    # tier_required
    tier = str(fm.get("tier_required", ""))
    if tier and tier not in VALID_TIERS:
        issues.append(("error", f"{name}: invalid tier_required {tier!r} -- must be free|pro"))

    # lesson_number >= 1
    ln = fm.get("lesson_number")
    if isinstance(ln, int) and ln < 1:
        issues.append(("error", f"{name}: lesson_number must be >= 1, got {ln}"))

    # estimated_minutes >= 1
    em = fm.get("estimated_minutes")
    if isinstance(em, int) and em < 1:
        issues.append(("error", f"{name}: estimated_minutes must be >= 1, got {em}"))

    # last_reviewed_at
    reviewed_raw = str(fm.get("last_reviewed_at", ""))
    if reviewed_raw:
        try:
            reviewed_date = datetime.strptime(reviewed_raw, "%Y-%m-%d").date()
            age = date.today() - reviewed_date
            if age > timedelta(days=STALE_THRESHOLD_DAYS):
                issues.append(("warning", f"{name}: stale review -- last_reviewed_at={reviewed_raw} ({age.days} days ago)"))
        except ValueError:
            issues.append(("warning", f"{name}: invalid last_reviewed_at {reviewed_raw!r} (expected YYYY-MM-DD)"))

    # has_safety_warning + WarnBlock
    if fm.get("has_safety_warning") is True and not WARN_BLOCK_PATTERN.search(body):
        issues.append(("error", f"{name}: has_safety_warning=true but <WarnBlock> not found in body"))

    # Non-empty body
    if not body.strip():
        issues.append(("warning", f"{name}: lesson body is empty"))

    # lorem ipsum check
    if "lorem ipsum" in body.lower():
        issues.append(("error", f"{name}: contains placeholder 'lorem ipsum' text"))

    return issues


def validate_path(path_dir: Path) -> list[tuple[str, str]]:
    """Validate all lessons in one learning path directory."""
    issues: list[tuple[str, str]] = []
    mdx_files = sorted(path_dir.glob("*.mdx"))

    if not mdx_files:
        issues.append(("warning", f"{path_dir.name}: no .mdx lesson files found"))
        return issues

    lesson_numbers: dict[int, str] = {}

    for mdx_file in mdx_files:
        issues.extend(validate_lesson(mdx_file))

        # Collision detection
        source = mdx_file.read_text(encoding="utf-8", errors="ignore")
        fm_text, _ = _split_frontmatter(source)
        fm = _parse_frontmatter(fm_text)
        num = fm.get("lesson_number")
        if isinstance(num, int):
            if num in lesson_numbers:
                issues.append((
                    "error",
                    f"{mdx_file.name}: lesson_number {num} collides with {lesson_numbers[num]}",
                ))
            else:
                lesson_numbers[num] = mdx_file.name

    return issues


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    if not CONTENT_DIR.exists():
        print(f"WARN: Content directory not found: {CONTENT_DIR}")
        return 0

    path_dirs = sorted(d for d in CONTENT_DIR.iterdir() if d.is_dir())
    if not path_dirs:
        print(f"WARN: No path directories found under {CONTENT_DIR}")
        return 0

    all_errors: list[str] = []
    all_warnings: list[str] = []
    total_lessons = 0
    rows: list[tuple[str, int, int, int]] = []

    for path_dir in path_dirs:
        mdx_count = len(list(path_dir.glob("*.mdx")))
        total_lessons += mdx_count
        path_issues = validate_path(path_dir)
        errs = [m for lvl, m in path_issues if lvl == "error"]
        warns = [m for lvl, m in path_issues if lvl == "warning"]
        all_errors.extend(errs)
        all_warnings.extend(warns)
        rows.append((path_dir.name, mdx_count, len(errs), len(warns)))

    # Summary header
    print()
    print("CLI Academy -- Content Catalog Validation")
    print("=" * 60)
    print(f"  Paths   : {len(path_dirs)}")
    print(f"  Lessons : {total_lessons}")
    print(f"  Errors  : {len(all_errors)}")
    print(f"  Warnings: {len(all_warnings)}")
    print()

    # Per-path table
    print(f"  {'Path':<40} {'Lessons':>7} {'Errors':>7} {'Warnings':>9}")
    print("  " + "-" * 65)
    for slug, count, errs, warns in rows:
        print(f"  {slug:<40} {count:>7} {errs:>7} {warns:>9}")

    # Detailed issues
    if all_errors:
        print()
        print("ERRORS")
        print("-" * 60)
        for msg in all_errors:
            print(f"  [ERROR] {msg}")

    if all_warnings:
        print()
        print("WARNINGS")
        print("-" * 60)
        for msg in all_warnings:
            print(f"  [WARN]  {msg}")

    print()
    if all_errors:
        print(f"FAILED: {len(all_errors)} error(s) must be fixed.")
        return 1

    print(f"PASSED: all {total_lessons} lessons valid across {len(path_dirs)} paths.")
    if all_warnings:
        print(f"        {len(all_warnings)} non-blocking warning(s) shown above.")
    return 0


if __name__ == "__main__":
    sys.exit(main())