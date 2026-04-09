"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ROLES = ["UI Engineer", "Figma → React", "Dashboard Specialist"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  // GSAP entrance — fromTo so nothing stays hidden on slow loads
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(labelRef.current,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(
          nameRef.current?.querySelectorAll(".word") ?? [],
          { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(taglineRef.current,
          { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(subRef.current,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current?.querySelectorAll("a, button") ?? [],
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          statsRef.current?.querySelectorAll(".stat-item") ?? [],
          { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          "-=0.2"
        )
        .fromTo(shapesRef.current,
          { opacity: 0 }, { opacity: 1, duration: 1.5 },
          "-=1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? current.slice(0, displayText.length - 1)
            : current.slice(0, displayText.length + 1)
        );
      }, isDeleting ? 40 : 70);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: "60px 60px",
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          opacity: 0.5,
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(10,102,194,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79,255,176,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Floating shapes — hidden on mobile to avoid clutter */}
      <div
        ref={shapesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0 }}
      >
        <div
          className="absolute top-24 right-16 w-32 h-32 opacity-[0.06] animate-float hidden md:block"
          style={{ border: "1px solid var(--accent)", borderRadius: "2px", transform: "rotate(30deg)" }}
        />
        <div
          className="absolute bottom-32 right-1/3 w-16 h-16 opacity-[0.08] animate-float2 hidden md:block"
          style={{ background: "var(--primary)", borderRadius: "2px", transform: "rotate(15deg)" }}
        />
        <div
          className="absolute top-1/2 left-12 w-2 h-24 opacity-[0.15] animate-float hidden lg:block"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute top-40 left-1/3 font-mono text-xs opacity-[0.1] hidden lg:block"
          style={{ color: "var(--accent)" }}
        >
          {"<UIEngineer />"}
        </div>
        <div
          className="absolute bottom-40 right-24 font-mono text-xs opacity-[0.1] hidden lg:block"
          style={{ color: "var(--primary)" }}
        >
          {"{ design: code }"}
        </div>
      </div>

      {/* ── Main content — normal document flow, no absolute positioning ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-16">

        {/* Available badge */}
        <div
          ref={labelRef}
          className="flex items-center gap-3 mb-8"
          style={{ opacity: 0 }}
        >
          <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
          <span className="label-tag">Available for opportunities</span>
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "var(--accent)" }}
          />
        </div>

        {/* Name + typewriter */}
        <div ref={nameRef} className="mb-7">
          {/* Line 1: Karpagapriya */}
          <div className="overflow-hidden">
            <p
              className="word font-syne font-bold tracking-tight leading-[0.9]"
              style={{
                fontSize: "clamp(2.6rem, 8vw, 7rem)",
                color: "var(--text)",
                opacity: 0,
              }}
            >
              Karpagapriya
            </p>
          </div>

          {/* Line 2: A — role */}
          <div className="overflow-hidden mt-1">
            <div
              className="word flex flex-wrap items-baseline gap-x-3 font-syne font-bold tracking-tight leading-[0.9]"
              style={{ opacity: 0 }}
            >
              <span
                style={{
                  fontSize: "clamp(2.6rem, 8vw, 7rem)",
                  color: "var(--text)",
                }}
              >
                A
              </span>
              <span
                className="font-normal"
                style={{
                  fontSize: "clamp(1.1rem, 3.2vw, 2.8rem)",
                  color: "var(--accent)",
                  // slightly lower baseline so it reads like a subtitle
                  alignSelf: "flex-end",
                  paddingBottom: "0.15em",
                }}
              >
                —&nbsp;
                <span className="font-mono">
                  {displayText}
                  <span
                    className="animate-pulse"
                    style={{ color: "var(--primary)" }}
                  >
                    |
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-syne font-medium leading-snug mb-3 max-w-2xl"
          style={{
            fontSize: "clamp(1rem, 2.4vw, 1.5rem)",
            color: "var(--text)",
            opacity: 0,
          }}
        >
          I design in{" "}
          <span style={{ color: "var(--primary)" }}>Figma</span>. I build in{" "}
          <span style={{ color: "var(--accent)" }}>React</span>. I own the full
          journey.
        </p>

        {/* Sub text */}
        <p
          ref={subRef}
          className="font-dm leading-relaxed mb-10 max-w-xl"
          style={{
            fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
            color: "var(--muted)",
            opacity: 0,
          }}
        >
          Building production-grade interfaces where design precision meets
          frontend engineering.
        </p>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="flex flex-wrap gap-4 items-center mb-14"
        >
          <button
            onClick={scrollToProjects}
            className="btn-primary"
            data-magnetic
            style={{ opacity: 0 }}
          >
            <span>View My Work</span>
            <span className="text-base">↓</span>
          </button>
          <a
            href="/resume.pdf"
            download
            className="btn-outline"
            data-magnetic
            style={{ opacity: 0 }}
          >
            <span>Download Resume</span>
            <span className="text-sm">↗</span>
          </a>
        </div>

        {/* Stats strip — in normal flow, no absolute, no overlap */}
        <div
          ref={statsRef}
          className="flex flex-wrap items-center gap-6 md:gap-10 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {[
            { num: "1+", label: "Year Experience" },
            { num: "4+", label: "Production Apps" },
            { num: "2",  label: "Active Projects" },
            { num: "∞",  label: "Figma Frames" },
          ].map((stat) => (
            <div key={stat.label} className="stat-item" style={{ opacity: 0 }}>
              <div
                className="font-syne font-bold text-2xl"
                style={{ color: "var(--accent)" }}
              >
                {stat.num}
              </div>
              <div
                className="font-mono text-xs"
                style={{ color: "var(--muted)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}

          {/* Location pill — auto-pushed right on md+ */}
          <div
            className="stat-item hidden md:flex items-center gap-2 font-mono text-xs ml-auto"
            style={{ color: "var(--muted)", opacity: 0 }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <span>Madurai, TN · India</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25 pointer-events-none">
        <div
          className="w-px h-10 relative overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              background: "var(--accent)",
              height: "40%",
              animation: "lineGrow 1.5s ease-in-out infinite",
            }}
          />
        </div>
        <span
          className="font-mono text-[10px] tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          scroll
        </span>
      </div>
    </section>
  );
}
