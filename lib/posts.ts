import { contentPath, readAllContentFiles, readContentFile } from "./content";
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

/** The three "Live & Ongoing" cases shown on Home and at the top of the Work index. */
export function getFeaturedPosts(): ContentEntry<PostFrontmatter>[] {
  return getAllPostEntries().filter((post) => post.frontmatter.featured);
}

/** The compact archive rows on the Work index. */
export function getArchivePosts(): ContentEntry<PostFrontmatter>[] {
  return getAllPostEntries().filter((post) => !post.frontmatter.featured);
}

export function getAllPostSlugs(): string[] {
  return getAllPostEntries().map((post) => post.slug);
}

/** One case study with its body rendered to HTML — used by the /work/[slug] page. */
export async function getPost(
  slug: string,
): Promise<ContentEntry<PostFrontmatter> & { html: string }> {
  const { data, content } = readContentFile(POSTS_DIR, slug);
  if (!isPostFrontmatter(data)) {
    throw new Error(`Invalid post frontmatter in content/posts/${slug}.md`);
  }
  const html = await markdownToHtml(content);
  return { slug, frontmatter: data, content, html };
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
