import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <p className={`text-eyebrow ${styles.code}`}>404</p>
      <h1 className={styles.title}>This page hasn&rsquo;t been framed yet.</h1>
      <Link href="/" className={styles.home}>
        &larr; Back home
      </Link>
    </div>
  );
}
