"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EDUCATION = [
  {
    degree: "MCA",
    fullDegree: "Master of Computer Applications",
    institution: "Madurai Kamaraj University",
    detail: "Distance Education · Madurai",
    duration: "2025 – 2026",
    status: "In Progress",
    type: "Postgraduate",
    active: true,
    description:
      "Pursuing a postgraduate degree to deepen computer science fundamentals alongside professional frontend engineering work.",
    focus: ["Advanced Algorithms", "Software Engineering", "Database Systems", "Web Technologies"],
    icon: "/mca.png",
  },
  {
    degree: "BSc IT",
    fullDegree: "Bachelor of Science — Information Technology",
    institution: "The Madura College",
    detail: "Affiliated to MKU · Madurai",
    duration: "2015 – 2019",
    status: "Completed",
    type: "Undergraduate",
    active: false,
    description:
      "Undergraduate programme covering core computing principles, programming, networking and web development fundamentals.",
    focus: ["Programming Fundamentals", "Web Development", "Networking", "Database Management"],
    icon: "/graduate.png",
  },
  {
    degree: "UI/UX & Graphic Design",
    fullDegree: "Graphic Design & UI/UX — C-TECH",
    institution: "Image Creative Education Institute",
    detail: "Madurai",
    duration: "2022 – 2023",
    status: "Completed",
    type: "Professional Course",
    active: false,
    description:
      "Intensive industry-focused programme covering the full visual design spectrum — from print design principles through to digital UI/UX and prototyping.",
    focus: ["UI/UX Design", "Figma", "Adobe Illustrator", "Photoshop", "Typography", "Branding"],
    icon: "/uiux.png",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
      }
    );

    const cards = cardsRef.current?.querySelectorAll(".edu-card") ?? [];
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        }
      );
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-28 md:py-36"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="label-tag">Academic Background</span>
            <span className="h-px flex-1 max-w-[60px]" style={{ background: "var(--border)" }} />
          </div>
          <h2 className="section-heading" style={{ color: "var(--text)" }}>
            Education
          </h2>
          <p className="font-dm text-base mt-4 max-w-xl" style={{ color: "var(--muted)" }}>
            Academic foundation across computer science, information technology and design.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATION.map((edu) => (
            <div
              key={edu.degree}
              className="edu-card group flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                border: `1px solid ${edu.active ? "rgba(79,255,176,0.3)" : "var(--border)"}`,
                background: "var(--bg)",
                borderRadius: "2px",
              }}
            >
              {/* Top */}
              <div className="p-6 flex-1">
                {/* Status + type row */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-xs px-2 py-1"
                    style={{
                      color: edu.active ? "var(--accent)" : "var(--muted)",
                      border: `1px solid ${edu.active ? "var(--accent)" : "var(--border)"}`,
                      borderRadius: "2px",
                    }}
                  >
                    {edu.type}
                  </span>
                  {edu.active && (
                    <span className="flex items-center gap-1.5 font-mono text-xs" style={{ color: "var(--accent)" }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
                      In Progress
                    </span>
                  )}
                </div>

                {/* Icon + degree */}
                <div className="flex items-start gap-3 mb-3">
                  <Image
  src={edu.icon}
  alt="edu icon"
  width={40}
  height={40}
  className="flex-shrink-0 mt-0.5 invert dark:invert-0"  // Retain flex-shrink-0 and mt-0.5 for layout
/>
                  <div>
                    <div className="font-syne font-bold text-xl" style={{ color: "var(--accent)" }}>
                      {edu.degree}
                    </div>
                    <div className="font-dm text-sm leading-snug mt-0.5 group-hover:text-[--accent] transition-colors" style={{ color: "var(--text)" }}>
                      {edu.fullDegree}
                    </div>
                  </div>
                </div>

                {/* Institution */}
                <p className="font-syne text-sm font-semibold mb-0.5" style={{ color: "var(--primary)" }}>
                  {edu.institution}
                </p>
                <p className="font-mono text-xs mb-4" style={{ color: "var(--muted)" }}>
                  {edu.detail}
                </p>

                {/* Description */}
                <p className="font-dm text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                  {edu.description}
                </p>

                {/* Focus areas */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
                    Focus Areas
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.focus.map((f) => (
                      <span
                        key={f}
                        className="font-mono text-xs px-2 py-0.5"
                        style={{
                          background: edu.active ? "rgba(79,255,176,0.06)" : "rgba(10,102,194,0.06)",
                          color: edu.active ? "var(--accent)" : "var(--primary)",
                          borderRadius: "2px",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                  {edu.duration}
                </span>
                <span
                  className="font-mono text-xs px-2 py-0.5"
                  style={{
                    color: edu.active ? "var(--accent)" : "var(--muted)",
                    borderRadius: "2px",
                  }}
                >
                  {edu.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Design philosophy callout */}
        <div
          className="mt-12 p-7 grid md:grid-cols-2 gap-6 items-center"
          style={{ border: "1px solid var(--border)", borderRadius: "2px", background: "var(--bg)" }}
        >
          <div>
            <p className="font-syne font-bold text-lg mb-2" style={{ color: "var(--text)" }}>
              Self-taught → Formally trained → Industry-ready
            </p>
            <p className="font-dm text-sm" style={{ color: "var(--muted)" }}>
              My journey combined a formal IT degree with dedicated design education and hands-on professional experience — giving me fluency across both the engineering and design halves of frontend work.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            {[
              { label: "Computer Science", color: "primary" },
              { label: "UI/UX Design", color: "accent" },
              { label: "Frontend Engineering", color: "primary" },
              { label: "Design Systems", color: "accent" },
            ].map((tag) => (
              <span
                key={tag.label}
                className="font-mono text-xs px-3 py-1.5"
                style={{
                  border: `1px solid ${tag.color === "accent" ? "var(--accent)" : "var(--primary)"}`,
                  color: tag.color === "accent" ? "var(--accent)" : "var(--primary)",
                  borderRadius: "2px",
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
