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
    name: "Kryptrix",
    subtitle: "Crypto Analytics Dashboard",
    status: "In Development",
    statusColor: "accent",
    emoji: "/kryptrix.png",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Query", "Zustand"],
    description:
      "Real-time crypto market dashboard featuring live price tracking, dynamic charts, portfolio analytics and AI-powered market trend insights. Engineered with a component-driven architecture and a fully custom design system — built to handle scale from day one.",
    highlights: [
      "Live price feeds with WebSocket integration",
      "Custom chart components with D3.js",
      "AI market trend analysis module",
      "Full design system with tokens & variants",
    ],
    live: "https://kryptrix-demo.vercel.app",
    github: "https://github.com/akarpagapriya/kryptrix",
    tags: ["Crypto", "Dashboard", "Real-time", "API"],
    featured: true,
    gradient: "from-[#0a66c2]/20 to-[#4fffb0]/5",
  },
  {
    id: "design-system",
    name: "UI Component Design System",
    subtitle: "Open Source Component Library",
    status: "In Development",
    statusColor: "accent",
    emoji: "/design-system.png",
    stack: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Figma"],
    description:
      "Production-ready open-source design system bridging Figma and React. Covers typography, colour tokens, spacing, interactive form components, data tables and dashboard widgets — fully documented in Storybook with Figma counterparts for every component.",
    highlights: [
      "Design tokens synced between Figma & code",
      "50+ component variants with full state coverage",
      "Storybook docs with live playground",
      "Accessibility-first component architecture",
    ],
    live: "https://design-system-demo.vercel.app",
    github: "https://github.com/akarpagapriya/design-system",
    tags: ["Design System", "Open Source", "Storybook", "Components"],
    featured: true,
    gradient: "from-[#4fffb0]/15 to-[#0a66c2]/5",
  },
  {
    id: "birthday-race",
    name: "Birthday Race",
    subtitle: "Personalised Birthday Game Platform",
    status: "Live",
    statusColor: "accent",
    emoji: "/birthday-race.png",
    stack: ["Next.js", "TypeScript", "Canvas API", "Supabase", "Vercel"],
    description:
      "What started as a single HTML file for my son Kabileshwar's 6th birthday became a full product. A personalised racing game where kids race through stages collecting stars — each stage unlocks a gift box hiding a real family photo. Family members leave wishes that reveal one by one. Parents can create a personalised game in 5 minutes.",
    highlights: [
      "Canvas API custom game engine with racing physics",
      "Supabase for photo storage and real-time wish reveals",
      "Parent dashboard to customise photos & wishes in minutes",
      "Shipped from idea to production for a real birthday ❤️",
    ],
    live: "https://birthday-race.vercel.app",
    github: null,
    tags: ["UI Design", "Web App", "Game Design", "UX", "Canvas API"],
    featured: true,
    gradient: "from-[#ff6b9d]/10 to-[#4fffb0]/5",
    heart: true,
  },
  {
    id: "coinpea",
    name: "Coinpea",
    subtitle: "Crypto Payment Gateway",
    status: "Professional Work",
    statusColor: "primary",
    emoji: "/coinpea.png",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "ShadCN"],
    description:
      "Production crypto payment gateway UI featuring multi-step transaction flows, wallet integration and real-time market data. Full Figma-to-React ownership — from UX wireframes through to the shipped interface at AlphabetTech.",
    highlights: [
      "Multi-step transaction flow with form validation",
      "Real-time exchange rate display",
      "Wallet connection & QR code generation UI",
      "Figma design system → production component library",
    ],
    live: null,
    github: null,
    tags: ["Fintech", "Crypto", "Real-time", "Production"],
    featured: false,
    note: "Professional project — screenshots available on request",
    gradient: "from-[#0a66c2]/10 to-transparent",
  },
  {
    id: "web3-saas",
    name: "Web3 SaaS Dashboard",
    subtitle: "Multi-tenant Admin Platform",
    status: "Professional Work",
    statusColor: "primary",
    emoji: "/web3-saas.png",
    stack: ["React", "Next.js", "TypeScript", "Material UI", "Metronics"],
    description:
      "Multi-tenant SaaS platform with role-based access control, dynamic admin and user dashboards per tenant and a scalable component architecture handling complex data relationships across workspace boundaries.",
    highlights: [
      "Role-based access control (RBAC) across tenants",
      "Dynamic dashboard layouts per user role",
      "Reusable component architecture for multi-tenant scale",
      "Complex data table with filtering, sorting & export",
    ],
    live: null,
    github: null,
    tags: ["SaaS", "Web3", "Dashboard", "RBAC"],
    featured: false,
    gradient: "from-[#4fffb0]/8 to-transparent",
  },
];

