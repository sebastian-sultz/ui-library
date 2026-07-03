"use client";
 
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
 
import { cn } from "@/lib/utils";
 
export type AccordionVariant = "default" | "modal";
 
const AccordionVariantContext = React.createContext<AccordionVariant>("default");
 
function Accordion({
  variant = "default",
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant;
}) {
  return (
    <AccordionVariantContext.Provider value={variant}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        className={cn(className)}
        {...props}
      />
    </AccordionVariantContext.Provider>
  );
}
 
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const variant = React.useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        variant === "default" ? "border-b last:border-b-0" : "border-none bg-transparent",
        className
      )}
      {...props}
    />
  );
}
 
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const variant = React.useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          variant === "default"
            ? "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-2 rounded-md data-[state=open]:rounded-b-none p-5 text-left text-base transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 cursor-pointer"
            : "flex flex-1 items-center justify-between w-full outline-none disabled:pointer-events-none cursor-pointer text-left [&[data-state=open]_.chevron-container>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
 
        {variant === "default" ? (
          <ChevronDownIcon className="text-muted-foreground pointer-events-none translate-y-0.5 transition-transform duration-200 h-4 w-4 shrink-0" />
        ) : (
          <span className="chevron-container p-1 border border-divider-main rounded hover:bg-white transition-colors cursor-pointer flex items-center justify-center bg-transparent text-text-secondary w-5.5 h-5.5 shrink-0 ml-2">
            <ChevronDownIcon className="text-muted-foreground pointer-events-none transition-transform duration-200 h-3.5 w-3.5" />
          </span>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
 
function AccordionContent({
  className,
  children,
  dashedDivider = false,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> & {
  dashedDivider?: boolean;
}) {
  const variant = React.useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-base rounded-b-md data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      {...props}
    >
      {dashedDivider && variant === "default" && (
        <div className="border border-dashed border-text-tertiary" />
      )}
 
      <div className={variant === "default" ? "p-5" : "p-0 mt-3 w-full"}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
 
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
