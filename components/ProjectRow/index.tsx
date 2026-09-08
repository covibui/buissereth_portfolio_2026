import Link from "next/link";
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
  const href = frontmatter.caseHref;

  // The image and title link only when the project has a case page. They're
  // separate anchors rather than one wrapping the card (which is how the design
  // draws it) because the description is rendered markdown and may contain its
  // own links — nesting those inside an outer <a> would be invalid. This matches
  // how CaseFeaturedRow handles the same problem.
  const image = placeholder && <img src={placeholder} alt="" className={styles.image} loading="lazy" />;
  const label = <span className={`text-label ${styles.imageLabel}`}>{frontmatter.imageLabel}</span>;

  return (
    <article className={classNames(styles.project, reversed && styles.reversed)}>
      {href ? (
        <Link href={href} className={styles.imageWrap} aria-hidden="true" tabIndex={-1}>
          {image}
          {label}
        </Link>
      ) : (
        <div className={styles.imageWrap}>
          {image}
          {label}
        </div>
      )}
      <div className={styles.content}>
        <span className={`text-label ${styles.index}`}>{frontmatter.category}</span>
        <h2 className={`text-display text-title-sm ${styles.title}`}>
          {href ? (
            <Link href={href} className={styles.titleLink}>
              {frontmatter.title}
            </Link>
          ) : (
            frontmatter.title
          )}
        </h2>
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: html }} />
        <div className={styles.tags}>
          {frontmatter.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        {href && (
          <Link href={href} className={styles.cta}>
            Read the case &rarr;
          </Link>
        )}
      </div>
    </article>
  );
}
