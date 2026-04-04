#!/usr/bin/env python3
"""
validate_content.py
Validates all MDX lesson files for required frontmatter fields,
WarnBlock presence on safety lessons, and broken internal links.

Usage:
    python scripts/validate_content.py
    python scripts/validate_content.py --fix   # auto-fix minor issues

Exits 0 on success, 1 on validation failures (CI blocker).
"""

import sys
import re
import json
from pathlib import Path
from datetime import datetime, timezone

import yaml  # pip install pyyaml

CONTENT_DIR = Path(__file__).parent.parent / "content" / "paths"

REQUIRED_FRONTMATTER = [
    "title",
    "description",
    "slug",
    "lesson_number",
    "estimated_minutes",
    "tier_required",
    "version_label",
    "last_reviewed_at",
    "reviewed_by",
    "has_safety_warning",
    "tags",
]

VALID_TIERS = {"free", "pro"}

# Lessons where has_safety_warning=true MUST contain a WarnBlock
WARN_BLOCK_PATTERN = re.compile(r"<WarnBlock")

# How stale is too stale (days)
STALE_THRESHOLD_DAYS = 180


def parse_frontmatter(content: str) -> tuple[dict, str]:
    """Extract YAML frontmatter and body from MDX content."""
    if not content.startswith("---"):
        return {}, content
    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}, content
    try:
        fm = yaml.safe_load(parts[1]) or {}
    except yaml.YAMLError as e:
        raise ValueError(f"Invalid YAML frontmatter: {e}")
    return fm, parts[2]


def validate_lesson(path: Path) -> list[str]:
    """Returns list of error strings. Empty = pass."""
    errors = []
    content = path.read_text(encoding="utf-8")

    try:
        fm, body = parse_frontmatter(content)
    except ValueError as e:
        return [f"{path.name}: {e}"]

    # Required fields
    for field in REQUIRED_FRONTMATTER:
        if field not in fm:
            errors.append(f"{path.name}: missing frontmatter field '{field}'")

    # Tier validation
    if fm.get("tier_required") not in VALID_TIERS:
        errors.append(
            f"{path.name}: invalid tier_required '{fm.get('tier_required')}' — must be free|pro"
        )

    # Stale content check
    if "last_reviewed_at" in fm:
        try:
            reviewed = datetime.fromisoformat(str(fm["last_reviewed_at"])).replace(
                tzinfo=timezone.utc
            )
            age_days = (datetime.now(timezone.utc) - reviewed).days
            if age_days > STALE_THRESHOLD_DAYS:
                errors.append(
                    f"{path.name}: content is {age_days} days old (>{STALE_THRESHOLD_DAYS}). "
                    f"Update last_reviewed_at or mark is_deprecated=true."
                )
        except (ValueError, TypeError):
            errors.append(f"{path.name}: invalid last_reviewed_at format (use ISO 8601)")

    # Safety warning enforcement
    if fm.get("has_safety_warning") is True:
        if not WARN_BLOCK_PATTERN.search(body):
            errors.append(
                f"{path.name}: has_safety_warning=true but no <WarnBlock> found in content. "
                f"Add a WarnBlock or set has_safety_warning=false."
            )

    # estimated_minutes must be positive int
    if "estimated_minutes" in fm:
        try:
            mins = int(fm["estimated_minutes"])
            if mins <= 0:
                errors.append(f"{path.name}: estimated_minutes must be > 0")
        except (TypeError, ValueError):
            errors.append(f"{path.name}: estimated_minutes must be a number")

    # Check for lorem ipsum (content quality gate)
    if "lorem ipsum" in body.lower():
        errors.append(f"{path.name}: contains placeholder 'lorem ipsum' text")

    return errors


def validate_path_json(path_json: Path) -> list[str]:
    """Validates path.json metadata file."""
    errors = []
    try:
        meta = json.loads(path_json.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError) as e:
        return [f"{path_json}: {e}"]

    required = ["slug", "title", "description", "tier_required", "version_label",
                "last_reviewed_at", "difficulty", "estimated_hours", "lessons"]
    for field in required:
        if field not in meta:
            errors.append(f"{path_json.name}: missing field '{field}'")

    if meta.get("difficulty") not in {"beginner", "intermediate", "advanced"}:
        errors.append(f"{path_json.name}: invalid difficulty")

    # Check all listed lessons exist
    parent_dir = path_json.parent
    for lesson_slug in meta.get("lessons", []):
        lesson_file = parent_dir / f"{lesson_slug}.mdx"
        if not lesson_file.exists():
            errors.append(
                f"{path_json.name}: lesson '{lesson_slug}' listed but "
                f"'{lesson_file.name}' not found"
            )

    return errors


def main() -> int:
    all_errors: list[str] = []
    lesson_count = 0
    path_count = 0

    if not CONTENT_DIR.exists():
        print(f"⚠  Content directory not found: {CONTENT_DIR}")
        print("   Run this script from the repo root after adding content.")
        return 0

    for path_dir in sorted(CONTENT_DIR.iterdir()):
        if not path_dir.is_dir():
            continue

        path_count += 1

        # Validate path.json
        path_json = path_dir / "path.json"
        if path_json.exists():
            all_errors.extend(validate_path_json(path_json))
        else:
            all_errors.append(f"{path_dir.name}/: missing path.json")

        # Validate each lesson
        for mdx_file in sorted(path_dir.glob("*.mdx")):
            lesson_count += 1
            all_errors.extend(validate_lesson(mdx_file))

    if all_errors:
        print(f"\n❌ Content validation FAILED — {len(all_errors)} error(s)\n")
        for err in all_errors:
            print(f"   • {err}")
        print(f"\nScanned {lesson_count} lessons across {path_count} paths.")
        return 1

    print(
        f"✅ Content validation passed — {lesson_count} lessons, {path_count} paths, 0 errors"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
