---
description: Weekly cleanup workflow for the Lounge.
---

# Archive Weekly

1. **Scan `lounge_published/`**: Run a script or check the date frontmatter on all MDX files in `apps/web/content/lounge_published/`.
2. **Identify Ancient Content**: Any file older than 14 days and not strictly tagged as `timeless` or `pinned` must be processed.
3. **Add Frontmatter**: Modify the frontmatter of these files to include `tags: ["classic"]`.
4. **Move Files**: Automatically relocate these files into `apps/web/content/lounge_archive/` so they no longer appear on the immediate live feed for the frontend.
5. **Report**: Output standard terminal success message.
