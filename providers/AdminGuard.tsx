"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth?.token);

  useEffect(() => {
    if (!token) {
      router.replace("/admin/login");
    }
  }, [token, router]);

  if (!token) return null;

  return <>{children}</>;
}
