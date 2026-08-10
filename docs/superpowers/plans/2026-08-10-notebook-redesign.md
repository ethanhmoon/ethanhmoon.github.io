# Minimal Hand-Drawn Notebook Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Work/About/Play page with a minimal, hand-drawn notebook-style personal site: three static pages (about, works, contact) sharing a fixed left sidebar, plain white background, one yellow accent color, and inline-SVG doodles/squiggle.

**Architecture:** Four static files at the repo root — `index.html` (about/landing), `works.html`, `contact.html`, and a shared `style.css` — replacing the current `index.html`/`style.css` entirely. No JS, no build step. Google Fonts (Patrick Hand + Inter) loaded via `<link>` in each page's `<head>`.

**Tech Stack:** Plain HTML5 + CSS3 + Google Fonts. No frameworks, no build tooling, no JS.

## Global Constraints

- No JavaScript, no build tooling. Google Fonts is the one permitted external dependency (explicitly requested by the user for this design).
- No language toggle — explicitly declined, do not add even as a placeholder.
- No borders, box-shadows, gradients, or card-style backgrounds anywhere on the site. Black text (`#1a1a1a`) on white (`#ffffff`).
- Exactly one accent color, `#e8b923` (warm yellow), used **only** for the squiggle underline under the active nav link — nowhere else (not on hover states, not on links, not on doodles).
- All prose/nav copy is lowercase, first-person, casual/diaristic — not promotional.
- The sidebar (brand "ethan moon." + about/works/contact nav) is byte-identical in structure across all three HTML files, except for which link carries `sidebar__nav-link--active` and the squiggle SVG. **This duplication is intentional** — there is no build/templating step, so each static page repeats the sidebar markup. Do not flag this as a DRY violation; do not introduce JS or a templating step to deduplicate it.
- The two doodle SVGs (notebook+pen, mug) appear **only** on `index.html`, not on `works.html` or `contact.html`.
- `works.html` content is placeholder text (flagged for the user to replace with real project details/links later) — do not invent additional projects or details beyond what's specified below.
- `contact.html` uses the user's real details: email `ethanmoon2000@yahoo.com`, GitHub `https://github.com/ethanhmoon`, LinkedIn `https://www.linkedin.com/in/ethanmoon17/`.
- This repo has no test framework — "testing" a step means a `grep` structural check against the file, or a manual/structural browser check.

---

### Task 1: Build `index.html` (about/landing page)

**Files:**
- Modify (full overwrite): `index.html` (currently the Work/About/Play page — this task replaces it entirely)
- Test: manual `grep` checks against `index.html`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: the canonical sidebar markup pattern — `.sidebar`, `.sidebar__brand`, `.sidebar__nav`, `.sidebar__nav-link`, `.sidebar__nav-link--active`, `.squiggle` (inline SVG) — that Task 2's `works.html`/`contact.html` must copy verbatim (only changing which link has `--active` and where the squiggle SVG sits). Also produces `.content`, `.doodles`, `.doodle`, `.doodle--notebook`, `.doodle--mug`, `.lines`, `.line` — the classes Task 3's `style.css` targets.

