import type { ResumeEducationItem } from "@/lib/types";
import styles from "./page.module.css";

export default function EducationRow({ item }: { item: ResumeEducationItem }) {
  return (
    <div className={styles.eduRow}>
      <div>
        <h3 className={styles.eduTitle}>{item.title}</h3>
        <p className={styles.eduPlace}>{item.place}</p>
      </div>
      <span className={styles.eduYear}>{item.year}</span>
    </div>
  );
}
