"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Check } from "lucide-react";
export type TabsVariant = "default" | "label" | "shadow" | "underline";

export type TabsTriggerStatus = "default" | "completed";

const TabsVariantContext = React.createContext<TabsVariant>("default");

const tabsListVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      default: "bg-background-secondary w-fit rounded-[6px] p-[5px]",
      label:
        "px-3 py-1 gap-2 border border-text-tertiary rounded-2xl bg-white w-fit leading-3",
      shadow:
        "bg-[linear-gradient(275deg,rgba(245,248,255,0.6)_0%,rgba(245,248,255,0.6)_100%)] w-fit rounded-t-xl gap-2",
      underline: "justify-start gap-4 bg-transparent p-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const tabsTriggerVariants = cva("transition-all text-sm cursor-pointer", {
  variants: {
    variant: {
      default:
        "text-text-secondary data-[state=active]:bg-white data-[state=active]:font-[700] data-[state=active]:shadow-primary data-[state=active]:!text-main-primary rounded-[3px] px-3 py-1.5 disabled:cursor-not-allowed leading-[14px]",
      label:
        "relative data-[state=active]:!text-main-primary data-[state=active]:font-medium text-text-secondary text-[0.75rem] leading-3 font-normal disabled:cursor-not-allowed after:absolute after:top-1/2 after:-right-1 after:translate-x-1/2 after:content-[''] after:w-px after:h-2.5 after:bg-text-secondary last:after:hidden after:-translate-y-1/2 p-0",
      shadow:
        "relative data-[state=active]:font-[700] text-text-secondary data-[state=active]:!text-main-primary px-3 py-1.5 data-[state=active]:after:absolute data-[state=active]:after:content-[''] data-[state=active]:after:-bottom-0 data-[state=active]:after:left-1/2 data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:h-[3px] data-[state=active]:after:w-[52px] data-[state=active]:after:bg-[rgba(1,121,219,0.30)] data-[state=active]:after:blur-[5.5px] disabled:cursor-not-allowed leading-[14px]",
      underline:
        "pb-1 px-3 text-[1.125rem] font-bold text-text-secondary data-[state=active]:!text-text-primary data-[state=active]:border-b-2 data-[state=active]:border-main-secondary rounded-sm disabled:cursor-not-allowed",
    },
    status: {
      default: "disabled:text-text-tertiary",
      completed: "text-success-main",
    },
  },
  defaultVariants: {
    variant: "default",
    status: "default",
  },
});

function Tabs({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant;
}) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-4", className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  icon,
  status = "default",
  children,
  disabled,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  icon?: React.ReactNode;
  status?: TabsTriggerStatus;
}) {
  const variant = React.useContext(TabsVariantContext);
  const isDisabled = status === "completed" || disabled;
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      disabled={isDisabled}
      className={cn(
        tabsTriggerVariants({ variant, status }),
        "inline-flex gap-2.5 items-center justify-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="h-3 w-3 flex items-center justify-center [&>svg]:h-3 [&>svg]:w-3">
          {status === "completed" ? <Check className="success-main" /> : icon}
        </span>
      )}

      {children && (
        <span className="whitespace-nowrap leading-inherit">{children}</span>
      )}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
