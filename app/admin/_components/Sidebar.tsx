"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Box, ShoppingCart, Users, BarChart2, Settings, Plus } from "lucide-react";
import CompanyName from "@/components/common/company-name";
import SubmitButton from "@/components/shared/SubmitButton";

const NAV_LINKS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Inventory", href: "/admin/inventory", icon: Box },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart2 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full font-sans">
      <div className="p-6">
        <CompanyName />
        <p className="text-[13px] text-gray-500 font-medium mt-1">Admin Console</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] font-medium transition-colors ${
                isActive
                  ? "bg-[#EBF3FF] text-[#0A58CA] relative"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0A58CA] rounded-r-md"></div>
              )}
              <link.icon className={`w-[18px] h-[18px] ${isActive ? "text-[#0A58CA]" : "text-gray-500"}`} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <SubmitButton type="button" className="w-full h-10 bg-[#0A58CA] hover:bg-[#084298] text-white font-medium rounded-md flex items-center justify-center gap-2 transition-colors shadow-sm text-sm">
          <Plus className="w-4 h-4" />
          New Product
        </SubmitButton>
      </div>
    </aside>
  );
}
