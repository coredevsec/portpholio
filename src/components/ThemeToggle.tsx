import { useEffect, useState } from "react";

type Mode = "light" | "dark";

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Mode | null;
    const initial: Mode =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setMode(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", mode === "dark");
    window.localStorage.setItem("theme", mode);
  }, [mode, ready]);

  const isDark = mode === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle night mode"
      onClick={() => setMode(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <span aria-hidden="true">{isDark ? "☾" : "☀"}</span>
      {isDark ? "Night" : "Day"}
    </button>
  );
}
