import styles from "./Tag.module.css";

export default function Tag({ label }: { label: string }) {
  const isLive = label === "Live";
  return <span className={isLive ? `${styles.tag} ${styles.tagLive}` : styles.tag}>{label}</span>;
}
