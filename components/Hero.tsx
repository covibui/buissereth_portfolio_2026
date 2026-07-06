"use client";

import { useRef, useState, type MouseEvent } from "react";
import styles from "./Hero.module.css";

export interface HeroProps {
  eyebrowHtml: string;
  headlineHtml: string;
  ledeHtml?: string;
  /** "divider" renders the lede in a bordered row below a rule (Home); "plain" floats it under the headline. Defaults to "plain". */
  ledeVariant?: "plain" | "divider";
  /** Home's headline runs larger than the sub-pages'. Defaults to "compact". */
  size?: "large" | "compact";
  /**
   * Cursor-hole image-reveal effect: a placeholder image sits behind a paper-colored
   * overlay. Moving the cursor punches a soft circular hole in the overlay (CSS mask
   * driven by --mx/--my, updated imperatively for performance). The button permanently
   * toggles the whole overlay on/off, independent of cursor position.
   */
  showReveal?: boolean;
  revealLabel?: string;
  /** Corner the placeholder caption anchors to — the toggle button is always bottom-right. Defaults to "left". */
  revealAlign?: "left" | "right";
}

export default function Hero({
  eyebrowHtml,
  headlineHtml,
  ledeHtml,
  ledeVariant = "plain",
  size = "compact",
  showReveal = true,
  revealLabel,
  revealAlign = "left",
}: HeroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const rect = event.currentTarget.getBoundingClientRect();
    overlay.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    overlay.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  function handleMouseLeave() {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.style.setProperty("--mx", "-400px");
    overlay.style.setProperty("--my", "-400px");
  }

  const ledeClasses = [
    ledeVariant === "divider" ? styles.metaLede : styles.lede,
    showReveal ? styles.ledeHighlight : "",
    showReveal && revealed ? styles.ledeRevealed : "",
  ]
    .filter(Boolean)
    .join(" ");

  const lede = ledeHtml ? <p className={ledeClasses} dangerouslySetInnerHTML={{ __html: ledeHtml }} /> : null;

  return (
    <section
      className={styles.hero}
      onMouseMove={showReveal ? handleMouseMove : undefined}
      onMouseLeave={showReveal ? handleMouseLeave : undefined}
    >
      {showReveal && (
        <div className={styles.placeholder} aria-hidden="true">
          {revealLabel && (
            <span
              className={
                revealAlign === "right" ? `${styles.placeholderLabel} ${styles.alignRight}` : styles.placeholderLabel
              }
            >
              {revealLabel}
            </span>
          )}
        </div>
      )}

      {showReveal && (
        <div
          ref={overlayRef}
          aria-hidden="true"
          className={revealed ? `${styles.overlay} ${styles.overlayHidden}` : styles.overlay}
        />
      )}

      <div className={styles.content}>
        <p className={styles.eyebrow} dangerouslySetInnerHTML={{ __html: eyebrowHtml }} />
        <h1
          className={size === "large" ? `${styles.headline} ${styles.headlineLarge}` : styles.headline}
          dangerouslySetInnerHTML={{ __html: headlineHtml }}
        />
        {ledeVariant === "divider" ? <div className={styles.metaRow}>{lede}</div> : lede}
      </div>

      {showReveal && (
        <button type="button" className={styles.toggle} onClick={() => setRevealed((value) => !value)}>
          <span className={revealed ? `${styles.dot} ${styles.dotFilled}` : styles.dot} aria-hidden="true" />
          {revealed ? "Cover image" : "Reveal image"}
        </button>
      )}
    </section>
  );
}
