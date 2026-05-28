"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm, ValidationError } from "@formspree/react";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Services ──────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "logo",
    icon: "✦",
    title: "Logo & Brand Identity",
    short: "From mark to full brand system",
    price: "₹4,000",
    priceNote: "starting",
    usd: "$50",
    color: "warning",
    deliverables: [
      "3 logo concepts with rationale",
      "Final in SVG, PNG, PDF (all sizes)",
      "Colour palette + typography guide",
      "Brand usage guidelines",
    ],
    turnaround: "5–7 days",
    tools: ["Illustrator", "Figma"],
  },
  {
    id: "ui-design",
    icon: "◈",
    title: "UI/UX Design",
    short: "Figma screens ready to hand off",
    price: "₹6,000",
    priceNote: "starting",
    usd: "$75",
    color: "accent",
    deliverables: [
      "User flow + wireframes",
      "High-fidelity Figma screens",
      "Component library in Figma",
      "Developer-ready handoff file",
    ],
    turnaround: "5–10 days",
    tools: ["Figma", "FigJam"],
  },
  {
    id: "website",
    icon: "⬡",
    title: "Website Development",
    short: "Responsive, fast, production-ready",
    price: "₹12,000",
    priceNote: "starting",
    usd: "$150",
    color: "primary",
    deliverables: [
      "Mobile-first responsive design",
      "Next.js or plain HTML/CSS/JS",
      "SEO meta, sitemap, robots.txt",
      "Deployed on Vercel / Netlify",
    ],
    turnaround: "7–14 days",
    tools: ["Next.js", "Tailwind", "Vercel"],
  },
  {
    id: "webapp",
    icon: "⬢",
    title: "Web App Development",
    short: "React dashboards, SaaS, portals",
    price: "₹25,000",
    priceNote: "starting",
    usd: "$300",
    color: "success",
    deliverables: [
      "Full-stack React / Next.js app",
      "TypeScript + clean architecture",
      "Auth, CRUD, API integration",
      "Deployed + source code delivered",
    ],
    turnaround: "14–30 days",
    tools: ["React", "TypeScript", "Supabase"],
  },
  {
    id: "figma-to-code",
    icon: "→",
    title: "Figma → React",
    short: "Pixel-perfect, zero handoff gap",
    price: "₹8,000",
    priceNote: "starting",
    usd: "$100",
    color: "accent",
    deliverables: [
      "Pixel-perfect component build",
      "TypeScript + Tailwind CSS",
      "Responsive across all breakpoints",
      "Storybook docs (on request)",
    ],
    turnaround: "5–10 days",
    tools: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "poster-social",
    icon: "▣",
    title: "Posters & Social Media",
    short: "Print-ready + digital creatives",
    price: "₹800",
    priceNote: "per design",
    usd: "$10",
    color: "warning",
    deliverables: [
      "Event / promotional posters",
      "Social media creatives (all sizes)",
      "Print-ready PDF export",
      "Editable source file",
    ],
    turnaround: "1–3 days",
    tools: ["Illustrator", "Photoshop", "Figma"],
  },
];

// ── Why me ────────────────────────────────────────────────────────────
const WHY = [
  { icon: "🎨", title: "Design + Code — One Person", body: "You deal with one person who does both. No designer-developer translation gap. What you see in Figma is exactly what gets built." },
  { icon: "⚡", title: "Production Standard", body: "Every deliverable is held to the same standard as the apps I ship professionally — clean code, responsive, accessible, deployed." },
  { icon: "🤝", title: "Clear Communication", body: "Daily updates, shared progress link from day one. You see the work evolve — no surprises at handoff." },
  { icon: "🔄", title: "Revisions Included", body: "2 rounds of revisions on every project. Feedback loops are fast because I understand both what you want and what's technically feasible." },
];

// ── Form fields ───────────────────────────────────────────────────────
const BUDGET_OPTIONS = [
  "Under ₹5,000",
  "₹5,000 – ₹15,000",
  "₹15,000 – ₹40,000",
  "₹40,000+",
  "Let's discuss",
];

const SERVICE_OPTIONS = SERVICES.map((s) => s.title);

type FormState = "idle" | "sending" | "sent" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  deadline: string;
  message: string;
}

const EMPTY: FormData = {
  name: "", email: "", phone: "", company: "",
  service: "", budget: "", deadline: "", message: "",
};

