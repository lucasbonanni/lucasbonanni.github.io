# Lucas Bonanni — Personal Site Implementation Plan

**Goal:** Build the `themes/open-gear/` custom Hugo theme using the `example/` HTML prototype as the exact visual and structural reference. Deploy to GitHub Pages via GitHub Actions, with incremental conventional commits per phase.

**Branch:** `feat/open-gear-theme`
**Hugo version:** 0.136.5 (extended)
**Theme:** `themes/open-gear/` (custom, built from scratch)

---

## Decisions Log

| Topic | Decision |
|---|---|
| Theme strategy | Build `themes/open-gear/` to mirror `example/` prototype exactly |
| Old Hugo Blox files | Keep in place, do not touch |
| Views & likes | Skip for now — document in backlog |
| Contact form | `mailto:` link for now — service TBD later |
| Deployment | GitHub Pages via GitHub Actions |
| Comments | Document options — decide later (see backlog) |
| Analytics | Google Analytics GA4 |
| Jupyter Notebooks | Document options — decide later (see backlog) |
| Config format | TOML split config under `config/_default/` |
| Languages | English (default) + Spanish |
| Brand primary colour | `#FF6A00` — configurable via `params.toml` → injected as CSS custom property |
| Root `hugo.toml` | Overwrite completely — no backup needed |
| Existing content in `archives/` | Ignore — start fresh with sample placeholder content |
| Syntax highlight | `dracula` (configurable via `params.toml`) |
| Author data storage | `content/authors/<slug>/_index.md` — Hugo `authors` taxonomy; single source of truth for bio, certs, work history, socials, resume; auto-generates bio page at `/authors/<slug>/` |
| `params.toml` author fields | Removed — only site-level settings live in `params.toml` |
| Homepage section visibility | Per-section boolean flags in `params.toml` `[homepage]` (`showHowIWork`, `showServices`, `showProjects`, `showBlog`) |
| Homepage item counts | `params.toml` `[homepage]` `projectsCount` and `blogCount` — controls how many items show in each preview section |
| "How I work" content | `data/homepage.toml` `[[howIWork.steps]]` array — each step has `number`, `title`, `description`, `icon` (inline SVG) |
| "Services" content | `data/homepage.toml` `[[services.items]]` array — each service has `title`, `description`, `icon` (inline SVG) |
| Projects content source | `content/project/` section — queried by `index.html` layout via `where .Site.RegularPages "Section" "project"` |
| Blog content source | `content/post/` section — queried by `index.html` layout via `where .Site.RegularPages "Section" "post"` |

---

## Phases

### Phase 0 — Foundation
> Blocks everything else. Sets up Hugo project and CI pipeline.

- [x] **Overwrite** root `hugo.toml` → `baseURL`, `title`, `theme = "open-gear"` (clean slate, no Blox remnants)
- [x] Create `config/_default/hugo.toml` — taxonomy, markup settings, section outputs, syntax highlight
- [x] Create `config/_default/params.toml` — brand colours (`primaryColor = "#FF6A00"`, `accentColor = "#004F6E"`), socials, GA4 ID, feature toggles
- [x] Create `config/_default/languages.toml` — `[en]` (default) + `[es]`
- [x] Create `config/_default/menus.en.toml` and `config/_default/menus.es.toml` — nav links
- [x] Create/update `.github/workflows/deploy.yaml` → `peaceiris/actions-hugo` → `hugo --gc --minify` → GH Pages
- [x] Verify `hugo server -D` builds without errors

```
commit: feat: initialize hugo site scaffold with open-gear theme
```

---

### Phase 1 — Design System Port
> Ports the full CSS + JS design system from the HTML prototype. Can run in parallel with Phase 0.

- [x] Copy `example/assets/css/style.css` → `themes/open-gear/assets/css/main.css`; replace hardcoded `#FF6A00` / `#004F6E` with CSS custom properties (`--color-primary`, `--color-accent`) and inject them from a Hugo-generated `<style>` block driven by `params.toml`
- [x] Copy `example/assets/js/main.js` → `themes/open-gear/assets/js/main.js`
- [x] Move parallax hero image → `static/images/hero-bg.jpg`
- [x] Copy brand logo/icon assets → `static/images/logo.png`
- [x] Add `themes/open-gear/layouts/partials/brand-vars.html` — outputs `<style>:root{--color-primary:{{ .Site.Params.primaryColor }};--color-accent:{{ .Site.Params.accentColor }}}</style>` injected in `<head>`

```
commit: feat(theme): port design system css and js from prototype
```

---

### Phase 2 — Base Layouts
> Shared HTML shell that all pages inherit from. Depends on Phase 0 & 1.

