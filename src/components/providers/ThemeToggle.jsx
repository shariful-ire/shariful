"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-os-color-mode";

export function ThemeToggle() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const preferred =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setMode(preferred);
    document.documentElement.setAttribute("data-theme", preferred);
  }, []);

  function toggle() {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color mode"
      className="btn btn-ghost btn-circle"
    >
      {mode === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
