# Handoff: Design-Strategy Portfolio (for Figma rebuild)

## Overview
A multi-page editorial portfolio repositioning a designer from UX execution toward design
strategy. Five pages: **Home**, **Selected Work** (index), **Case Study** (template),
**Résumé**, **Personal Projects**. The aesthetic is an editorial design-journal:
warm paper, near-black ink, one rust accent, a high-contrast serif for claim-headlines
paired with a tracked grotesk for labels. Writing carries the weight; restraint signals authority.

## About the design files
The files in `reference/` are **design references created in HTML** — self-contained,
openable prototypes showing intended look and behaviour, **not production code to copy
directly**. Open any `.html` in a browser to inspect exact computed values (color, type,
spacing) and hover states with dev tools. The task is to **rebuild these screens natively
in Figma** as frames + components, following the tokens and specs below. Headlines are
final positioning copy; body text is lorem-ipsum placeholder.

## Fidelity
**High-fidelity.** Final colors, type, and spacing. Rebuild pixel-faithfully. The values
below are exact; where this README and the HTML differ, the HTML is source of truth.

---

## Design tokens

### Color
| Token | Hex | Use |
|---|---|---|
| Paper | `#F4F1EA` | Page background |
| Ink | `#1C1A17` | Primary text, dark sections, footer |
| Paper-on-Ink | `#F4F1EA` | Text on dark sections |
| Muted | `#6B675F` | Secondary text, meta, captions |
| Hairline | `rgba(28,26,23,0.14)` | Thin rules, image-placeholder borders |
| Accent / Rust | `#B5431F` | Accent on paper (links, eyebrows, italics) |
| Accent on Ink | `#E0723B` | Accent on dark sections (brighter for contrast) |
| Image fill | `rgba(28,26,23,0.08)` | Empty image placeholders |
| Selection | `#B5431F` bg / `#fff` text | `::selection` |

Alternate accents available in the build (enum prop): Ink `#1F4E6B`, Forest `#2E5D44`,
Plum `#6B2D4F`. Primary direction is **Rust**.

### Typography
Two families, both Google Fonts.

**Newsreader** (serif — display & body copy)
- Weights used: 300, 400, 500; italic 300/400. Optical sizing on.
- Headlines: weight **300**, letter-spacing **−0.025em**, line-height ~0.98–1.05.
- Italic + accent color is the recurring emphasis device inside headlines.
- Body copy: weight 400, ~18–20px, line-height 1.55–1.62.

**Archivo** (grotesk — labels, nav, meta, eyebrows)
- Weights used: 500, 600.
- Always UPPERCASE, letter-spacing **0.12em–0.26em**, sizes 10.5–12px.
- This is the "consultant" signal — small tracked labels over big serif claims.

Type scale (clamp min→max across viewport):
| Role | Size | Family / weight |
|---|---|---|
| Hero H1 | clamp(44px → 108px) | Newsreader 300 |
| Page H1 | clamp(40px → 92px) | Newsreader 300 |
| Section claim | clamp(30px → 56px) | Newsreader 300 |
| Case title (index) | clamp(22px → 34px) | Newsreader 400 |
| Card H3 | clamp(26px → 46px) | Newsreader 400 |
| Pull quote | clamp(26px → 42px) | Newsreader 300 italic |
| Body | 18–20px | Newsreader 400 |
| Eyebrow / label | 10.5–12px | Archivo 600 UPPERCASE, tracked |

### Layout & spacing
- Content max-width: **1160px** (résumé/case body narrower: 1080 / 920 / 680px).
- Page gutter: **48px** left/right.
- Vertical section rhythm: `clamp(56px → 128px)` top/bottom.
- Sticky header height ~**68px**, paper bg, 1px hairline bottom border.
- Featured case rows: 2-col grid `1.05fr / .95fr` (alternating), 56px gap, 72px vertical pad.
- Image placeholders: aspect-ratio boxes (16/9 lead, 4/3 cards, 5/4 personal),
  hairline border, `rgba(28,26,23,0.08)` fill, small tracked caption bottom-left.
- Border radius: pills only (`999px`) for nav Contact button & tags; everything else **square** (0). Editorial = no rounded cards.
- Shadows: **none**. Depth comes from the ink/paper contrast blocks, not elevation.

---

## Screens

### 1 · Home (`reference/01-Home.html`)
- **Sticky header**: wordmark "Placeholder Name" + "Design Strategy" eyebrow / nav
  (Work, Personal, Résumé) + rust-on-hover pill Contact. Active link = rust 2px underline.
