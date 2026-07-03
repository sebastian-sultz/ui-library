"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "@/lib/utils";

function InputOTP({
  className,
  containerClassName,
  autoFocus = true,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50 group",
        containerClassName,
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      autoFocus={autoFocus}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex flex-row items-center gap-2 sm:gap-3", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border bg-white text-base sm:text-lg font-medium transition-all duration-200 outline-none select-none",

        "border-text-tertiary text-text-primary",

        "hover:border-text-secondary group-has-disabled:pointer-events-none group-has-disabled:cursor-not-allowed",

        "data-[active=true]:border-black data-[active=true]:ring-0 data-[active=true]:ring-black/10",

        "group-has-[input[aria-invalid=true]]:border-error-main group-has-[input[aria-invalid=true]]:ring-0 group-has-[input[aria-invalid=true]]:ring-error-main/20",

        className,
      )}
      {...props}
    >
      {char}

      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-0.5 animate-caret-blink bg-black" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className={cn(
        "flex items-center justify-center text-text-tertiary px-1",
        className,
      )}
      {...props}
    >
      <div className="h-1.5 w-1.5 rounded-full bg-current" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
