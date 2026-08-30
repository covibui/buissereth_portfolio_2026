"use client";

import { useRef, useState, type MouseEvent } from "react";
import classNames from "classnames";
import { renderInlineMarkdown } from "@/lib/markdown";
import styles from "./Hero.module.css";

export interface HeroProps {
  eyebrow: string;
  headline: string;
  lede?: string;
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
  eyebrow,
  headline,
  lede,
  ledeVariant = "plain",
  size = "compact",
  showReveal = true,
  revealLabel,
  revealAlign = "left",
}: HeroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const eyebrowHtml = renderInlineMarkdown(eyebrow);
  const headlineHtml = renderInlineMarkdown(headline);
  const ledeHtml = lede ? renderInlineMarkdown(lede) : undefined;

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

  const ledeClasses = classNames(
    "text-lede",
    ledeVariant === "divider" ? styles.metaLede : styles.lede,
    showReveal && styles.ledeHighlight,
    showReveal && revealed && styles.ledeRevealed,
  );

  const ledeEl = ledeHtml ? <p className={ledeClasses} dangerouslySetInnerHTML={{ __html: ledeHtml }} /> : null;

  return (
    <section
      className={styles.hero}
      onMouseMove={showReveal ? handleMouseMove : undefined}
      onMouseLeave={showReveal ? handleMouseLeave : undefined}
    >
      {showReveal && (
        <>
          <div className={styles.placeholder} aria-hidden="true">
            {revealLabel && (
              <span className={classNames(styles.placeholderLabel, revealAlign === "right" && styles.alignRight)}>
                {revealLabel}
              </span>
            )}
          </div>
          <div
            ref={overlayRef}
            aria-hidden="true"
            className={classNames(styles.overlay, revealed && styles.overlayHidden)}
          />
        </>
      )}

      <div className={styles.content}>
        <p className={`text-eyebrow ${styles.eyebrow}`} dangerouslySetInnerHTML={{ __html: eyebrowHtml }} />
        <h1
          className={classNames("text-display", size === "large" ? "text-hero" : "text-title", styles.headline)}
          dangerouslySetInnerHTML={{ __html: headlineHtml }}
        />
        {ledeVariant === "divider" ? <div className={styles.metaRow}>{ledeEl}</div> : ledeEl}
      </div>

      {showReveal && (
        <button type="button" className={styles.toggle} onClick={() => setRevealed((value) => !value)}>
          <span className={classNames(styles.dot, revealed && styles.dotFilled)} aria-hidden="true" />
          {revealed ? "Cover image" : "Reveal image"}
        </button>
      )}
    </section>
  );
}
