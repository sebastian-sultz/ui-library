"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        `
        peer relative box-border
        size-4 shrink-0 rounded-sm
        border-2 border-main-primary
        bg-background

        data-[state=checked]:bg-main-primary
        data-[state=checked]:border-main-primary

        focus-visible:outline-none
        focus-visible:ring-[3px]
        focus-visible:ring-ring/50

        aria-invalid:border-destructive
        aria-invalid:ring-destructive/20

        disabled:cursor-not-allowed
        disabled:opacity-50

        shadow-xs
        hover:cursor-pointer
        `,
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="
          absolute inset-0
          grid place-content-center
          opacity-0
          data-[state=checked]:opacity-100
        "
      >
        <CheckIcon
          className="
            size-3.5
            text-white
          "
          strokeWidth={3}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
