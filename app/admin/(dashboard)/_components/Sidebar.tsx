"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Package, ShoppingCart, CreditCard, Truck } from "lucide-react";
import CompanyName from "@/components/common/company-name";

const NAV_LINKS = [
  { name: "Dashboard", href: "/admin", icon: LayoutGrid },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
  { name: "Delivery", href: "/admin/delivery", icon: Truck },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[color:var(--surface)] border-r-2 border-[color:var(--outline-variant)] flex flex-col h-full font-sans justify-between select-none shrink-0">
    
      <div className="flex flex-col flex-1">
        
        <div className="p-6 pb-4 flex flex-col gap-1 items-start">
         <CompanyName  size="sm"/>
          <span className="text-[10px] font-bold text-[color:var(--on-surface-variant)] tracking-wider uppercase">
            ADMIN CONSOLE
          </span>
        </div>

     
        <nav className="space-y-1 mt-6 px-0">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3.5 pl-6 pr-6 py-3.5 text-sm font-semibold transition-all relative ${
                  isActive
                    ? "bg-[color:var(--primary)]/10 text-[color:var(--primary)] rounded-none"
                    : "text-[color:var(--on-surface-variant)] hover:bg-[color:var(--surface-container)] hover:text-[color:var(--on-surface)]"
                }`}
              >
                {isActive && (
                  <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-[color:var(--primary)]"></div>
                )}
                <link.icon className={`w-[18px] h-[18px] ${isActive ? "text-[color:var(--primary)]" : "text-[color:var(--on-surface-variant)]"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

  
      <div className="p-4 border-t border-[color:var(--outline-variant)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[color:var(--primary-container)] flex items-center justify-center text-[color:var(--on-primary)] font-bold text-sm shrink-0">
          AD
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-[color:var(--on-surface)] leading-tight truncate">
            Artisan Admin
          </span>
          <span className="text-[10px] font-medium text-[color:var(--on-surface-variant)] truncate mt-0.5">
            Master Studio
          </span>
        </div>
      </div>
    </aside>
  );
}
