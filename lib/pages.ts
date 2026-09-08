import { contentPath, readContentFile } from "./content";
import { markdownToHtml } from "./markdown";
import { isHomeFrontmatter, isPageFrontmatter, isPointOfViewFrontmatter, isResumeFrontmatter } from "./validators";
import type { HomeFrontmatter, PageFrontmatter, PointOfViewFrontmatter, ResumeFrontmatter } from "./types";

const PAGES_DIR = contentPath("pages");

/** Loads a page's frontmatter plus its Markdown body rendered to HTML. The
   raw body isn't returned — no consumer needs it once it's been rendered. */
async function loadPage<T>(slug: string, isValid: (data: unknown) => data is T) {
  const { data, content } = readContentFile(PAGES_DIR, slug);
  if (!isValid(data)) {
    throw new Error(`Invalid frontmatter in content/pages/${slug}.md`);
  }
  const html = await markdownToHtml(content);
  return { frontmatter: data, html };
}

export function getHomePage(): Promise<{ frontmatter: HomeFrontmatter; html: string }> {
  return loadPage("home", isHomeFrontmatter);
}

export function getWorkPage(): Promise<{ frontmatter: PageFrontmatter; html: string }> {
  return loadPage("work", isPageFrontmatter);
}

export function getPersonalPage(): Promise<{ frontmatter: PageFrontmatter; html: string }> {
  return loadPage("personal", isPageFrontmatter);
}

export function getResumePage(): Promise<{ frontmatter: ResumeFrontmatter; html: string }> {
  return loadPage("resume", isResumeFrontmatter);
}

/** The Home manifesto. The Work index runs the same section with its own copy — see getWorkPointOfView. */
export function getPointOfView(): Promise<{ frontmatter: PointOfViewFrontmatter; html: string }> {
  return loadPage("point-of-view", isPointOfViewFrontmatter);
}

/** The Work index's manifesto — same section shape as Home's, different copy, so
   the two pages don't repeat themselves for anyone who reads both. */
export function getWorkPointOfView(): Promise<{ frontmatter: PointOfViewFrontmatter; html: string }> {
  return loadPage("point-of-view-work", isPointOfViewFrontmatter);
}
