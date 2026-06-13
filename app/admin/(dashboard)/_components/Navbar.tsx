"use client";

import { Sun, Moon, ArrowLeft, ChevronLeft } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { usePathname } from "next/navigation";
import { getPageTitle } from "@/lib/utils";






export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="h-16 bg-background border-b border-(--outline-variant) flex items-center justify-between px-6 font-sans select-none shrink-0">
      {/* Left side: Back button + Page title */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-(--on-surface-variant) hover:text-(--on-surface) p-1.5 rounded-lg bg-background border border-(--outline-variant) shadow-sm hover:shadow-md transition-all cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-[16px] font-bold tracking-wider text-(--on-surface-variant) capitalize">{title}</span>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={toggleTheme}
          className="text-(--on-surface-variant) hover:text-(--on-surface) p-1.5 rounded-lg hover:bg-(--surface-container) transition-colors cursor-pointer"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <div className="w-px h-6 bg-(--outline-variant) mx-1"></div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-(--primary-container) flex items-center justify-center text-(--on-primary) font-bold text-xs shrink-0">
            AD
          </div>
          <span className="text-xs font-bold text-(--on-surface)">Artisan Admin</span>
        </div>
      </div>
    </header>
  );
}
