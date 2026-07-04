import Link from "next/link";
import type { ContentEntry, PostFrontmatter } from "@/lib/types";
import styles from "./CaseArchiveRow.module.css";

export default function CaseArchiveRow({ post }: { post: ContentEntry<PostFrontmatter> }) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/work/${slug}`} className={styles.row}>
      <span className={styles.num}>{String(frontmatter.order).padStart(2, "0")}</span>
      <span className={styles.title}>{frontmatter.title}</span>
      <span className={styles.meta}>
        {frontmatter.disciplines[0]} · {frontmatter.year}
      </span>
    </Link>
  );
}
