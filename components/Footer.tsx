import type { SiteConfig } from "@/lib/types";
import styles from "./Footer.module.css";

export default function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <p className={styles.ctaLabel}>{config.footerCtaLabel}</p>
            <h2 className={styles.ctaHeadline}>{config.footerCtaHeadline}</h2>
          </div>
          <a href={`mailto:${config.email}`} className={styles.email}>
            {config.email}
          </a>
        </div>
        <div className={styles.bottom}>
          <span>
            © {config.copyrightYear} {config.copyrightName}
          </span>
          <ul className={styles.links}>
            {config.footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#top" className={styles.back}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
