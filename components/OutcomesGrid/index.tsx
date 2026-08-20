import type { CaseOutcome } from "@/lib/types";
import styles from "./OutcomesGrid.module.css";

export default function OutcomesGrid({ outcomes }: { outcomes: CaseOutcome[] }) {
  return (
    <div className={styles.wrap}>
      <p className={`text-eyebrow ${styles.label}`}>What changed</p>
      <div className={styles.grid}>
        {outcomes.map((outcome) => (
          <div key={outcome.label}>
            <p className={styles.outcomeLabel}>{outcome.label}</p>
            <p className={styles.outcomeDesc}>{outcome.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
