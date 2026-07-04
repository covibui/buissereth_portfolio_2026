import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CaseFeaturedRow from "@/components/CaseFeaturedRow";
import CaseArchiveRow from "@/components/CaseArchiveRow";
import { getWorkPage } from "@/lib/pages";
import { getArchivePosts, getFeaturedPosts } from "@/lib/posts";
import { renderInlineMarkdown } from "@/lib/markdown";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getWorkPage();
  return { title: frontmatter.title, description: frontmatter.description };
}

export default async function WorkPage() {
  const page = await getWorkPage();
  const featured = getFeaturedPosts();
  const archive = getArchivePosts();

  return (
    <main>
      <Hero
        eyebrowHtml={renderInlineMarkdown(page.frontmatter.eyebrow)}
        headlineHtml={renderInlineMarkdown(page.frontmatter.heroHeadline)}
        ledeHtml={page.frontmatter.heroLede ? renderInlineMarkdown(page.frontmatter.heroLede) : undefined}
        showReveal={page.frontmatter.showHeroReveal ?? true}
        revealLabel={page.frontmatter.heroRevealLabel}
      />

      <section className={styles.index}>
        <div className={styles.sectionHeader}>
          <span>Live &amp; Ongoing</span>
        </div>
        {featured.map((post, index) => (
          <CaseFeaturedRow key={post.slug} post={post} reversed={index % 2 === 1} />
        ))}

        <div className={`${styles.sectionHeader} ${styles.archiveHeader}`}>
          <span>Enterprise Work · EPAM &apos;21–&apos;23</span>
          <span>Discipline</span>
        </div>
        {archive.map((post) => (
          <CaseArchiveRow key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
