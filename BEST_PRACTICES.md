# Best Practices — from PR #1 review (erikmartus)

Working notes distilled from the first real code review of this codebase. Read this before making structural changes to `app/` or `components/` so the same feedback doesn't need to be given twice.

## Component organization

**Every component with a dedicated `.module.css` gets its own directory**, not a flat `components/Foo.tsx` + `components/Foo.module.css` pair:

```
components/
  CaseArchiveRow/
    CaseArchiveRow.module.css
    index.tsx
```

The entry point is always `index.tsx` (so `@/components/CaseArchiveRow` still resolves — no import-site changes needed). The CSS module keeps the component's name, not `index.module.css`.

**Exclusive child components nest inside the parent's directory**, as plain sibling files (not their own subdirectory):

```
components/
  ProjectRow/
    ProjectRow.module.css
    Tag.tsx
    Tag.module.css
    index.tsx
```

Rule of thumb: if component B is imported by exactly one component A and nowhere else, B lives inside `components/A/`. Before nesting, grep for every import of B — `Tag` and `Prose` both looked like candidates for nesting under `ProjectRow`/`PointOfView` at first glance, but `Prose` is also used directly by `app/resume` and `app/work/[slug]`, so it stayed top-level. Don't trust "looks like it's only used here" — verify with a repo-wide search first.

A `.tsx` file is only allowed to sit directly in `components/` if it has no dedicated `.module.css` *and* no exclusive child components.

**Page-only components stay colocated with the route, not in `components/`.** `app/resume/RoleCard.tsx` and `app/resume/EducationRow.tsx` were extracted from inline `.map()` blocks in `app/resume/page.tsx` but were not moved into `components/` — they're not reused anywhere else, and Next.js App Router convention is to colocate route-specific pieces with the route.

## Typography

**One shared recipe for Pagio display headings.** `Hero`'s headline, resume's name, and each case study's title all render the same serif display treatment (font-family, ligature settings, weight, negative letter-spacing) as separately duplicated CSS. This is now a single global utility class, `.text-display`, defined in `app/globals.css` and applied alongside a component-specific sizing class:

```tsx
<h1 className={`${styles.title} text-display`}>{...}</h1>
```

`globals.css` is a plain (non-module) stylesheet imported once in `app/layout.tsx`, so `"text-display"` is referenced as a literal string, not through a CSS-module `styles` object — don't try to import it as a module.

**Letter-spacing on display headings must be in `em`, not `px`.** A fixed `letter-spacing: -6px` on a `font-size: clamp(...)` heading looks fine at the large end of the clamp and overlaps/breaks at the small end (mobile). `.text-display` uses `-0.08em`, which scales with font-size automatically — this is why `Hero.module.css` no longer needs its old `@media (max-width: 720px) { letter-spacing: -3px }` override; the em-based value already degrades gracefully.

**When a review comment says "this looks like it should be a list," it means a semantic `<ul>/<li>`,** not a `<p>` with manual `<br />` separators between mapped items. Applied to resume's Contact/Focus/Tools sidebar blocks.

**Sidebar/section labels ("Contact", "Focus", "Tools") are headings (`<h2>`), not `<p>`.** A visual label that introduces a distinct content block should carry heading semantics even if it isn't the largest text on the page. Don't assume "small caption-sized text" means `<p>`.

## Spacing

**Target an 8px (0.5rem) spacing scale for structural gaps/margins/padding** (8, 16, 24, 32, 40, 48, 56, 64...). This was only enforced in the file the reviewer actually flagged (`app/resume/page.module.css`) — values like `gap: 28px` became `32px`, `margin-bottom: 12px` became `16px`, etc. It was **not** applied as a blanket rewrite across every component, because:
- Fine-grained button/pill padding (e.g. `padding: 10px 18px`) is a deliberate visual choice, not a layout-spacing bug, and rewriting it without a design reference risks a silent visual regression.
- `clamp()`-based section-level padding (e.g. `padding: clamp(56px, 8vw, 110px) ...`) was explicitly called out by the reviewer as optionally fine to leave ("if that's okay, leave it") — fluid section padding is a legitimate choice, just flagged as a preference away from clamp for *page-level* spacing specifically.

