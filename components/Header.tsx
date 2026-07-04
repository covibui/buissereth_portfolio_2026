"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteConfig } from "@/lib/types";
import styles from "./Header.module.css";

export default function Header({ config }: { config: SiteConfig }) {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.wordmark}>
        <img src="/mark.png" alt={`${config.name} mark`} width={26} height={26} />
        <span className={styles.name}>{config.name}</span>
        <span className={styles.discipline}>{config.discipline}</span>
      </Link>
      <nav>
        <ul className={styles.nav}>
          {config.nav.map((link) => {
            const isActive = pathname === link.href || pathname === `${link.href}/`;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a href={`mailto:${config.email}`} className={styles.cta}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
