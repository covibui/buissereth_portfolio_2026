import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CaseFeaturedRow from "@/components/CaseFeaturedRow";
import CaseArchiveRow from "@/components/CaseArchiveRow";
import PointOfView from "@/components/PointOfView";
import { getPointOfView, getWorkPage } from "@/lib/pages";
import { getArchivePosts, getFeaturedPosts } from "@/lib/posts";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getWorkPage();
  return { title: frontmatter.title, description: frontmatter.description };
}

export default async function WorkPage() {
  const [page, pov] = await Promise.all([getWorkPage(), getPointOfView()]);
  const featured = getFeaturedPosts();
  const archive = getArchivePosts();

  return (
    <>
      <Hero
        eyebrow={page.frontmatter.eyebrow}
        headline={page.frontmatter.heroHeadline}
        lede={page.frontmatter.heroLede}
        showReveal={page.frontmatter.showHeroReveal ?? true}
        revealLabel={page.frontmatter.heroRevealLabel}
        revealAlign={page.frontmatter.heroRevealAlign}
      />

      <section className={styles.index}>
        <div className={`text-label ${styles.sectionHeader}`}>
          <span>Live &amp; Ongoing</span>
        </div>
        {featured.map((post, index) => (
          <CaseFeaturedRow key={post.slug} post={post} reversed={index % 2 === 1} index={index} />
        ))}
      </section>

      <PointOfView content={pov.frontmatter} />

      <section className={styles.archive}>
        <div className={`text-label ${styles.sectionHeader}`}>
          <span>Enterprise Work &middot; EPAM &apos;21–&apos;23</span>
        </div>
        {archive.map((post) => (
          <CaseArchiveRow key={post.slug} post={post} />
        ))}
      </section>
    </>
  );
}
