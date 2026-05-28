"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: "kryptrix",
    index: "01",
    name: "Kryptrix",
    subtitle: "Crypto Analytics Dashboard",
    status: "In Development 🔨",
    year: "2025",
    image: "/projects/kryptrix.png",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Query", "Zustand"],
    description:
      "Real-time crypto market dashboard with live price tracking, dynamic charts, portfolio analytics and AI market trend insights. Built with a fully custom component-driven design system.",
    highlights: [
      "Live price feeds via WebSocket integration",
      "Custom chart components with D3.js",
      "AI market trend analysis module",
      "Full design system — tokens, variants, dark mode",
    ],
    live: "https://kryptrix-demo.vercel.app",
    github: "https://github.com/akarpagapriya/kryptrix",
    tags: ["Crypto", "Dashboard", "Real-time", "API"],
    accentColor: "#0a66c2",
    accentLight: "rgba(10,102,194,0.10)",
    heart: false,
    note: null,
  },
  {
    id: "baya",
    index: "02",
    name: "Baya Dressmakers",
    subtitle: "Brand Identity Design",
    status: "Completed ✓",
    year: "2023",
    image: "/projects/baya.png",
    stack: ["Adobe Illustrator", "Figma", "Photoshop"],
    description:
      "Full brand identity system for Baya Dressmakers — logo mark, colour palette, typography and brand application across print and digital touchpoints.",
    highlights: [
      "Logo mark with fashion-forward visual language",
      "Complete colour system and typography pairing",
      "Brand guidelines document",
      "Application across social media and print",
    ],
    live: "https://www.behance.net/gallery/179654959/Baya-Dressmakers-Brand-Identity",
    github: null,
    tags: ["Branding", "Logo Design", "Identity", "Fashion"],
    accentColor: "#d97706",
    accentLight: "rgba(217,119,6,0.10)",
    heart: false,
    note: null,
  },
  {
    id: "tusko",
    index: "03",
    name: "Tusko",
    subtitle: "Brand Identity Design",
    status: "Completed ✓",
    year: "2023",
    image: "/projects/tusko.png",
    stack: ["Adobe Illustrator", "Figma", "Photoshop"],
    description:
      "Brand identity for Tusko — a bold, structured visual system covering logo, colour, typography and brand collateral for digital and print.",
    highlights: [
      "Bold geometric logo mark",
      "Brand colour system and typography",
      "Stationery and collateral design",
      "Digital and print brand application",
    ],
    live: "https://www.behance.net/gallery/181105077/Tusko-Brand-Identity",
    github: null,
    tags: ["Branding", "Logo Design", "Identity"],
    accentColor: "#7c3aed",
    accentLight: "rgba(124,58,237,0.10)",
    heart: false,
    note: null,
  },
  {
    id: "finlytics",
    index: "04",
    name: "Finlytics AI",
    subtitle: "AI Financial Insights Interface",
    status: "Live ✓",
    year: "2025",
    image: "/projects/finlytics.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    description:
      "AI-powered financial insights interface — designed so business users understand not just the AI answer but the confidence behind it. Handles 6 distinct UI states with a consistent visual language.",
    highlights: [
      "6 states — idle, loading, streaming, complete, low-confidence, error",
      "Animated confidence score with explainability panel",
      "Source attribution with animated relevance bars",
      "Framer Motion + GSAP animation system",
    ],
    live: "https://finlytics-ai-psi.vercel.app/",
    github: "https://github.com/akarpagapriya/finlytics-ai",
    tags: ["AI", "Fintech", "Dashboard", "UX"],
    accentColor: "#2563eb",
    accentLight: "rgba(37,99,235,0.10)",
    heart: false,
    note: null,
  },
  {
    id: "logofolio",
    index: "05",
    name: "Creative Logofolio",
    subtitle: "Logo Design Showcase",
    status: "Completed ✓",
    year: "2023",
    image: "/projects/logofolio.png",
    stack: ["Adobe Illustrator", "Figma", "Photoshop"],
    description:
      "A curated collection of logo and brand mark designs — each built from a research-led process, exploring multiple directions before refining to a single, strong visual identity.",
    highlights: [
      "10+ logo projects across industries",
      "Research-led visual identity process",
      "Full vector delivery at all scales",
      "Concept rationale for each mark",
    ],
    live: "https://www.behance.net/gallery/194652683/Creative-Logofolio-Showcase",
    github: null,
    tags: ["Logo Design", "Branding", "Illustrator", "Visual Identity"],
    accentColor: "#059669",
    accentLight: "rgba(5,150,105,0.10)",
    heart: false,
    note: null,
  },
  {
    id: "coinpea",
    index: "06",
    name: "Coinpea",
    subtitle: "Crypto Payment Gateway · AlphabetTech",
    status: "Professional Work",
    year: "2024",
    image: "/projects/coinpea.png",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "ShadCN"],
    description:
      "Production crypto payment gateway UI — multi-step transaction flows, wallet integration and real-time market data. Full Figma-to-React ownership at AlphabetTech.",
    highlights: [
      "Multi-step transaction flow with form validation",
      "Real-time exchange rate display",
      "Wallet connect and QR code generation UI",
      "Figma design system → production component library",
    ],
    live: null,
    github: null,
    tags: ["Fintech", "Crypto", "Production", "ShadCN"],
    accentColor: "#0369a1",
    accentLight: "rgba(3,105,161,0.10)",
    heart: false,
    note: "Professional project · Screenshots available on request",
  },
  {
    id: "web3-saas",
    index: "07",
    name: "Web3 SaaS Dashboard",
    subtitle: "Multi-tenant Admin Platform · AlphabetTech",
    status: "Professional Work",
    year: "2024",
    image: "/projects/web3-saas.png",
    stack: ["React", "Next.js", "TypeScript", "Material UI", "Metronics"],
    description:
      "Multi-tenant SaaS platform with role-based access control, dynamic admin and user dashboards per tenant and scalable component architecture.",
    highlights: [
      "Role-based access control across multiple tenants",
      "Dynamic dashboard layout per user role",
      "Reusable component architecture at scale",
      "Complex data table — filter, sort, export",
    ],
    live: null,
    github: null,
    tags: ["SaaS", "Web3", "Dashboard", "RBAC"],
    accentColor: "#0d9488",
    accentLight: "rgba(13,148,136,0.10)",
    heart: false,
    note: "Professional project · Screenshots available on request",
  },
];

