import type { ResumeRole } from "@/lib/types";
import styles from "./RoleCard.module.css";

export default function RoleCard({ role }: { role: ResumeRole }) {
  return (
    <div className={styles.role}>
      <div className={styles.header}>
        <h3 className={`text-serif-lg ${styles.title}`}>{role.title}</h3>
        <span className={`text-meta ${styles.dates}`}>{role.dates}</span>
      </div>
      <p className={`text-label ${styles.company}`}>{role.company}</p>
      <p className={`text-body ${styles.blurb}`}>{role.blurb}</p>
    </div>
  );
}
