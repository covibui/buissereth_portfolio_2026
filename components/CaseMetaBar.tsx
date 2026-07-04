import type { PostFrontmatter } from "@/lib/types";
import styles from "./CaseMetaBar.module.css";

export default function CaseMetaBar({ frontmatter }: { frontmatter: PostFrontmatter }) {
  return (
    <div className={styles.bar}>
      <div>
        <p className={styles.label}>Client</p>
        <p className={styles.value}>{frontmatter.client}</p>
      </div>
      <div>
        <p className={styles.label}>Year</p>
        <p className={styles.value}>{frontmatter.year}</p>
      </div>
      <div>
        <p className={styles.label}>Disciplines</p>
        <p className={styles.value}>{frontmatter.disciplines.join(", ")}</p>
      </div>
    </div>
  );
}
