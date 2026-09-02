/**
 * Image pool for the cursor-reveal effect (the picture that shows through the
 * halo behind the paper overlay). One entry is chosen at random on every page
 * load, so a different image appears each visit.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  ▸ ADD / REMOVE IMAGES HERE — this array is the ONLY thing to update.
 *    1. Drop the file into  public/images/reveal/
 *    2. Add (or delete) its filename in REVEAL_IMAGES below.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Why a hand-maintained array? The site is fully static (no server/backend), so
 * there is no runtime API to list a folder's contents. A hardcoded array is the
 * simplest reliable approach: no build step, no fetch, no manifest to generate —
 * just edit this list when the folder changes.
 */

/** Folder the files live in, under /public. Change here if you move the folder. */
export const REVEAL_IMAGE_DIR = "/images/reveal";

export const REVEAL_IMAGES = [
  // "example-01.jpg",
  // "example-02.jpg",
  // "example-03.png",
] as const;

/**
 * Picks a random image URL from the pool, e.g. "/images/reveal/example-01.jpg".
 * Returns null when the pool is empty, so callers can fall back to the CSS
 * placeholder instead of setting a broken background.
 */
export function pickRandomRevealImage(): string | null {
  if (REVEAL_IMAGES.length === 0) return null;
  const filename = REVEAL_IMAGES[Math.floor(Math.random() * REVEAL_IMAGES.length)];
  return `${REVEAL_IMAGE_DIR}/${filename}`;
}
