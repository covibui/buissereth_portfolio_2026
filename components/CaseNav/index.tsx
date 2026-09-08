import Link from "next/link";
import styles from "./CaseNav.module.css";

export interface CaseNavProps {
  prevHref: string;
  prevTitle: string;
  nextHref: string;
  nextTitle: string;
  prevKicker?: string;
  nextKicker?: string;
}

/** Prev/next case navigation. */
export default function CaseNav({
  prevHref,
  prevTitle,
  nextHref,
  nextTitle,
  prevKicker = "Previous case",
  nextKicker = "Next case",
}: CaseNavProps) {
  return (
    <nav className={styles.nav} aria-label="Case navigation">
      <div className={styles.grid}>
        <Link href={prevHref} className={styles.prev}>
          <span className={styles.kicker}>&larr; {prevKicker}</span>
          <span className={styles.title}>{prevTitle}</span>
        </Link>
        <Link href={nextHref} className={styles.next}>
          <span className={styles.kicker}>{nextKicker} &rarr;</span>
          <span className={styles.title}>{nextTitle}</span>
        </Link>
      </div>
    </nav>
  );
}
