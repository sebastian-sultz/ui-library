"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "@/lib/utils";

function Toggle({
  className,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        "group relative inline-flex shrink-0 items-center rounded-full border-2 border-main-primary transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=on]:bg-main-primary data-[state=off]:bg-transparent",
        "h-4 w-7", // default fallback size if not overridden
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block rounded-full border-2 transition-all duration-200 bg-white",
          "absolute top-0.5 bottom-0.5 aspect-square",
          "group-data-[state=on]:left-[calc(100%-2px)] group-data-[state=on]:-translate-x-full group-data-[state=on]:border-white",
          "group-data-[state=off]:left-0.5 group-data-[state=off]:translate-x-0 group-data-[state=off]:border-main-primary",
        )}
      />
    </TogglePrimitive.Root>
  );
}

export { Toggle };
