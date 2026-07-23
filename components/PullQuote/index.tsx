import styles from "./PullQuote.module.css";

export default function PullQuote({ quote }: { quote: string }) {
  return <blockquote className={styles.quote}>&ldquo;{quote}&rdquo;</blockquote>;
}
