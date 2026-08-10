# Minimal Hand-Drawn Notebook Redesign

**Date:** 2026-08-10
**Status:** Approved

## Purpose

Replace the current "Work/About/Play" single-page site (playful/colorful, sticky
top nav, three scrollable sections — shipped 2026-08-08) with a completely
different aesthetic: a minimal, hand-drawn personal homepage that feels like a
person's notebook. Plain white background, generous empty space, no cards,
borders, shadows, or gradients. Three separate pages (about / works / contact)
sharing a fixed left sidebar, in place of the old scrolling single page.

## Non-goals

- No JavaScript anywhere — pure HTML + CSS.
- No language toggle (explicitly declined — do not implement, not even as a
  decorative placeholder).
- No real links for the works-page projects yet — placeholder text only,
  clearly flagged for the user to fill in later.
- No icons, card styling, shadows, gradients, or borders — the whole design
  is black text on white with exactly one accent color.
- Doodles (notebook+pen, mug) appear only on the about/landing page, not on
  works or contact.

## Architecture

Four static files at the repo root, replacing the current `index.html` /
`style.css` entirely:

- `index.html` — the about page (site landing page).
- `works.html` — the works/projects listing page.
- `contact.html` — the contact page.
- `style.css` — shared stylesheet for all three pages.

External dependency: Google Fonts (Patrick Hand + Inter), loaded via a
`<link>` tag in each page's `<head>` — the user explicitly requested Google
Fonts for this design, superseding the prior "no external CDN" constraint
from the old spec (that constraint applied to the old design only).

No build step, no JS, no other dependencies.

## Shared Layout (all three pages)

- Fixed-position left sidebar, present identically on every page:
  - Site name "ethan moon." — all lowercase, ending with a period, set in
    Patrick Hand (handwritten font).
  - Stacked nav: `about`, `works`, `contact`, each a link, set in Patrick
    Hand, all lowercase.
  - The current page's nav link is marked with a small inline-SVG
    hand-drawn yellow squiggle underline (the design's one accent color).
    Not present under the other two links.
  - No language toggle.
- Main content area: a single narrow column to the right of the sidebar,
  with generous top/side margins and plenty of vertical whitespace between
  elements. Body copy is set in Inter (clean neutral sans-serif).
- Color: black text (`#1a1a1a`-ish, not pure `#000`) on white background
  (`#ffffff` or near-white) everywhere. The one accent color — a warm
  yellow, approx `#e8b923` — is used **only** for the squiggle underline.
  No borders, shadows, gradients, or card backgrounds anywhere on the site.
- Responsive: on narrow viewports the sidebar stacks above the content
  column rather than sitting fixed to the left (simple single-column
  reflow, no hamburger menu or JS needed).

## Page: `index.html` (about)

- The landing page. Main content is a narrow column of short, casual,
  all-lowercase, first-person sentences — diaristic one-liners, not
  promotional copy — each with enough vertical space to read as its own
  standalone thought (not a dense paragraph).
- Placeholder copy (to be replaced by the user later), in voice:
  - "i'm ethan."
  - "i like building small things that end up useful."
  - "right now: dispatch, a way to make job hunting a little less miserable."
  - "before that: robots."
  - "i spend a lot of time in text editors and not enough time outside."
  - "this site is a work in progress, like most things."
- Two thin-line inline-SVG doodle illustrations — a notebook with a pen,
  and a steaming mug — placed loosely (slightly overlapping/offset, not
  grid-aligned) in the upper-right corner of the content area. These are
  the only decoration on the page, and the only decoration on the site.

## Page: `works.html`

- Same sidebar (works marked active). Main content: two entries, same
  narrow-column/lowercase/casual style as the about page, no doodles.
- Placeholder entries (voice-matched, flagged for the user to replace with
  real names/descriptions/links):
  - "dispatch — a job aggregator i built to cut through the noise of job
    hunting. still shipping features."
  - "robots — some robotics tinkering i've been doing on the side. more
    details coming soon."
- No card/box styling around entries — same plain-text, whitespace-driven
  layout as the rest of the site.

## Page: `contact.html`

- Same sidebar (contact marked active). Main content: plain lowercase
  lines with the user's real contact details, as simple text/links, no
  icons or button styling:
  - Email: `ethanmoon2000@yahoo.com` (as a `mailto:` link)
  - GitHub: `https://github.com/ethanhmoon`
  - LinkedIn: `https://www.linkedin.com/in/ethanmoon17/`

## Testing / Verification

Static HTML/CSS only, no test framework in this repo — verification is
structural (`grep` checks that shared classes/ids match between `style.css`
and all three HTML files) plus a manual/visual check of each page:
confirm the sidebar is identical across all three pages with the correct
link marked active, confirm the squiggle only appears under the active
link, confirm the about-page doodles render and don't overlap main text,
and confirm the layout reflows sensibly at a narrow (mobile-width)
viewport.

## Future extensions (explicitly out of scope now)

- Real content for the about and works pages (replacing the placeholder
  one-liners and project descriptions).
- Real links for the works-page projects.
- A language toggle, if ever wanted — explicitly declined for this pass.
