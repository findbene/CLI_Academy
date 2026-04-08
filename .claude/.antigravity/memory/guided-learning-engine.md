# Guided-Learning Engine Architecture

CLI Academy has transitioned from a static markdown-based curriculum (Project Catalog style) into an interactive **Guided-Learning Engine**.

## Core Concepts

1. **Learning Modes**: 
   - `Guided`: Full context and direct answers.
   - `Hint-based`: Subtle course corrections; refuses to give the answer immediately.
   - `Independent`: Total isolation. Focuses solely on verifying the outcome.
   - State is handled by `LearningModeSelector.tsx` and pushed directly to `/api/tutor`.

2. **Context-Aware AI Tutoring**:
   - The engine utilizes Claude 3.5 Sonnet.
   - `tutorPreload` (defined in MDX frontmatter) is invisibly injected into the system prompt for every lesson. It strictly dictates *how* the Tutor helps the user in that specific lesson context.

3. **Verification Blocks**:
   - Replaces the honor system.
   - The custom MDX tag `<VerificationBlock deliverable="..." verifyCheck="..." />` renders a terminal simulation box where learners must paste their stdout or code, which the Tutor evaluates to unblock the path.

4. **Curriculum Overhaul Strategy**:
   - **Data Schema**: All paths are deeply nested (`paths/path_slug/chapter_slug/lesson_slug.mdx`).
   - `fs.readdir` recursively hydrates these structures dynamically into the Next.js cache.
   - **Catalog Mapping**: The actual rendering of standard paths requires matching `paths.ts` objects. The canonical 19 paths from the Guided-Learning Engine are fully exported inside `app/lib/data/paths.ts`. Paths are flagged `available` or `coming-soon` there to control layout interaction.

## Content Authoring Standard

When authoring lessons, always:
- Keep the tone highly encouraging and fearless.
- Write direct instructions under `## Walkthrough`.
- Constantly remind the user that the Floating Tutor is watching and waiting to help if they press `Open tutor`.
- Align the output goal directly with the verification box.
