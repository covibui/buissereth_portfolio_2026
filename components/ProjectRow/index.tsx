import classNames from "classnames";
import Tag from "./Tag";
import type { ContentEntry, ProjectFrontmatter } from "@/lib/types";
import styles from "./ProjectRow.module.css";

export default function ProjectRow({
  project,
  reversed,
}: {
  project: ContentEntry<ProjectFrontmatter> & { html: string };
  reversed: boolean;
}) {
  const { frontmatter, html } = project;

  return (
    <article className={classNames(styles.project, reversed && styles.reversed)}>
      <div className={styles.imageWrap}>
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
