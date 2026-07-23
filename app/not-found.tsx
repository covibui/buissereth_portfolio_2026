import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "clamp(96px, 14vw, 160px) 48px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "Archivo, sans-serif",
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--accent)",
          fontWeight: 600,
          marginBottom: 24,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "Newsreader, serif",
          fontWeight: 400,
          fontSize: "clamp(32px, 5vw, 56px)",
          marginBottom: 24,
        }}
      >
        This page hasn&rsquo;t been framed yet.
      </h1>
      <Link href="/" style={{ color: "var(--accent)", textDecoration: "none", fontFamily: "Archivo, sans-serif" }}>
        &larr; Back home
      </Link>
    </div>
  );
}
