# Portfolio

A single-page developer portfolio. Plain HTML, CSS and JavaScript — no build
step, no dependencies, nothing to install. Deploys to GitHub Pages on push.

```
index.html          the whole page — all content lives here
404.html            styled not-found page
assets/css/styles.css
assets/js/main.js   theme toggle, scroll reveals, active nav section
.github/workflows/deploy.yml
```

## Working on it locally

Open `index.html` in a browser, or serve it so relative paths behave exactly
as they will in production:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Making it yours

Everything editable is marked with an `EDIT:` comment in `index.html`.
Work through these in order:

- [ ] **Metadata** — `<title>`, description, and the `og:url` (set it once you
      know your Pages address).
- [ ] **Hero** — your name, the one-paragraph pitch, and the link buttons.
      Replace the placeholder GitHub / LinkedIn URLs with real ones, and drop
      a `resume.pdf` into `assets/` or delete that button.
- [ ] **Stats** — three numbers, or delete the `<dl class="stats">` block.
- [ ] **Selected work** — the four projects are placeholders. Replace them with
      real ones. To add another, copy a whole `<li class="project">` block.
      Lead each description with what the thing *does*, then the interesting
      engineering decision behind it.
- [ ] **About** — three short paragraphs, written the way you talk.
- [ ] **Stack** — your actual tools. Trim the groups; four is not a requirement.
- [ ] **Experience** — copy an `<li class="role">` block per job.
- [ ] **Contact** — your email, in both the hero and the contact section.
- [ ] **Footer** — the name.

### Changing the colours

The palette is six variables at the top of `assets/css/styles.css`, defined
twice: once on `:root` for light mode, once on `:root[data-theme='dark']`.
Change `--accent` in both and the whole page follows.

## Publishing to GitHub Pages

Create an empty repository on GitHub, then:

```sh
git remote add origin git@github.com:<you>/<repo>.git
git branch -M main
git push -u origin main
```

Then in the repository: **Settings → Pages → Build and deployment → Source →
GitHub Actions**. The included workflow takes it from there; every push to
`main` redeploys. The first run takes a minute or two, after which the URL
appears on that same Settings page.

**Two ways to name it.** A repository called `<your-username>.github.io`
publishes at `https://<your-username>.github.io/` — the cleaner address, and
the one worth using for a portfolio. Any other repository name publishes at
`https://<your-username>.github.io/<repo>/` instead. Every path in this site is
relative, so both work without changes.

### A custom domain

Add a file called `CNAME` at the repository root containing just your domain:

```
sandeeprathore.dev
```

Then point a `CNAME` DNS record at `<your-username>.github.io`, and tick
*Enforce HTTPS* under Settings → Pages once the certificate is issued.

## Notes

- `.nojekyll` stops GitHub from running the site through Jekyll, which would
  otherwise ignore any file or folder beginning with an underscore.
- The theme respects the visitor's OS preference until they touch the toggle,
  after which their choice is remembered in `localStorage`.
- All motion is disabled for visitors who have `prefers-reduced-motion` set.
