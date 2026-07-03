import React from "react";
import PercentageIcon from "@/assets/icons/percent-info";
import RupeeInfoIcon from "@/assets/icons/rupee-info";
import { cn } from "@/lib/utils";

type EarningsBadgeProps = {
  children: React.ReactNode;
  iconType?: "percent" | "rupee";
  className?: string;
};

const EarningsBadge = ({
  children,
  iconType = "percent",
  className,
}: EarningsBadgeProps) => {
  return (
    <div
      className={cn(
        "w-full flex justify-center bg-white rounded-full",
        className,
      )}
    >
      <div className="w-full bg-success-main/5 py-3 px-4 rounded-full flex items-center justify-center gap-2 text-sm">
        {iconType === "rupee" ? (
          <RupeeInfoIcon className="text-success-main" />
        ) : (
          <PercentageIcon className="text-success-main" />
        )}
        <span className="text-text-primary font-medium font-figtree">
          {children}
        </span>
      </div>
    </div>
  );
};

export { EarningsBadge };
