import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CaseFeaturedRow from "@/components/CaseFeaturedRow";
import PointOfView from "@/components/PointOfView";
import { getHomePage, getPointOfView } from "@/lib/pages";
import { getFeaturedPosts } from "@/lib/posts";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getHomePage();
  return { title: frontmatter.title, description: frontmatter.description };
}

export default async function HomePage() {
  const [page, pov] = await Promise.all([getHomePage(), getPointOfView()]);
  const featured = getFeaturedPosts();

  return (
    <>
      <Hero
        eyebrow={page.frontmatter.eyebrow}
        headline={page.frontmatter.heroHeadline}
        lede={page.frontmatter.heroLede}
        ledeVariant={page.frontmatter.heroLedeVariant}
        size="large"
        showReveal={page.frontmatter.showHeroReveal ?? true}
        revealLabel={page.frontmatter.heroRevealLabel}
        revealAlign={page.frontmatter.heroRevealAlign}
      />

      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <h2 className={`text-label ${styles.featuredLabel}`}>{page.frontmatter.featuredLabel}</h2>
          <Link href={page.frontmatter.featuredCta.href} className={styles.featuredCta}>
            {page.frontmatter.featuredCta.label}
          </Link>
        </div>
        {featured.map((post, index) => (
          <CaseFeaturedRow key={post.slug} post={post} reversed={index % 2 === 1} />
        ))}
      </section>

      <PointOfView content={pov.frontmatter} />

      <section className={styles.archiveTeaser}>
        <h2 className={`text-serif-xl ${styles.archiveHeadline}`}>{page.frontmatter.archiveTeaserHeadline}</h2>
        <Link href={page.frontmatter.archiveTeaserCta.href} className={styles.archiveCta}>
          {page.frontmatter.archiveTeaserCta.label}
        </Link>
      </section>
    </>
  );
}