- [ ] **Step 1: Overwrite `index.html` with this exact content**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ethan moon.</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Patrick+Hand&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <aside class="sidebar">
    <div class="sidebar__brand">ethan moon.</div>
    <nav class="sidebar__nav">
      <a href="index.html" class="sidebar__nav-link sidebar__nav-link--active">
        about
        <svg class="squiggle" viewBox="0 0 60 10" aria-hidden="true">
          <path d="M1,6 Q7,1 13,6 T25,6 T37,6 T49,6 T60,5"/>
        </svg>
      </a>
      <a href="works.html" class="sidebar__nav-link">works</a>
      <a href="contact.html" class="sidebar__nav-link">contact</a>
    </nav>
  </aside>

  <main class="content">
    <div class="doodles">
      <svg class="doodle doodle--notebook" viewBox="0 0 120 90" aria-hidden="true">
        <rect x="10" y="10" width="70" height="60" rx="2" transform="rotate(-6 45 40)" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>
        <line x1="20" y1="30" x2="70" y2="26" stroke="#1a1a1a" stroke-width="1" transform="rotate(-6 45 40)"/>
        <line x1="20" y1="42" x2="70" y2="38" stroke="#1a1a1a" stroke-width="1" transform="rotate(-6 45 40)"/>
        <line x1="20" y1="54" x2="55" y2="51" stroke="#1a1a1a" stroke-width="1" transform="rotate(-6 45 40)"/>
        <line x1="75" y1="15" x2="105" y2="75" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="100" y1="65" x2="108" y2="80" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
      <svg class="doodle doodle--mug" viewBox="0 0 90 100" aria-hidden="true">
        <path d="M20 40 h40 v35 a20 20 0 0 1 -40 0 z" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>
        <path d="M60 48 q15 0 15 15 t-15 15" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>
        <path d="M28 30 q-4 -8 2 -14" fill="none" stroke="#1a1a1a" stroke-width="1" stroke-linecap="round"/>
        <path d="M40 30 q-4 -10 2 -18" fill="none" stroke="#1a1a1a" stroke-width="1" stroke-linecap="round"/>
        <path d="M52 30 q-4 -8 2 -14" fill="none" stroke="#1a1a1a" stroke-width="1" stroke-linecap="round"/>
      </svg>
    </div>

    <div class="lines">
      <p class="line">i'm ethan.</p>
      <p class="line">i like building small things that end up useful.</p>
      <p class="line">right now: dispatch, a way to make job hunting a little less miserable.</p>
      <p class="line">before that: robots.</p>
      <p class="line">i spend a lot of time in text editors and not enough time outside.</p>
      <p class="line">this site is a work in progress, like most things.</p>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 2: Verify structure with `grep`**

Run:
```bash
grep -c 'class="sidebar"' index.html
grep -c 'class="sidebar__brand"' index.html
grep -c 'sidebar__nav-link--active' index.html
grep -c 'class="squiggle"' index.html
grep -c 'class="doodle doodle--notebook"' index.html
grep -c 'class="doodle doodle--mug"' index.html
grep -c 'href="works.html"' index.html
grep -c 'href="contact.html"' index.html
grep -c 'class="line"' index.html
grep -c 'Patrick+Hand' index.html
```
Expected: every command prints `1`, except `class="line"` which prints `6`.

- [ ] **Step 3: Manual browser check**

Open `index.html` directly in a browser. Confirm (styling will look plain/unstyled — `style.css` still has the old Work/About/Play rules until Task 3 — this step only confirms markup/content, not visual design):
- Page title reads "ethan moon."
- Sidebar shows "ethan moon." and three links: about, works, contact.
- Six one-liner paragraphs appear in the main content area, in the order listed above.
- Two SVG doodle shapes render near the top of the main content (unstyled positioning is fine for now).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
Replace index.html with notebook-redesign about page

Overwrites the old Work/About/Play markup with the new sidebar +
about-page structure: brand, about/works/contact nav with an
active-link squiggle, two doodle SVGs, and six placeholder
one-liners. Styling (style.css) is updated in a later commit.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Build `works.html` and `contact.html`

**Files:**
- Create: `works.html`
- Create: `contact.html`
- Test: manual `grep` checks against both files

**Interfaces:**
- Consumes: the exact sidebar markup pattern from Task 1 (`.sidebar`, `.sidebar__brand`, `.sidebar__nav`, `.sidebar__nav-link`, `.sidebar__nav-link--active`, `.squiggle` SVG) and the `.content`/`.lines`/`.line` classes — reused here with `works`/`contact` as the active link instead of `about`, and no `.doodles` block on either page.
- Produces: nothing new that later tasks depend on structurally — Task 3's CSS already targets classes shared with Task 1.