- [x] `themes/open-gear/layouts/_default/baseof.html` — `<html>`, head block, nav, `{{ block "main" }}`, footer
- [x] `themes/open-gear/layouts/partials/head.html` — charset, viewport, title, meta description, OG, Twitter Card, Google Fonts, CSS pipe, JS pipe
- [x] `themes/open-gear/layouts/partials/header.html` — gear logo SVG, nav links, dark-mode toggle, "Hire me" CTA, hamburger button (replaces stub header.html)
- [x] `themes/open-gear/layouts/partials/footer.html` — 3-column footer (brand + tagline, nav links, social icons) — data sourced from author taxonomy
- [x] `themes/open-gear/layouts/partials/analytics.html` — GA4 snippet, gated by `params.googleAnalytics`
- [x] Verify skip-link, ARIA `role="navigation"`, `role="main"` in place
- [x] `hugo server -D` builds without errors (22 pages, 0 errors)

```
commit: feat(theme): add base layout and shared partials
```

---

### Phase 3 — Homepage
> Depends on Phase 2.

- [ ] `themes/open-gear/layouts/index.html` — full homepage layout:
  - Parallax hero (`.hero-full__bg`) — headline/tagline from `content/_index.md` front matter
  - "How I work" section — rendered from `data/homepage.toml` `[[howIWork.steps]]`; hidden when `params.homepage.showHowIWork = false`
  - "Services" section — rendered from `data/homepage.toml` `[[services.items]]`; hidden when `params.homepage.showServices = false`
  - "Recent projects" preview — `where .Site.RegularPages "Section" "project" | first .Site.Params.homepage.projectsCount`; hidden when `showProjects = false`
  - "Latest articles" preview — `where .Site.RegularPages "Section" "post" | first .Site.Params.homepage.blogCount`; hidden when `showBlog = false`
- [ ] `content/_index.md` — hero headline and tagline in front matter (falls back to `params.toml` values)
- [ ] `data/homepage.toml` ✅ — created with `[[howIWork.steps]]` (4 items) and `[[services.items]]` (6 items), each with `title`, `description`, `icon` (inline SVG)
- [ ] `params.toml` `[homepage]` block ✅ — visibility flags (`showHowIWork`, `showServices`, `showProjects`, `showBlog`) and counts (`projectsCount`, `blogCount`)
- [ ] Create 3 sample projects under `content/project/` and 3 sample posts under `content/post/` so homepage previews render
- [ ] Verify parallax on desktop (CSS `background-attachment: fixed`) and mobile (JS `translateY`)
- [ ] `hugo server -D` builds without errors

```
commit: feat(home): add homepage layout with parallax hero
```

---

### Phase 4 — Blog
> Depends on Phase 2. Can run in parallel with Phase 5.

- [ ] `themes/open-gear/layouts/post/list.html` — hero strip, filter bar (`data-filter-target`), article grid (3 cols)
- [ ] `themes/open-gear/layouts/post/single.html` — article header, body, related posts partial, social share inline buttons, code blocks
- [ ] `themes/open-gear/layouts/partials/related.html` — Hugo `.Site.RegularPages.Related` section
- [ ] Create 3 fresh sample post page-bundles under `content/post/` (no migration from `archives/`)
- [ ] Set `markup.highlight.style = "dracula"` in `config/_default/hugo.toml`
- [ ] `hugo server -D` builds without errors

```
commit: feat(blog): add blog list and single post layouts
```

---

### Phase 5 — Projects
> Depends on Phase 2. Can run in parallel with Phase 4.

- [ ] `themes/open-gear/layouts/project/list.html` — featured project row + full project grid with filter bar
- [ ] `themes/open-gear/layouts/project/single.html` — project detail page
- [ ] Create 3 fresh sample projects under `content/project/` (no migration from `archives/`)
- [ ] `hugo server -D` builds without errors

```
commit: feat(projects): add project list and single layouts
```

---

### Phase 6 — Team & Bio
> Depends on Phase 2.

- [ ] `themes/open-gear/layouts/team/list.html` — mission section + team card grid (avatar initials, name, role, bio link)
- [ ] `themes/open-gear/layouts/authors/single.html` — bio hero (initials avatar), summary paragraph, resume PDF download button, certificates card grid, work timeline
- [ ] `content/team/_index.md` — mission copy
- [ ] `content/authors/lucas-bonanni/_index.md` — bio, certs array, work history array in YAML front matter
- [ ] Add `static/uploads/resume.pdf` placeholder
- [ ] `hugo server -D` builds without errors

```
commit: feat(team): add team page and bio layout with timeline
```

---

### Phase 7 — Contact Page
> Depends on Phase 2.

- [ ] `themes/open-gear/layouts/contact/single.html` — info cards (location, `mailto:` email, socials), CTA section
- [ ] `content/contact/_index.md` — contact copy
- [ ] `hugo server -D` builds without errors

```
commit: feat(contact): add contact page with mailto link
```

---

### Phase 8 — SEO & Analytics
> Depends on Phases 3–7 being complete.

- [ ] JSON-LD schema partial: `Person` on bio, `Article` on post single, `WebSite` on home — injected via `head.html` by `.Type` / `.Layout`
- [ ] Canonical URL, full OG + Twitter Card meta per page type in `head.html`
- [ ] Favicon: inline SVG gear icon + `static/favicon.png` fallback
- [ ] `themes/open-gear/layouts/robots.txt` template
- [ ] Wire GA4 snippet through `partials/analytics.html` + `params.toml` `googleAnalytics`
- [ ] Validate OG tags via opengraph.dev after deploy

