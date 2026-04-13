#!/usr/bin/env python3
"""
inject_v2_depth.py — Upgrades existing CLI Academy lessons (paths 01-19) to v2 content standard.

For each lesson:
1. Adds rubricCriteria to VerificationBlock (3 criteria derived from deliverable)
2. Adds ## What you will build section (from deliverable)
3. Adds ## Why this matters section (generated per-lesson context)
4. Renames ## Objective → ## Before you start
"""

import os
import re
import sys

CONTENT_ROOT = os.path.join(os.path.dirname(__file__), "..", "..", "content", "paths")

# Paths to process (01-19 only — 20-27 already have v2 content)
TARGET_PATH_PREFIXES = tuple(f"{n:02d}-" for n in range(1, 20))


def extract_deliverable(source: str) -> str:
    """Extract the deliverable text from a VerificationBlock."""
    m = re.search(r'deliverable=["\']([^"\']+)["\']', source, re.DOTALL)
    return m.group(1).strip() if m else ""


def derive_rubric_criteria(deliverable: str, lesson_slug: str, path_slug: str) -> list[str]:
    """
    Derive 3 specific, testable rubric criteria from the deliverable text.
    Uses simple heuristic rules based on common deliverable patterns.
    """
    d = deliverable.lower()
    slug = lesson_slug.lower()

    # --- Folder / workspace creation ---
    if "folder" in d or "directory" in d or "subfolder" in d:
        return [
            f"The {deliverable.split('folder')[0].strip().split('/')[-1].split('(')[0].strip() or 'required'} folder exists at the specified path",
            "All required subdirectories or contents are present and correctly named",
            "The structure was created entirely from the command line without using a file manager",
        ]

    # --- CLAUDE.md / config file ---
    if "claude.md" in d or "config" in d or "configuration" in d:
        return [
            "The CLAUDE.md file exists at the specified path and opens without errors",
            "The file contains the required sections or restrictions as described in the lesson",
            "Claude Code reads and applies the instructions when a session is started in that directory",
        ]

    # --- Git / commit / branch ---
    if "commit" in d or "branch" in d or "repository" in d or "git" in d:
        return [
            "The git command completed without error and the output matches the expected format",
            "Running `git log --oneline -5` (or `git status`) shows the expected state",
            "The commit message or branch name follows the format described in the lesson",
        ]

    # --- Script / code file ---
    if "script" in d or ".py" in d or ".js" in d or ".sh" in d or "function" in d:
        return [
            "The script file exists at the specified path and runs without syntax errors",
            "Running the script produces the expected output described in the lesson",
            "The script handles at least one error case or edge condition without crashing",
        ]

    # --- Log / document / markdown file ---
    if "log" in d or "notes" in d or ".md" in d or "document" in d or "checklist" in d:
        return [
            "The file exists in the correct location and opens without errors",
            "All required sections or entries described in the lesson are present",
            "The content is written in the learner's own words, not copied verbatim from the lesson",
        ]

    # --- Test suite / test file ---
    if "test" in d or "pytest" in d or "spec" in d:
        return [
            "All test functions are present and the test file runs without import errors",
            "Running the test suite with `pytest -v` shows the expected pass/fail states",
            "At least one test covers the specific scenario described in the lesson deliverable",
        ]

    # --- Terminal output / command output ---
    if "output" in d or "terminal" in d or "command" in d:
        return [
            "The command ran without errors and produced visible output",
            "The output matches the expected format or values described in the lesson",
            "The command was run from the correct working directory",
        ]

    # --- Setup / installation ---
    if "install" in d or "setup" in d or "configured" in d or "working" in d:
        return [
            "The installation or setup completed without fatal errors",
            "Running the verification command shows the tool is accessible and version-correct",
            "A basic test action (as described in the lesson) succeeds end to end",
        ]

    # --- Interview / brief / portfolio ---
    if "brief" in d or "portfolio" in d or "interview" in d or "linkedin" in d:
        return [
            "The document exists and covers all required sections described in the lesson",
            "The content is specific to the learner's actual work, not generic filler",
            "The writing follows the framework taught in the lesson (problem, build, produce, scale or equivalent)",
        ]

    # --- Safety / audit ---
    if "audit" in d or "safety" in d or "security" in d or "checklist" in d:
        return [
            "Every audit criterion has been assessed with a Pass, Fail, or N/A rating",
            "Each Fail item includes a remediation plan with a specific next action",
            "The audit document is saved at the correct path and readable without errors",
        ]

    # --- Generic fallback ---
    # Extract a noun phrase from the deliverable for more specific criteria
    first_sentence = deliverable.split(".")[0].strip()
    return [
        f"{first_sentence} exists as described and is accessible",
        "All required elements mentioned in the deliverable are present and correctly formed",
        "The artifact was produced by following the walkthrough steps, not by copying an existing file",
    ]


