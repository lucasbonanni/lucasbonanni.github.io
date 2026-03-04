# Copilot Instructions

## Overview

This is a personal website/blog for Lucas Bonanni, built with [Hugo](https://gohugo.io/) using the [Hugo Blox Academic CV theme](https://github.com/HugoBlox/theme-academic-cv). It is deployed to GitHub Pages via a GitHub Actions workflow.

Hugo version: **0.136.5** (extended).

## Build Commands

```bash
# Serve locally with live reload
hugo server

# Build for production
hugo --minify

# Build and generate Pagefind search index (mirrors CI)
hugo --gc --minify && npx pagefind --source "public"
```

There are no test or lint commands for this project.

## Architecture

- **`config/_default/`** — All Hugo configuration split across files:
  - `hugo.yaml` — Core settings (baseURL, taxonomies, output formats)
  - `params.yaml` — Theme appearance (dark mode, orange color, analytics IDs)
  - `menus.yaml` — Top nav links
  - `module.yaml` — Hugo module imports (Hugo Blox Builder, Tailwind, Microsoft Clarity)
  - `languages.yaml` — Internationalization settings

- **`content/`** — All site content in Markdown with YAML front matter:
  - `_index.md` — Homepage layout, composed of `block:` sections (landing page)
  - `authors/admin/_index.md` — Primary profile: bio, work history, skills, awards
  - `post/*/index.md` — Blog posts (use `featured.jpg` for post hero images)
  - `experience.md`, `projects.md` — Standalone pages
  - `publication/`, `event/`, `teaching/` — Additional content types

- **`layouts/partials/hooks/`** — Custom Hugo partial overrides for the theme

- **`assets/`** — Custom CSS (`assets/css/`) and media (`assets/media/`). Custom SVG icons go in `assets/media/icons/`.

- **`static/uploads/`** — Static files served at `/uploads/`, e.g. `resume.pdf`

- **`.github/workflows/publish.yaml`** — Deploys `master` branch to GitHub Pages using `peaceiris/actions-hugo@v3`.

## Key Conventions

- **Homepage sections** are defined in `content/_index.md` using `block:` keys (e.g., `resume-biography-3`, `collection`, `markdown`). Sections with `demo: true` are only visible on the Hugo Blox demo site — set to `false` to show on this site.

- **Author profile** lives entirely in `content/authors/admin/_index.md` as YAML front matter. This single file drives the biography block, skills, work history, education, awards, and social links on the homepage.

- **Blog posts** use the page bundle pattern: each post is a directory under `content/post/` containing `index.md` and optionally `featured.jpg`.

- **Theme customization** uses Hugo Blox's YAML-based params (in `config/_default/params.yaml`) rather than raw CSS where possible. The current theme color is `orange`, mode is `dark`.

- **Hugo Modules** (not a local theme copy): the theme is pulled via `go.mod`/`go.sum` at build time from `github.com/HugoBlox/hugo-blox-builder`.

- **Pagefind** search index is generated post-build (`npx pagefind --source "public"`) and must be run after every Hugo build for search to work.

- The `baseURL` in `config/_default/hugo.yaml` is set to `'https://example.com/'` — the CI overrides this at build time via `--baseURL`.
