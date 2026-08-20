"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
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
            // Highlight the section for its index and every child route
            // (e.g. "Work" stays active on /work/<case-slug>).
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={classNames(styles.navLink, isActive && styles.navLinkActive)}
                  aria-current={isActive ? "page" : undefined}
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