# --- Why-this-matters snippets keyed to path slug patterns ---
WHY_MAP = {
    "01-start-here": "Professional developers spend the first minutes of any new project setting up a clean workspace. Starting from an organized structure prevents lost files, confusing paths, and the embarrassment of committing secrets. This habit — workspace first, then work — is the foundation of every reliable agentic workflow.",
    "02-terminal": "The terminal is the lingua franca of every professional development environment. Navigating confidently from the command line is what separates a developer who can work anywhere from one who is helpless without a GUI. These skills transfer directly to remote servers, CI runners, and containerized environments.",
    "03-claude-code": "Claude Code is the primary interface for agentic development. Understanding how it reads context, executes tools, and takes action is the difference between a developer who directs Claude precisely and one who gets unpredictable results. Every advanced agentic pattern builds on this foundation.",
    "04-claude-code-repo": "Navigating and mapping an unfamiliar codebase is one of the most time-consuming parts of a developer's day. Claude Code turns a 30-minute orientation into a 3-minute operation. This skill directly reduces ramp-up time on new projects, client codebases, and open-source contributions.",
    "05-claude-code-debug": "Debugging without a systematic approach is how engineers waste entire days on problems that take 20 minutes to fix with the right method. Using Claude Code as a debug partner speeds diagnosis while the hypothesis-driven process builds the mental discipline that distinguishes senior engineers.",
    "06-git": "Git is non-negotiable in any professional development context. AI-assisted builders who cannot use Git correctly are blocked from collaborating, reviewing, or shipping. This path makes Git operations fast and reliable using Claude Code so you can focus on building instead of remembering commands.",
    "07-claude-code-across": "Real-world agentic work spans surfaces — you start in the terminal, switch to the IDE, check GitHub, and come back to the terminal. Learners who can only use Claude in one surface leave efficiency on the table. Cross-surface fluency is what makes Claude Code genuinely useful for full development cycles.",
    "08-claude-cowork": "Structured Cowork sessions are how teams use AI for longer, more complex tasks without losing control. An unstructured AI session produces unpredictable results and costs more than it should. The Cowork discipline covered here is directly applicable to any enterprise team introducing AI tooling.",
    "09-claude-cowork-doc": "Research, extraction, and document work are among the highest-volume tasks in knowledge work. Claude Cowork's ability to synthesize sources, extract data, and produce structured documents turns a 4-hour research task into a 30-minute one. This is the first agentic capability that knowledge workers notice in their day-to-day.",
    "10-claude-cowork-admin": "Team rituals — standups, retrospectives, status reports, onboarding docs — are repetitive, time-consuming, and often low-value to produce manually. Claude Cowork is uniquely good at these tasks because they follow predictable patterns. Automating them frees team members for higher-leverage work.",
    "11-openclaw": "Custom runtimes are how agentic developers move from using Claude to building with Claude. Understanding the sandbox model and runtime foundations is the prerequisite for everything in the advanced Claw ecosystem. This knowledge is increasingly sought after in AI engineering roles.",
    "12-skills-memory": "Persistent skills and memory are what distinguish a one-shot agent from a long-running one. Heartbeats and scheduled work enable agents that operate independently over time. These patterns underpin every production agentic system that handles real business workflows.",
    "13-multi-agent": "Multi-agent workflows are the current frontier of production AI systems. Understanding how to wire agents together, manage handoffs, and avoid complexity spirals is the knowledge gap between hobby projects and production deployments. This path gives you the vocabulary and the architecture patterns used at scale.",
    "14-secure-local": "Every agentic developer runs code on their local machine. A compromised machine means compromised keys, leaked data, and potentially compromised production systems. Local security hygiene is the baseline that makes every other security measure meaningful.",
    "15-secure-remote": "Remote systems are higher-stakes than local ones — they're shared, persistent, and often connected to production data. Secure remote setup is the first thing any security review will check when an organization adopts agentic tooling. Getting this right prevents incidents that are expensive and embarrassing.",
    "16-computer-use": "Computer use and browser automation extend Claude's capabilities to the full surface area of a knowledge worker's day — not just files and code, but UIs, web apps, and dashboards. Sandbox discipline prevents these powerful capabilities from doing unintended damage during development.",
    "17-secure-integrations": "Integrating Claude with external APIs and services is where most production security incidents happen. A misconfigured webhook, an exposed key, or an over-permissioned OAuth scope can expose entire systems. This path teaches the integration patterns that hold up under a security review.",
    "18-real-world": "Real-world agent builds are the proof that everything in the curriculum works in practice, not just in isolated exercises. The everyday productivity scenarios in this path mirror the first agentic projects most developers build when they join an organization using Claude Code.",
    "19-capstones": "The portfolio capstone is the artifact that converts learning into professional evidence. Employers and clients cannot assess what they cannot see. A concrete, documented portfolio project answers the question 'show me something you built' — the question that closes every technical hiring conversation.",
}


