import type { Metadata } from "next";
import CookbookCase from "@/components/CookbookCase";
import { getSiteConfig } from "@/lib/config";
import { getProject } from "@/lib/projects";

/* The Del Buico Cookbook is the only personal project with a case page, so it
   gets a static route rather than a /personal/[slug] template. Add that template
   if a second project ever earns one. The narrative lives in CookbookCase; the
   markdown file supplies the title and summary for metadata, keeping the two
   from drifting apart. */

const SLUG = "del-buico-cookbook";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter, content } = await getProject(SLUG);
  return {
    title: `${frontmatter.title} — ${getSiteConfig().name}`,
    description: content.trim().split("\n")[0],
  };
}

export default function CookbookPage() {
  return <CookbookCase />;
}
