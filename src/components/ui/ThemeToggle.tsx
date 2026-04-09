"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      data-magnetic
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-10 h-10 rounded-sm transition-all duration-300 group"
      style={{ border: "1px solid var(--border)" }}
    >
      <span
        style={{ color: "var(--muted)" }}
        className="transition-all duration-300 group-hover:text-[--accent] text-base select-none"
      >
        {isDark ? "☀" : "◑"}
      </span>
    </button>
  );
}
