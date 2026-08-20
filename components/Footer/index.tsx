import type { SiteConfig } from "@/lib/types";
import styles from "./Footer.module.css";

export default function Footer({ config }: { config: SiteConfig }) {
  const { cta, links } = config.footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <p className={`text-eyebrow ${styles.ctaLabel}`}>{cta.label}</p>
            <h2 className={`text-serif-xl ${styles.ctaHeadline}`}>{cta.headline}</h2>
          </div>
          <a href={`mailto:${config.email}`} className={styles.email}>
            {config.email}
          </a>
        </div>
        <div className={styles.bottom}>
          <span>
            &copy; {new Date().getFullYear()} {config.name}
          </span>
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#top" className={styles.back}>
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
