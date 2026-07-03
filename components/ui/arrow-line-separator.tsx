import React from "react";
import { cn } from "@/lib/utils";

export interface ArrowLineSeparatorProps {
  /**
   * The direction of the arrows
   * @default "bidirectional"
   */
  direction?: "left" | "right" | "bidirectional" | "none";
  /**
   * The color variant of the separator mapped to predefined theme design tokens
   * @default "secondary"
   */
  color?: "primary" | "secondary" | "tertiary" | "success" | "error";
  /**
   * Additional class names for the container
   */
  className?: string;
  /**
   * Optional text or element to render in the middle of the line
   */
  label?: React.ReactNode;
}

const colorMap = {
  primary: "text-main-primary stroke-main-primary",
  secondary: "text-main-secondary stroke-main-secondary",
  tertiary: "text-text-tertiary stroke-text-tertiary",
  success: "text-success-main stroke-success-main",
  error: "text-error-main stroke-error-main",
};

export const ArrowLineSeparator = ({
  direction = "bidirectional",
  color = "secondary",
  className,
  label,
}: ArrowLineSeparatorProps) => {
  const colorClass = colorMap[color] || "text-current stroke-current";

  const showLeft = direction === "left" || direction === "bidirectional";
  const showRight = direction === "right" || direction === "bidirectional";

  return (
    <div
      className={cn(
        "flex items-center w-full justify-center select-none",
        colorClass,
        className
      )}
    >
      {/* Left Arrowhead */}
      {showLeft && (
        <svg
          viewBox="0 0 8 12"
          className="w-1.5 h-2.5 shrink-0 fill-none"
        >
          <path
            d="M6 2L2 6L6 10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* Line Segment */}
      <div className="flex-1 flex items-center relative mx-0">
        <div className="w-full border-t-[1.5px] border-dashed border-current opacity-70" />

        {/* Optional Middle Label */}
        {label && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1.5 py-0.5 text-[9px] font-bold rounded-full border border-divider-main whitespace-nowrap text-text-secondary shadow-xs">
            {label}
          </div>
        )}
      </div>

      {/* Right Arrowhead */}
      {showRight && (
        <svg
          viewBox="0 0 8 12"
          className="w-1.5 h-2.5 shrink-0 fill-none"
        >
          <path
            d="M2 2L6 6L2 10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};
