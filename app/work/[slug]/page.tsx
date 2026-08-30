import type { Metadata } from "next";
import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose from "@/components/Prose";
import CaseMetaBar from "@/components/CaseMetaBar";
import OutcomesGrid from "@/components/OutcomesGrid";
import PullQuote from "@/components/PullQuote";
import SecurityCase from "@/components/SecurityCase";
import CaseNav from "@/components/CaseNav";
import { getSiteConfig } from "@/lib/config";
import { getAllPostSlugs, getNextPost, getPost, getPrevPost } from "@/lib/posts";
import styles from "./page.module.css";

/** Cases with a hand-built editorial layout that bypasses the generic template. */
const BESPOKE_CASES: Record<string, () => ReactElement> = {
  "security-assessment-tool": () => <SecurityCase />,
};

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = await getPost(slug);
    return { title: `${frontmatter.title} — ${getSiteConfig().name}`, description: frontmatter.summary };
  } catch {
    return { title: "Case not found" };
  }
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const entry = await getPost(slug).catch(() => null);
  if (!entry) {
    notFound();
  }

  const bespoke = BESPOKE_CASES[slug];
  if (bespoke) {
    return bespoke();
  }

  const { frontmatter, html } = entry;
  const next = getNextPost(frontmatter.order);
  const prev = getPrevPost(frontmatter.order);

  return (
    <>
      <article>
        <header className={styles.header}>
          <Link href="/work" className={`text-label ${styles.back}`}>
            &larr; The archive
          </Link>
          <p className={`text-eyebrow ${styles.eyebrow}`}>
            Case {String(frontmatter.order).padStart(2, "0")} &middot; {frontmatter.disciplines[0]} &middot;{" "}
            {frontmatter.year}
          </p>
          <h1 className={`text-display text-title ${styles.title}`}>{frontmatter.title}</h1>
          <p className={`text-lede ${styles.lede}`}>{frontmatter.summary}</p>
        </header>

        <div className={styles.metaWrap}>
          <CaseMetaBar frontmatter={frontmatter} />
        </div>

        <div className={styles.leadImage}>
          <span className={styles.leadImageLabel}>{frontmatter.coverLabel ?? frontmatter.title}</span>
        </div>

        <div className={styles.bodyWrap}>
          {frontmatter.pullQuote && (
            <div className={styles.quoteWrap}>
              <PullQuote quote={frontmatter.pullQuote} />
            </div>
          )}
          <Prose html={html} />
        </div>

        {frontmatter.gallery && frontmatter.gallery.length > 0 && (
          <div className={styles.galleryWrap}>
            <div className={styles.gallery}>
              {frontmatter.gallery.map((filename) => (
                <figure key={filename} className={styles.galleryItem}>
                  <span className={styles.galleryLabel}>{filename}</span>
                </figure>
              ))}
            </div>
          </div>
        )}

        {frontmatter.outcomes && frontmatter.outcomes.length > 0 && (
          <div className={styles.outcomesWrap}>
            <OutcomesGrid outcomes={frontmatter.outcomes} />
          </div>
        )}
      </article>

      <CaseNav
        prevHref={`/work/${prev.slug}`}
        prevTitle={prev.frontmatter.title}
        nextHref={`/work/${next.slug}`}
        nextTitle={next.frontmatter.title}
      />
    </>
  );
}
