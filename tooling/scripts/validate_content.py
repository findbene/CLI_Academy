#!/usr/bin/env python3
"""
validate_content.py
===================
Validates learner-visible MDX lesson files under content/paths/**/lesson-*.mdx.

Checks performed
----------------
    - Frontmatter parses (starts with ``---``)
    - Required fields present: title, lessonNumber, chapterNumber, pathNumber
    - Lesson numbering matches the lesson filename
    - Optional slug matches the filename (without .mdx)
    - Optional tierRequired / tier_required is one of {free, pro}
    - Optional estimatedMinutes / estimated_minutes is a positive integer
    - Optional lastReviewedAt / last_reviewed_at is a valid YYYY-MM-DD date
        (warn if > 365 days old)
    - Optional hasSafetyWarning / has_safety_warning requires a <WarnBlock>
    - Body is non-empty
    - No placeholder "lorem ipsum" text in body
    - Non-lesson MDX files are reported because the app loader ignores them

Usage
-----
        python tooling/scripts/validate_content.py
    python tooling/scripts/validate_content.py --strict-step-schema
    python tooling/scripts/validate_content.py --allow-missing-step-schema

Exits 0 on success (warnings do not fail), 1 when errors are found.
"""

from __future__ import annotations

import re
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

CONTENT_DIR = Path(__file__).parent.parent.parent / "content" / "paths"

LESSON_FILE_PATTERN = re.compile(r"^lesson-(\d+)-(\d+)-(\d+)-.+\.mdx$")
LESSON_NUMBER_PATTERN = re.compile(r"^\d+\.\d+\.\d+$")
CHAPTER_NUMBER_PATTERN = re.compile(r"^\d+\.\d+$")
PATH_NUMBER_PATTERN = re.compile(r"^\d+$")

VALID_TIERS = {"free", "pro"}
STALE_THRESHOLD_DAYS = 365

# Lessons where has_safety_warning=true MUST contain a WarnBlock component
WARN_BLOCK_PATTERN = re.compile(r"<WarnBlock")
STEP_HEADING_PATTERN = re.compile(r"^###\s+Step\s+\d+\b", re.MULTILINE)
STEP_META_BLOCK_PATTERN = re.compile(r"<StepMeta\b([\s\S]*?)\/>")
STEP_META_ATTRIBUTE_PATTERN = re.compile(r'([A-Za-z][A-Za-z0-9]*)="([^"]*)"')
STEP_META_REQUIRED_FIELDS = {
    "purpose",
    "action",
    "expectedResult",
    "whyItMatters",
    "nextStep",
    "askTutor",
}
STRICT_STEP_SCHEMA_ARG = "--strict-step-schema"
ALLOW_MISSING_STEP_SCHEMA_ARG = "--allow-missing-step-schema"


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


def _lesson_files(path_dir: Path) -> list[Path]:
    return sorted(
        file_path
        for file_path in path_dir.rglob("*.mdx")
        if LESSON_FILE_PATTERN.match(file_path.name)
    )


def _coerce_positive_int(value: object) -> int | None:
    if isinstance(value, int):
        return value
    if isinstance(value, str) and value.isdigit():
        return int(value)
    return None


def _expected_numbers(path: Path) -> tuple[str, str, str] | None:
    match = LESSON_FILE_PATTERN.match(path.name)
    if not match:
        return None

    path_num, chapter_num, lesson_num = match.groups()
    return (
        f"{path_num}.{chapter_num}.{lesson_num}",
        f"{path_num}.{chapter_num}",
        path_num,
    )


def _frontmatter_value(frontmatter: dict[str, object], *keys: str) -> object | None:
    for key in keys:
        if key in frontmatter:
            return frontmatter[key]
    return None


def _display_name(path: Path, path_root: Path) -> str:
    try:
        return path.relative_to(path_root).as_posix()
    except ValueError:
        return path.name


def _step_schema_version(frontmatter: dict[str, object]) -> int | None:
    raw = _frontmatter_value(frontmatter, "stepSchemaVersion", "step_schema_version")
    if raw is None:
        return None

    value = _coerce_positive_int(raw)
    return value


