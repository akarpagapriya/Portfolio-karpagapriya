"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMouseMove);

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.opacity = "0.6";
      ring.style.mixBlendMode = "screen";

      // Magnetic effect
      el.addEventListener("mousemove", (ev: MouseEvent) => {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (ev.clientX - centerX) * 0.25;
        const deltaY = (ev.clientY - centerY) * 0.25;
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
    };

    const onLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.opacity = "1";
      el.style.transform = "translate(0, 0)";
    };

    const magneticEls = document.querySelectorAll<HTMLElement>(
      "[data-magnetic], a, button"
    );
    magneticEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div
        id="cursor-dot"
        ref={dotRef}
        style={{
          position: "fixed",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        style={{
          position: "fixed",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: "1px solid var(--accent)",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
          opacity: 1,
        }}
      />
    </>
  );
}
