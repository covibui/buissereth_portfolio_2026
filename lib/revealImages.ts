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

export const REVEAL_IMAGES: string[] = [
  "art-institute-of-chicago-8iUNcgrHl1c-unsplash.jpg",
  "art-institute-of-chicago-FGuCahPfK_Y-unsplash.jpg",
  "art-institute-of-chicago-P1RgzNBTYJA-unsplash.jpg",
  "art-institute-of-chicago-VBIBfUiKwlA-unsplash.jpg",
  "art-institute-of-chicago-iIqtbtwygJ8-unsplash.jpg",
  "art-institute-of-chicago-oOfKmaGYFRM-unsplash (1).jpg",
  "art-institute-of-chicago-oOfKmaGYFRM-unsplash.jpg",
  "art-institute-of-chicago-pybByTGQ9zI-unsplash.jpg",
  "art-institute-of-chicago-ydxm03QWbrg-unsplash.jpg",
  "birmingham-museums-trust--IAS_N85adA-unsplash.jpg",
  "birmingham-museums-trust-8wcoY3wcbL0-unsplash.jpg",
  "birmingham-museums-trust-APBY55P91Kw-unsplash.jpg",
  "birmingham-museums-trust-nbneQlI2M1A-unsplash.jpg",
  "birmingham-museums-trust-ry7zt1kbbtg-unsplash.jpg",
  "birmingham-museums-trust-wKlHsooRVbg-unsplash (1).jpg",
  "birmingham-museums-trust-wKlHsooRVbg-unsplash.jpg",
  "brendan-beale-YJsw2TfZ_F4-unsplash.jpg",
  "british-library-gUDNK8NqYHk-unsplash.jpg",
  "brooklyn-MO5qO9xpZhA-unsplash.jpg",
  "claudio-schwarz-k39RGHmLoV8-unsplash.jpg",
  "europeana-LPYx__bZvn8-unsplash.jpg",
  "jr-korpa-ruCTHI5N2w4-unsplash.jpg",
  "minsun-kim-1LDTKqFFQTQ-unsplash.jpg",
  "museum-of-new-zealand-te-papa-tongarewa-krheTKWpK8U-unsplash.jpg",
  "national-library-of-australia-CrZwPAJWx8o-unsplash.jpg",
  "steve-a-johnson-3Sf_G9m0gcQ-unsplash.jpg",
  "steve-a-johnson-xJmL5rlztZs-unsplash.jpg",
  "the-cleveland-museum-of-art-EfA6kd0uS54-unsplash.jpg",
  "the-cleveland-museum-of-art-_kDzP0NnkDc-unsplash.jpg",
  "the-metropolitan-museum-of-art-5v84CC6WxyU-unsplash.jpg",
  "the-new-york-public-library-dBi_39NaHCE-unsplash.jpg",
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
