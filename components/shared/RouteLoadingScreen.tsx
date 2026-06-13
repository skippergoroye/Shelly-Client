"use client";

import React from "react";
import { Spinner } from "../ui/spinner";

type RouteLoadingScreenProps = {
  message?: string;
};

export default function RouteLoadingScreen({ message }: RouteLoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/40 backdrop-blur-[3px]">
      {/* Loader card */}
      <div className="flex flex-col items-center gap-4 bg-white/80 px-10 py-8 backdrop-blur-sm">
        {/* Brand name with shimmer pulse */}
        <h1 className="animate-pulse text-2xl font-bold tracking-tight text-primary">
          Shelly Collections
        </h1>

        {/* Spinner + message */}
        {/* <div className="flex items-center gap-2.5 text-sm text-gray-500">
          <Spinner className="size-5 text-[color:var(--primary)]" />
          <span>{message ?? "Loading..."}</span>
        </div> */}

        {/* Progress bar animation */}
        <div className="w-40 h-0.75 bg-gray-200 rounded-full overflow-hidden mt-1">
          <div className="h-full bg-primary rounded-full animate-[progress_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}