import type { ResumeRole } from "@/lib/types";
import styles from "./page.module.css";

export default function RoleCard({ role }: { role: ResumeRole }) {
  return (
    <div className={styles.role}>
      <div className={styles.roleHeader}>
        <h3 className={styles.roleTitle}>{role.title}</h3>
        <span className={styles.roleDates}>{role.dates}</span>
      </div>
      <p className={styles.roleCompany}>{role.company}</p>
      <p className={styles.roleBlurb}>{role.blurb}</p>
    </div>
  );
}