type Project = (typeof PROJECTS)[0];

// ── Horizontal scroll track ───────────────────────────────────────────
function FeaturedTrack({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap  = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const getTotal = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getTotal(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${getTotal()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              projects.length - 1,
              Math.round(self.progress * (projects.length - 1))
            );
            setActive(idx);
          },
        },
      });
    });

    return () => ctx.revert();
  }, [projects.length]);

  return (
    <div ref={wrapRef} className="relative overflow-hidden" style={{ height: "100vh" }}>
      {/* Progress dots */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {projects.map((p, i) => (
          <div
            key={i}
            className="transition-all duration-300"
            style={{
              width: i === active ? "22px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === active ? p.accentColor : "var(--border)",
            }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 font-mono text-xs"
        style={{ color: "var(--muted)" }}
      >
        <span>scroll</span>
        <span>→</span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex will-change-transform"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project, i) => (
          <FeaturedSlide
            key={project.id}
            project={project}
            isActive={i === active}
            total={projects.length}
          />
        ))}
      </div>
    </div>
  );
}

// ── Single slide ──────────────────────────────────────────────────────
function FeaturedSlide({
  project,
  isActive,
  total,
}: {
  project: Project;
  isActive: boolean;
  total: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 h-full flex items-center"
      style={{
        width: "100vw",
        // Responsive padding: tighter on mobile
        padding: "72px max(16px,5vw) 48px",
        background: "var(--bg)",
      }}
    >
      {/* Big decorative index — theme-safe opacity */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-syne font-bold select-none pointer-events-none"
        style={{
          fontSize: "clamp(7rem, 20vw, 26rem)",
          lineHeight: 1,
          // Uses the accent colour at low opacity — works in both themes
          color: project.accentColor,
          opacity: isActive ? 0.07 : 0,
          letterSpacing: "-0.05em",
          zIndex: 0,
          transition: "opacity 0.6s ease",
          right: "-1vw",
        }}
      >
        {project.index}
      </div>

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto"
        style={{
          // Two columns on large screens, single column on mobile
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "28px",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* On large screens: two columns */}
        <style>{`
          @media (min-width: 1024px) {
            .slide-grid-${project.id} {
              grid-template-columns: 1fr 1fr !important;
              gap: clamp(32px,4vw,80px) !important;
              align-items: center;
            }
          }
        `}</style>
        <div className={`slide-grid-${project.id}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
          }}
        >
          {/* ── LEFT — text ── */}
          <div className="flex flex-col">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                {project.index} / {String(total).padStart(2, "0")}
              </span>
              <span className="h-px w-6" style={{ background: project.accentColor }} />
              <span
                className="font-mono text-xs px-2.5 py-0.5"
                style={{
                  color: project.accentColor,
                  border: `1px solid ${project.accentColor}50`,
                  borderRadius: "3px",
                  background: project.accentLight,
                }}
              >
                {project.status}
              </span>
              {project.heart && (
                <span className="font-mono text-xs" style={{ color: "#ff6b9d" }}>
                  Built with ❤️
                </span>
              )}
            </div>

            {/* Name */}
            <h3
              className="font-syne font-bold leading-tight mb-1.5"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.8rem)",
                color: "var(--text)",
                letterSpacing: "-0.02em",
              }}
            >
              {project.name}
            </h3>

            {/* Subtitle */}
            <p className="font-dm text-base mb-4" style={{ color: "var(--muted)" }}>
              {project.subtitle}
            </p>

            {/* Description — hidden on small mobile to save space */}
            <p
              className="hidden sm:block font-dm leading-relaxed mb-5"
              style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: "460px" }}
            >
              {project.description}
            </p>

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2.5 py-1"
                  style={{
                    background: project.accentLight,
                    color: project.accentColor,
                    borderRadius: "3px",
                    border: `1px solid ${project.accentColor}20`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Highlights */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 font-mono text-xs mb-3 w-fit"
              style={{ color: expanded ? project.accentColor : "var(--muted)" }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: expanded ? "rotate(90deg)" : "none",
                  transition: "transform 0.2s",
                }}
              >
                ▶
              </span>
              {expanded ? "Hide" : "View"} highlights
            </button>

            {expanded && (
              <ul className="space-y-1.5 mb-4 pl-1">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-dm text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    <span style={{ color: project.accentColor, marginTop: "4px", flexShrink: 0 }}>—</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* CTAs */}
            <div className="flex gap-2.5 flex-wrap mt-auto">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-5 py-2.5 font-mono text-xs font-bold transition-opacity duration-200"
                  style={{
                    background: project.accentColor,
                    color: "#ffffff",
                    borderRadius: "3px",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  {["Branding", "Logo Design", "Identity"].some(t => project.tags.includes(t))
                    ? "View on Behance ↗"
                    : "Live demo ↗"}
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-5 py-2.5 font-mono text-xs font-bold transition-all duration-200"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    borderRadius: "3px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = project.accentColor;
                    el.style.color = project.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.color = "var(--muted)";
                  }}
                >
                  GitHub
                </a>
              )}
            </div>

            {project.note && (
              <p className="font-mono text-xs italic mt-3" style={{ color: "var(--muted)", opacity: 0.5 }}>
                {project.note}
              </p>
            )}

            {/* Tags */}
            <div
              className="flex flex-wrap gap-1.5 mt-5 pt-4"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT — image, visible on ALL screen sizes ── */}
          <div
            className="relative"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            {/* Offset frame */}
            <div
              className="absolute"
              style={{
                bottom: "-10px",
                right: "-10px",
                top: "10px",
                left: "10px",
                border: `1px solid ${project.accentColor}`,
                borderRadius: "6px",
                opacity: 0.2,
                zIndex: 0,
              }}
            />

            {/* Image card */}
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "6px",
                border: "1px solid var(--border)",
                // On mobile: shorter. On desktop: 16:10 ratio via the grid.
                aspectRatio: "16/10",
                background: "var(--surface)",
                zIndex: 1,
                boxShadow: `0 0 50px ${project.accentColor}14`,
              }}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1023px) 90vw, 45vw"
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-3"
                  style={{ background: project.accentLight }}
                >
                  <span
                    className="font-syne font-bold"
                    style={{ fontSize: "5rem", color: project.accentColor, opacity: 0.2, letterSpacing: "-0.04em" }}
                  >
                    {project.index}
                  </span>
                  <span className="font-mono text-xs" style={{ color: project.accentColor, opacity: 0.4 }}>
                    Coming soon
                  </span>
                </div>
              )}

              {/* Accent tint */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${project.accentColor}08 0%, transparent 55%)` }}
              />

              {/* Year badge */}
              {/* <div
                className="absolute top-3 left-3 font-mono text-xs px-2 py-1"
                style={{
                  background: "rgba(5,13,24,0.65)",
                  color: project.accentColor,
                  borderRadius: "3px",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${project.accentColor}25`,
                }}
              >
                {project.year}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── List row ──────────────────────────────────────────────────────────
function ProjectRow({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center gap-4 md:gap-5 px-5 py-4 cursor-pointer transition-all duration-200"
        style={{
          borderBottom: "1px solid var(--border)",
          background: hovered ? project.accentLight : "transparent",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Index */}
        <span
          className="font-mono text-xs w-7 flex-shrink-0 tabular-nums text-right"
          style={{ color: hovered ? project.accentColor : "var(--muted)" }}
        >
          {project.index}
        </span>

        {/* Thumb */}
        <div
          className="flex-shrink-0 overflow-hidden"
          style={{
            width: "52px",
            height: "34px",
            borderRadius: "3px",
            border: "1px solid var(--border)",
            background: project.accentLight,
            position: "relative",
          }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover object-top"
              sizes="52px"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center font-mono text-xs font-bold"
              style={{ color: project.accentColor, opacity: 0.4 }}
            >
              {project.index}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-syne font-bold text-base transition-colors duration-200"
              style={{ color: hovered ? project.accentColor : "var(--text)" }}
            >
              {project.name}
            </span>
            {project.heart && <span className="text-xs">❤️</span>}
          </div>
          <span className="font-dm text-xs" style={{ color: "var(--muted)" }}>
            {project.subtitle}
          </span>
        </div>

        {/* Stack — desktop */}
        <div className="hidden md:flex flex-wrap gap-1.5 w-[230px] flex-shrink-0">
          {project.stack.slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2 py-0.5 transition-all duration-200"
              style={{
                background: hovered ? project.accentLight : "var(--bg)",
                color: hovered ? project.accentColor : "var(--muted)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
              }}
            >
              {t}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* Status — tablet+ */}
        <span
          className="hidden sm:block font-mono text-xs px-2.5 py-0.5 flex-shrink-0 w-[120px] text-center transition-all duration-200"
          style={{
            color: hovered ? project.accentColor : "var(--muted)",
            border: `1px solid ${hovered ? project.accentColor + "40" : "var(--border)"}`,
            borderRadius: "3px",
            background: hovered ? project.accentLight : "transparent",
          }}
        >
          {project.status}
        </span>

        {/* Links */}
        <div className="flex gap-1.5 flex-shrink-0">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center text-xs transition-all duration-200"
              style={{ border: "1px solid var(--border)", borderRadius: "3px", color: "var(--muted)" }}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = project.accentColor; el.style.color = project.accentColor; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--muted)"; }}
            >↗</a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center font-mono text-xs transition-all duration-200"
              style={{ border: "1px solid var(--border)", borderRadius: "3px", color: "var(--muted)" }}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = project.accentColor; el.style.color = project.accentColor; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--muted)"; }}
            >GH</a>
          )}
        </div>

        {/* Chevron */}
        <span
          className="font-mono text-xs flex-shrink-0 transition-transform duration-200"
          style={{ color: "var(--muted)", display: "inline-block", transform: expanded ? "rotate(180deg)" : "none" }}
        >▾</span>
      </div>

      {expanded && (
        <div
          className="px-5 py-5 grid md:grid-cols-2 gap-5"
          style={{
            background: project.accentLight,
            borderBottom: "1px solid var(--border)",
            borderLeft: `3px solid ${project.accentColor}`,
          }}
        >
          <div>
            <p className="font-dm text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
              {project.description}
            </p>
            {project.note && (
              <p className="font-mono text-xs italic" style={{ color: "var(--muted)", opacity: 0.5 }}>
                {project.note}
              </p>
            )}
          </div>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 font-dm text-sm" style={{ color: "var(--muted)" }}>
                <span style={{ color: project.accentColor, marginTop: "4px", flexShrink: 0 }}>—</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const listRef     = useRef<HTMLDivElement>(null);
  const listHeadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", once: true } }
      );
      gsap.fromTo(listHeadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: listHeadRef.current, start: "top 80%", once: true } }
      );
      const rows = listRef.current?.querySelectorAll(".project-card") ?? [];
      rows.forEach((row, i) => {
        gsap.fromTo(row,
          { x: -16, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.45, delay: i * 0.06, ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 92%", once: true } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef}>

      {/* ── Part 1: Horizontal scroll ── */}
      <div style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-28">
          <div ref={headingRef}>
            <div className="flex items-center gap-3 mb-4">
              <span className="label-tag">What I&apos;ve Built &amp; Designed</span>
              <span className="h-px flex-1 max-w-[60px]" style={{ background: "var(--border)" }} />
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-10">
              <h2 className="section-heading" style={{ color: "var(--text)" }}>
                Selected <span className="text-gradient">Projects</span>
              </h2>
              <p className="font-mono text-xs hidden md:block" style={{ color: "var(--muted)" }}>
                Scroll down to explore →
              </p>
            </div>
          </div>
        </div>
        <FeaturedTrack projects={PROJECTS} />
      </div>

    </section>
  );
}
