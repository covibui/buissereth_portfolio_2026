import Link from "next/link";
import type { ContentEntry, PostFrontmatter } from "@/lib/types";
import styles from "./CaseFeaturedRow.module.css";

export default function CaseFeaturedRow({
  post,
  reversed,
}: {
  post: ContentEntry<PostFrontmatter>;
  reversed: boolean;
}) {
  const { slug, frontmatter } = post;
  const href = `/work/${slug}`;

  return (
    <article className={reversed ? `${styles.row} ${styles.reversed}` : styles.row}>
      <Link href={href} className={styles.imageWrap}>
        <span className={styles.imageLabel}>{frontmatter.coverLabel ?? frontmatter.title}</span>
      </Link>
      <div className={styles.content}>
        <span className={styles.index}>
          {String(frontmatter.order).padStart(2, "0")} — {frontmatter.disciplines[0]}
        </span>
        <h3 className={styles.title}>{frontmatter.title}</h3>
        <p className={styles.summary}>{frontmatter.summary}</p>
        <Link href={href} className={styles.cta}>
          Read the case →
        </Link>
      </div>
    </article>
  );
}
