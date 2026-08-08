# Work/About/Play Personal Site Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static `index.html` + `style.css` personal landing page for `ethanhmoon.github.io` with a sticky nav and three scrollable sections — Work, About, Play — each with placeholder content.

**Architecture:** Two static files at the repo root, no JS, no build step, no dependencies. `index.html` holds structure/content; `style.css` holds all presentation. CSS `scroll-behavior: smooth` handles nav-to-section scrolling — no JavaScript required.

**Tech Stack:** Plain HTML5 + CSS3. No frameworks, no CDNs, no package manager.

## Global Constraints

- No `<form>`/input elements — sections are content areas, not a data-collection form (per spec).
- No JavaScript, build tooling, or external frameworks/CDN assets.
- Page title / header text: "Ethan Moon".
- Three sections, in order: Work (`#work`), About (`#about`), Play (`#play`) — placeholder content only, no real bio/project/hobby text yet.
- Style direction: playful/colorful, with a distinct accent color per section, system-font stack (no external font loading), rounded card-style content blocks, sticky top nav, responsive at mobile widths.
- This repo has no test framework — "testing" a step means either a `grep`/`grep -c` structural check against the file, or a manual browser check. Every step below says which.

---

### Task 1: Build `index.html` structure and content

**Files:**
- Create: `index.html`
- Test: manual `grep` checks against `index.html` (no test framework in this repo)

**Interfaces:**
- Consumes: nothing (first task).
- Produces: `index.html` referencing `style.css` via `<link rel="stylesheet" href="style.css">`. Section ids `work`, `about`, `play` and nav anchors `#work`, `#about`, `#play` — Task 2's CSS selectors (`.site-nav`, `.site-nav__brand`, `.site-nav__links`, `.section`, `.section--work`, `.section--about`, `.section--play`) target the exact classes defined here.

- [ ] **Step 1: Write `index.html`**

Create `/Users/ethanmoon/ethanhmoon.github.io/index.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ethan Moon</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="site-nav">
    <span class="site-nav__brand">Ethan Moon</span>
    <ul class="site-nav__links">
      <li><a href="#work">Work</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#play">Play</a></li>
    </ul>
  </nav>

  <main>
    <section id="work" class="section section--work">
      <h1>Work</h1>
      <p>Projects coming soon &mdash; this is where featured work will live.</p>
    </section>

    <section id="about" class="section section--about">
      <h1>About</h1>
      <p>Hi, I'm Ethan. This is placeholder bio text &mdash; the real one is coming soon.</p>
    </section>

    <section id="play" class="section section--play">
      <h1>Play</h1>
      <p>Side projects, experiments, and hobbies will show up here.</p>
    </section>
  </main>
</body>
</html>
```

- [ ] **Step 2: Verify structure with `grep`**

Run:
```bash
grep -c '<section id="work" class="section section--work">' index.html
grep -c '<section id="about" class="section section--about">' index.html
grep -c '<section id="play" class="section section--play">' index.html
grep -c 'href="#work"' index.html
grep -c 'href="#about"' index.html
grep -c 'href="#play"' index.html
grep -c 'href="style.css"' index.html
```
Expected: every command prints `1`.

- [ ] **Step 3: Manual browser check**

Open `index.html` directly in a browser (double-click it or `open index.html` on macOS). Confirm:
- Page title in the browser tab reads "Ethan Moon".
- Nav bar shows "Ethan Moon" plus links "Work", "About", "Play" (unstyled is fine — `style.css` doesn't exist yet, this step only confirms structure/content).
- Clicking each nav link jumps to the matching section, in order Work → About → Play.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
Add index.html structure with Work/About/Play sections

Unstyled skeleton: sticky-nav markup and three content sections
wired to anchor links. Styling comes in the next commit.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Build `style.css` and verify the finished page

**Files:**
- Create: `style.css`
- Test: manual `grep` checks against `style.css`, plus a manual browser check of the combined page

**Interfaces:**
- Consumes: the exact class/id names produced by Task 1 (`.site-nav`, `.site-nav__brand`, `.site-nav__links`, `#work`/`.section--work`, `#about`/`.section--about`, `#play`/`.section--play`, top-level `<section class="section">`).
- Produces: `style.css`, the final artifact of this plan. Nothing downstream depends on it.

- [ ] **Step 1: Write `style.css`**

Create `/Users/ethanmoon/ethanhmoon.github.io/style.css` with this exact content:

```css
:root {
  --color-work: #ff6b6b;
  --color-about: #4dabf7;
  --color-play: #f5a623;
  --color-bg: #fdfdfd;
  --color-text: #22223b;
  --nav-height: 64px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
}

.site-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-height);
  padding: 0 1.5rem;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.site-nav__brand {
  font-weight: 700;
  font-size: 1.1rem;
}

.site-nav__links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-nav__links a {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 600;
  padding: 0.4rem 0.2rem;
  border-bottom: 3px solid transparent;
  transition: border-color 0.2s ease;
}

.site-nav__links a:hover {
  border-bottom-color: currentColor;
}

.section {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 1.5rem;
  max-width: 720px;
  margin: 0 auto;
}

.section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section p {
  font-size: 1.15rem;
  line-height: 1.6;
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.section--work h1 {
  color: var(--color-work);
}

.section--about h1 {
  color: var(--color-about);
}

.section--play h1 {
  color: var(--color-play);
}

@media (max-width: 480px) {
  .site-nav__links {
    gap: 0.75rem;
  }

  .section h1 {
    font-size: 2rem;
  }
}
```

- [ ] **Step 2: Verify structure with `grep`**

Run:
```bash
grep -c 'scroll-behavior: smooth;' style.css
grep -c '.site-nav {' style.css
grep -c '.section--work h1' style.css
grep -c '.section--about h1' style.css
grep -c '.section--play h1' style.css
grep -c '@media (max-width: 480px)' style.css
```
Expected: every command prints `1`.

- [ ] **Step 3: Manual browser check of the finished page**

Reload `index.html` in the browser (same tab as Task 1, Step 3 — no server needed since `style.css` is a relative sibling file). Confirm:
- Nav bar is sticky: scroll down and it stays pinned to the top.
- "Work", "About", "Play" headings each render in a different accent color.
- Each section's paragraph appears as a rounded white card with a soft shadow.
- Resize the browser window to a narrow (mobile) width — layout stays single-column and readable, nav links wrap or stay compact rather than overflowing.

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "$(cat <<'EOF'
Add style.css: playful sticky-nav layout for Work/About/Play

Distinct accent color per section, rounded card content blocks,
responsive down to mobile widths. Completes the basic personal
site skeleton.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
