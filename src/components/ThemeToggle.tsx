import { useEffect, useState } from "react";

type Mode = "light" | "dark";
type Preference = "auto" | Mode;

function getLocalTimeMode(): Mode {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<Preference>("auto");
  const [mode, setMode] = useState<Mode>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme-preference");
    if (stored === "auto" || stored === "light" || stored === "dark") {
      setPreference(stored);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const applyTheme = () => {
      const nextMode = preference === "auto" ? getLocalTimeMode() : preference;
      setMode(nextMode);
      document.documentElement.classList.toggle("dark", nextMode === "dark");
    };

    applyTheme();
    const timer = preference === "auto" ? window.setInterval(applyTheme, 60_000) : undefined;
    window.localStorage.setItem("theme-preference", preference);
    window.localStorage.setItem("theme", preference === "auto" ? getLocalTimeMode() : preference);

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [preference, ready]);

  const isDark = mode === "dark";
  const nextPreference: Preference =
    preference === "auto" ? "light" : preference === "light" ? "dark" : "auto";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Theme mode: ${preference}. Switch to ${nextPreference} mode`}
      onClick={() => setPreference(nextPreference)}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <span aria-hidden="true">{preference === "auto" ? "◐" : isDark ? "☾" : "☀"}</span>
      {preference === "auto" ? "Auto" : isDark ? "Night" : "Day"}
    </button>
  );
}
