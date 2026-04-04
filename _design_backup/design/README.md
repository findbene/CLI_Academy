# Design Tokens

This directory contains the starter visual foundation for Zero to Claude.

## Canonical Files

- `tokens.css` - runtime CSS custom properties for color, typography, spacing, radius, shadow, motion, and layout
- `tokens.json` - portable token source for future tooling and design-system automation
- `brand-tokens.css` - temporary compatibility alias that imports `tokens.css`

## Visual Direction

The product should feel like a modern field manual:

- calm reading surfaces
- precise dark utility surfaces
- one strong teal accent for momentum
- warm signal colors for safety and guidance

## Usage

Use semantic tokens in components instead of raw hex values or pixel literals.

Good:

```css
.buttonPrimary {
  background: var(--color-accent-primary);
  color: var(--color-fg-on-accent);
}
```

Avoid:

```css
.buttonPrimary {
  background: #16b0a8;
  color: #ffffff;
}
```

## Font Loading

When the Next.js app is scaffolded, load:

- `Sora` for display usage
- `Instrument Sans` for UI and body
- `IBM Plex Mono` for code

Then assign them to the CSS variables defined in `tokens.css`.

## Design Rules

- Keep the interface mostly neutral and let the teal accent carry action.
- Use amber for milestones, safety, and learning emphasis only.
- Preserve visible focus states.
- Respect reduced motion preferences.
- Do not introduce one-off colors or spacing values before checking the token files first.

## Next Step

After scaffolding the frontend, wire these tokens into:

- `app/styles/globals.css`
- the marketing layout
- the app shell
- the lesson player
- the tutor drawer