- [ ] **Step 1: Create `works.html` with this exact content**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>works — ethan moon.</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Patrick+Hand&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <aside class="sidebar">
    <div class="sidebar__brand">ethan moon.</div>
    <nav class="sidebar__nav">
      <a href="index.html" class="sidebar__nav-link">about</a>
      <a href="works.html" class="sidebar__nav-link sidebar__nav-link--active">
        works
        <svg class="squiggle" viewBox="0 0 60 10" aria-hidden="true">
          <path d="M1,6 Q7,1 13,6 T25,6 T37,6 T49,6 T60,5"/>
        </svg>
      </a>
      <a href="contact.html" class="sidebar__nav-link">contact</a>
    </nav>
  </aside>

  <main class="content">
    <div class="lines">
      <p class="line">dispatch &mdash; a job aggregator i built to cut through the noise of job hunting. still shipping features.</p>
      <p class="line">robots &mdash; some robotics tinkering i've been doing on the side. more details coming soon.</p>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 2: Create `contact.html` with this exact content**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>contact — ethan moon.</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Patrick+Hand&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <aside class="sidebar">
    <div class="sidebar__brand">ethan moon.</div>
    <nav class="sidebar__nav">
      <a href="index.html" class="sidebar__nav-link">about</a>
      <a href="works.html" class="sidebar__nav-link">works</a>
      <a href="contact.html" class="sidebar__nav-link sidebar__nav-link--active">
        contact
        <svg class="squiggle" viewBox="0 0 60 10" aria-hidden="true">
          <path d="M1,6 Q7,1 13,6 T25,6 T37,6 T49,6 T60,5"/>
        </svg>
      </a>
    </nav>
  </aside>

  <main class="content">
    <div class="lines">
      <p class="line">email: <a class="text-link" href="mailto:ethanmoon2000@yahoo.com">ethanmoon2000@yahoo.com</a></p>
      <p class="line">github: <a class="text-link" href="https://github.com/ethanhmoon">github.com/ethanhmoon</a></p>
      <p class="line">linkedin: <a class="text-link" href="https://www.linkedin.com/in/ethanmoon17/">linkedin.com/in/ethanmoon17</a></p>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 3: Verify structure with `grep`**

Run:
```bash
grep -c 'class="sidebar"' works.html
grep -c 'sidebar__nav-link--active' works.html
grep -c 'class="squiggle"' works.html
grep -c 'class="doodle' works.html
grep -c 'dispatch &mdash;' works.html
grep -c 'robots &mdash;' works.html

grep -c 'class="sidebar"' contact.html
grep -c 'sidebar__nav-link--active' contact.html
grep -c 'class="squiggle"' contact.html
grep -c 'class="doodle' contact.html
grep -c 'mailto:ethanmoon2000@yahoo.com' contact.html
grep -c 'github.com/ethanhmoon' contact.html
grep -c 'linkedin.com/in/ethanmoon17' contact.html
```
Expected: every command prints `1`, except both `class="doodle` commands, which must print `0` (no doodles on these pages).

- [ ] **Step 4: Manual browser check**

Open `works.html` and `contact.html` directly in a browser. Confirm (still unstyled until Task 3):
- `works.html`: sidebar identical to `index.html` except "works" is the active link; two placeholder project lines render; no doodle SVGs present.
- `contact.html`: sidebar identical except "contact" is active; three lines render with working `mailto:`/`https:` links to the correct addresses; no doodle SVGs present.
- Clicking "about" from either page navigates back to `index.html`, and vice versa.

- [ ] **Step 5: Commit**

```bash
git add works.html contact.html
git commit -m "$(cat <<'EOF'
Add works.html and contact.html

Same sidebar pattern as index.html (works/contact marked active
respectively). Works page has two placeholder project entries;
contact page has real email/GitHub/LinkedIn links. No doodles on
either page, per the design.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Build `style.css` and verify the finished site

**Files:**
- Modify (full overwrite): `style.css` (currently styles the old Work/About/Play page — this task replaces it entirely)
- Test: manual `grep` checks against `style.css`, plus a manual browser check across all three pages

**Interfaces:**
- Consumes: the exact class names produced by Tasks 1–2 (`.sidebar`, `.sidebar__brand`, `.sidebar__nav`, `.sidebar__nav-link`, `.sidebar__nav-link--active`, `.squiggle`, `.content`, `.doodles`, `.doodle`, `.doodle--notebook`, `.doodle--mug`, `.lines`, `.line`, `.text-link`).
- Produces: `style.css`, the final artifact of this plan. Nothing downstream depends on it.

- [ ] **Step 1: Overwrite `style.css` with this exact content**

```css
:root {
  --color-text: #1a1a1a;
  --color-bg: #ffffff;
  --color-accent: #e8b923;
  --sidebar-width: 200px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  display: flex;
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  padding: 4rem 2rem;
}

