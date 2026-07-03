import React from "react";
import { LineDivider } from "./line-divider";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export interface StatItem {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface StatsBarProps {
  items: StatItem[];
  className?: string;
  showShadow?: boolean;
}

const StatsBar = ({ items, className, showShadow = false }: StatsBarProps) => {
  return (
    <div
      className={cn(
        "flex bg-white items-stretch rounded-xl py-7 border border-divider-main",
        showShadow && "shadow-primary",
        className,
      )}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={cn(
              "flex gap-3 flex-1 px-3 transition-colors duration-200",
              item.onClick && "cursor-pointer",
              item.className,
            )}
            onClick={item.onClick}
          >
            {item.icon && (
              <div className="shadow-primary p-1.5 rounded-md self-start flex items-center justify-center bg-white">
                {item.icon}
              </div>
            )}
            <div className="flex flex-col justify-center">
              {typeof item.value === "string" ||
              typeof item.value === "number" ? (
                <span className="text-xl font-bold">{item.value}</span>
              ) : (
                item.value
              )}
              <div className="flex items-center gap-1">
                {typeof item.label === "string" ? (
                  <div className="text-sm">{item.label}</div>
                ) : (
                  item.label
                )}
                {item.onClick && (
                  <ChevronRight className="h-4 w-4 text-main-primary" />
                )}
              </div>
            </div>
          </div>
          {index < items.length - 1 && <LineDivider variant="vertical" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export { StatsBar };
