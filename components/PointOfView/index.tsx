import { renderInlineMarkdown } from "@/lib/markdown";
import type { PointOfViewFrontmatter } from "@/lib/types";
import styles from "./PointOfView.module.css";

export default function PointOfView({ content }: { content: PointOfViewFrontmatter }) {
  const { eyebrow, lead, principles } = content;

  return (
    <section className={styles.pov}>
      <div className={styles.inner}>
        <p className={`text-eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
        <h2
          className={`text-serif-xl ${styles.lead}`}
          dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(lead) }}
        />
        <ol className={styles.principles}>
          {principles.map((principle, index) => (
            <li key={principle.title} className={styles.principle}>
              <p className={`text-label ${styles.principleTitle}`}>
                {String(index + 1).padStart(2, "0")} / {principle.title}
              </p>
              <p className={`text-body-sm ${styles.principleBody}`}>{principle.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
