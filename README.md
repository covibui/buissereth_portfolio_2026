# Brianna Buissereth — Portfolio

A static Next.js site (App Router, TypeScript) with all page content authored in Markdown/YAML under [`content/`](content/). See [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md) for how the content layer works and how to add pages, posts, or a whole new content type.

## Stack

- **Next.js** (App Router) with `output: "export"` — builds to a plain static `out/` directory, no Node server required at runtime.
- **TypeScript**, strict mode.
- **gray-matter** for YAML frontmatter, **remark**/**rehype** for Markdown → HTML.
- Plain CSS Modules for styling (no CSS framework dependency).

## Local development

Requires Node.js 18.18+ (Next.js 15's minimum).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edits to any file under `content/` are picked up on the next request in dev mode — no restart needed for content changes; component/route changes hot-reload as usual.

## Building

```bash
npm run build
```

This runs `next build` with `output: "export"` configured in [`next.config.ts`](next.config.ts), producing a fully static site in `out/`. The build fails on any TypeScript error or invalid content frontmatter (every content file is validated against its type guard in [`lib/validators.ts`](lib/validators.ts) at build time — a malformed `.md`/`.yaml` file throws rather than shipping broken data).

To type-check without a full build:

```bash
npm run typecheck
```

## Previewing the static export locally

```bash
npm run build
npx serve out
```

(Any static file server works — `serve`, `python3 -m http.server`, etc. `next start` will *not* work against the exported `out/` directory since there's no server; it's for non-exported builds only.)

## Deploying

The `out/` directory produced by `npm run build` is a plain static site — upload it as-is to any static host:

- **Netlify / Cloudflare Pages / Vercel (static)** — set the build command to `npm run build` and the publish directory to `out`.
- **GitHub Pages / S3 / any CDN** — copy the contents of `out/` to the host. If deploying under a sub-path (e.g. `username.github.io/repo-name`), set `basePath` in `next.config.ts`.

Because `trailingSlash: true` is set, every route exports as `route/index.html`, which is the layout most static hosts (including GitHub Pages) expect for clean URLs.

## Project structure

```
content/          — all site content (Markdown + YAML), see CONTENT_GUIDE.md
lib/              — content-loading utilities and TypeScript types
components/       — shared React components
app/              — routes (App Router)
public/           — static assets served as-is (e.g. /mark.png)
```
