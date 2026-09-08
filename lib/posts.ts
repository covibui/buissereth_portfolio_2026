import { contentPath, readAllContentFiles } from "./content";
import { markdownToHtml } from "./markdown";
import { isPostFrontmatter } from "./validators";
import type { ContentEntry, PostFrontmatter } from "./types";

const POSTS_DIR = contentPath("posts");

function getAllPostEntries(): ContentEntry<PostFrontmatter>[] {
  return readAllContentFiles(POSTS_DIR, isPostFrontmatter, "post").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order,
  );
}

/** All case studies, sorted by `order`. */
export function getAllPosts(): ContentEntry<PostFrontmatter>[] {
  return getAllPostEntries();
}

/** The "Live & Ongoing" cases (featured: true) shown on Home and atop the Work index. */
export function getFeaturedPosts(): ContentEntry<PostFrontmatter>[] {
  return getAllPostEntries().filter((post) => post.frontmatter.featured);
}

/** The compact archive rows on the Work index. */
export function getArchivePosts(): ContentEntry<PostFrontmatter>[] {
  return getAllPostEntries().filter((post) => !post.frontmatter.featured);
}

/** Public route slugs — what /work/[slug] statically generates. Not filenames. */
export function getAllPostSlugs(): string[] {
  return getAllPostEntries().map((post) => post.slug);
}

/** One case study with its body rendered to HTML — used by the /work/[slug] page.
   Looked up by ROUTE slug, which may differ from the file's name on disk. */
export async function getPost(
  slug: string,
): Promise<ContentEntry<PostFrontmatter> & { html: string }> {
  const entry = getAllPostEntries().find((post) => post.slug === slug);
  if (!entry) {
    throw new Error(`No post found for slug "${slug}" in content/posts`);
  }
  const html = await markdownToHtml(entry.content);
  return { ...entry, html };
}

/** The next case study after the given order, wrapping back to the first. */
export function getNextPost(currentOrder: number): ContentEntry<PostFrontmatter> {
  const all = getAllPostEntries();
  const currentIndex = all.findIndex((post) => post.frontmatter.order === currentOrder);
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % all.length;
  const next = all[nextIndex];
  if (!next) {
    throw new Error("getNextPost called with no posts in content/posts");
  }
  return next;
}

/** The previous case study before the given order, wrapping back to the last. */
export function getPrevPost(currentOrder: number): ContentEntry<PostFrontmatter> {
  const all = getAllPostEntries();
  const currentIndex = all.findIndex((post) => post.frontmatter.order === currentOrder);
  const prevIndex = currentIndex === -1 ? all.length - 1 : (currentIndex - 1 + all.length) % all.length;
  const prev = all[prevIndex];
  if (!prev) {
    throw new Error("getPrevPost called with no posts in content/posts");
  }
  return prev;
}