def _validate_step_schema(name: str, body: str) -> list[tuple[str, str]]:
    issues: list[tuple[str, str]] = []
    step_headings = STEP_HEADING_PATTERN.findall(body)
    step_meta_blocks = list(STEP_META_BLOCK_PATTERN.finditer(body))

    if len(step_meta_blocks) != len(step_headings):
        issues.append((
            "error",
            f"{name}: step schema requires one <StepMeta /> block for each walkthrough step ({len(step_headings)} steps, {len(step_meta_blocks)} StepMeta blocks)",
        ))
        return issues

    for index, match in enumerate(step_meta_blocks, start=1):
        attrs = {
            attr_match.group(1): attr_match.group(2).strip()
            for attr_match in STEP_META_ATTRIBUTE_PATTERN.finditer(match.group(1))
        }
        missing = sorted(field for field in STEP_META_REQUIRED_FIELDS if not attrs.get(field))
        if missing:
            issues.append((
                "error",
                f"{name}: StepMeta #{index} missing required fields: {', '.join(missing)}",
            ))

    return issues


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def validate_lesson(path: Path, path_root: Path, strict_step_schema: bool = False) -> list[tuple[str, str]]:
    """Return list of (level, message) tuples. level = 'error' | 'warning'."""
    issues: list[tuple[str, str]] = []
    name = _display_name(path, path_root)

    try:
        source = path.read_text(encoding="utf-8")
    except OSError as exc:
        return [("error", f"{name}: cannot read file -- {exc}")]

    fm_text, body = _split_frontmatter(source)

    if not fm_text:
        return [("error", f"{name}: no YAML frontmatter (file must start with ---)")]

    fm = _parse_frontmatter(fm_text)

    expected_numbers = _expected_numbers(path)
    if expected_numbers is None:
        return [("error", f"{name}: filename must follow lesson-<path>-<chapter>-<lesson>-<slug>.mdx")]

    expected_lesson, expected_chapter, expected_path = expected_numbers

    title = _frontmatter_value(fm, "title")
    if not isinstance(title, str) or not title.strip():
        issues.append(("error", f"{name}: missing required field `title`"))

    lesson_number = _frontmatter_value(fm, "lessonNumber")
    if lesson_number is None and fm.get("lesson_number") is not None:
        lesson_number = expected_lesson

    if lesson_number is None:
        issues.append(("error", f"{name}: missing required field `lessonNumber`"))
    else:
        lesson_number_text = str(lesson_number).strip()
        if not LESSON_NUMBER_PATTERN.fullmatch(lesson_number_text):
            issues.append(("error", f"{name}: lessonNumber must look like 4.2.1, got {lesson_number_text!r}"))
        elif lesson_number_text != expected_lesson:
            issues.append(("error", f"{name}: lessonNumber {lesson_number_text!r} does not match filename {expected_lesson!r}"))

    chapter_number = _frontmatter_value(fm, "chapterNumber")
    if chapter_number is None:
        issues.append(("error", f"{name}: missing required field `chapterNumber`"))
    else:
        chapter_number_text = str(chapter_number).strip()
        if not CHAPTER_NUMBER_PATTERN.fullmatch(chapter_number_text):
            issues.append(("error", f"{name}: chapterNumber must look like 4.2, got {chapter_number_text!r}"))
        elif chapter_number_text != expected_chapter:
            issues.append(("error", f"{name}: chapterNumber {chapter_number_text!r} does not match filename {expected_chapter!r}"))

    path_number = _frontmatter_value(fm, "pathNumber")
    if path_number is None:
        issues.append(("error", f"{name}: missing required field `pathNumber`"))
    else:
        path_number_text = str(path_number).strip()
        if not PATH_NUMBER_PATTERN.fullmatch(path_number_text):
            issues.append(("error", f"{name}: pathNumber must look like 4, got {path_number_text!r}"))
        elif path_number_text != expected_path:
            issues.append(("error", f"{name}: pathNumber {path_number_text!r} does not match filename {expected_path!r}"))

    # Slug must match filename
    fm_slug = str(fm.get("slug", ""))
    if fm_slug and fm_slug != path.stem:
        issues.append(("error", f"{name}: slug {fm_slug!r} != filename {path.stem!r}"))

    # tier_required / tierRequired
    tier = str(_frontmatter_value(fm, "tierRequired", "tier_required") or "")
    if tier and tier not in VALID_TIERS:
        issues.append(("error", f"{name}: invalid tier value {tier!r} -- must be free|pro"))

    # estimatedMinutes / estimated_minutes >= 1
    estimated_minutes = _frontmatter_value(fm, "estimatedMinutes", "estimated_minutes")
    if estimated_minutes is not None:
        estimated_minutes_int = _coerce_positive_int(estimated_minutes)
        if estimated_minutes_int is None:
            issues.append(("error", f"{name}: estimated minutes must be an integer, got {estimated_minutes!r}"))
        elif estimated_minutes_int < 1:
            issues.append(("error", f"{name}: estimated minutes must be >= 1, got {estimated_minutes_int}"))

    # lastReviewedAt / last_reviewed_at
    reviewed_raw = str(_frontmatter_value(fm, "lastReviewedAt", "last_reviewed_at") or "")
    if reviewed_raw:
        try:
            reviewed_date = datetime.strptime(reviewed_raw, "%Y-%m-%d").date()
            age = date.today() - reviewed_date
            if age > timedelta(days=STALE_THRESHOLD_DAYS):
                issues.append(("warning", f"{name}: stale review -- last_reviewed_at={reviewed_raw} ({age.days} days ago)"))
        except ValueError:
            issues.append(("warning", f"{name}: invalid last_reviewed_at {reviewed_raw!r} (expected YYYY-MM-DD)"))

    # hasSafetyWarning / has_safety_warning + WarnBlock
    has_safety_warning = _frontmatter_value(fm, "hasSafetyWarning", "has_safety_warning")
    if has_safety_warning is True and not WARN_BLOCK_PATTERN.search(body):
        issues.append(("error", f"{name}: has_safety_warning=true but <WarnBlock> not found in body"))

    step_schema_version = _step_schema_version(fm)
    walkthrough_step_count = len(STEP_HEADING_PATTERN.findall(body))

    if walkthrough_step_count and step_schema_version is None:
        issues.append((
            "error" if strict_step_schema else "warning",
            f"{name}: walkthrough lessons should declare stepSchemaVersion and one <StepMeta /> block after each step heading ({walkthrough_step_count} step headings found)",
        ))

    if step_schema_version is not None:
        if step_schema_version < 1:
            issues.append(("error", f"{name}: stepSchemaVersion must be >= 1 when present"))
        else:
            issues.extend(_validate_step_schema(name, body))

    # Non-empty body
    if not body.strip():
        issues.append(("warning", f"{name}: lesson body is empty"))

    # lorem ipsum check
    if "lorem ipsum" in body.lower():
        issues.append(("error", f"{name}: contains placeholder 'lorem ipsum' text"))

    return issues


