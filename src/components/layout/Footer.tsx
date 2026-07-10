export function Footer() {
  return (
    <footer
      className="px-4 sm:px-6 py-6 text-center"
      style={{ borderTop: "var(--border)" }}
    >
      <p className="font-mono text-xs" style={{ color: "rgba(27,24,17,0.55)" }}>
        Desenvolvido por{" "}
        <a
          href="https://www.linkedin.com/in/giuseppe-bertholdi-785b18341/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
          style={{ color: "var(--vibe-ink)" }}
        >
          Giuseppe
        </a>
      </p>
    </footer>
  );
}
