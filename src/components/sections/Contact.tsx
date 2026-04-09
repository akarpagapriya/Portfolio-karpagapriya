"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CONTACT_DETAILS = [
  {
    icon: "✉",
    label: "Email",
    value: "karpagapriya.ak@gmail.com",
    href: "mailto:karpagapriya.ak@gmail.com",
  },
  {
    icon: "✆",
    label: "Phone",
    value: "+91 9080437163",
    href: "tel:+919080437163",
  },
  {
    icon: "⚲",
    label: "Location",
    value: "Madurai, Tamil Nadu",
    href: null,
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    handle: "karpagapriya",
    href: "https://linkedin.com/in/karpagapriya",
    short: "LI",
  },
  {
    label: "GitHub",
    handle: "akarpagapriya",
    href: "https://github.com/akarpagapriya",
    short: "GH",
  },
  {
    label: "Behance",
    handle: "karpagapriya",
    href: "https://behance.net/karpagapriya",
    short: "BE",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

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

    const items = contentRef.current?.querySelectorAll(".contact-item") ?? [];
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, delay: i * 0.07, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 92%", once: true },
        }
      );
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("karpagapriya.ak@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(10,102,194,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span
              className="h-px w-12"
              style={{ background: "var(--border)" }}
            />
            <span className="label-tag">Get in Touch</span>
            <span
              className="h-px w-12"
              style={{ background: "var(--border)" }}
            />
          </div>

          <h2
            className="font-syne font-bold text-[clamp(2.5rem,6vw,5rem)] leading-tight tracking-tight mb-6"
            style={{ color: "var(--text)" }}
          >
            Let&apos;s build something{" "}
            <span className="text-gradient">great together</span>
          </h2>

          <p
            className="font-dm text-lg max-w-xl mx-auto"
            style={{ color: "var(--muted)" }}
          >
            Open to UI Engineer and Frontend Developer roles — remote and
            onsite.{" "}
            <span style={{ color: "var(--accent)" }}>
              Available to join immediately.
            </span>
          </p>
        </div>

        {/* Content grid */}
        <div
          ref={contentRef}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Contact details */}
          <div className="space-y-4">
            <h3
              className="contact-item font-syne font-semibold text-lg mb-5"
              style={{ color: "var(--text)" }}
            >
              Direct Contact
            </h3>

            {CONTACT_DETAILS.map((item) => (
              <div
                key={item.label}
                className="contact-item group"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex items-center gap-4 p-4 transition-all duration-200"
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      background: "var(--surface)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "var(--border)";
                    }}
                  >
                    <span className="text-xl w-8 text-center">{item.icon}</span>
                    <div>
                      <div
                        className="font-mono text-xs mb-0.5"
                        style={{ color: "var(--muted)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="font-dm text-sm group-hover:text-[--accent] transition-colors"
                        style={{ color: "var(--text)" }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div
                    className="flex items-center gap-4 p-4"
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      background: "var(--surface)",
                    }}
                  >
                    <span className="text-xl w-8 text-center">{item.icon}</span>
                    <div>
                      <div
                        className="font-mono text-xs mb-0.5"
                        style={{ color: "var(--muted)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="font-dm text-sm"
                        style={{ color: "var(--text)" }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Copy email button */}
            <button
              onClick={copyEmail}
              className="contact-item w-full btn-outline text-sm mt-2"
              data-magnetic
            >
              <span>{copied ? "✓ Copied!" : "Copy Email Address"}</span>
            </button>
          </div>

          {/* Socials + CTA */}
          <div className="space-y-4">
            <h3
              className="contact-item font-syne font-semibold text-lg mb-5"
              style={{ color: "var(--text)" }}
            >
              Find Me Online
            </h3>

            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item group flex items-center gap-4 p-4 transition-all duration-200"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  background: "var(--surface)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                }}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                  style={{
                    background: "rgba(10,102,194,0.1)",
                    color: "var(--primary)",
                    borderRadius: "2px",
                  }}
                >
                  {social.short}
                </div>
                <div className="flex-1">
                  <div
                    className="font-syne text-sm font-semibold group-hover:text-[--primary] transition-colors"
                    style={{ color: "var(--text)" }}
                  >
                    {social.label}
                  </div>
                  <div
                    className="font-mono text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    /{social.handle}
                  </div>
                </div>
                <span style={{ color: "var(--muted)" }} className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block">
                  ↗
                </span>
              </a>
            ))}

            {/* Resume CTA */}
            <div
              className="contact-item mt-6 p-6 text-center"
              style={{
                border: "1px solid var(--accent)",
                borderRadius: "2px",
                background: "rgba(79,255,176,0.04)",
              }}
            >
              <p
                className="font-dm text-sm mb-4"
                style={{ color: "var(--muted)" }}
              >
                Want the full picture?
              </p>
              <a
                href="/resume.pdf"
                download
                className="btn-primary w-full justify-center"
                data-magnetic
              >
                <span>Download Resume</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
