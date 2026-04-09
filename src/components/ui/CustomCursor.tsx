"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    if (isCoarsePointer || noHover) {
      return;
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor-active");

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

    const onTouch = () => {
      setVisible(false);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    const onEnter = () => {
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.opacity = "0.6";
    };
    const onLeave = () => {
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.opacity = "1";
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
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      magneticEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      document.body.classList.remove("custom-cursor-active");
    };
  }, [visible]);

  // Render nothing on touch devices
  if (!visible) return null;

  return (
    <>
      <div
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
          top: 0,
          left: 0,
        }}
      />
      <div
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
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}