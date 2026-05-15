"use client";
import React, { useEffect, useState } from "react";
import { Heart, Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const count = useSelector((state: RootState) => state.cart.items.length);

  useEffect(() => {
    setCartCount(count);
  }, [count]);
  return (
    <header className="bg-white border-b border-[color:var(--outline-variant)] shadow-sm sticky top-0 z-50">
      <div className="container-max px-6 md:px-12 h-20 flex justify-between items-center">
        <div className="flex items-center gap-20">
          <Link
            href="/"
            className="text-2xl font-bold text-[color:var(--primary)]"
          >
            Shelly Mart
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="products"
              className="text-[color:var(--primary)] font-semibold text-body-md border-b-2 border-[color:var(--primary)] pb-1"
            >
              Shop All
            </a>
            <a
              href="#"
              className="text-[color:var(--on-surface-variant)] font-medium hover:text-[color:var(--primary-container)] transition-colors text-body-md"
            >
              New Arrivals
            </a>
            <a
              href="#"
              className="text-[color:var(--on-surface-variant)] font-medium hover:text-[color:var(--primary-container)] transition-colors text-body-md"
            >
              Best Sellers
            </a>
            <a
              href="#"
              className="text-[color:var(--on-surface-variant)] font-medium hover:text-[color:var(--primary-container)] transition-colors text-body-md"
            >
              Categories
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {/*        
          <div className="hidden lg:flex items-center bg-[color:var(--surface-container-lowest)] border border-[color:var(--outline-variant)] rounded-lg px-3 py-2 w-64 focus-within:border-[color:var(--primary-container)] focus-within:ring-2 focus-within:ring-[color:var(--primary-container)]/20 transition-all">
            <Search size={16} className="text-[color:var(--outline)]" />
            <Input
              type="text"
              placeholder="Search products..."
              className="bg-transparent border-none focus:ring-0 text-body-sm w-full outline-none px-2 h-auto p-0"
            />
          </div> */}

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

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-[color:var(--surface-container)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu
              size={20}
              className="text-[color:var(--on-surface-variant)]"
            />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-[color:var(--outline-variant)] px-6 py-4 space-y-3">
          <a
            href="#"
            className="block text-[color:var(--primary)] font-semibold text-body-md"
          >
            Shop All
          </a>
          <a
            href="#"
            className="block text-[color:var(--on-surface-variant)] hover:text-[color:var(--primary)] transition-colors text-body-md"
          >
            New Arrivals
          </a>
          <a
            href="#"
            className="block text-[color:var(--on-surface-variant)] hover:text-[color:var(--primary)] transition-colors text-body-md"
          >
            Best Sellers
          </a>
          <a
            href="#"
            className="block text-[color:var(--on-surface-variant)] hover:text-[color:var(--primary)] transition-colors text-body-md"
          >
            Categories
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
