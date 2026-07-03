"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as Icon } from "lucide-react";

import { autoFormatDateInput } from "@/lib/helpers";
import CalendarIcon from "@/assets/icons/CalendarIcon";

interface DateInputProps {
  headerText?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  bottomText?: string;
  calendarProps?: Omit<
    React.ComponentProps<typeof Calendar>,
    "mode" | "selected" | "onSelect" | "month" | "onMonthChange"
  >;
  side?: "top" | "right" | "bottom" | "left";
  avoidCollisions?: boolean;
}

function DateInput({
  headerText,
  placeholder = "DD/MM/YYYY",
  name,
  value = "",
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  className,
  bottomText,
  calendarProps,
  side = "bottom",
  avoidCollisions = true,
}: DateInputProps) {
  const [open, setOpen] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<Date | undefined>();
  const [viewMonth, setViewMonth] = React.useState<Date>(new Date());
  const inputRef = React.useRef<HTMLInputElement>(null);

  const parseDateString = React.useCallback(
    (dateStr: string): Date | undefined => {
      if (!dateStr) return undefined;
      const parts = dateStr.split("/");
      if (parts.length !== 3) return undefined;
      const [day, month, year] = parts.map(Number);
      if (!day || !month || !year || year < 1900) return undefined;
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      ) {
        return date;
      }
      return undefined;
    },
    [],
  );

  const parsedDate = React.useMemo(
    () => parseDateString(value),
    [value, parseDateString],
  );

  const handleOpenChange = React.useCallback(
    (isOpen: boolean) => {
      if (disabled) return;
      if (isOpen) {
        setTempDate(parsedDate);
        setViewMonth(parsedDate ?? new Date());
      }
      setOpen(isOpen);
    },
    [disabled, parsedDate],
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = autoFormatDateInput(e.target.value);
      onChange?.(formatted);
    },
    [onChange],
  );

  const handleApply = React.useCallback(() => {
    if (tempDate) {
      const day = String(tempDate.getDate()).padStart(2, "0");
      const month = String(tempDate.getMonth() + 1).padStart(2, "0");
      const year = tempDate.getFullYear();
      onChange?.(`${day}/${month}/${year}`);
    }
    setOpen(false);
  }, [tempDate, onChange]);

  const handleCancel = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleTodayClick = React.useCallback(() => {
    const today = new Date();
    setTempDate(today);
    setViewMonth(today);
  }, []);

  const todayDisplay = React.useMemo(() => {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, "0");
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const y = String(now.getFullYear()).slice(-2);
    return `${d}/${m}/${y}`;
  }, []);

  const isFilled = value.length > 0;

  return (
    <div className={cn("flex flex-col gap-1.5 group", className)}>
      {headerText && (
        <p
          className={cn(
            disabled
              ? "text-text-tertiary group-focus-within:text-text-tertiary"
              : error
                ? "text-error-main"
                : "text-text-secondary",
            !error && !disabled && "group-focus-within:text-text-primary",
            "text-sm font-medium",
          )}
        >
          {headerText}
          {required && <span className="text-error-main">*</span>}
        </p>
      )}

      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverAnchor asChild>
          <div className="relative flex w-full">
            <input
              ref={inputRef}
              type="text"
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              onBlur={onBlur}
              disabled={disabled}
              className={cn(
                "w-full border border-text-tertiary bg-white outline-none rounded-md py-2 px-3",
                "placeholder:text-text-tertiary placeholder:text-sm",
                !error && "focus:border-text-secondary",
                "pr-10",
                disabled &&
                  "border-text-tertiary text-text-secondary placeholder:text-text-secondary cursor-not-allowed",
                error &&
                  "border-error-main text-error-main focus:border-error-main",
              )}
            />
            <PopoverTrigger asChild>
              <button
                type="button"
                tabIndex={-1}
                disabled={disabled}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2",
                  "h-5 w-5 flex items-center justify-center",
                  "text-text-tertiary hover:text-text-primary",
                  "focus:outline-none cursor-pointer",
                  disabled && "cursor-not-allowed opacity-50",
                  isFilled && "text-text-secondary",
                )}
              >
                <CalendarIcon />
              </button>
            </PopoverTrigger>
          </div>
        </PopoverAnchor>

        <PopoverContent
          className="w-auto p-0 bg-white rounded-xl shadow-primary"
          align="end"
          side={side}
          avoidCollisions={avoidCollisions}
          sideOffset={4}
          collisionPadding={8}
          sticky="always"
          updatePositionStrategy="always"
        >
          <Calendar
            mode="single"
            selected={tempDate}
            month={viewMonth}
            onMonthChange={setViewMonth}
            onSelect={setTempDate}
            {...calendarProps}
          />

          <div className="border-t border-text-tertiary/30 px-4 py-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleTodayClick}
              className="text-sm font-bold text-text-primary hover:text-main-primary transition-colors cursor-pointer"
            >
              Today - {todayDisplay}
            </button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="small" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="small" onClick={handleApply} disabled={!tempDate}>
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {bottomText && (
        <p
          className={cn(
            disabled
              ? "text-text-tertiary"
              : error
                ? "text-error-main"
                : "text-text-secondary",
            "text-sm",
          )}
        >
          {bottomText}
        </p>
      )}

      {error && (
        <p
          className={cn(
            disabled ? "text-text-tertiary" : "text-error-main",
            "text-sm",
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}

DateInput.displayName = "DateInput";

export { DateInput };
export type { DateInputProps };
