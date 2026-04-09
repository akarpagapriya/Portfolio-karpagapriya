"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CERTS = [
  {
    name: "Google UX Design Professional Certificate",
    issuer: "Google",
    platform: "Coursera",
    date: "Oct 2023",
    link: "https://www.coursera.org/account/accomplishments/certificate/VJJ8PRHXR68V",
    color: "#4285F4",
    initial: "G",
    modules: [
      "Foundations of UX Design",
      "Start the UX Design Process",
      "Build Wireframes and Low-Fidelity Prototypes",
      "Conduct UX Research and Test Early Concepts",
      "Create High-Fidelity Designs & Prototypes in Figma",
      "Responsive Web Design in Adobe XD",
      "Design a User Experience for Social Good",
    ],
    skills: ["UX Research", "Wireframing", "Figma", "Prototyping", "User Testing"],
    duration: "7 Courses · ~6 months",
  },
  {
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    platform: "Coursera",
    date: "Feb 2024",
    link: "https://www.coursera.org/account/accomplishments/certificate/UR7R26GSS48L",
    color: "#0866FF",
    initial: "M",
    modules: [
      "Introduction to Front-End Development",
      "Programming with JavaScript",
      "Version Control",
      "HTML and CSS in Depth",
      "React Basics",
      "Advanced React",
      "Principles of UX/UI Design",
      "Front-End Developer Capstone",
    ],
    skills: ["React", "JavaScript", "HTML/CSS", "Git", "UI/UX Principles"],
    duration: "9 Courses · ~8 months",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 80%", once: true },
      });
      gsap.from(cardsRef.current?.querySelectorAll(".cert-card") ?? [], {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-28 md:py-36"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div ref={headingRef} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="label-tag">Credentials</span>
            <span className="h-px flex-1 max-w-[60px]" style={{ background: "var(--border)" }} />
          </div>
          <h2 className="section-heading" style={{ color: "var(--text)" }}>
            Certifications
          </h2>
          <p className="font-dm text-base mt-4 max-w-xl" style={{ color: "var(--muted)" }}>
            Industry-recognised professional certificates from Google and Meta.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-7 max-w-5xl">
          {CERTS.map((cert) => (
            <div
              key={cert.name}
              className="cert-card group"
              style={{
                border: "1px solid var(--border)",
                background: "var(--surface)",
                borderRadius: "2px",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = cert.color; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              {/* Card header */}
              <div className="p-6 pb-0">
                <div className="flex items-start gap-4 mb-5">
                  {/* Badge */}
                  <div
                    className="w-14 h-14 rounded-sm flex items-center justify-center flex-shrink-0 font-syne font-black text-white text-2xl shadow-lg"
                    style={{ background: cert.color }}
                  >
                    {cert.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-syne font-bold text-base leading-snug mb-1"
                      style={{ color: "var(--text)" }}
                    >
                      {cert.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                        {cert.issuer} · {cert.platform}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="font-mono text-xs px-2 py-0.5"
                        style={{ color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: "2px" }}
                      >
                        {cert.date}
                      </span>
                      <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                        {cert.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills covered */}
                <div className="mb-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
                    Skills Covered
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-2.5 py-1"
                        style={{ background: "rgba(10,102,194,0.08)", color: "var(--primary)", borderRadius: "2px" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modules */}
                <details className="group/details mb-5">
                  <summary
                    className="font-mono text-xs uppercase tracking-widest mb-2 cursor-pointer list-none flex items-center gap-2 select-none"
                    style={{ color: "var(--muted)" }}
                  >
                    <span className="group-open/details:rotate-90 inline-block transition-transform duration-200">▶</span>
                    {cert.modules.length} Courses Completed
                  </summary>
                  <ul className="mt-3 space-y-1.5 pl-4">
                    {cert.modules.map((mod, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 font-dm text-sm"
                        style={{ color: "var(--muted)" }}
                      >
                        <span className="mt-1 flex-shrink-0 font-mono text-[10px]" style={{ color: "var(--border)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {mod}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>

              {/* Footer */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                  Verified Certificate
                </span>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs transition-all duration-200 group/link"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
                >
                  <span>View Certificate</span>
                  <span className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 inline-block transition-transform duration-200">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
