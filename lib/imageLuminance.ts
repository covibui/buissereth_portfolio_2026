/**
 * Average relative luminance of an image, used to decide whether copy sitting
 * over it needs to flip to white.
 *
 * The image is drawn to a 16×16 canvas and averaged — small enough to be free,
 * large enough that one bright corner doesn't swing the result. Reveal images
 * are served from /public, so the canvas is same-origin and never tainted; the
 * try/catch is there for the case where it is (a future CDN, say), and resolves
 * null so callers can fall back to the default dark-on-paper treatment.
 */

/** Below this average luminance an image counts as dark. Ported from hero-reveal.js. */
export const DARK_LUMINANCE_THRESHOLD = 0.55;

export function measureImageLuminance(src: string): Promise<number | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(image, 0, 0, 16, 16);
        const { data } = ctx.getImageData(0, 0, 16, 16);
        let sum = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i] ?? 0;
          const g = data[i + 1] ?? 0;
          const b = data[i + 2] ?? 0;
          // Rec. 709 luma coefficients, normalized to 0–1.
          sum += (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        }
        resolve(sum / (data.length / 4));
      } catch {
        resolve(null);
      }
    };

    image.onerror = () => resolve(null);
    image.src = src;
  });
}
