"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="h-9 w-9 rounded-full"
      onClick={toggleTheme}
    >
      <Sun className={`h-5 w-5 ${isDark ? "hidden" : ""}`} />
      <Moon className={`h-5 w-5 ${isDark ? "" : "hidden"}`} />
    </Button>
  );
}