.sidebar__brand {
  font-family: 'Patrick Hand', cursive;
  font-size: 1.5rem;
  margin-bottom: 3rem;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sidebar__nav-link {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  font-family: 'Patrick Hand', cursive;
  font-size: 1.2rem;
  color: var(--color-text);
  text-decoration: none;
}

.squiggle {
  display: block;
  width: 3em;
  height: 0.6em;
  margin-top: 2px;
}

.squiggle path {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 2;
  stroke-linecap: round;
}

.content {
  flex: 1;
  position: relative;
  padding: 4rem 3rem;
}

.doodles {
  position: absolute;
  top: 2rem;
  right: 3rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  opacity: 0.9;
}

.doodle {
  width: 70px;
  height: auto;
}

.doodle--notebook {
  transform: rotate(-4deg);
}

.doodle--mug {
  transform: rotate(6deg);
  margin-top: 1.5rem;
}

.lines {
  max-width: 480px;
}

.line {
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 1.5rem 0;
}

.text-link {
  color: var(--color-text);
  text-decoration: underline;
}

@media (max-width: 640px) {
  body {
    flex-direction: column;
  }

  .sidebar {
    width: auto;
    padding: 2rem 2rem 0.5rem;
  }

  .content {
    padding: 1rem 2rem 4rem;
  }

  .doodles {
    position: static;
    margin-bottom: 2rem;
  }

  .doodle--mug {
    margin-top: 0;
  }
}
```

- [ ] **Step 2: Verify structure with `grep`**

Run:
```bash
grep -c 'display: flex;' style.css
grep -c '.sidebar {' style.css
grep -c '.sidebar__nav-link {' style.css
grep -c '.squiggle {' style.css
grep -c '.squiggle path {' style.css
grep -c 'var(--color-accent)' style.css
grep -c '\-\-color-accent: #e8b923;' style.css
grep -c '.doodles {' style.css
grep -c '@media (max-width: 640px)' style.css
grep -c 'border:' style.css
grep -c 'box-shadow' style.css
grep -c 'gradient' style.css
```
Expected: every command prints `1`, except the last three (`border:`, `box-shadow`, `gradient`), which must print `0`. Note: `box-sizing: border-box;` is expected and fine — it does not match `border:` (no colon directly follows "border" there), so it won't trip this check. The `border:`/`box-shadow`/`gradient` checks exist to catch an actual decorative border, shadow, or gradient being added, which the design forbids.

- [ ] **Step 3: Manual browser check of the finished site**

Reload `index.html`, `works.html`, and `contact.html` in the browser (no server needed — `style.css` is a relative sibling file). Confirm:
- Sidebar sits fixed on the left on all three pages, content column to its right, generous whitespace throughout.
- The active page's nav link shows the yellow squiggle underneath it; the other two links show no squiggle.
- No borders, shadows, gradients, or card backgrounds are visible anywhere.
- On `index.html`, the notebook and mug doodles float loosely (offset, slightly rotated) in the upper-right of the content area, and don't overlap the text lines.
- Resize the browser to a narrow (mobile) width: sidebar stacks above the content column, doodles move above the text instead of overlapping it, layout stays readable with no horizontal scrolling.
- Nav links on all three pages correctly navigate between `index.html`, `works.html`, and `contact.html`.
- On `contact.html`, the email/GitHub/LinkedIn links are clickable and point to the correct addresses.

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "$(cat <<'EOF'
Add notebook-redesign style.css

Fixed left sidebar + content column layout, Patrick Hand for
brand/nav, Inter for body text, single yellow accent used only for
the active-link squiggle, no borders/shadows/gradients anywhere.
Responsive stacking below 640px. Completes the redesign.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
