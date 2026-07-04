import { contentPath, readAllContentFiles, readContentFile } from "./content";
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

/** One project with its body rendered to HTML. */
export async function getProject(
  slug: string,
): Promise<ContentEntry<ProjectFrontmatter> & { html: string }> {
  const { data, content } = readContentFile(PROJECTS_DIR, slug);
  if (!isProjectFrontmatter(data)) {
    throw new Error(`Invalid personal project frontmatter in content/personal-projects/${slug}.md`);
  }
  const html = await markdownToHtml(content);
  return { slug, frontmatter: data, content, html };
}

/** All projects with their bodies pre-rendered — used by the Personal page, which lists every project inline. */
export async function getAllProjectsWithHtml(): Promise<Array<ContentEntry<ProjectFrontmatter> & { html: string }>> {
  const all = getAllProjects();
  return Promise.all(all.map((entry) => getProject(entry.slug)));
}