type Project = typeof PROJECTS[0];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isFeatured = project.featured;

  return (
    <div
      className="project-card group relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        border: `1px solid ${isFeatured ? "rgba(79,255,176,0.2)" : "var(--border)"}`,
        background: "var(--bg)",
        borderRadius: "2px",
        gridColumn: project.id === "birthday-race" ? "span 1" : undefined,
      }}
    >
      {/* Gradient bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 pointer-events-none transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative p-7">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Image
  src={project.emoji}
  alt={`${project.name} icon`}
  width={40}
  height={40}
  className="flex-shrink-0 mt-0.5 invert dark:invert-0"  // Retain flex-shrink-0 and mt-0.5 for layout
/>
              <span
                className="font-mono text-xs px-2 py-0.5"
                style={{
                  color: project.statusColor === "accent" ? "var(--accent)" : "var(--primary)",
                  border: `1px solid ${project.statusColor === "accent" ? "var(--accent)" : "var(--primary)"}`,
                  borderRadius: "2px",
                }}
              >
                {project.status}
                {project.status === "In Development" && " 🔨"}
              </span>
              {project.heart && (
                <span className="font-mono text-xs" style={{ color: "#ff6b9d" }}>Built with ❤️</span>
              )}
            </div>
            <h3 className="font-syne font-bold text-xl leading-snug" style={{ color: "var(--text)" }}>
              {project.name}
            </h3>
            <p className="font-dm text-sm mt-0.5" style={{ color: "var(--muted)" }}>
              {project.subtitle}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-2 flex-shrink-0 ml-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center font-mono text-xs transition-all duration-200"
                style={{ border: "1px solid var(--border)", borderRadius: "2px", color: "var(--muted)" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--muted)"; }}
                title="GitHub"
              >
                GH
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center transition-all duration-200"
                style={{ border: "1px solid var(--border)", borderRadius: "2px", color: "var(--muted)" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--muted)"; }}
                title="Live Demo"
              >
                ↗
              </a>
            )}
          </div>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2.5 py-1"
              style={{ background: "rgba(10,102,194,0.08)", color: "var(--primary)", borderRadius: "2px" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="font-dm text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
          {project.description}
        </p>

        {/* Highlights toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 font-mono text-xs mb-3 transition-colors duration-200"
          style={{ color: expanded ? "var(--accent)" : "var(--muted)" }}
        >
          <span
            className="inline-block transition-transform duration-200"
            style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ▶
          </span>
          {expanded ? "Hide" : "Show"} key highlights
        </button>

        {expanded && (
          <ul className="space-y-2 mb-4 pl-2">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2 font-dm text-sm"
                style={{ color: "var(--muted)" }}
              >
                <span className="mt-1 flex-shrink-0" style={{ color: "var(--accent)" }}>—</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Note */}
        {project.note && (
          <p className="font-mono text-xs italic mb-3" style={{ color: "var(--muted)", opacity: 0.6 }}>
            {project.note}
          </p>
        )}

        {/* Tags */}
        <div
          className="flex flex-wrap gap-1.5 pt-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs" style={{ color: "var(--muted)" }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(headingRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // Animate cards individually so each triggers when it enters viewport
    const cards = gridRef.current?.querySelectorAll(".project-card") ?? [];
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        }
      );
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  const featured = PROJECTS.filter((p) => p.featured);
  const professional = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 md:py-36"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="label-tag">What I&apos;ve Built</span>
            <span className="h-px flex-1 max-w-[60px]" style={{ background: "var(--border)" }} />
          </div>
          <h2 className="section-heading" style={{ color: "var(--text)" }}>
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <p className="font-dm text-base mt-4 max-w-xl" style={{ color: "var(--muted)" }}>
            Personal builds, open-source work and professional production apps — click any card to expand highlights.
          </p>
        </div>

        <div ref={gridRef}>
          {/* Featured 3 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Section label */}
          <div className="flex items-center gap-4 my-8">
            <span className="h-px flex-1" style={{ background: "var(--border)" }} />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Professional Work
            </span>
            <span className="h-px flex-1" style={{ background: "var(--border)" }} />
          </div>

          {/* Professional 2 */}
          <div className="grid md:grid-cols-2 gap-6">
            {professional.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
