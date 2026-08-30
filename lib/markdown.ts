/**
 * Markdown → HTML rendering, shared by every content loader.
 *
 * Two entry points:
 * - `markdownToHtml` — the full pipeline (GFM tables/strikethrough, heading
 *   slugs) for multi-paragraph body content (page bodies, case studies,
 *   résumé summary, project descriptions).
 * - `renderInlineMarkdown` — a lighter, synchronous pass for single-line
 *   frontmatter fields (hero headlines, ledes) that only need inline
 *   emphasis (`*word*` → <em>word</em>), with the wrapping <p> stripped.
 */

import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

export function renderInlineMarkdown(text: string): string {
  const file = remark().use(remarkRehype).use(rehypeStringify).processSync(text);
  return String(file)
    .trim()
    .replace(/^<p>/, "")
    .replace(/<\/p>$/, "");
}
