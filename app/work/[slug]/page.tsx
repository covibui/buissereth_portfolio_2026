import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose from "@/components/Prose";
import CaseMetaBar from "@/components/CaseMetaBar";
import OutcomesGrid from "@/components/OutcomesGrid";
import PullQuote from "@/components/PullQuote";
import { getAllPostSlugs, getNextPost, getPost } from "@/lib/posts";
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

  return (
    <main>
      <article>
        <header className={styles.header}>
          <Link href="/work" className={styles.back}>
            ← The archive
          </Link>
          <p className={styles.eyebrow}>
            Case {String(frontmatter.order).padStart(2, "0")} · {frontmatter.disciplines[0]} · {frontmatter.year}
          </p>
          <h1 className={styles.title}>{frontmatter.title}</h1>
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
                <div key={filename} className={styles.galleryItem}>
                  <span className={styles.galleryLabel}>Artifact</span>
                </div>
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

      <div className={styles.nextWrap}>
        <Link href={`/work/${next.slug}`} className={styles.next}>
          <span className={styles.nextLabel}>Next case →</span>
          <span className={styles.nextTitle}>{next.frontmatter.title}</span>
        </Link>
      </div>
    </main>
  );
}
