import styles from "./Prose.module.css";

/**
 * Renders a pre-rendered HTML string (produced by lib/markdown.ts'
 * markdownToHtml, itself fed by remark/rehype) with the site's editorial
 * typographic styles. Content is always author-supplied Markdown from
 * content/, never user input, so no client-side sanitization pass is run.
 */
export interface ProseProps {
  html: string;
  /** "dark" is used for prose rendered on the ink-colored Point-of-View section. */
  variant?: "light" | "dark";
  className?: string;
}

export default function Prose({ html, variant = "light", className }: ProseProps) {
  const classes = [styles.prose, variant === "dark" ? styles.dark : "", className].filter(Boolean).join(" ");
  return <div className={classes} dangerouslySetInnerHTML={{ __html: html }} />;
}
