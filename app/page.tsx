import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Prose from "@/components/Prose";
import CaseFeaturedRow from "@/components/CaseFeaturedRow";
import { getHomePage } from "@/lib/pages";
import { getFeaturedPosts } from "@/lib/posts";
import { renderInlineMarkdown } from "@/lib/markdown";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getHomePage();
  return { title: frontmatter.title, description: frontmatter.description };
}

export default async function HomePage() {
  const page = await getHomePage();
  const featured = getFeaturedPosts();

  return (
    <main>
      <Hero
        eyebrowHtml={renderInlineMarkdown(page.frontmatter.eyebrow)}
        headlineHtml={renderInlineMarkdown(page.frontmatter.heroHeadline)}
        ledeHtml={page.frontmatter.heroLede ? renderInlineMarkdown(page.frontmatter.heroLede) : undefined}
        cta={page.frontmatter.heroCta}
        showReveal={page.frontmatter.showHeroReveal ?? true}
        revealLabel={page.frontmatter.heroRevealLabel}
      />

      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <h2 className={styles.featuredLabel}>{page.frontmatter.featuredLabel}</h2>
          <span className={styles.featuredCount}>{page.frontmatter.featuredCountLabel}</span>
        </div>
        {featured.map((post, index) => (
          <CaseFeaturedRow key={post.slug} post={post} reversed={index % 2 === 1} />
        ))}
      </section>

      <section className={styles.pov}>
        <div className={styles.povInner}>
          <p className={styles.povEyebrow}>{page.frontmatter.povEyebrow}</p>
          <Prose html={page.html} variant="dark" />
        </div>
      </section>

      <section className={styles.archiveTeaser}>
        <h2 className={styles.archiveHeadline}>{page.frontmatter.archiveTeaserHeadline}</h2>
        <Link href={page.frontmatter.archiveTeaserCta.href} className={styles.archiveCta}>
          {page.frontmatter.archiveTeaserCta.label}
        </Link>
      </section>
    </main>
  );
}
