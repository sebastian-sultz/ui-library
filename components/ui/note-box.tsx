import React from "react";
import { cn } from "@/lib/utils";

interface NoteBoxProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function NoteBox({ icon, children, className }: NoteBoxProps) {
  return (
    <div
      className={cn(
        "rounded-lg px-4 py-2.5 flex items-center gap-3 w-full shrink-0",
        className
      )}
      style={{
        border: "1.5px solid transparent",
        backgroundImage:
          "linear-gradient(white, white), linear-gradient(to right, var(--main-primary), var(--main-secondary))",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      {icon && <div className="shrink-0 flex items-center justify-center">{icon}</div>}
      <div className="text-sm text-text-primary flex-1">{children}</div>
    </div>
  );
}
