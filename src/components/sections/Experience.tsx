"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EXPERIENCES = [
  {
    role: "UI Designer & Frontend Developer",
    company: "AlphabetTech",
    location: "Madurai",
    type: "Product Company",
    duration: "Apr 2024 – Mar 2025",
    summary:
      "Owned Figma-to-React pipeline for multiple production applications. Built crypto payment gateway, Web3 SaaS platform, multi-tenant admin dashboards and trading interfaces.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "ShadCN", "Figma"],
    highlight: true,
  },
  {
    role: "UI Developer",
    company: "YatMax Softwares",
    location: "Madurai",
    type: "Service Company",
    duration: "Nov 2023 – Apr 2024",
    summary:
      "Built responsive websites, maintained 10+ WordPress sites and handled design-to-code delivery for client projects.",
    tags: ["React", "WordPress", "HTML/CSS", "JavaScript"],
    highlight: false,
  },
  {
    role: "Graphic Designer",
    company: "Bharathi A2Z Ads & Events",
    location: "Madurai",
    type: "Agency",
    duration: "Jun 2019 – May 2020",
    summary:
      "Designed branding, web posters and marketing materials. Video and audio editing for advertising campaigns.",
    tags: ["Illustrator", "Photoshop", "Branding", "Video Editing"],
    highlight: false,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Animate the vertical line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Animate each card
      const cards = timelineRef.current?.querySelectorAll(".exp-card") ?? [];
      cards.forEach((card, i) => {
        gsap.from(card, {
          x: -40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Diagonal accent */}
      <div
        className="absolute top-0 left-0 w-px h-full hidden lg:block"
        style={{ background: "var(--border)", left: "6rem" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="label-tag">Career Path</span>
            <span className="h-px flex-1 max-w-[60px]" style={{ background: "var(--border)" }} />
          </div>
          <h2 className="section-heading" style={{ color: "var(--text)" }}>
            Experience{" "}
            <span className="text-gradient">Timeline</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-8 top-0 w-px"
            style={{
              height: "100%",
              background:
                "linear-gradient(to bottom, var(--primary), var(--accent), transparent)",
            }}
          />

<div className="space-y-8 pl-[52px] md:pl-24">
              {EXPERIENCES.map((exp, i) => (
              <div key={exp.company} className="exp-card relative">
                {/* Dot */}
                <div
                  className="absolute w-3 h-3 rounded-full -left-[2.6rem] md:-left-[4.4rem] top-6"
                  style={{
                    background: exp.highlight ? "var(--accent)" : "var(--primary)",
                    boxShadow: exp.highlight
                      ? "0 0 0 4px rgba(79,255,176,0.15)"
                      : "0 0 0 4px rgba(10,102,194,0.15)",
                  }}                                  
                />

                {/* Card */}
                <div
                  className="group p-7 transition-all duration-300 hover:border-[--primary]"
                  style={{
                    border: `1px solid ${exp.highlight ? "rgba(79,255,176,0.2)" : "var(--border)"}`,
                    background: "var(--surface)",
                    borderRadius: "2px",
                  }}
                >
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                    <div>
                      <h3
                        className="font-syne font-bold text-xl mb-1"
                        style={{ color: "var(--text)" }}
                      >
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="font-dm text-sm font-medium"
                          style={{ color: "var(--primary)" }}
                        >
                          {exp.company}
                        </span>
                        <span style={{ color: "var(--border)" }}>·</span>
                        <span
                          className="font-mono text-xs"
                          style={{ color: "var(--muted)" }}
                        >
                          {exp.location}
                        </span>
                        <span style={{ color: "var(--border)" }}>·</span>
                        <span
                          className="font-mono text-xs px-2 py-0.5"
                          style={{
                            color: "var(--muted)",
                            border: "1px solid var(--border)",
                            borderRadius: "2px",
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <div
                      className="font-mono text-xs px-3 py-1.5"
                      style={{
                        color: exp.highlight ? "var(--accent)" : "var(--muted)",
                        border: `1px solid ${exp.highlight ? "var(--accent)" : "var(--border)"}`,
                        borderRadius: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.duration}
                    </div>
                  </div>

                  <p
                    className="font-dm text-sm leading-relaxed mb-5"
                    style={{ color: "var(--muted)" }}
                  >
                    {exp.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2.5 py-1"
                        style={{
                          background: "rgba(10,102,194,0.08)",
                          color: "var(--primary)",
                          borderRadius: "2px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
