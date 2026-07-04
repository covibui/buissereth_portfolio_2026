# Content Guide

Everything a non-developer needs to add or edit content on this site, plus how to extend the content layer itself.

## Directory structure

```
content/
├── config/
│   └── site.yaml            — site identity, nav, footer (YAML — no prose body)
├── pages/
│   ├── home.md               — the "/" route
│   ├── work.md                — the "/work" index route's intro
│   ├── personal.md            — the "/personal" route
│   └── resume.md               — the "/resume" route
├── posts/
│   └── *.md                    — one file per work case study, routed at /work/<filename>
└── personal-projects/
    └── *.md                     — one file per "off the clock" project, listed on /personal
```

**Why YAML only for `config/`:** navigation links, the footer CTA, and site identity are pure structured data — labels and hrefs, no prose. Every other content type has a real prose body (a case study's Problem/Approach/Outcome, a page's point-of-view essay), so it's authored as Markdown with YAML frontmatter for the structured bits. That's the rule this project follows: **Markdown+frontmatter by default; plain YAML only when there's no body copy to write.**

## How rendering works

1. [`lib/content.ts`](lib/content.ts) reads a file and splits it into raw frontmatter (`unknown`) + Markdown body text, via `gray-matter`.
2. [`lib/validators.ts`](lib/validators.ts) has one type-guard function per content type (e.g. `isPostFrontmatter`) that checks the raw frontmatter's shape at runtime and narrows it from `unknown` to a typed interface. If a file's frontmatter doesn't match, the type guard fails and the loader throws — **the build fails loudly instead of shipping a broken page.**
3. [`lib/markdown.ts`](lib/markdown.ts) renders the Markdown body to HTML via `remark` → `remark-gfm` → `remark-rehype` → `rehype-slug` → `rehype-stringify`.
4. Type-specific loaders in `lib/pages.ts`, `lib/posts.ts`, `lib/projects.ts`, `lib/config.ts` tie the above together and are what route files (`app/**/page.tsx`) actually import.

## Frontmatter reference

### `content/config/site.yaml` → `SiteConfig`

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `name` | `string` | ✅ | — | Full name shown in the header wordmark and footer copyright. |
| `discipline` | `string` | ✅ | — | Short discipline label next to the name in the header (hidden on mobile). |
| `email` | `string` | ✅ | — | Contact email — used for the header "Contact" button and footer mailto link. |
| `phone` | `string` | optional | — | Not currently rendered by `SiteConfig` consumers; kept for parity with the résumé's own contact block. |
| `location` | `string` | optional | — | Same as `phone`. |
| `nav` | `NavLink[]` (`{ label, href }`) | ✅ | — | Header navigation links, in order. |
| `footerCtaLabel` | `string` | ✅ | — | Small eyebrow label above the footer's CTA headline (e.g. "Let's talk"). |
| `footerCtaHeadline` | `string` | ✅ | — | Large footer CTA headline. |
| `footerLinks` | `FooterLink[]` (`{ label, href }`) | ✅ | — | Footer link row (social links, résumé, etc). |
| `copyrightName` | `string` | ✅ | — | Name shown in the footer's "© year Name" line. |
| `copyrightYear` | `number` | ✅ | — | Year shown in the same line. |

### `content/pages/{home,work,personal}.md` → `PageFrontmatter`

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | `string` | ✅ | — | `<title>` tag and default OG title. |
| `description` | `string` | ✅ | — | Meta description. |
| `eyebrow` | `string` | ✅ | — | Small kicker line above the hero `<h1>`. Rendered through the inline-Markdown pass, so `*word*` works. |
| `heroHeadline` | `string` | ✅ | — | The hero `<h1>`. Use `*word*` for the accent-colored italic word (renders as `<em>`). |
| `heroLede` | `string` | optional | — | Paragraph under the headline. Omit to render no lede. |
| `heroCta` | `{ label, href }` | optional | — | If set, the lede and CTA render together in a bordered row (see Home). If omitted, the lede renders alone (see Personal/Work). |
| `showHeroReveal` | `boolean` | optional | `true` | Toggles the cursor-spotlight image-reveal effect behind the hero. Set `false` for pages without a hero image concept (e.g. Work). |
| `heroRevealLabel` | `string` | optional | — | Caption shown inside the reveal placeholder box. |

