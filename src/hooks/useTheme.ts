import { useCallback, useEffect, useState } from "react";
import type { Theme } from "@/types";

const storageKey = "portfolio-theme";

function getPreferredTheme(): Theme {
  const savedTheme = localStorage.getItem(storageKey) as Theme | null;
  if (savedTheme) return savedTheme;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return getPreferredTheme();
  });

  useEffect(() => {
    const initialTheme = getPreferredTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(storageKey, next);
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