// ── Color helpers ─────────────────────────────────────────────────────
const colorMap: Record<string, { text: string; border: string; bg: string }> = {
  accent:  { text: "var(--primary)",  border: "var(--primary)",  bg: "rgba(10,102,194,0.06)" },
  primary: { text: "var(--primary)",  border: "var(--primary)",  bg: "rgba(10,102,194,0.06)" },
  warning: { text: "#b45309",          border: "#D97706",          bg: "rgba(217,119,6,0.06)"  },
  success: { text: "#065f46",          border: "#059669",          bg: "rgba(5,150,105,0.06)"  },
};

// ─────────────────────────────────────────────────────────────────────
export default function Freelance() {
  const [form, setForm]         = useState<FormData>(EMPTY);
  const [formState, setFormState] = useState<FormState>("idle");
  const [activeService, setActiveService] = useState<string | null>(null);

  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyRef      = useRef<HTMLDivElement>(null);
  const formRef     = useRef<HTMLDivElement>(null);

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", once: true } }
      );

      const serviceCards = servicesRef.current?.querySelectorAll(".service-card") ?? [];
      serviceCards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: i * 0.08, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true } }
        );
      });

      const whyCards = whyRef.current?.querySelectorAll(".why-card") ?? [];
      whyCards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true } }
        );
      });

      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  // Mailto submit — works without a backend
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    const subject = encodeURIComponent(
      `Freelance Enquiry — ${form.service || "General"} | ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Company / Brand: ${form.company || "—"}

Service Required: ${form.service}
Budget: ${form.budget}
Deadline: ${form.deadline || "Flexible"}

Project Details:
${form.message}

—
Sent from portfolio-karpagapriya.vercel.app`
    );

    window.location.href =
      `mailto:karpagapriya.ak@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setFormState("sent");
      setForm(EMPTY);
    }, 800);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: "2px",
    padding: "10px 14px",
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "14px",
    color: "var(--text)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="freelance"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow accent */}
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79,255,176,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="label-tag">Available for Hire</span>
            <span className="h-px flex-1 max-w-[60px]" style={{ background: "var(--border)" }} />
          </div>
          <h2 className="section-heading mb-4" style={{ color: "var(--text)" }}>
            Freelance{" "}
            <span className="text-gradient">Services</span>
          </h2>
          <p
            className="font-dm text-base max-w-2xl leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            From a single logo to a full web application — I handle the complete journey.
            Based in <span style={{ color: "var(--text)" }}>Madurai, Tamil Nadu</span>,
            working with clients across India and internationally.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              "🇮🇳 India-based",
              "🌐 Remote-friendly",
              "⚡ Fast turnaround",
              "💬 English & Tamil",
              "✓ Figma to Code",
            ].map((badge) => (
              <span
                key={badge}
                className="font-mono text-xs px-3 py-1.5"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  color: "var(--muted)",
                  background: "var(--surface)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* ── Services grid ── */}
        <div
          ref={servicesRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
        >
          {SERVICES.map((svc) => {
            const col = colorMap[svc.color];
            const isActive = activeService === svc.id;
            return (
              <div
                key={svc.id}
                className="service-card group flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: `1px solid ${isActive ? col.border : "var(--border)"}`,
                  background: isActive ? col.bg : "var(--surface)",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setActiveService(isActive ? null : svc.id);
                  if (!isActive) {
                    setForm((f) => ({ ...f, service: svc.title }));
                    setTimeout(() => {
                      document.getElementById("freelance-form")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 300);
                  }
                }}
              >
                <div className="p-6 flex-1">
                  {/* Icon + title */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="font-syne text-2xl font-bold"
                      style={{ color: col.text }}
                    >
                      {svc.icon}
                    </span>
                    <span
                      className="font-mono text-xs px-2 py-1"
                      style={{
                        color: col.text,
                        border: `1px solid ${col.border}`,
                        borderRadius: "2px",
                        background: col.bg,
                      }}
                    >
                      {svc.turnaround}
                    </span>
                  </div>

                  <h3
                    className="font-syne font-bold text-lg mb-1 group-hover:text-[--accent] transition-colors"
                    style={{ color: "var(--text)" }}
                  >
                    {svc.title}
                  </h3>
                  <p className="font-dm text-sm mb-4" style={{ color: "var(--muted)" }}>
                    {svc.short}
                  </p>

                  {/* Deliverables */}
                  <ul className="space-y-1.5 mb-5">
                    {svc.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 font-dm text-sm"
                        style={{ color: "var(--muted)" }}
                      >
                        <span className="mt-1 flex-shrink-0" style={{ color: col.text }}>—</span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-1.5">
                    {svc.tools.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-2 py-0.5"
                        style={{
                          background: col.bg,
                          color: col.text,
                          borderRadius: "2px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price footer */}
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div>
                    <span
                      className="font-syne font-bold text-xl"
                      style={{ color: col.text }}
                    >
                      {svc.price}
                    </span>
                    <span
                      className="font-mono text-xs ml-2"
                      style={{ color: "var(--muted)" }}
                    >
                      {svc.priceNote}
                    </span>
                  </div>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    ≈ {svc.usd}
                  </span>
                </div>

                {/* Select CTA */}
                <div
                  className="mx-6 mb-5 py-2.5 text-center font-mono text-xs transition-all duration-200"
                  style={{
                    border: `1px solid ${isActive ? col.border : "var(--border)"}`,
                    borderRadius: "2px",
                    color: isActive ? col.text : "var(--muted)",
                    background: isActive ? col.bg : "transparent",
                  }}
                >
                  {isActive ? "✓ Selected — scroll to form" : "Select this service ↓"}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Why work with me ── */}
        <div className="mb-20">
          <h3
            className="font-syne font-bold text-2xl mb-8"
            style={{ color: "var(--text)" }}
          >
            Why work with me
          </h3>
          <div ref={whyRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w) => (
              <div
                key={w.title}
                className="why-card p-6 transition-all duration-300 hover:border-[--accent]"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  borderRadius: "2px",
                }}
              >
                <span className="text-2xl mb-3 block">{w.icon}</span>
                <h4
                  className="font-syne font-bold text-sm mb-2"
                  style={{ color: "var(--text)" }}
                >
                  {w.title}
                </h4>
                <p className="font-dm text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact form ── */}
        <div
          id="freelance-form"
          ref={formRef}
          className="grid lg:grid-cols-5 gap-10 items-start"
        >
          {/* Left — info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3
                className="font-syne font-bold text-2xl mb-3"
                style={{ color: "var(--text)" }}
              >
                Start a project
              </h3>
              <p className="font-dm text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                Tell me what you need. I'll reply within{" "}
                <span style={{ color: "var(--accent)" }}>24 hours</span> with a
                clear timeline and quote.
              </p>
            </div>

            {/* Contact quick links */}
            <div className="space-y-3">
              {[
                { icon: "✉", label: "Email", value: "karpagapriya.ak@gmail.com", href: "mailto:karpagapriya.ak@gmail.com" },
                { icon: "📱", label: "WhatsApp", value: "+91 9080437163", href: "https://wa.me/919080437163?text=Hi%20Karpagapriya%2C%20I%20need%20help%20with%20a%20project" },
                { icon: "💼", label: "LinkedIn", value: "karpagapriya", href: "https://linkedin.com/in/karpagapriya" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 group transition-all duration-200"
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    background: "var(--surface)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  <span className="text-lg w-8 text-center">{item.icon}</span>
                  <div>
                    <div className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                      {item.label}
                    </div>
                    <div
                      className="font-dm text-sm group-hover:text-[--accent] transition-colors"
                      style={{ color: "var(--text)" }}
                    >
                      {item.value}
                    </div>
                  </div>
                  <span className="ml-auto text-sm" style={{ color: "var(--muted)" }}>
                    ↗
                  </span>
                </a>
              ))}
            </div>

            {/* Local note */}
            <div
              className="p-4"
              style={{
                border: "1px solid rgba(79,255,176,0.2)",
                borderRadius: "2px",
                background: "rgba(79,255,176,0.04)",
              }}
            >
              <p className="font-mono text-xs mb-1" style={{ color: "var(--accent)" }}>
                📍 Local clients — Madurai
              </p>
              <p className="font-dm text-sm" style={{ color: "var(--muted)" }}>
                Available for in-person meetings across Madurai. Happy to discuss
                your project over a coffee.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div
            className="lg:col-span-3 p-8"
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              borderRadius: "2px",
            }}
          >
            {formState === "sent" ? (
              /* Success state */
              <div className="text-center py-10">
                <div
                  className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl"
                  style={{
                    border: "1px solid rgba(79,255,176,0.3)",
                    borderRadius: "2px",
                    background: "rgba(79,255,176,0.06)",
                  }}
                >
                  ✓
                </div>
                <h4
                  className="font-syne font-bold text-xl mb-2"
                  style={{ color: "var(--text)" }}
                >
                  Message sent!
                </h4>
                <p className="font-dm text-sm mb-6" style={{ color: "var(--muted)" }}>
                  Your email client opened with your message. I'll reply within 24 hours.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="btn-outline text-sm px-6 py-2.5"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-6">
                  <h4
                    className="font-syne font-bold text-lg mb-1"
                    style={{ color: "var(--text)" }}
                  >
                    Project Enquiry
                  </h4>
                  <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                    All fields marked * are required
                  </p>
                </div>

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block font-mono text-xs mb-2"
                      style={{ color: "var(--muted)" }}
                    >
                      Your name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Priya Sharma"
                      value={form.name}
                      onChange={set("name")}
                      style={inputBase}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--primary)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--border)")
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block font-mono text-xs mb-2"
                      style={{ color: "var(--muted)" }}
                    >
                      Email address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="priya@company.com"
                      value={form.email}
                      onChange={set("email")}
                      style={inputBase}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--primary)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--border)")
                      }
                    />
                  </div>
                </div>

                {/* Phone + Company */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block font-mono text-xs mb-2"
                      style={{ color: "var(--muted)" }}
                    >
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={set("phone")}
                      style={inputBase}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--primary)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--border)")
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block font-mono text-xs mb-2"
                      style={{ color: "var(--muted)" }}
                    >
                      Company / Brand name
                    </label>
                    <input
                      type="text"
                      placeholder="Your business name"
                      value={form.company}
                      onChange={set("company")}
                      style={inputBase}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--primary)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--border)")
                      }
                    />
                  </div>
                </div>

                {/* Service + Budget */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block font-mono text-xs mb-2"
                      style={{ color: "var(--muted)" }}
                    >
                      Service needed *
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={set("service")}
                      style={{ ...inputBase, cursor: "pointer" }}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--primary)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--border)")
                      }
                    >
                      <option value="">Select a service…</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                      <option value="Something else">Something else</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="block font-mono text-xs mb-2"
                      style={{ color: "var(--muted)" }}
                    >
                      Budget range *
                    </label>
                    <select
                      required
                      value={form.budget}
                      onChange={set("budget")}
                      style={{ ...inputBase, cursor: "pointer" }}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--primary)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor = "var(--border)")
                      }
                    >
                      <option value="">Select budget…</option>
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label
                    className="block font-mono text-xs mb-2"
                    style={{ color: "var(--muted)" }}
                  >
                    Ideal deadline / timeline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2 weeks, by June end, flexible…"
                    value={form.deadline}
                    onChange={set("deadline")}
                    style={inputBase}
                    onFocus={(e) =>
                      ((e.target as HTMLElement).style.borderColor = "var(--primary)")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLElement).style.borderColor = "var(--border)")
                    }
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block font-mono text-xs mb-2"
                    style={{ color: "var(--muted)" }}
                  >
                    Tell me about your project *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="What do you need? Who is it for? Any references or examples you like? The more detail, the better my quote."
                    value={form.message}
                    onChange={set("message")}
                    style={{ ...inputBase, resize: "vertical", minHeight: "120px" }}
                    onFocus={(e) =>
                      ((e.target as HTMLElement).style.borderColor = "var(--primary)")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLElement).style.borderColor = "var(--border)")
                    }
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full btn-primary justify-center py-3.5 text-sm"
                  style={{ opacity: formState === "sending" ? 0.7 : 1 }}
                >
                  {formState === "sending" ? (
                    <span>Opening email…</span>
                  ) : (
                    <>
                      <span>Send project enquiry</span>
                      <span>→</span>
                    </>
                  )}
                </button>

                <p
                  className="font-mono text-xs text-center"
                  style={{ color: "var(--muted)" }}
                >
                  Opens your email app with all details pre-filled · I reply within 24 hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