The Markdown **body** of `home.md` is the Point-of-View section (an intro paragraph plus `## ` headed principles) — it's rendered as-is via `Prose`, so headings and paragraphs you add there show up automatically. `work.md` and `personal.md` currently have empty bodies since their content is fully driven by the posts/projects collections.

### `content/pages/home.md` → `HomeFrontmatter` (extends `PageFrontmatter`)

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `featuredLabel` | `string` | ✅ | — | Heading above the featured-cases strip (e.g. "Featured Cases"). |
| `featuredCountLabel` | `string` | ✅ | — | Small label next to it (e.g. "Three of nine"). |
| `povEyebrow` | `string` | ✅ | — | Eyebrow label above the Point-of-View section. |
| `archiveTeaserHeadline` | `string` | ✅ | — | Headline in the closing "browse the archive" strip. |
| `archiveTeaserCta` | `{ label, href }` | ✅ | — | CTA link in that strip (typically `/work`). |

### `content/pages/resume.md` → `ResumeFrontmatter`

This page is *not* a `PageFrontmatter` — it's almost entirely structured data, so it gets its own interface.

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` / `description` | `string` | ✅ | — | `<title>` / meta description. |
| `eyebrow` | `string` | ✅ | — | e.g. "Curriculum Vitae". |
| `name` | `string` | ✅ | — | Large `<h1>` name. |
| `downloadCtaLabel` | `string` | ✅ | — | Label for the "Download PDF" pill button. |
| `downloadHref` | `string` | ✅ | — | Link/path to an actual PDF once one exists (`#` until then). |
| `contact.email` | `string` | ✅ | — | — |
| `contact.phone` | `string` | optional | — | — |
| `contact.location` | `string` | optional | — | — |
| `contact.note` | `string` | optional | — | e.g. "Open to relocating". |
| `focus` | `string[]` | ✅ | — | Sidebar "Focus" list. |
| `tools` | `string[]` | ✅ | — | Sidebar "Tools" list. |
| `roles` | `{ title, company, dates, blurb }[]` | ✅ | — | Experience section, in display order. |
| `education` | `{ title, place, year }[]` | ✅ | — | Education & Recognition section, in display order. |

The Markdown **body** is the one-paragraph professional summary shown under the name.

### `content/posts/*.md` → `PostFrontmatter`

One file per work case study. The route `/work/<filename-without-extension>` is generated automatically for every file in this directory — **the filename is the slug.**

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | `string` | ✅ | — | Case title. |
| `client` | `string` | ✅ | — | Anonymized client/industry descriptor — **never a real company name for NDA'd work.** |
| `year` | `string` | ✅ | — | Free text — `"2025"`, `"Ongoing"`, `"EPAM · 2021–2023"`, etc. |
| `disciplines` | `string[]` | ✅ | — | e.g. `["Branding", "Design Systems"]`. `disciplines[0]` is used as the short label next to the index number in list views. |
| `summary` | `string` | ✅ | — | One-line summary shown in list/card views and as the case detail page's sub-headline. |
| `order` | `number` | ✅ | — | Sort order and the "01 —" style index number. Must be unique. |
| `featured` | `boolean` | ✅ | — | `true` → shown in the "Live & Ongoing" featured strip (Home + top of Work index). `false` → compact archive row. |
| `coverLabel` | `string` | optional | case title | Caption on the placeholder image box until a real cover photo exists. |
| `gallery` | `string[]` | optional | — | Filenames to drop into `public/images/work/<slug>/` once real photos exist. Until then, each entry renders one placeholder "Artifact" box on the case detail page — the array length is what matters today, the filenames are for later. |
| `liveUrl` | `string` | optional | — | Link to a live version of the project, if public. |
| `pullQuote` | `string` | optional | — | Rendered as a large pull-quote near the top of the case detail page. Omit rather than inventing one — see the note on honesty below. |
| `outcomes` | `{ label, description }[]` | optional | — | The dark "What changed" stat-style grid at the bottom of a case detail page. Keep `label` short (2–3 words) and `description` qualitative — no invented numbers (see below). |