```
commit: feat(seo): add json-ld schemas, og meta, favicon and ga4
```

---

### Phase 9 — Multilingual (EN + ES)
> Depends on Phase 8.

- [ ] Finalize `config/_default/languages.toml` — `contentDir` for `content/en/` and `content/es/`
- [ ] Create `i18n/en.yaml` — nav labels, UI strings (Read more, Published on, Download CV…)
- [ ] Create `i18n/es.yaml` — Spanish translations of all UI strings
- [ ] Mirror content structure in `content/es/` (homepage, blog, projects, team, contact)
- [ ] Add language switcher to `nav.html` partial (toggles between `/en/` and `/es/` for same page)
- [ ] Verify RTL-safe CSS (no hard-coded left/right margins without logical property fallback)
- [ ] `hugo server -D` builds both languages without errors

```
commit: feat(i18n): add english and spanish multilingual support
```

---

### Phase 10 — Advanced Content Features
> Depends on Phase 9.

- [ ] **Mermaid:** load `mermaid.js` conditionally when page front matter has `mermaid: true`
- [ ] **KaTeX:** load KaTeX CSS + auto-render JS in `head.html` when `math: true`
- [ ] **Social share** buttons partial in `post/single.html` (Twitter/X, LinkedIn, copy-link)
- [ ] **RSS:** configure section-level outputs in `config/_default/hugo.toml`
- [ ] **Nested menus:** support `parent` key in `menus.en.toml` + sub-nav dropdown in `nav.html`
- [ ] `hugo server -D` builds without errors

```
commit: feat(content): enable mermaid, katex, related articles, rss and social share
```

---

### Phase 11 — Performance & Accessibility Polish
> Final quality gate before public launch.

- [ ] Hugo Pipes image processing — WebP conversion + responsive `srcset` via `figure` shortcode
- [ ] `hugo --minify` confirmed in CI
- [ ] ARIA landmark audit across all templates
- [ ] Keyboard navigation check (Tab order, focus rings)
- [ ] Run Lighthouse audit — target ≥ 95 on Performance, Accessibility, Best Practices, SEO
- [ ] Fix any Lighthouse findings

```
commit: fix(a11y): performance and accessibility improvements
```

---

## Verification Checklist (per phase)

- [ ] `hugo server -D` exits clean (no errors, no broken template refs)
- [ ] Dark-mode toggle persists in `localStorage` across page navigations
- [ ] Parallax hero works on desktop (CSS `fixed`) and touch (JS `translateY`)
- [ ] Nav active-state is correct on every page
- [ ] All internal links resolve (no 404s in browser console)
- [ ] Mobile hamburger menu opens and closes cleanly
- [ ] OG image + title visible via opengraph.dev after a deployed commit
- [ ] Spanish URLs (`/es/blog/`) resolve and UI strings translate correctly
- [ ] GA4 events fire in DebugView after deploy
- [ ] Lighthouse score ≥ 95 across all four categories

---

## Backlog — Documented, Not Yet Scheduled

### Views & Likes
- Backend recommended: **Supabase** (open source, generous free tier, REST API)
- One Supabase table per content type (posts, projects): `id`, `slug`, `views`, `likes`
- Small vanilla JS fetch on page load (increment view) and on ❤ button click (increment like)
- Hugo shortcode `{{< view-counter >}}` embeds the counter on post/project pages

### Comments
| Option | Notes |
|---|---|
| **Giscus** *(recommended)* | GitHub Discussions, no ads, privacy-friendly, theming support, easy setup |
| Utterances | GitHub Issues, simpler, less features |
| Disqus | Rich features but shows ads on free tier, tracks users |

### Jupyter Notebooks
| Option | Notes |
|---|---|
| **nbconvert on CI** *(recommended)* | `ipynb → md` conversion before Hugo build; full code highlighting, no iframes; moderate CI complexity |
| nbviewer / GitHub iframe | Simple shortcode, no CI change; limited visual integration with site theme |

### Contact Form (when `mailto:` is not enough)
| Option | Notes |
|---|---|
| **Formspree** *(recommended)* | Drop-in `action` URL, generous free tier, no backend needed |
| Netlify Forms | Works only when deployed on Netlify |
| EmailJS | Client-side only, no backend, limited free tier |

### Search
- **Pagefind** (recommended): post-build `npx pagefind --source public`, add UI widget to nav bar
- Zero server cost, static file index, fast

---

## Reference Files

| File | Purpose |
|---|---|
| `example/assets/css/style.css` | Full design system to port (2,500+ lines) |
| `example/assets/js/main.js` | Dark mode + parallax + mobile nav + filters (380 lines) |
| `example/index.html` | Homepage structure reference |
| `example/blog.html` | Blog list with filter bar reference |
| `example/projects.html` | Projects list reference |
| `example/team.html` | Team page reference |
| `example/bio/lucas.html` | Bio page (timeline, certs, resume button) |
| `example/contact.html` | Contact page reference |
| `themes/open-gear/` | Empty scaffold to build into |
| `.github/workflows/` | CI/CD pipeline |
