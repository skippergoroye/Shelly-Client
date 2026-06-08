"use client";

import { Bell, Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="h-16 bg-[color:var(--background)] border-b border-[color:var(--outline-variant)] flex items-center justify-between px-6 font-sans select-none shrink-0">
      {/* Left side: Section Title */}
      <div className="flex items-center">
<span className="text-xs font-bold tracking-wider text-[color:var(--on-surface-variant)] uppercase">
            WORKSPACE OVERVIEW
          </span>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="text-[color:var(--on-surface-variant)] hover:text-[color:var(--on-surface)] p-1.5 rounded-lg hover:bg-[color:var(--surface-container)] transition-colors cursor-pointer"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          className="text-[color:var(--on-surface-variant)] hover:text-[color:var(--on-surface)] p-1.5 rounded-lg hover:bg-[color:var(--surface-container)] transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* Settings Cog */}
        <button
          type="button"
          className="text-[color:var(--on-surface-variant)] hover:text-[color:var(--on-surface)] p-1.5 rounded-lg hover:bg-[color:var(--surface-container)] transition-colors cursor-pointer"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[color:var(--outline-variant)] mx-1"></div>

        {/* Profile Info */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[color:var(--primary-container)] flex items-center justify-center text-[color:var(--on-primary)] font-bold text-xs shrink-0">
            AD
          </div>
          <span className="text-xs font-bold text-[color:var(--on-surface)]">
            Artisan Admin
          </span>
        </div>
      </div>
    </header>
  );
}
