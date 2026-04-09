"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SKILL_GROUPS = [
  {
    id: "frontend",
    label: "Frontend",
    emoji: "⚡︎",
    color: "primary",
    description: "Core technologies I use daily to build production interfaces",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 82 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Tailwind CSS", level: 92 },
    ],
  },
  {
    id: "ui-libs",
    label: "UI Libraries",
    emoji: "⌨",
    color: "accent",
    description: "Component libraries and animation tools I work with",
    skills: [
      { name: "ShadCN", level: 85 },
      { name: "Material UI", level: 80 },
      { name: "NextUI", level: 75 },
      { name: "Framer Motion", level: 78 },
      { name: "Framer", level: 70 },
      { name: "Bootstrap", level: 85 },
    ],
  },
  {
    id: "state",
    label: "State & Data",
    emoji: "🗘",
    color: "primary",
    description: "State management and data-fetching patterns",
    skills: [
      { name: "React Query", level: 82 },
      { name: "Zustand", level: 80 },
      { name: "React Hook Form", level: 85 },
      { name: "Zod", level: 78 },
    ],
  },
  {
    id: "design",
    label: "Design",
    emoji: "🖍",
    color: "accent",
    description: "Design skills from wireframe to production-ready systems",
    skills: [
      { name: "Figma", level: 90 },
      { name: "Prototyping", level: 88 },
      { name: "Design Systems", level: 85 },
      { name: "Component Libraries", level: 87 },
      { name: "Wireframing", level: 90 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    emoji: "🛠",
    color: "primary",
    description: "Dev tools, deployment and productivity stack",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "VS Code", level: 95 },
      { name: "Vercel", level: 85 },
      { name: "Netlify", level: 80 },
      { name: "Jira", level: 75 },
      { name: "GitHub Copilot", level: 82 },
      { name: "Illustrator", level: 72 },
      { name: "Photoshop", level: 70 },
    ],
  },
];

const TOTAL_SKILLS = SKILL_GROUPS.reduce((a, g) => a + g.skills.length, 0);

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeGroup = SKILL_GROUPS.find((g) => g.id === activeTab)!;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%", once: true },
      });
      gsap.from(".skills-tab-bar", {
        y: 20, opacity: 0, duration: 0.6, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    const bars = panelRef.current.querySelectorAll<HTMLElement>(".skill-bar-fill");
    bars.forEach((bar) => { bar.style.width = "0%"; });

    const timer = setTimeout(() => {
      gsap.from(panelRef.current?.querySelectorAll(".skill-row") ?? [], {
        x: -20, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power2.out",
      });
      bars.forEach((bar) => {
        gsap.to(bar, { width: `${bar.dataset.level ?? 0}%`, duration: 0.8, ease: "power2.out", delay: 0.1 });
      });
    }, 60);

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      <div
        className="absolute top-0 right-0 w-[40%] h-full pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, var(--accent) 0, var(--accent) 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="label-tag">Tech Stack</span>
            <span className="h-px flex-1 max-w-[60px]" style={{ background: "var(--border)" }} />
          </div>
          <h2 className="section-heading" style={{ color: "var(--text)" }}>
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="font-dm text-base mt-4 max-w-xl" style={{ color: "var(--muted)" }}>
            5 categories · {TOTAL_SKILLS} technologies — from pixel to production.
          </p>
        </div>

        {/* Tabs */}
        <div className="skills-tab-bar flex flex-wrap gap-2 mb-10">
          {SKILL_GROUPS.map((group) => {
            const isActive = activeTab === group.id;
            const accent = group.color === "accent" ? "var(--accent)" : "var(--primary)";
            return (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className="flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200"
                style={{
                  border: `1px solid ${isActive ? accent : "var(--border)"}`,
                  background: isActive
                    ? group.color === "accent" ? "rgba(79,255,176,0.08)" : "rgba(10,102,194,0.1)"
                    : "transparent",
                  color: isActive ? accent : "var(--muted)",
                  borderRadius: "2px",
                }}
              >
                <span>{group.emoji}</span>
                <span>{group.label}</span>
                <span
                  className="text-[10px] px-1.5 py-0.5"
                  style={{ background: isActive ? "rgba(255,255,255,0.06)" : "transparent", borderRadius: "2px" }}
                >
                  {group.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div ref={panelRef} className="grid lg:grid-cols-2 gap-12">
          {/* Skill bars */}
          <div>
            <p className="font-dm text-sm mb-7" style={{ color: "var(--muted)" }}>
              {activeGroup.description}
            </p>
            <div className="space-y-5">
              {activeGroup.skills.map((skill) => (
                <div key={skill.name} className="skill-row">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-mono text-sm" style={{ color: "var(--text)" }}>{skill.name}</span>
                    <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{skill.level}%</span>
                  </div>
                  <div className="h-[3px] w-full overflow-hidden" style={{ background: "var(--border)", borderRadius: "2px" }}>
                    <div
                      className="skill-bar-fill h-full"
                      data-level={skill.level}
                      style={{
                        width: "0%",
                        background: activeGroup.color === "accent"
                          ? "linear-gradient(90deg, var(--primary), var(--accent))"
                          : "linear-gradient(90deg, var(--primary), #4fffb0)",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tag cloud + stats */}
          <div>
            <p className="font-mono text-xs mb-5 uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Quick Reference
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {activeGroup.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="font-mono text-sm px-3.5 py-2 transition-all duration-200 cursor-default"
                  style={{ border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text)", background: "var(--bg)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    const accent = activeGroup.color === "accent" ? "var(--accent)" : "var(--primary)";
                    el.style.borderColor = accent; el.style.color = accent;
                    el.style.background = activeGroup.color === "accent" ? "rgba(79,255,176,0.05)" : "rgba(10,102,194,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)"; el.style.color = "var(--text)"; el.style.background = "var(--bg)";
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "1+", label: "Years\nExperience" },
                { num: `${TOTAL_SKILLS}+`, label: "Technologies\nKnown" },
                { num: "4+", label: "Apps\nShipped" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-4 text-center"
                  style={{ border: "1px solid var(--border)", borderRadius: "2px", background: "var(--bg)" }}
                >
                  <div className="font-syne font-bold text-2xl mb-1" style={{ color: "var(--accent)" }}>{s.num}</div>
                  <div className="font-mono text-[10px] leading-tight whitespace-pre-line" style={{ color: "var(--muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div
          className="mt-14 p-5 flex flex-wrap gap-6 justify-between items-center"
          style={{ border: "1px solid var(--border)", borderRadius: "2px" }}
        >
          {[
            { label: "Primary Stack", value: "React · Next.js · TypeScript · Tailwind" },
            { label: "Design Tool", value: "Figma" },
            { label: "Motion Libraries", value: "GSAP · Framer Motion" },
          ].map((item) => (
            <div key={item.label}>
              <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>{item.label}</div>
              <div className="font-syne text-sm font-semibold" style={{ color: "var(--accent)" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
