import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type ChipVariant =
  | "primary"
  | "success"
  | "error"
  | "pending"
  | "dual"
  | "gradient";

type ChipProps = {
  variant?: ChipVariant;
  children: ReactNode;
  className?: string;
  secondaryLabel?: string;
  onClick?: () => void;
};
 
export const Chip = ({
  variant = "primary",
  children,
  className,
  secondaryLabel,
  onClick,
}: ChipProps) => {
  const variantClasses: Record<ChipVariant, string> = {
    primary: "text-text-secondary border-text-secondary bg-white",
    success:
      "text-success-main border-success-main bg-white bg-success-main/10",
    error: "text-error-main border-error-main bg-white bg-error-main/10",
    pending:
      "text-pending-main border-pending-main bg-white bg-pending-main/10",
    dual: "text-text-secondary border-text-tertiary bg-white text-[0.75rem] gap-0 px-3 py-1 h-6 rounded-2xl leading-3",
    gradient:
      "border-transparent bg-white [background-image:linear-gradient(white,white),linear-gradient(to_right,var(--main-primary),var(--main-secondary))] [background-origin:border-box] [background-clip:padding-box,border-box]",
  };
 
  return (
    <span
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-2xl border px-3 py-1 text-[0.75rem] font-medium leading-3 transition-colors",
        onClick && "cursor-pointer hover:bg-background-secondary hover:text-text-primary select-none",
        variantClasses[variant],
        className,
      )}
    >
      {variant === "dual" && secondaryLabel ? (
        <div className="flex items-center gap-1">
          <span className="">{secondaryLabel}</span>

          <div className="w-px h-2.5 bg-text-secondary" />
          <span className="font-medium text-main-primary ">{children}</span>
        </div>
      ) : variant === "gradient" ? (
        <span className="bg-linear-to-r from-main-primary to-main-secondary bg-clip-text text-transparent font-semibold">
          {children}
        </span>
      ) : (
        children
      )}
    </span>
  );
};