Body sections are conventionally `## Problem`, `## Approach`, `## Outcome` (see any file in `content/posts/` for the pattern), but any Markdown works — headings, paragraphs, blockquotes, lists, and links are all rendered.

**A note on honesty in case studies:** several posts in this project describe NDA'd enterprise work. The convention followed throughout is: anonymize the client, never invent a metric or number that wasn't confirmed, and for `Ongoing` engagements, frame the "Outcome" section as *what's underway* rather than a completed result. Keep following that convention when you add a new case — it's a house style, not a technical constraint, but it's the whole reason `client` says "a global cosmetics company" instead of a real name.

### `content/personal-projects/*.md` → `ProjectFrontmatter`

One file per personal project on `/personal`. Unlike posts, these don't get individual detail pages — they're listed inline on the Personal page in `order`.

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | `string` | ✅ | — | Project title. |
| `order` | `number` | ✅ | — | Sort order and the "01 —" index number. Must be unique. |
| `category` | `string` | ✅ | — | Short category shown next to the index number (e.g. "Cooking"). |
| `tags` | `string[]` | ✅ | — | Pill tags under the description. The literal tag `"Live"` renders in the accent color; every other tag renders in the default muted style. |
| `imageLabel` | `string` | ✅ | — | Caption on the placeholder image box. |
| `liveUrl` | `string` | optional | — | Link to the live project, if public. |

The Markdown body is the one-paragraph project description.

## How to add a new page (Home/Work/Personal pattern)

1. Copy an existing file in `content/pages/` closest to what you need.
2. Fill in every `PageFrontmatter` field (see table above).
3. If it needs a new route, add `app/<route>/page.tsx` following the pattern in `app/personal/page.tsx` — call the matching loader from `lib/pages.ts`, pass frontmatter through `renderInlineMarkdown` for the hero fields, and render `<Hero>` + whatever body content the page needs.
4. Add the route to `content/config/site.yaml`'s `nav` array if it should appear in the header.

## How to add a new case study or personal project

**Case study:** create `content/posts/<slug>.md`, fill in every required `PostFrontmatter` field, pick a unique `order`, and write the body in `## Problem` / `## Approach` / `## Outcome` sections. The `/work/<slug>` route, its static params, and its listing on `/work` and (if `featured: true`) on `/` all happen automatically — no code changes needed.

**Personal project:** create `content/personal-projects/<slug>.md` the same way, using `ProjectFrontmatter`. It appears automatically on `/personal` in `order`.

## How to add a brand-new content type, end to end

Say you want a `content/talks/*.md` type for conference talks. The full path:

1. **Define the shape** — add a `TalkFrontmatter` interface to [`lib/types.ts`](lib/types.ts). This is the single source of truth; every other step just implements it.
2. **Add a validator** — add `isTalkFrontmatter(value: unknown): value is TalkFrontmatter` to [`lib/validators.ts`](lib/validators.ts), following the pattern of `isPostFrontmatter`.
3. **Add a loader** — add `lib/talks.ts` following the pattern of `lib/projects.ts` (or `lib/posts.ts` if it needs individual detail pages): use `readAllContentFiles`/`readContentFile` from `lib/content.ts` with your new validator, and `markdownToHtml` from `lib/markdown.ts` for the body.
4. **Add content files** — create `content/talks/` and add at least one realistic, fully-filled-in example file (not an empty skeleton — see every existing file in `content/` for the standard this project holds itself to).
5. **Add a route** — create `app/talks/page.tsx` (index) and, if talks need individual pages, `app/talks/[slug]/page.tsx` with a `generateStaticParams` function (required for `output: "export"` — see `app/work/[slug]/page.tsx` for the pattern, including the `notFound()` handling for an invalid slug).
6. **Add components as needed** — put anything reusable in `components/`, following the existing components' pattern of a `.tsx` file paired with a co-located `.module.css` file.
7. **Document it** — add a table to this file, following the format above.

Because every loader validates its content type's frontmatter at build time, a typo in a new `content/talks/*.md` file (a missing required field, a `string` where a `number` was expected) fails `npm run build` immediately with a clear error naming the file — it can't silently ship a broken page.
