/**
 * Generic filesystem + frontmatter-parsing helpers, shared by every
 * content-type-specific loader (lib/pages.ts, lib/posts.ts, lib/projects.ts).
 *
 * This module only knows how to find files and split frontmatter from body —
 * it has no opinion on what shape the frontmatter should be. Callers pass a
 * type guard (see lib/validators.ts) to turn the `unknown` data gray-matter
 * hands back into a trusted, typed value.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export function contentPath(...segments: string[]): string {
  return path.join(CONTENT_ROOT, ...segments);
}

const MARKDOWN_EXTENSIONS = [".md", ".mdx"];

/** Every content slug (filename minus extension) in a directory, unsorted. */
export function listSlugs(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((file) => MARKDOWN_EXTENSIONS.includes(path.extname(file)))
    .map((file) => path.basename(file, path.extname(file)));
}

function resolveMarkdownFile(dir: string, slug: string): string {
  for (const extension of MARKDOWN_EXTENSIONS) {
    const candidate = path.join(dir, `${slug}${extension}`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(`No markdown file found for slug "${slug}" in ${dir}`);
}

/** Reads and splits one content file into its raw (unvalidated) frontmatter and body. */
export function readContentFile(dir: string, slug: string): { data: unknown; content: string } {
  const fullPath = resolveMarkdownFile(dir, slug);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content }: { data: unknown; content: string } = matter(raw);
  return { data, content };
}

/**
 * Reads every content file in a directory, validates each with the supplied
 * type guard, and returns them keyed by slug. Throws (failing the build) if
 * any file doesn't match — a content typo should never silently ship.
 */
export function readAllContentFiles<T>(
  dir: string,
  isValid: (data: unknown) => data is T,
  typeName: string,
): Array<{ slug: string; frontmatter: T; content: string }> {
  return listSlugs(dir).map((slug) => {
    const { data, content } = readContentFile(dir, slug);
    if (!isValid(data)) {
      throw new Error(`Invalid ${typeName} frontmatter in ${path.join(dir, slug)} (.md/.mdx)`);
    }
    return { slug, frontmatter: data, content };
  });
}
