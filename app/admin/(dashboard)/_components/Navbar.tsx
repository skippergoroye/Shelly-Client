"use client";

import { Bell, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 font-sans select-none shrink-0">
      {/* Left side: Section Title */}
      <div className="flex items-center">
        <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">
          WORKSPACE OVERVIEW
        </span>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* Settings Cog */}
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        {/* Profile Info */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
            AD
          </div>
          <span className="text-xs font-bold text-gray-700">
            Artisan Admin
          </span>
        </div>
      </div>
    </header>
  );
}