def get_why_this_matters(path_slug: str) -> str:
    """Get a relevant 'Why this matters' paragraph for the given path."""
    for key, text in WHY_MAP.items():
        if path_slug.startswith(key) or key in path_slug:
            return text
    return "This skill is foundational to working confidently with Claude Code in a professional context. Developers who master it can move faster, make fewer mistakes, and produce work that is easier to review and maintain."


def extract_objective(source: str) -> str:
    """Extract the text under ## Objective (or ## Before you start)."""
    m = re.search(r"##\s+Objective\s*\n(.*?)(?=\n##|\Z)", source, re.DOTALL)
    return m.group(1).strip() if m else ""


def has_v2_sections(source: str) -> bool:
    """Return True if the lesson already has v2 sections."""
    return "## What you will build" in source


def has_rubric_criteria(source: str) -> bool:
    """Return True if the VerificationBlock already has rubricCriteria."""
    return "rubricCriteria" in source


def upgrade_lesson(file_path: str, path_slug: str) -> bool:
    """
    Upgrade a single lesson file to v2 standard.
    Returns True if file was modified.
    """
    with open(file_path, "r", encoding="utf-8") as f:
        source = f.read()

    already_v2 = has_v2_sections(source)
    already_rubric = has_rubric_criteria(source)

    if already_v2 and already_rubric:
        return False  # Already upgraded

    modified = source
    lesson_slug = os.path.basename(file_path).replace(".mdx", "")

    # ── Step 1: Add rubricCriteria to VerificationBlock ──────────────────────
    if not already_rubric:
        deliverable = extract_deliverable(source)
        if deliverable:
            criteria = derive_rubric_criteria(deliverable, lesson_slug, path_slug)
            criteria_lines = "\n".join(f'    "{c}",' for c in criteria)
            criteria_block = f'\n  rubricCriteria={{[\n{criteria_lines}\n  ]}}'

            # Insert before the closing /> of VerificationBlock
            # Use .*? (non-greedy) with DOTALL to match across newlines
            modified = re.sub(
                r'(<VerificationBlock\b.*?)\s*/>',
                lambda m: m.group(1).rstrip() + criteria_block + "\n/>",
                modified,
                flags=re.DOTALL,
            )

    # ── Step 2: Add v2 body sections ─────────────────────────────────────────
    if not already_v2:
        deliverable = extract_deliverable(modified)
        objective_text = extract_objective(modified)
        why_matters = get_why_this_matters(path_slug)

        # Derive "What you will build" from deliverable
        if deliverable:
            what_build = deliverable
        elif objective_text:
            # Take first sentence of objective as "what you will build"
            what_build = objective_text.split(".")[0].strip() + "."
        else:
            what_build = "Complete the task described in the walkthrough."

        # Build the new sections block
        new_sections = f"""
## What you will build
{what_build}

## Why this matters
{why_matters}

## Before you start
{objective_text if objective_text else "A working terminal open and the previous lesson complete."}

"""

        # Remove the old ## Objective section
        modified = re.sub(
            r"\n##\s+Objective\s*\n.*?(?=\n##|\Z)",
            "",
            modified,
            flags=re.DOTALL,
        )

        # Insert new sections after the first H1 heading
        modified = re.sub(
            r"(^#\s+.+?\n)",
            r"\1" + new_sections,
            modified,
            count=1,
            flags=re.MULTILINE,
        )

    if modified != source:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(modified)
        return True

    return False


def main():
    if not os.path.isdir(CONTENT_ROOT):
        print(f"ERROR: Content root not found: {CONTENT_ROOT}", file=sys.stderr)
        sys.exit(1)

    total = 0
    upgraded = 0
    skipped = 0
    errors = []

    for path_name in sorted(os.listdir(CONTENT_ROOT)):
        if not any(path_name.startswith(p) for p in TARGET_PATH_PREFIXES):
            continue

        path_dir = os.path.join(CONTENT_ROOT, path_name)
        if not os.path.isdir(path_dir):
            continue

        for root, _dirs, files in os.walk(path_dir):
            for fname in sorted(files):
                if not re.match(r"lesson-\d+-\d+-\d+-.+\.mdx$", fname):
                    continue

                fpath = os.path.join(root, fname)
                total += 1

                try:
                    changed = upgrade_lesson(fpath, path_name)
                    if changed:
                        upgraded += 1
                        print(f"  OK  {path_name}/{fname}")
                    else:
                        skipped += 1
                except Exception as exc:
                    errors.append((fpath, str(exc)))
                    print(f"  ERR {path_name}/{fname}: {exc}", file=sys.stderr)

    print(f"\n{'='*60}")
    print(f"Total lessons:   {total}")
    print(f"Upgraded:        {upgraded}")
    print(f"Already v2:      {skipped}")
    print(f"Errors:          {len(errors)}")

    if errors:
        print("\nFailed files:")
        for fp, err in errors:
            print(f"  {fp}: {err}")
        sys.exit(1)

    print("\nDone.")


if __name__ == "__main__":
    main()
