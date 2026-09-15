/**
 * Placeholder cover art for the case/project cards on Home, Work, and Personal.
 *
 * These fill the gray image blocks that mark unfinished / not-yet-built cards
 * ("dead links") until a real cover photo is dropped in. This is a SEPARATE
 * pool from the hero cursor-reveal images (see lib/revealImages.ts) so the two
 * can be curated independently.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  ▸ ADD / REMOVE IMAGES HERE — this array is the ONLY thing to update.
 *    1. Drop the file into  public/images/placeholders/
 *    2. Add (or delete) its filename in PLACEHOLDER_IMAGES below.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * While this list is empty, the cards fall back to the hero reveal art pool so
 * they never render a broken image or a bare gray box. As soon as one or more
 * filenames are listed here, those take over as the placeholder covers.
 *
 * Why a hand-maintained array? The site is fully static (no server/backend), so
 * there is no runtime API to list a folder's contents. A hardcoded array is the
 * simplest reliable approach — just edit this list when the folder changes.
 */

import { REVEAL_IMAGE_DIR, REVEAL_IMAGES } from "./revealImages";

/** Folder the files live in, under /public. Change here if you move the folder. */
export const PLACEHOLDER_IMAGE_DIR = "/images/placeholders";

export const PLACEHOLDER_IMAGES: string[] = [
  "art-institute-of-chicago-1edDflHhRpY-unsplash.jpg",
  "art-institute-of-chicago-Cbl_U1MC7hY-unsplash.jpg",
  "art-institute-of-chicago-igqdTjqT4Mw-unsplash.jpg",
  "art-institute-of-chicago-x7Vlq_hVB34-unsplash.jpg",
  "boston-public-library-PNBPBlwCEWk-unsplash.jpg",
];

/**
 * Picks a placeholder image URL by the card's position on the page. Cards are
 * assigned images sequentially and the pool cycles, so no two consecutive cards
 * share an image and a repeat only occurs once every card in the pool has been
 * used (unavoidable when a page has more cards than the pool has images).
 *
 * Position-based (not random) keeps it stable with no server/client hydration
 * mismatch. Falls back to the hero reveal pool while PLACEHOLDER_IMAGES is
 * empty, and returns null only when both pools are empty (callers keep the gray
 * box).
 */
export function placeholderImageForIndex(index: number): string | null {
  const [dir, files] =
    PLACEHOLDER_IMAGES.length > 0
      ? [PLACEHOLDER_IMAGE_DIR, PLACEHOLDER_IMAGES]
      : [REVEAL_IMAGE_DIR, REVEAL_IMAGES];
  if (files.length === 0) return null;
  const i = ((index % files.length) + files.length) % files.length;
  return `${dir}/${files[i]}`;
}
