# Portfolio site

A single-page developer portfolio. Plain HTML, CSS and JavaScript.
**No build step, no package manager, no dependencies** — do not add any
without being asked. There is nothing to install and nothing to compile.

```
index.html              the entire page; all content lives here
404.html                not-found page
assets/css/styles.css   tokens at the top, then layout, then components
assets/js/main.js       theme toggle, scroll reveals, active nav section
```

## Deployment

`.github/workflows/deploy.yml` publishes the repository root to GitHub Pages
on every push to `main`. **A merge to `main` goes live immediately** at
https://sandeepsrathore.github.io/portfolio/ — treat changes to that workflow
with care.

Because the site is served from a `/portfolio/` sub-path, **every internal
path must stay relative** (`assets/css/styles.css`, never `/assets/...`).
A leading slash will 404 in production while still working locally.

## Content is placeholder

The projects, job entries, stats and stack list are invented placeholders,
not real history. Do not add more invented work, and do not present any of it
as fact. Spots that need the owner's input are marked `EDIT:` in `index.html`.
If a task needs real project details you do not have, say so rather than
filling the gap with plausible-sounding content.

## Conventions

- **Colour** comes from CSS custom properties defined twice in `styles.css`:
  once on `:root` (light) and once on `:root[data-theme='dark']`. Never
  hard-code a colour in a rule; add or reuse a token, and define it in both
  blocks or the dark theme silently breaks.
- **Two spaces** for indentation in HTML, CSS and JS. No semicolon-free JS;
  `main.js` is a plain IIFE in ES5 style with no transpiler behind it.
- **Comments explain why**, not what. Match the existing density.

## Things that must keep working

Any change to layout or markup should preserve these. They were verified once
and are easy to break:

- **No horizontal overflow at 320px.** The page must never scroll sideways.
- **The nav bar stays one row** at every width down to 320px; narrow screens
  hide individual links by media query rather than wrapping.
- **The page is readable without JavaScript.** Elements with `.reveal` start
  transparent, so anything that stops `main.js` running leaves the page blank.
  The inline script in `<head>` removes `.no-js` and sets the theme before
  first paint; keep it inline and keep it first.
- **`prefers-reduced-motion` disables all animation**, including the reveals.
- **The theme follows the OS** until the visitor uses the toggle, after which
  the choice persists in `localStorage`. Every storage access is wrapped in
  try/catch because private browsing throws.

## Checking your work

There are no tests. To verify a change, serve the directory and look at it:

```sh
python3 -m http.server 8000
```

Check both themes, and check a narrow viewport — most regressions here are
layout, not logic.
