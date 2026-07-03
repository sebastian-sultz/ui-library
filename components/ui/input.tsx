"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { SelectComponent } from "./select-component";

import { DeleteIcon, Trash2 } from "lucide-react";
import { Button } from "./button";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BaseInputProps extends React.ComponentProps<"input"> {
  headerText?: string;
  tooltipContent?: React.ReactNode | string;
  bottomText?: string | React.ReactNode;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightText?: string;
  selectBox?: boolean;
  onRightIconClick?: () => void;
  deleteField?: boolean;
  handleDeleteField?: () => void;
  multiline?: boolean;
  rows?: number;
  rightElement?: React.ReactNode;
}

type SelectProps = {
  options: Array<{ value: string; label: string }>;
  defaultValue: string;
  trigger: string;
  onValueChange: (value: string) => void;
  className?: string;
};

type InputWithoutSelect = BaseInputProps & {
  selectBox?: false;
  selectData?: never;
};

type InputWithSelect = BaseInputProps & {
  selectBox: true;
  selectData: SelectProps;
};

type InputProps = InputWithoutSelect | InputWithSelect;

const Input = (props: InputProps) => {
  const {
    className,
    type,
    headerText,
    tooltipContent,
    bottomText,
    placeholder,
    error,
    value,
    defaultValue,
    onChange,
    onInput,
    onBlur,
    leftIcon,
    rightIcon,
    rightText,
    onRightIconClick,
    selectBox,
    selectData,
    deleteField,
    handleDeleteField,
    multiline,
    rows,
    rightElement,
    ...rest
  } = props;

  const isRequired = rest.required ?? false;
  const isDisabled = rest.disabled ?? false;

  const [isFilled, setIsFilled] = React.useState(() => {
    const initial = value ?? defaultValue;
    if (initial === undefined || initial === null) return false;
    return String(initial).length > 0;
  });

  React.useEffect(() => {
    if (value === undefined || value === null) return;
    setIsFilled(String(value).length > 0);
  }, [value]);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFilled(event.currentTarget.value.length > 0);
      onChange?.(event as any);
    },
    [onChange],
  );

  const inputClasses = cn(
    "w-full border border-text-tertiary bg-white outline-none rounded-md py-2 px-3",
    "placeholder:text-text-tertiary placeholder:text-sm",
    !error && "focus:border-text-secondary",
    leftIcon && "pl-10",
    (rightIcon || rightText) && "pr-10",
    isDisabled &&
      "border-text-tertiary text-text-secondary placeholder:text-text-secondary cursor-not-allowed",
    error && "border-error-main text-error-main focus:border-error-main",
    className,
  );

  return (
    <div className={cn("flex flex-col gap-1.5 group", className)}>
      <div className="flex justify-between items-center">
        {headerText && (
          <div className="flex gap-2">
            <p
              className={cn(
                isDisabled
                  ? "text-text-tertiary group-focus-within:text-text-tertiary"
                  : error
                    ? "text-error-main"
                    : "text-text-secondary",
                !error && !isDisabled && "group-focus-within:text-text-primary",
                "text-sm font-medium",
              )}
            >
              {headerText}
              {isRequired && <span className="text-error-main">*</span>}
            </p>

            {tooltipContent && (
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3.5 w-3.5" />
                </TooltipTrigger>
                <TooltipContent>{tooltipContent}</TooltipContent>
              </Tooltip>
            )}
          </div>
        )}
        {deleteField && (
          <Button
            variant={"text"}
            startIcon={<Trash2 />}
            className="text-error-main hover:text-error-main p-0"
            onClick={handleDeleteField}
          >
            Remove
          </Button>
        )}
      </div>
      <div className="flex gap-2 group w-full">
        <div className="relative flex-1 flex w-full">
          {leftIcon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 flex items-center justify-center text-text-tertiary pointer-events-none group-focus-within:text-black",
                isFilled && "text-black",
                isDisabled &&
                  "text-text-secondary group-focus-within:text-text-secondary",
                error && "text-error-main group-focus-within:text-error-main",
              )}
            >
              {leftIcon}
            </div>
          )}

          {multiline ? (
            <textarea
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={onBlur}
              value={value as string}
              defaultValue={defaultValue as string}
              onInput={onInput as any}
              className={cn(inputClasses, "resize-none")}
              rows={rows}
              disabled={isDisabled}
              {...(rest as any)}
            />
          ) : (
            <input
              type={type}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={onBlur}
              value={value}
              defaultValue={defaultValue}
              onInput={onInput}
              className={inputClasses}
              disabled={isDisabled}
              {...(rest as any)}
            />
          )}
          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 
                       h-6 w-6 flex items-center justify-center
                       text-text-secondary hover:text-text-primary
                       focus:outline-none"
            >
              {rightIcon}
            </button>
          )}
          {rightText && (
            <span
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 text-sm pointer-events-none",
                "text-text-tertiary",
                isDisabled &&
                  "text-text-secondary group-focus-within:text-text-secondary",
              )}
            >
              {rightText}
            </span>
          )}
        </div>
        {rightElement}
        {selectBox && selectData && (
          <SelectComponent
            {...selectData}
            onValueChange={(val) => {
              selectData.onValueChange(val);
              if (onChange) {
                const mockEvent = {
                  target: {
                    name: rest.name,
                    value: "",
                    getAttribute: () => null,
                    setSelectionRange: () => {},
                  },
                  currentTarget: {
                    name: rest.name,
                    value: "",
                  },
                } as any;
                onChange(mockEvent);
              }
            }}
          />
        )}
      </div>

      {bottomText && (
        <p
          className={cn(
            isDisabled
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
            isDisabled ? "text-text-tertiary" : "text-error-main",
            "text-sm",
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export { Input };
