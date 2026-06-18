"use client";

import { Sun, Moon, ChevronLeft, LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { getPageTitle } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import { logout } from "@/redux/features/auth/authSlice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ToastNotification from "@/components/shared/ToastNotification";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  const handleLogout = () => {
    dispatch(logout());
    ToastNotification({
      title: "Logged out",
      description: "You have been signed out successfully.",
      type: "success",
    });
    router.push("/admin/login");
  };

  return (
    <header className="h-16 bg-background border-b border-(--outline-variant) flex items-center justify-between px-6 font-sans select-none shrink-0">
      {/* Left: Back + Page title */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-(--on-surface-variant) hover:text-(--on-surface) p-1.5 rounded-lg bg-background border border-(--outline-variant) shadow-sm hover:shadow-md transition-all cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-[16px] font-bold tracking-wider text-(--on-surface-variant) capitalize">
          {title}
        </span>
      </div>

      {/* Right: Theme toggle + Profile popover */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={toggleTheme}
          className="text-(--on-surface-variant) hover:text-(--on-surface) p-1.5 rounded-lg hover:bg-(--surface-container) transition-colors cursor-pointer"
        >
          {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-px h-6 bg-(--outline-variant) mx-1" />

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-(--surface-container) transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-(--primary-container) flex items-center justify-center text-(--on-primary) font-bold text-xs shrink-0">
                {initials}
              </div>
              <span className="text-xs font-bold text-(--on-surface)">
                {user?.name || "Artisan Admin"}
              </span>
            </button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-56 p-2">
            {/* User info */}
            <div className="flex items-center gap-3 px-2 py-2.5 border-b border-gray-100 mb-1">
              <div className="w-9 h-9 rounded-full bg-(--primary-container) flex items-center justify-center text-(--on-primary) font-bold text-xs shrink-0">
                {initials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-gray-800 truncate">
                  {user?.name || "Artisan Admin"}
                </span>
                <span className="text-[10px] text-gray-400 truncate">{user?.email}</span>
              </div>
            </div>

            {/* Profile option */}
            <button
              type="button"
              className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-gray-400" />
              My Profile
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer mt-1"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
