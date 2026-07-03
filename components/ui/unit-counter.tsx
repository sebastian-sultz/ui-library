"use client";
 
import React from "react";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
 
type UnitCounterProps = {
  label?: string;
  count: number;
  onCountChange: (count: number) => void;
  min?: number;
  max?: number;
  className?: string;
  variant?: "default" | "stacked";
};
 
const UnitCounter = ({
  label = "Enter the number of units",
  count,
  onCountChange,
  min = 0,
  max = 13,
  className = "",
  variant = "default",
}: UnitCounterProps) => {
  const handleDecrement = () => {
    if (count > min) {
      onCountChange(count - 1);
    }
  };
 
  const handleIncrement = () => {
    if (count < max) {
      onCountChange(count + 1);
    }
  };
 
  const formattedCount = count < 10 ? `0${count}` : `${count}`;
 
  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center gap-1 leading-none w-full", className)}>
        <div className="flex items-center gap-10 select-none">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={count <= min}
            className={cn(
              "flex items-center justify-center rounded-md w-9 h-9 border-[1.5px] transition-colors bg-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-base font-bold",
              count > min
                ? "border-text-primary text-text-primary hover:bg-container-main"
                : "border-divider-main text-text-secondary",
            )}
          >
            <Minus strokeWidth={"2px"} className="h-4 w-4" />
          </button>
          <span className="text-[2.625rem] font-bold text-text-primary tracking-tight w-30 text-center select-all">
            {formattedCount}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={count >= max}
            className={cn(
              "flex items-center justify-center rounded-md w-9 h-9 border-[1.5px] transition-colors bg-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-base font-bold",
              count < max
                ? "border-text-primary text-text-primary hover:bg-container-main"
                : "border-divider-main text-text-secondary",
            )}
          >
            <Plus strokeWidth={"2px"} className="h-4 w-4" />
          </button>
        </div>
        {label && (
          <span className="text-sm text-text-primary font-medium ">
            {label}
          </span>
        )}
      </div>
    );
  }
 
  return (
    <div className={cn("flex justify-between items-center", className)}>
      {label && (
        <span className="text-[15px] font-medium text-text-primary">
          {label}
        </span>
      )}
      <div className="flex items-center gap-2 select-none">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={count <= min}
          className={cn(
            "flex items-center justify-center rounded-md w-9 h-9 transition-colors bg-white disabled:opacity-40 disabled:cursor-not-allowed",
            count > min
              ? "border border-text-primary text-text-primary font-bold hover:bg-container-main"
              : "border border-divider-main text-text-secondary"
          )}
        >
          -
        </button>
        <div className="flex items-center justify-center border border-divider-main rounded-[6px] w-14 h-9 font-bold text-text-primary text-sm bg-white">
          {formattedCount}
        </div>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={count >= max}
          className={cn(
            "flex items-center justify-center rounded-md w-9 h-9 transition-colors bg-white disabled:opacity-40 disabled:cursor-not-allowed text-base font-bold",
            count < max
              ? "border border-text-primary text-text-primary font-bold hover:bg-container-main"
              : "border border-divider-main text-text-secondary"
          )}
        >
          +
        </button>
      </div>
    </div>
  );
};
 
export { UnitCounter };
