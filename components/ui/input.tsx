import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-blue-500 bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-blue-500 aria-invalid:ring-2 aria-invalid:ring-blue-500/30 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 outline-mone focus-visible:outline-none focus-visible:ring-offset-0  disabled",
        className
      )}
      {...props}
    />
  );
}

export { Input };