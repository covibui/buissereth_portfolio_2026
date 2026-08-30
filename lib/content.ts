/**
 * Generic filesystem + frontmatter-parsing helpers, shared by every
 * content-type-specific loader (lib/pages.ts, lib/posts.ts, lib/projects.ts).
 *
 * This module only knows how to find files and split frontmatter from body —
 * it has no opinion on what shape the frontmatter should be. Callers pass a
 * type guard (see lib/validators.ts) to turn the `unknown` data gray-matter
 * hands back into a trusted, typed value.
 *
 * FILE ID vs ROUTE SLUG — these are deliberately two different things.
 * `fileId` is the filename minus extension (e.g. "work-01-sat"). It exists so
 * files can be named on the short internal code convention that the Claude
 * project folders and the Claude Design canvas also use.
 * `slug` is what appears in the public URL (e.g. "security-assessment-tool").
 * It comes from an explicit `slug:` frontmatter field, falling back to
 * `fileId` when a file doesn't declare one.
 * Renaming a file therefore reorganizes the repo WITHOUT breaking a live URL,
 * a shared link, or search ranking. Change `slug:` only if you intend the URL
 * to change, and add a redirect at the host when you do.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export function contentPath(...segments: string[]): string {
  return path.join(CONTENT_ROOT, ...segments);
}

const MARKDOWN_EXTENSIONS = [".md", ".mdx"];

/** Every content file id (filename minus extension) in a directory, unsorted. */
export function listFileIds(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((file) => MARKDOWN_EXTENSIONS.includes(path.extname(file)))
    .map((file) => path.basename(file, path.extname(file)));
}

function resolveMarkdownFile(dir: string, fileId: string): string {
  for (const extension of MARKDOWN_EXTENSIONS) {
    const candidate = path.join(dir, `${fileId}${extension}`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(`No markdown file found for "${fileId}" in ${dir}`);
}

/** Reads and splits one content file into its raw (unvalidated) frontmatter and body. */
export function readContentFile(dir: string, fileId: string): { data: unknown; content: string } {
  const fullPath = resolveMarkdownFile(dir, fileId);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content }: { data: unknown; content: string } = matter(raw);
  return { data, content };
}

/** The public route slug for a file: an explicit `slug:` field, else the filename. */
function routeSlugFor(frontmatter: unknown, fileId: string): string {
  if (typeof frontmatter === "object" && frontmatter !== null) {
    const declared = (frontmatter as { slug?: unknown }).slug;
    if (typeof declared === "string" && declared.length > 0) {
      return declared;
    }
  }
  return fileId;
}

/**
 * Reads every content file in a directory, validates each with the supplied
 * type guard, and returns them with both their file id and their route slug.
 * Throws (failing the build) if any file doesn't match — a content typo should
 * never silently ship. Also throws on a duplicate route slug, which would
 * otherwise make one of two cases silently unreachable.
 */
export function readAllContentFiles<T>(
  dir: string,
  isValid: (data: unknown) => data is T,
  typeName: string,
): Array<{ slug: string; fileId: string; frontmatter: T; content: string }> {
  const seen = new Map<string, string>();

  return listFileIds(dir).map((fileId) => {
    const { data, content } = readContentFile(dir, fileId);
    if (!isValid(data)) {
      throw new Error(`Invalid ${typeName} frontmatter in ${path.join(dir, fileId)} (.md/.mdx)`);
    }

    const slug = routeSlugFor(data, fileId);
    const conflict = seen.get(slug);
    if (conflict) {
      throw new Error(
        `Duplicate slug "${slug}" in ${dir}: declared by both "${conflict}" and "${fileId}".`,
      );
    }
    seen.set(slug, fileId);

    return { slug, fileId, frontmatter: data, content };
  });
}
