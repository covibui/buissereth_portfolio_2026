"use client";

import { useRef, type MouseEvent } from "react";
import styles from "./Hero.module.css";

export interface HeroCtaProps {
  label: string;
  href: string;
}

export interface HeroProps {
  eyebrowHtml: string;
  headlineHtml: string;
  ledeHtml?: string;
  cta?: HeroCtaProps;
  showReveal?: boolean;
  revealLabel?: string;
}

export default function Hero({
  eyebrowHtml,
  headlineHtml,
  ledeHtml,
  cta,
  showReveal = true,
  revealLabel,
}: HeroProps) {
  const revealRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const reveal = revealRef.current;
    if (!reveal) return;
    const rect = event.currentTarget.getBoundingClientRect();
    reveal.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    reveal.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  function handleMouseEnter() {
    if (revealRef.current) revealRef.current.style.opacity = "1";
  }

  function handleMouseLeave() {
    if (revealRef.current) revealRef.current.style.opacity = "0";
  }

  return (
    <section
      className={styles.hero}
      onMouseMove={showReveal ? handleMouseMove : undefined}
      onMouseEnter={showReveal ? handleMouseEnter : undefined}
      onMouseLeave={showReveal ? handleMouseLeave : undefined}
    >
      {showReveal && (
        <div className={styles.reveal} ref={revealRef} aria-hidden="true">
          {revealLabel && <span className={styles.revealLabel}>{revealLabel}</span>}
        </div>
      )}
      <p className={styles.eyebrow} dangerouslySetInnerHTML={{ __html: eyebrowHtml }} />
      <h1 className={styles.headline} dangerouslySetInnerHTML={{ __html: headlineHtml }} />
      {cta ? (
        <div className={styles.metaRow}>
          {ledeHtml && <p className={styles.metaLede} dangerouslySetInnerHTML={{ __html: ledeHtml }} />}
          <a href={cta.href} className={styles.metaCta}>
            {cta.label}
          </a>
        </div>
      ) : (
        ledeHtml && <p className={styles.lede} dangerouslySetInnerHTML={{ __html: ledeHtml }} />
      )}
    </section>
  );
}
