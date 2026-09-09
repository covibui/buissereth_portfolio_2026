"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import classNames from "classnames";
import { renderInlineMarkdown } from "@/lib/markdown";
import { pickRandomRevealImage } from "@/lib/revealImages";
import { DARK_LUMINANCE_THRESHOLD, measureImageLuminance } from "@/lib/imageLuminance";
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
  /** Optional "← back" link above the eyebrow, used by case covers that sit under an index page. */
  backHref?: string;
  backLabel?: string;
  /** Content set opposite the lede in the "divider" row — e.g. a live-site link. */
  ledeAside?: ReactNode;
  /**
   * Render the headline's emphasis in the serif face rather than the display
   * face. The Cookbook cover sets its accent word in italic Newsreader against
   * a Pagio headline; every other hero keeps the emphasis in Pagio.
   */
  serifAccent?: boolean;
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
  backHref,
  backLabel,
  ledeAside,
  serifAccent = false,
}: HeroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  // Whether a reveal image actually loaded, and whether it's dark enough that
  // ink/accent copy over it needs to flip to white.
  const [hasImage, setHasImage] = useState(false);
  const [imageIsDark, setImageIsDark] = useState(false);

  // Pick a random reveal image on every mount (page load, refresh, or client-side
  // navigation) and inject it as the placeholder's background. Runs only on the
  // client, so the randomness never causes a server/client hydration mismatch.
  // Falls back to the CSS placeholder pattern when the image pool is empty.
  useEffect(() => {
    if (!showReveal) return;
    const el = placeholderRef.current;
    const src = pickRandomRevealImage();
    if (!el || !src) return;
    el.style.backgroundImage = `url("${src}")`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.style.backgroundRepeat = "no-repeat";
    setHasImage(true);

    // Sample the image and flip the hero's ink/accent to white over a dark one,
    // so the eyebrow, headline and reveal pill stay legible. An unmeasurable
    // image leaves the default dark-on-paper treatment in place.
    let cancelled = false;
    measureImageLuminance(src).then((luminance) => {
      if (cancelled || luminance === null) return;
      setImageIsDark(luminance < DARK_LUMINANCE_THRESHOLD);
    });
    return () => {
      cancelled = true;
    };
  }, [showReveal]);

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
  );

  const ledeEl = ledeHtml ? <p className={ledeClasses} dangerouslySetInnerHTML={{ __html: ledeHtml }} /> : null;

  return (
    <section
      className={classNames(styles.hero, showReveal && revealed && imageIsDark && styles.overDarkImage)}
      onMouseMove={showReveal ? handleMouseMove : undefined}
      onMouseLeave={showReveal ? handleMouseLeave : undefined}
    >
      {showReveal && (
        <>
          <div ref={placeholderRef} className={styles.placeholder} aria-hidden="true">
            {revealLabel && !hasImage && (
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
        {backHref && backLabel && (
          <Link href={backHref} className={styles.back}>
            &larr; {backLabel}
          </Link>
        )}
        <p className={`text-eyebrow ${styles.eyebrow}`} dangerouslySetInnerHTML={{ __html: eyebrowHtml }} />
        <h1
          className={classNames(
            "text-display",
            size === "large" ? "text-hero" : "text-title",
            styles.headline,
            serifAccent && styles.serifAccent,
          )}
          dangerouslySetInnerHTML={{ __html: headlineHtml }}
        />
        {ledeVariant === "divider" ? (
          <div className={styles.metaRow}>
            {ledeEl}
            {ledeAside && (showReveal ? <div className={styles.asideHighlight}>{ledeAside}</div> : ledeAside)}
          </div>
        ) : (
          ledeEl
        )}
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
