"use client";

import React from "react";
import Image from "next/image";
import Logo from "@/public/images/IC360-logo.svg";
import { Spinner } from "../ui/spinner";

type RouteLoadingScreenProps = {
  message?: string;
};

export default function RouteLoadingScreen({ message }: RouteLoadingScreenProps) {
  return (
      <div className="fixed inset-0 z-[9999] grid place-items-center bg-white/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <h1 className="animate-pulse text-2xl font-bold text-[color:var(--primary)]">Shelly Mart</h1>
        {/* <Image src={Logo} alt="logo logo" className="h-auto w-auto animate-pulse" priority /> */}
        <div className="flex items-center gap-3 text-sm text-[#5F738C]">
          <Spinner />
          <span>{message ?? "Loading..."}</span>
        </div>
      </div>
    </div>
  );
}


