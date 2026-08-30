import type { PostFrontmatter } from "@/lib/types";
import styles from "./CaseMetaBar.module.css";

export default function CaseMetaBar({ frontmatter }: { frontmatter: PostFrontmatter }) {
  const items = [
    { label: "Client", value: frontmatter.client },
    { label: "Year", value: frontmatter.year },
    { label: "Disciplines", value: frontmatter.disciplines.join(", ") },
  ];

  return (
    <dl className={styles.bar}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className={`text-label ${styles.label}`}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
