import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 text-white border rounded-[0.375rem] font-medium font-figtree cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      color: {
        primary: "",
        danger:
          "border-error-main text-white hover:bg-error-main/5 hover:border-error-main",
      },

      variant: {
        contained:
          "bg-main-primary border-main-primary hover:bg-[#000000] hover:border-[#000000] data-[loading=true]:bg-main-primary data-[loading=true]:border-main-primary disabled:bg-text-tertiary disabled:text-white disabled:border-text-tertiary",
        outline:
          "text-main-primary hover:text-[#000000] hover:border-[#000000] disabled:border-text-tertiary disabled:text-text-tertiary hover:bg-container-main outline-0 data-[loading=true]:text-main-primary data-[loading=true]:border-main-primary ",

        tableAction:
          "text-main-primary hover:text-[#000000] hover:border-[#000000] disabled:border-text-tertiary disabled:text-text-tertiary hover:bg-container-main outline-0 data-[loading=true]:text-main-primary data-[loading=true]:border-main-primary ",

        text: "text-main-primary font-normal border-none hover:text-[#000000] hover:bg-transparent disabled:text-text-tertiary hover:bg-transparent data-[loading=true]:text-main-primary",
      },

      size: {
        default:
          "px-4 py-2 text-[14px] leading-6 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:stroke-[2px]",
        small:
          "px-3 py-1 text-xs leading-5.5 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:stroke-[1.75px]",
      },
    },
    compoundVariants: [
      {
        color: "danger",
        variant: "outline",
        className:
          "text-error-main border-error-main hover:bg-error-main/5 hover:text-error-main hover:border-error-main",
      },
      {
        color: "danger",
        variant: "text",
        className:
          "text-error-main hover:bg-error-main/5 hover:text-text-error-main",
      },
      {
        color: "danger",
        variant: "contained",
        className:
          "text-white bg-error-main border-none hover:bg-error-main/80 hover:text-white ",
      },

      {
        variant: "text",
        className: "px-2 py-0",
      },
      {
        variant: "tableAction",
        className:
          "px-2 py-0 text-xs leading-5.5 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:stroke-[1.75px]",
      },
      {
        color: "danger",
        variant: "tableAction",
        className:
          "text-error-main border-error-main hover:bg-error-main/5 hover:text-error-main hover:border-error-main",
      },
    ],

    defaultVariants: {
      color: "primary",
      variant: "contained",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    Omit<React.ComponentPropsWithoutRef<"button">, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      asChild = false,
      startIcon,
      endIcon,
      loading = false,
      type = "button",
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        data-loading={loading ? "true" : undefined}
        className={cn(
          buttonVariants({
            variant,
            size,
            color,
          }),
          className,
        )}
        type={type}
        {...props}
      >
        <div className={cn("flex items-center gap-2", loading && "opacity-0")}>
          {startIcon && <span>{startIcon}</span>}
          {children}
          {endIcon && <span>{endIcon}</span>}
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
