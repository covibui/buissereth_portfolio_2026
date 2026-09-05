/**
 * Runtime type guards for every content-layer interface in lib/types.ts.
 *
 * gray-matter and js-yaml both hand back loosely-typed data at parse time
 * (there is no way to know a YAML/Markdown file's shape until you've read
 * it). Rather than casting that data straight to a type with `as`, every
 * loader in lib/content.ts, lib/pages.ts, lib/posts.ts, lib/projects.ts, and
 * lib/config.ts runs it through one of these guards first and throws a
 * build-time error if a content file doesn't match its declared shape.
 */

import type {
  CaseOutcome,
  FooterLink,
  HeroCta,
  HomeFrontmatter,
  NavLink,
  PageFrontmatter,
  PointOfViewFrontmatter,
  PostFrontmatter,
  ProjectFrontmatter,
  ResumeContact,
  ResumeEducationItem,
  ResumeFrontmatter,
  ResumeRole,
  SiteConfig,
} from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || isString(value);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isOptionalBoolean(value: unknown): value is boolean | undefined {
  return value === undefined || isBoolean(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isOptionalStringArray(value: unknown): value is string[] | undefined {
  return value === undefined || isStringArray(value);
}

export function isNavLink(value: unknown): value is NavLink {
  return isRecord(value) && isString(value.label) && isString(value.href);
}

function isNavLinkArray(value: unknown): value is NavLink[] {
  return Array.isArray(value) && value.every(isNavLink);
}

export function isFooterLink(value: unknown): value is FooterLink {
  return isNavLink(value);
}

export function isHeroCta(value: unknown): value is HeroCta {
  return isRecord(value) && isString(value.label) && isString(value.href);
}

function isOptionalLiteral<T extends string>(value: unknown, options: readonly T[]): value is T | undefined {
  return value === undefined || (isString(value) && (options as readonly string[]).includes(value));
}

function isFooterConfig(value: unknown): value is SiteConfig["footer"] {
  return (
    isRecord(value) &&
    isRecord(value.cta) &&
    isString(value.cta.label) &&
    isString(value.cta.headline) &&
    isNavLinkArray(value.links)
  );
}

export function isSiteConfig(value: unknown): value is SiteConfig {
  if (!isRecord(value)) return false;
  return (
    isString(value.name) &&
    isString(value.discipline) &&
    isString(value.email) &&
    isOptionalString(value.phone) &&
    isOptionalString(value.location) &&
    isString(value.siteTitle) &&
    isString(value.siteDescription) &&
    isNavLinkArray(value.nav) &&
    isFooterConfig(value.footer)
  );
}

/** Shared by isPageFrontmatter and isHomeFrontmatter — returns a plain boolean, not a type predicate. */
function hasBasePageFields(value: Record<string, unknown>): boolean {
  return (
    isString(value.title) &&
    isString(value.description) &&
    isString(value.eyebrow) &&
    isString(value.heroHeadline) &&
    isOptionalString(value.heroLede) &&
    isOptionalLiteral(value.heroLedeVariant, ["plain", "divider"] as const) &&
    isOptionalBoolean(value.showHeroReveal) &&
    isOptionalString(value.heroRevealLabel) &&
    isOptionalLiteral(value.heroRevealAlign, ["left", "right"] as const)
  );
}

export function isPageFrontmatter(value: unknown): value is PageFrontmatter {
  return isRecord(value) && hasBasePageFields(value);
}

export function isHomeFrontmatter(value: unknown): value is HomeFrontmatter {
  return (
    isRecord(value) &&
    hasBasePageFields(value) &&
    isString(value.featuredLabel) &&
    isHeroCta(value.featuredCta) &&
    isString(value.archiveTeaserHeadline) &&
    isHeroCta(value.archiveTeaserCta)
  );
}

function isPointOfViewPrinciple(value: unknown): value is PointOfViewFrontmatter["principles"][number] {
  return isRecord(value) && isString(value.title) && isString(value.body);
}

export function isPointOfViewFrontmatter(value: unknown): value is PointOfViewFrontmatter {
  return (
    isRecord(value) &&
    isString(value.eyebrow) &&
    isString(value.lead) &&
    Array.isArray(value.principles) &&
    value.principles.every(isPointOfViewPrinciple)
  );
}

function isCaseOutcome(value: unknown): value is CaseOutcome {
  return isRecord(value) && isString(value.label) && isString(value.description);
}

function isOptionalCaseOutcomeArray(value: unknown): value is CaseOutcome[] | undefined {
  return value === undefined || (Array.isArray(value) && value.every(isCaseOutcome));
}

export function isPostFrontmatter(value: unknown): value is PostFrontmatter {
  if (!isRecord(value)) return false;
  return (
    isString(value.title) &&
    isString(value.client) &&
    isString(value.year) &&
    isStringArray(value.disciplines) &&
    isString(value.summary) &&
    isNumber(value.order) &&
    isBoolean(value.featured) &&
    isOptionalString(value.coverLabel) &&
    isOptionalString(value.cover) &&
    isOptionalString(value.coverAlt) &&
    isOptionalStringArray(value.gallery) &&
    isOptionalString(value.liveUrl) &&
    isOptionalString(value.pullQuote) &&
    isOptionalCaseOutcomeArray(value.outcomes)
  );
}

export function isProjectFrontmatter(value: unknown): value is ProjectFrontmatter {
  if (!isRecord(value)) return false;
  return (
    isString(value.title) &&
    isNumber(value.order) &&
    isString(value.category) &&
    isStringArray(value.tags) &&
    isString(value.imageLabel) &&
    isOptionalString(value.liveUrl) &&
    isOptionalString(value.caseHref)
  );
}

function isResumeContact(value: unknown): value is ResumeContact {
  return (
    isRecord(value) &&
    isString(value.email) &&
    isOptionalString(value.phone) &&
    isOptionalString(value.location) &&
    isOptionalString(value.note)
  );
}

function isResumeRole(value: unknown): value is ResumeRole {
  return (
    isRecord(value) &&
    isString(value.title) &&
    isString(value.company) &&
    isString(value.dates) &&
    isString(value.blurb)
  );
}

function isResumeRoleArray(value: unknown): value is ResumeRole[] {
  return Array.isArray(value) && value.every(isResumeRole);
}

function isResumeEducationItem(value: unknown): value is ResumeEducationItem {
  return isRecord(value) && isString(value.title) && isString(value.place) && isString(value.year);
}

function isResumeEducationArray(value: unknown): value is ResumeEducationItem[] {
  return Array.isArray(value) && value.every(isResumeEducationItem);
}

export function isResumeFrontmatter(value: unknown): value is ResumeFrontmatter {
  if (!isRecord(value)) return false;
  return (
    isString(value.title) &&
    isString(value.description) &&
    isString(value.eyebrow) &&
    isString(value.name) &&
    isString(value.downloadCtaLabel) &&
    isString(value.downloadHref) &&
    isResumeContact(value.contact) &&
    isStringArray(value.focus) &&
    isStringArray(value.tools) &&
    isResumeRoleArray(value.roles) &&
    isResumeEducationArray(value.education)
  );
}
