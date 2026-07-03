import { Loader2Icon } from "lucide-react";

import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerProps = {
  variant?: "default" | "custom";
  className?: string;
} & React.ComponentProps<"svg">;

function Spinner({ variant = "default", className, ...props }: SpinnerProps) {
  const Icon = variant === "custom" ? Loader2Icon : Loader;

  return (
    <Icon
      role="status"
      aria-label="Loading"
      className={cn("size-6 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
