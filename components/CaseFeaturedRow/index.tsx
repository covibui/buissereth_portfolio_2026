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
  // A case supplies its own cover once real art exists; until then the rotating
  // placeholder fills the gray block, keyed by position so images don't repeat
  // on adjacent cards.
  const cover = frontmatter.cover ?? placeholderImageForIndex(index);

  // The whole row is one link to the case. Everything inside is therefore plain
  // markup rather than nested anchors — the summary is plain frontmatter text,
  // so there's no rendered markdown here that could contain a link of its own.
  return (
    <Link href={href} className={classNames(styles.row, reversed && styles.reversed)}>
      <div className={styles.imageWrap}>
        {cover && (
          <img src={cover} alt={frontmatter.coverAlt ?? ""} className={styles.image} loading="lazy" />
        )}
        <span className={`text-label ${styles.imageLabel}`}>{frontmatter.coverLabel ?? frontmatter.title}</span>
      </div>
      <div className={styles.content}>
        <span className={`text-label ${styles.index}`}>{frontmatter.disciplines[0]}</span>
        <h3 className={`text-display text-title-sm ${styles.title}`}>{frontmatter.title}</h3>
        <p className={`text-lede ${styles.summary}`}>{frontmatter.summary}</p>
        <span className={styles.cta}>Read the case &rarr;</span>
      </div>
    </Link>
  );
}
