"use client";

import { Search, Bell, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 font-sans">
      <div className="flex items-center flex-1 gap-10">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <Input 
            placeholder="Search analytics, orders, or products..." 
            className="w-full pl-10 h-9 bg-[#F8F9FA] border-gray-200 text-sm focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell className="w-[20px] h-[20px]" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <HelpCircle className="w-[20px] h-[20px]" />
        </button>
        
        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-900 leading-tight">Admin</span>
            <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Superuser</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-100 overflow-hidden border border-gray-200">
            <img 
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin&backgroundColor=e2e8f0" 
              alt="Admin Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
