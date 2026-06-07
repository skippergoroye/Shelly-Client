"use client";
import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import CompanyName from "../common/company-name";
import { cn } from "@/lib/utils";

interface NavbarProps {
  variant?: string;
}

const Navbar = ({ variant }: NavbarProps) => {
  const [cartCount, setCartCount] = useState(0);
  const count = useSelector((state: RootState) => state.cart.items.length);

  useEffect(() => {
    setCartCount(count);
  }, [count]);
  return (
    <header className={cn("bg-white border-b border-[color:var(--outline-variant)] shadow-sm sticky top-0 z-50", variant)}>
      <div className="container-max px-6 md:px-12 h-20 flex justify-between items-center">
       
          <CompanyName />



        <div className="flex items-center gap-6">
        

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[color:var(--surface-container)]"
            >
              <Heart
                size={20}
                className="text-[color:var(--on-surface-variant)]"
              />
            </Button>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-[color:var(--surface-container)] relative"
              >
                <ShoppingCart
                  size={20}
                  className="text-[color:var(--on-surface-variant)]"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-1 left-3 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[color:var(--surface-container)]"
            >
              <User
                size={20}
                className="text-[color:var(--on-surface-variant)]"
              />
            </Button>
          </div>

        
        </div>
      </div>
    </header>
  );
};

export default Navbar;