If asked to extend this further, audit file-by-file and verify visually (dev server + browser) rather than a global find/replace.

## CSS variables

**Name CSS custom properties for what they render, not internal shorthand.** `--hair` (meant "hairline border color") read as nonsensical to an outside reviewer. Renamed to `--hairline` everywhere. General rule: a reviewer with zero context should be able to guess a variable's purpose from its name alone.

## Layout structure

**`<main>` belongs in `app/layout.tsx`, wrapping `{children}`, not repeated in every page component.** Every route previously opened with its own `<main>`; now the layout owns it and each page returns a fragment (`<>...</>`) or, if truly single-rooted, the element directly. `app/not-found.tsx` needed its centering styles moved from the (now-removed) page-level `<main>` onto a plain `<div>`, since it can no longer own its own `<main>` wrapper.

## Content/markdown handling

**Utilities that are called at every use-site of a component belong inside the component, not at the call site.** `renderInlineMarkdown()` was being invoked identically in all three places `<Hero>` was used (home, work index, personal). `Hero` now accepts raw markdown strings (`eyebrow`, `headline`, `lede`) and calls `renderInlineMarkdown` internally; callers just pass frontmatter text through. `renderInlineMarkdown` is synchronous, so this is safe to call directly in a client component's render body — no need for `useEffect`/async handling.

## Accessibility

- Any custom link/button styling that defines `:hover` must also define `:focus-visible` with the same treatment (`.contactLink`, `.back`, `.prev`/`.next`, `.galleryItem` in the case-study page).
- Raw Unicode arrows/dots (`←`, `→`, `↑`, `·`) in JSX text should be written as HTML entities (`&larr;`, `&rarr;`, `&uarr;`, `&middot;`) for consistency and clarity of intent in source. A dedicated icon component was **not** built for the back/next arrows because the reviewer explicitly said that requires design input (which icon library) not available in this pass — don't invent an icon system unprompted.

## Judgment calls (deliberately not changed)

- **`.download` button `border-radius: 999px`** — a reviewer nit suggested `border-radius: 100%`, assuming the element was circular. It isn't: it's a pill-shaped button wrapping text (non-square). `100%` on a non-square box produces an ellipse, not rounded corners — that would be a visual regression, not a fix. Left as `999px`, which is the correct idiom for "fully pill" corners regardless of the box's aspect ratio.
- **Case-study page's narrower content columns** (`.header`/`.bodyWrap` at 920px/680px vs. the site's 1160px shell) were left alone. This is a deliberate editorial pattern (narrow reading measure for body copy, full-width breakout for images/gallery), not an inconsistency — collapsing it to a single width would hurt the prose measure. Resume's mismatched 1080px shell width *was* a real inconsistency (no narrow-measure rationale) and was corrected to 1160px to match the rest of the site.

## Gitignore

`.claude/` and `chats/` must stay out of version control (`.gitignore`) — these are local tooling/session artifacts, not project source. `.claude/launch.json` had been committed before this was added; it's now untracked via `git rm --cached`.

## Verifying changes in this repo

- `npm run build` runs full TypeScript type-checking as part of `next build` — treat a clean build as a required gate after any refactor touching imports/paths (e.g. the components/ directory reorg broke two relative imports that only `next build` surfaced, not the editor).
- `npm run lint` currently drops into an interactive ESLint setup prompt (no ESLint config committed yet) — it cannot be run non-interactively as-is. This is pre-existing, not something introduced by this review pass.
- The dev server (`npm run dev`, or the `dev` launch config) is the fastest way to confirm a CSS/markup change didn't regress — check `get_page_text`/`read_console_messages` for content and errors, and `javascript_tool` to read computed styles (e.g. confirming `letter-spacing` scales correctly at mobile widths) when a screenshot tool is unavailable or hangs.
