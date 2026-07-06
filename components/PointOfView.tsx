import Prose from "./Prose";
import styles from "./PointOfView.module.css";

export default function PointOfView({ eyebrow, html }: { eyebrow: string; html: string }) {
  return (
    <section className={styles.pov}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <Prose html={html} variant="dark" />
      </div>
    </section>
  );
}
