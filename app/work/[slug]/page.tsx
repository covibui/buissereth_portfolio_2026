import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose from "@/components/Prose";
import CaseMetaBar from "@/components/CaseMetaBar";
import OutcomesGrid from "@/components/OutcomesGrid";
import PullQuote from "@/components/PullQuote";
import { getAllPostSlugs, getNextPost, getPost, getPrevPost } from "@/lib/posts";
import styles from "./page.module.css";

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
    return { title: `${frontmatter.title} — Brianna Buissereth`, description: frontmatter.summary };
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

  const { frontmatter, html } = entry;
  const next = getNextPost(frontmatter.order);
  const prev = getPrevPost(frontmatter.order);

  return (
    <>
      <article>
        <header className={styles.header}>
          <Link href="/work" className={styles.back}>
            &larr; The archive
          </Link>
          <p className={styles.eyebrow}>
            Case {String(frontmatter.order).padStart(2, "0")} &middot; {frontmatter.disciplines[0]} &middot;{" "}
            {frontmatter.year}
          </p>
          <h1 className={`${styles.title} text-display`}>{frontmatter.title}</h1>
          <p className={styles.lede}>{frontmatter.summary}</p>
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
                <a
                  key={filename}
                  href={`/images/work/${slug}/${filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.galleryItem}
                >
                  <span className={styles.galleryLabel}>{filename}</span>
                </a>
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

      <div className={styles.navRow}>
        <Link href={`/work/${prev.slug}`} className={styles.prev}>
          <span className={styles.prevLabel}>&larr; Previous case</span>
          <span className={styles.prevTitle}>{prev.frontmatter.title}</span>
        </Link>
        <Link href={`/work/${next.slug}`} className={styles.next}>
          <span className={styles.nextLabel}>Next case &rarr;</span>
          <span className={styles.nextTitle}>{next.frontmatter.title}</span>
        </Link>
      </div>
    </>
  );
}
