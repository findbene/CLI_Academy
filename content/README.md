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
- assets should be reusable and named clearly
- learner-visible lessons live under `content/paths/<path-slug>/chapter-<path>-<chapter>-<slug>/lesson-<path>-<chapter>-<lesson>-<slug>.mdx`
- the active lesson frontmatter baseline is `title`, `lessonNumber`, `chapterNumber`, and `pathNumber`
- optional lesson metadata may include `tutorPreload`, `verifyType`, `slug`, `description`, `estimatedMinutes`, `tierRequired`, `lastReviewedAt`, and `hasSafetyWarning`
- the app loader and validator only count files that match the `lesson-*.mdx` naming convention; other MDX files are ignored until they are renamed into the live lesson pattern
