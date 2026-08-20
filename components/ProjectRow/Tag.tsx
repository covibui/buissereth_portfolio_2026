import classNames from "classnames";
import styles from "./Tag.module.css";

export default function Tag({ label }: { label: string }) {
  const isLive = label === "Live";
  return <span className={classNames(styles.tag, isLive && styles.tagLive)}>{label}</span>;
}
