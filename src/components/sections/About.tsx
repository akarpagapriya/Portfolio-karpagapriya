"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  {
    icon: "/design-thinking.png",
    title: "Design Thinking",
    text: "I prototype in Figma with systems thinking — components, tokens and design decisions that scale from day one.",
  },
  {
    icon: "/frontend-engineering.png",
    title: "Frontend Engineering",
    text: "I build in React and Next.js with TypeScript — component-driven, performant and pixel-perfect to the design.",
  },
  {
    icon: "/zero-handoff.png",
    title: "Zero Handoff Gap",
    text: "I own both sides. What you see in Figma is exactly what ships to production. No interpretation, no compromise.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = textRef.current?.querySelectorAll(".reveal-line") ?? [];
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, delay: i * 0.1, ease: "power3.out",
            scrollTrigger: { trigger: line, start: "top 90%", once: true },
          }
        );
      });

      const cards = cardsRef.current?.querySelectorAll(".about-card") ?? [];
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
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
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Vertical label */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 hidden lg:block"
      >
        <span
          className="font-mono text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--border)" }}
        >
          About
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — bio */}
          <div ref={textRef}>
            <div className="reveal-line flex items-center gap-3 mb-6">
              <span className="label-tag">Who I am</span>
              <span className="flex-1 h-px max-w-[60px]" style={{ background: "var(--border)" }} />
            </div>

            <h2 className="reveal-line section-heading mb-8" style={{ color: "var(--text)" }}>
              Design meets{" "}
              <span className="text-gradient">Engineering</span>
            </h2>

            <div className="space-y-5 font-dm leading-relaxed" style={{ color: "var(--muted)" }}>
              <p className="reveal-line">
                I&apos;m a UI Engineer based in{" "}
                <span style={{ color: "var(--text)" }}>Madurai, Tamil Nadu</span> —
                working at the intersection of design and frontend development.
              </p>
              <p className="reveal-line">
                With{" "}
                <span style={{ color: "var(--accent)" }}>1+ year of experience</span> at a
                product-based company, I&apos;ve shipped multiple production applications — crypto
                payment gateways, Web3 SaaS platforms, multi-tenant admin dashboards — owning
                every step from Figma prototype to deployed React application.
              </p>
              <p
                className="reveal-line font-syne text-lg font-medium"
                style={{ color: "var(--text)" }}
              >
                I don&apos;t hand off designs. I build them.
              </p>
              <p className="reveal-line">
                Currently building{" "}
                <span style={{ color: "var(--primary)" }}>Kryptrix</span>, a real-time crypto
                analytics dashboard, and an open-source{" "}
                <span style={{ color: "var(--primary)" }}>UI component design system</span> —
                both reflecting my commitment to production-quality work.
              </p>
            </div>

            {/* Quick facts */}
            <div className="reveal-line mt-10 grid grid-cols-2 gap-4">
              {[
                { label: "Location", value: "Madurai, TN" },
                { label: "Availability", value: "Immediate" },
                { label: "Work Type", value: "Remote / Onsite" },
                { label: "Status", value: "Open to Roles" },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="p-4"
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    className="font-mono text-xs mb-1"
                    style={{ color: "var(--muted)" }}
                  >
                    {fact.label}
                  </div>
                  <div
                    className="font-syne text-sm font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — cards */}
          <div ref={cardsRef} className="space-y-4">
            {CARDS.map((card, i) => (
              <div
                key={card.title}
                className="about-card group p-7 transition-all duration-300 hover:border-[--accent]"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  borderRadius: "2px",
                }}
              >
                <div className="flex items-start gap-5">
                  <Image
                    src={card.icon}
                    alt={`${card.title} icon`}
                    width={40}
                    height={40}
                    className="flex-shrink-0 mt-0.5 invert dark:invert-0"
                  />
                  <div>
                    <h3
                      className="font-syne font-bold text-lg mb-2 group-hover:text-[--accent] transition-colors duration-300"
                      style={{ color: "var(--text)" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="font-dm text-sm leading-relaxed"
                      style={{ color: "var(--muted)" }}
                    >
                      {card.text}
                    </p>
                  </div>
                  {/* Accent line on left on hover */}
                  <div
                    className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: "var(--accent)" }}
                  />
                </div>
                {/* Accent line on left on hover */}
                <div
                  className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: "var(--accent)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
