import type { ResumeEducationItem } from "@/lib/types";
import styles from "./EducationRow.module.css";

export default function EducationRow({ item }: { item: ResumeEducationItem }) {
  return (
    <div className={styles.row}>
      <div>
        <h3 className={`text-serif-md ${styles.title}`}>{item.title}</h3>
        <p className={`text-body-sm ${styles.place}`}>{item.place}</p>
      </div>
      <span className={`text-meta ${styles.year}`}>{item.year}</span>
    </div>
  );
}
