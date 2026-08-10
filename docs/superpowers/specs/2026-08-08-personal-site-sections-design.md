# Personal Site: Work / About / Play Sections

**Date:** 2026-08-08
**Status:** Superseded 2026-08-10 by [2026-08-10-notebook-redesign-design.md](../specs/2026-08-10-notebook-redesign-design.md) — describes the earlier Work/About/Play design, since fully replaced.

## Purpose

Stand up a basic personal landing page for `ethanhmoon.github.io` (currently an
empty `index.html`, no other files, no commits). The page has three content
sections — Work, About, Play — reachable via a sticky top nav on a single
scrollable page. This is a starting skeleton with placeholder content, meant
to be filled in and extended later.

## Non-goals

- No literal `<form>`/input fields — "sections" are content areas, not a
  data-collection form.
- No JavaScript, build step, or external frameworks/CDNs.
- No real bio/project/hobby content yet — placeholder text only.
- No multi-page routing (Work/About/Play are anchors on one page, not
  separate HTML files).

## Architecture

Two static files at the repo root, served as-is by GitHub Pages:

- `index.html` — page structure and content.
- `style.css` — all styling, linked from `index.html`.

No JS. No dependencies. No build tooling.

## Structure (`index.html`)

- `<head>`: title "Ethan Moon", meta viewport for responsiveness, link to
  `style.css`.
- Sticky top `<nav>` with three links: `Work`, `About`, `Play`, each an
  anchor link (`#work`, `#about`, `#play`).
- `<header>` (or nav area) shows the page title "Ethan Moon".
- Three `<section>` elements in order, each with an `id` matching its nav
  anchor and a heading:
  - `#work` — heading "Work", placeholder paragraph/card describing where
    projects will go (e.g. "Projects coming soon — this is where featured
    work will live.").
  - `#about` — heading "About", placeholder bio paragraph (e.g. short
    "Hi, I'm Ethan..." placeholder).
  - `#play` — heading "Play", placeholder paragraph for hobbies/side
    projects/experiments.
- Smooth scrolling between sections via CSS `scroll-behavior: smooth` on
  `html` — no JS required.

## Styling (`style.css`)

- Playful/colorful direction: light background, friendly system-font stack
  (no external font loading), rounded card-style containers per section.
- Each section gets its own distinct accent color (three complementary
  colors) used for the heading and/or section background tint, so Work /
  About / Play are visually distinguishable at a glance.
- Sticky nav bar with hover states on links.
- Responsive: single-column, comfortable padding/margins on mobile; content
  max-width constrained and centered on wider viewports.

## Testing / Verification

Static HTML/CSS only — verification is visual: open `index.html` directly in
a browser (or via a local static server) and confirm:

- Nav links scroll to the correct section.
- All three sections render with distinct styling and placeholder content.
- Layout holds up at a narrow (mobile-width) viewport.

No automated tests are applicable for this scope.

## Future extensions (explicitly out of scope now)

- Real content for each section.
- Possibly splitting into separate pages if Work/About/Play grow large.
- A real contact form (a literal `<form>`) could live in a future "Contact"
  section — distinct from this task.
