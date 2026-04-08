---
name: MDX Publisher Config
description: Formatting skill to enforce strict Next.js compliant MDX output for the Tavern.
---

# MDX Execution

Every article published by the final Agent MUST follow this exact format:

```mdx
---
title: "[Entertaining Title]"
description: "[1-2 sentence hook]"
date: "[YYYY-MM-DD]"
type: "[article | video | graphic]"
tags: ["[tag1]", "[tag2]"]
image: "[Optional path to image in /assets or external URL]"
---

{/* Content goes here using standard Markdown plus allowable MDX components */}

<div className="tavern-cta">
  **Ready to build?** Head back to the [Dashboard](/dashboard) to fire up your floating AI Tutor.
</div>
```
