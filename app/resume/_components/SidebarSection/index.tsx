import type { ReactNode } from "react";
import styles from "./SidebarSection.module.css";

/** A labeled block in the résumé sidebar (Contact, Focus, Tools). Each item is
   rendered as a list row, so callers can pass plain strings or rich nodes. */
export default function SidebarSection({ label, items }: { label: string; items: ReactNode[] }) {
  return (
    <div>
      <h2 className={`text-label ${styles.label}`}>{label}</h2>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
