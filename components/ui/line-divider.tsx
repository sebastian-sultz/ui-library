import { cn } from "@/lib/utils";

type LineDividerProps = {
  className?: string;
  variant?: "horizontal" | "vertical";
  dashed?: boolean;
};

const LineDivider = ({
  className,
  variant = "horizontal",
  dashed = false,
}: LineDividerProps) => {
  return (
    <div
      className={cn(
        variant === "horizontal" ? "w-full" : "h-auto self-stretch",
        dashed
          ? cn(
              "bg-transparent",
              variant === "horizontal"
                ? "border-t border-dashed border-divider-main h-0"
                : "border-l border-dashed border-divider-main w-0",
            )
          : cn("bg-divider-main", variant === "horizontal" ? "h-px" : "w-px"),
        className,
      )}
    />
  );
};

export { LineDivider };