- **Hero**: eyebrow ("Design Strategy · Selected Work · 2026"), giant serif claim
  *"Strategy stays an idea until someone **frames** it."* (frames = italic rust), then a
  hairline-topped row: lede paragraph (left) + "See selected work →" underline link (right).
- **Featured Cases**: section label row ("Featured Cases" / "Three of nine"), then 3
  alternating image+text rows. Each: numbered sector eyebrow (rust), claim-headline,
  muted summary, meta (discipline · year), "Read the case" underline link.
- **Point of View** (dark `#1C1A17` block): eyebrow, large serif manifesto with rust
  italic emphasis, then 3-column "01 Frame / 02 Make concrete / 03 Make shippable".
- **Archive teaser**: "Six more cases in the full archive." + "Browse all work →".
- **Footer** (shared, dark): "Have a problem that's still just an idea?" + email +
  social row + back-to-top.

### 2 · Selected Work (`reference/02-Work.html`)
- Intro: eyebrow "The Archive", H1 *"Nine problems that started as someone's idea."*, lede.
- **Index list** (not a gallery): two groups — **Featured** (3) and **More work** (6).
  Each row: `64px num / flex-1 title / right-aligned "Sector · Year"` grid, hairline
  divider, subtle rust gradient wash on hover. Featured rows larger than archive rows.
  Curation hierarchy (3 + 6) is the selectivity signal — keep it.

### 3 · Case Study (`reference/03-Case.html`)
- Back-to-archive link; eyebrow "Case 01 · Fintech · 2025"; H1 claim with rust italic;
  deck/standfirst paragraph.
- **Meta bar**: 4-col (Role / Engagement / Partners / Year), ink top border.
- **Lead image** (16/9, max-width 1240px).
- **Body** measure ~680px: sections "The situation / The reframe / What became possible",
  each a rust uppercase label + serif paragraphs (first solid ink, second muted).
- **Pull quote**: full-width italic, hairline top+bottom.
- **Artifact pair**: 2-col 4/3 placeholders.
- **Outcomes block** (dark): "What changed" + 3 oversized serif stats
  (`2 wks`, `3 → 1`, `$1.4M`) each with a muted caption — business-language metrics, not design metrics.
- **Next case** link row (right-aligned big serif title).

### 4 · Résumé (`reference/04-Resume.html`)
- Header: eyebrow "Curriculum Vitae" + outline "Download PDF ↓" pill; big serif name; summary.
- **Two-col body**: sticky **left sidebar** (240px: Contact / Focus / Tools) + **main**.
- Main: "Experience" (4 roles — title + dates right, rust company label, muted blurb),
  then "Education & Recognition". Note first role is **"Design Strategist (Emerging)"** —
  intentional honest framing of the transition; do not inflate to a held title.

### 5 · Personal Projects (`reference/05-Personal.html`)
- Eyebrow "Off the Clock", H1 *"The ideas I frame when no one asked me to."*, lede.
- 3 alternating image+text rows (Writing / Tool / Experiment), each with title, muted
  blurb, and 2 outline pill tags.

---

## Interactions & behaviour
- **Hover**: underline links shift ink→rust (text + border). Nav Contact pill: ink→rust bg.
  Index rows: faint left-to-right rust gradient wash. Footer links: muted→paper.
- **Active nav**: 2px rust underline under the current page's nav item.
- **No scroll animations** in the final build (an earlier fade-in was removed — content
  must render at full opacity immediately).
- **Navigation**: standard page-to-page links; case rows → Case page; "Browse all work" → Work.
- **Responsive**: single max-width column that scales via `clamp()`; 2-col grids should
  collapse to 1-col on narrow widths (mobile rebuild at designer's discretion).

## Suggested Figma component structure
- **Header** (instance w/ active-state variant per page) and **Footer** as components.
- **Eyebrow/Label** text style (Archivo 600 tracked) and **Claim** text style (Newsreader 300).
- **Case row** (index) component with number / title / meta slots.
- **Featured case** card component (image + text, with a reversed variant).
- **Stat** component (big serif figure + caption) for the outcomes block.
- **Image placeholder** component (variants: 16/9, 4/3, 5/4) → swap for real work later.
- Color + type tokens above → Figma **variables / styles**.

## Assets
No raster assets yet — all imagery is intentional placeholder boxes awaiting the
client's real work. Fonts: **Newsreader** & **Archivo** (Google Fonts, free).

## Files in this bundle
- `reference/01-Home.html` … `05-Personal.html` — self-contained, openable references
  (fonts embedded). Open in a browser + inspect element for exact values.
- `README.md` — this spec.

> Source authoring files (`*.dc.html`) live in the project root if the team wants the
> editable originals, but they require the project runtime and won't open standalone —
> use the `reference/` bundles for inspection.
