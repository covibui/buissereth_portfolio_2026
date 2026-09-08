/**
 * Content-layer types — the single source of truth for every frontmatter
 * shape in this project. Parsing utilities (lib/content.ts, lib/validators.ts)
 * and the components/pages that render content both import from here, so a
 * field added here is the only place a new field needs to be declared.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** Footer links have the same shape as nav links. */
export type FooterLink = NavLink;

export interface HeroCta {
  label: string;
  href: string;
}

export interface FooterConfig {
  cta: {
    label: string;
    headline: string;
  };
  links: FooterLink[];
}

/** content/config/site.yaml — global site identity, navigation, and footer copy. */
export interface SiteConfig {
  name: string;
  discipline: string;
  email: string;
  phone?: string;
  location?: string;
  /** Default document <title> / description, used by the root layout. */
  siteTitle: string;
  siteDescription: string;
  nav: NavLink[];
  footer: FooterConfig;
}

/** Frontmatter shared by every standalone, single-hero page (home, work index, personal). */
export interface PageFrontmatter {
  title: string;
  description: string;
  eyebrow: string;
  /** Rendered through renderInlineMarkdown, so `*word*` becomes <em>word</em>. */
  heroHeadline: string;
  heroLede?: string;
  /** "divider" renders the lede in a bordered row below a rule (Home); "plain" floats it under the headline (Personal, Work). Defaults to "plain". */
  heroLedeVariant?: "plain" | "divider";
  /** Cursor-hole image-reveal effect behind the hero, with a permanent reveal/cover toggle button. Defaults to true. */
  showHeroReveal?: boolean;
  heroRevealLabel?: string;
  /** Corner the reveal caption/toggle button anchor to. Defaults to "left". */
  heroRevealAlign?: "left" | "right";
}

/** Home page — the base page plus the "Featured Cases" strip (the Point of View section is shared, see PointOfViewFrontmatter). */
export interface HomeFrontmatter extends PageFrontmatter {
  featuredLabel: string;
  featuredCta: HeroCta;
  archiveTeaserHeadline: string;
  archiveTeaserCta: HeroCta;
}

/**
 * The manifesto band rendered by <PointOfView>. Home and the Work index each
 * author their own copy against this shape — content/pages/point-of-view.md and
 * content/pages/point-of-view-work.md — so the section is a shared component
 * with per-page words rather than one block repeated on both pages.
 */
export interface PointOfViewPrinciple {
  /** Rendered as a stylized <ol> item; the "01 /" index is derived from order. */
  title: string;
  body: string;
}

export interface PointOfViewFrontmatter {
  eyebrow: string;
  /** The manifesto statement. Rendered through renderInlineMarkdown for `*emphasis*`. */
  lead: string;
  principles: PointOfViewPrinciple[];
}

export interface CaseOutcome {
  label: string;
  description: string;
}

/** content/posts/*.md — a work case study. */
export interface PostFrontmatter {
  title: string;
  /** Public URL segment (/work/<slug>). Defaults to the filename when absent.
     Set explicitly so a file can be renamed without changing a live URL. */
  slug?: string;
  /** Anonymized client/industry descriptor — never a real name under NDA. */
  client: string;
  year: string;
  disciplines: string[];
  /** One-line summary shown in list/card views. */
  summary: string;
  /** Display + sort order, also used for the "01 —" style index label. */
  order: number;
  /** true = shown in the "Live & Ongoing" featured strip; false = compact archive row. */
  featured: boolean;
  /** Caption shown over the cover block — on the placeholder art, or over a real `cover` photo. */
  coverLabel?: string;
  /**
   * Real cover photo for the featured-case rows, as a path under /public
   * (e.g. "/images/work/<slug>/hero.png"). When set it replaces the rotating
   * placeholder art; when absent the row falls back to placeholderImageForIndex.
   */
  cover?: string;
  /** Alt text for `cover`. Required whenever `cover` is set — the image carries meaning in the row. */
  coverAlt?: string;
  /** Filenames to drop into public/images/work/<slug>/ once real photos exist. */
  gallery?: string[];
  liveUrl?: string;
  pullQuote?: string;
  outcomes?: CaseOutcome[];
}

/** content/personal-projects/*.md — an "off the clock" project. */
export interface ProjectFrontmatter {
  title: string;
  /** Stable identifier, independent of the filename. See PostFrontmatter.slug. */
  slug?: string;
  order: number;
  category: string;
  tags: string[];
  /**
   * Real cover art for the project row, as a path under /public. When set it
   * replaces the rotating placeholder; when absent the row falls back to
   * placeholderImageForIndex. Mirrors PostFrontmatter.cover.
   */
  image?: string;
  imageLabel: string;
  liveUrl?: string;
  /**
   * Destination for the "Read the case →" CTA. Only projects that actually have
   * a case page set this — the rest render as plain, unlinked cards, so the row
   * never offers a link it can't honor.
   */
  caseHref?: string;
}

export interface ResumeContact {
  email: string;
  phone?: string;
  location?: string;
  note?: string;
}

export interface ResumeRole {
  title: string;
  company: string;
  dates: string;
  blurb: string;
}

export interface ResumeEducationItem {
  title: string;
  place: string;
  year: string;
}

/**
 * content/pages/resume.md — kept distinct from PageFrontmatter because it's
 * almost entirely structured data (roles, education, contact) rather than
 * free-form prose.
 */
export interface ResumeFrontmatter {
  title: string;
  description: string;
  eyebrow: string;
  name: string;
  downloadCtaLabel: string;
  downloadHref: string;
  contact: ResumeContact;
  focus: string[];
  tools: string[];
  roles: ResumeRole[];
  education: ResumeEducationItem[];
}

/** A parsed content file: frontmatter + raw markdown body.
   `slug` is the public route segment; `fileId` is the name on disk. They are
   allowed to differ — see the header comment in lib/content.ts. */
export interface ContentEntry<T> {
  slug: string;
  fileId: string;
  frontmatter: T;
  content: string;
}
