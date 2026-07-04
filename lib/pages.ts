import { contentPath, readContentFile } from "./content";
import { markdownToHtml } from "./markdown";
import { isHomeFrontmatter, isPageFrontmatter, isResumeFrontmatter } from "./validators";
import type { HomeFrontmatter, PageFrontmatter, ResumeFrontmatter } from "./types";

const PAGES_DIR = contentPath("pages");

async function loadPage<T>(slug: string, isValid: (data: unknown) => data is T) {
  const { data, content } = readContentFile(PAGES_DIR, slug);
  if (!isValid(data)) {
    throw new Error(`Invalid frontmatter in content/pages/${slug}.md`);
  }
  const html = await markdownToHtml(content);
  return { frontmatter: data, content, html };
}

export function getHomePage(): Promise<{ frontmatter: HomeFrontmatter; content: string; html: string }> {
  return loadPage("home", isHomeFrontmatter);
}

export function getWorkPage(): Promise<{ frontmatter: PageFrontmatter; content: string; html: string }> {
  return loadPage("work", isPageFrontmatter);
}

export function getPersonalPage(): Promise<{ frontmatter: PageFrontmatter; content: string; html: string }> {
  return loadPage("personal", isPageFrontmatter);
}

export function getResumePage(): Promise<{ frontmatter: ResumeFrontmatter; content: string; html: string }> {
  return loadPage("resume", isResumeFrontmatter);
}
