export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-8 border-t"
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span
            className="font-syne font-bold text-sm"
            style={{ color: "var(--text)" }}
          >
            KA<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: "var(--muted)" }}
          >
            Karpagapriya A
          </span>
        </div>

        <p
          className="font-mono text-xs text-center"
          style={{ color: "var(--muted)" }}
        >
          Designed & built with Next.js · TypeScript · Tailwind · GSAP
        </p>

        <p
          className="font-mono text-xs"
          style={{ color: "var(--muted)" }}
        >
          © {year}
        </p>
      </div>
    </footer>
  );
}
