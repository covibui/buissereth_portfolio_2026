import { contentPath, readAllContentFiles } from "./content";
import { markdownToHtml } from "./markdown";
import { isProjectFrontmatter } from "./validators";
import type { ContentEntry, ProjectFrontmatter } from "./types";

const PROJECTS_DIR = contentPath("personal-projects");

/** All personal ("off the clock") projects, sorted by `order`. */
export function getAllProjects(): ContentEntry<ProjectFrontmatter>[] {
  return readAllContentFiles(PROJECTS_DIR, isProjectFrontmatter, "personal project").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order,
  );
}

/** One project with its body rendered to HTML. Looked up by route slug. */
export async function getProject(
  slug: string,
): Promise<ContentEntry<ProjectFrontmatter> & { html: string }> {
  const entry = getAllProjects().find((project) => project.slug === slug);
  if (!entry) {
    throw new Error(`No personal project found for slug "${slug}" in content/personal-projects`);
  }
  const html = await markdownToHtml(entry.content);
  return { ...entry, html };
}

/** All projects with their bodies pre-rendered — used by the Personal page, which lists every project inline. */
export async function getAllProjectsWithHtml(): Promise<Array<ContentEntry<ProjectFrontmatter> & { html: string }>> {
  return Promise.all(
    getAllProjects().map(async (entry) => ({ ...entry, html: await markdownToHtml(entry.content) })),
  );
}
