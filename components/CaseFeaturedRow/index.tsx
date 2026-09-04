import Link from "next/link";
import classNames from "classnames";
import type { ContentEntry, PostFrontmatter } from "@/lib/types";
import { placeholderImageForIndex } from "@/lib/placeholderImages";
import styles from "./CaseFeaturedRow.module.css";

export default function CaseFeaturedRow({
  post,
  reversed,
  index,
}: {
  post: ContentEntry<PostFrontmatter>;
  reversed: boolean;
  index: number;
}) {
  const { slug, frontmatter } = post;
  const href = `/work/${slug}`;
  // Placeholder art fills the gray cover block until a real photo is dropped in.
  // Keyed by position so images don't repeat on adjacent cards.
  const placeholder = placeholderImageForIndex(index);

  return (
    <article className={classNames(styles.row, reversed && styles.reversed)}>
      <Link href={href} className={styles.imageWrap} aria-hidden="true" tabIndex={-1}>
        {placeholder && (
          <img src={placeholder} alt="" className={styles.image} loading="lazy" />
        )}
        <span className={`text-label ${styles.imageLabel}`}>{frontmatter.coverLabel ?? frontmatter.title}</span>
      </Link>
      <div className={styles.content}>
        <span className={`text-label ${styles.index}`}>
          {String(frontmatter.order).padStart(2, "0")} — {frontmatter.disciplines[0]}
        </span>
        <h3 className={`text-display text-title-sm ${styles.title}`}>
          <Link href={href} className={styles.titleLink}>
            {frontmatter.title}
          </Link>
        </h3>
        <p className={`text-lede ${styles.summary}`}>{frontmatter.summary}</p>
        <Link href={href} className={styles.cta}>
          Read the case &rarr;
        </Link>
      </div>
    </article>
  );
}
