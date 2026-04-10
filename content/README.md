# content

This folder is the curriculum source of truth.

## Responsibilities

- learning paths
- lesson content
- reusable learner assets
- content manifests and validation inputs

## Conventions

- use stable path slugs
- prefer kebab-case
- every lesson should include outcome, steps, verification, and troubleshooting
- step-based lessons should add one `<StepMeta ... />` block immediately after each `### Step N` heading so the app can render purpose, action, expected result, why it matters, next-step setup, and a step-specific tutor prompt
- assets should be reusable and named clearly
- learner-visible lessons live under `content/paths/<path-slug>/chapter-<path>-<chapter>-<slug>/lesson-<path>-<chapter>-<lesson>-<slug>.mdx`
- the active lesson frontmatter baseline is `title`, `lessonNumber`, `chapterNumber`, and `pathNumber`
- optional lesson metadata may include `tutorPreload`, `verifyType`, `slug`, `description`, `estimatedMinutes`, `tierRequired`, `lastReviewedAt`, `hasSafetyWarning`, and `stepSchemaVersion`
- the app loader and validator only count files that match the `lesson-*.mdx` naming convention; other MDX files are ignored until they are renamed into the live lesson pattern

## StepMeta contract

Use this exact block format when a lesson is opted into the guided step schema:

```mdx
<StepMeta
	purpose="Why this step exists."
	action="The concrete thing the learner should do now."
	expectedResult="What they should see if it worked."
	whyItMatters="Why this step matters for the larger lesson."
	nextStep="What to prepare for before moving on."
	askTutor="A step-specific prompt the built-in tutor can answer without extra context."
 />
```

Set `stepSchemaVersion: 1` in frontmatter when you use StepMeta. The validator will then require one `StepMeta` block for every `### Step N` walkthrough heading in that lesson.

Current enforcement policy:

- `python tooling/scripts/validate_content.py` now enforces guided-step coverage for live walkthrough lessons by default
- `python tooling/scripts/validate_content.py --strict-step-schema` remains accepted as an explicit alias for that live-content gate and is the form CI runs
- `python tooling/scripts/validate_content.py --allow-missing-step-schema` downgrades missing step schema to warnings when you need a compatibility audit during out-of-band content work
