import classNames from "classnames";
import Tag from "./Tag";
import type { ContentEntry, ProjectFrontmatter } from "@/lib/types";
import { placeholderImageForIndex } from "@/lib/placeholderImages";
import styles from "./ProjectRow.module.css";

export default function ProjectRow({
  project,
  reversed,
  index,
}: {
  project: ContentEntry<ProjectFrontmatter> & { html: string };
  reversed: boolean;
  index: number;
}) {
  const { frontmatter, html } = project;
  // Placeholder art fills the gray image block until a real photo is dropped in.
  // Keyed by position so images don't repeat on adjacent cards.
  const placeholder = placeholderImageForIndex(index);

  return (
    <article className={classNames(styles.project, reversed && styles.reversed)}>
      <div className={styles.imageWrap}>
        {placeholder && (
          <img src={placeholder} alt="" className={styles.image} loading="lazy" />
        )}
        <span className={`text-label ${styles.imageLabel}`}>{frontmatter.imageLabel}</span>
      </div>
      <div className={styles.content}>
        <span className={`text-label ${styles.index}`}>
          {String(frontmatter.order).padStart(2, "0")} — {frontmatter.category}
        </span>
        <h2 className={`text-display text-title-sm ${styles.title}`}>{frontmatter.title}</h2>
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: html }} />
        <div className={styles.tags}>
          {frontmatter.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}