def validate_path(path_dir: Path, strict_step_schema: bool = False) -> list[tuple[str, str]]:
    """Validate all lessons in one learning path directory."""
    issues: list[tuple[str, str]] = []
    mdx_files = _lesson_files(path_dir)
    ignored_mdx_files = sorted(
        file_path.relative_to(path_dir).as_posix()
        for file_path in path_dir.rglob("*.mdx")
        if not LESSON_FILE_PATTERN.match(file_path.name)
    )

    if ignored_mdx_files:
        issues.append((
            "warning",
            f"{path_dir.name}: {len(ignored_mdx_files)} non-lesson .mdx file(s) ignored by the app loader",
        ))

    if not mdx_files:
        issues.append(("warning", f"{path_dir.name}: no lesson-*.mdx files found"))
        return issues

    lesson_numbers: dict[str, str] = {}

    for mdx_file in mdx_files:
        issues.extend(validate_lesson(mdx_file, path_dir, strict_step_schema=strict_step_schema))

        # Collision detection
        source = mdx_file.read_text(encoding="utf-8", errors="ignore")
        fm_text, _ = _split_frontmatter(source)
        fm = _parse_frontmatter(fm_text)
        num = _frontmatter_value(fm, "lessonNumber")
        if num is not None:
            num_text = str(num).strip()
            if num_text in lesson_numbers:
                issues.append((
                    "error",
                    f"{_display_name(mdx_file, path_dir)}: lessonNumber {num_text} collides with {lesson_numbers[num_text]}",
                ))
            else:
                lesson_numbers[num_text] = _display_name(mdx_file, path_dir)

    return issues


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    args = set(sys.argv[1:])

    if STRICT_STEP_SCHEMA_ARG in args and ALLOW_MISSING_STEP_SCHEMA_ARG in args:
        print(
            f"ERROR: {STRICT_STEP_SCHEMA_ARG} and {ALLOW_MISSING_STEP_SCHEMA_ARG} are mutually exclusive."
        )
        return 2

    strict_step_schema = ALLOW_MISSING_STEP_SCHEMA_ARG not in args

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
        mdx_count = len(_lesson_files(path_dir))
        total_lessons += mdx_count
        path_issues = validate_path(path_dir, strict_step_schema=strict_step_schema)
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
    print(f"  Step schema mode: {'strict' if strict_step_schema else 'compatibility'}")
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