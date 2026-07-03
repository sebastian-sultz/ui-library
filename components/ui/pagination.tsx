import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants, type Button } from "@/components/ui/button";

type PaginationProps = {
  variant?: "default" | "custom";
} & React.ComponentProps<"nav">;

function Pagination({
  variant = "default",
  className,
  ...props
}: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      data-variant={variant}
      className={cn("group mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-row bg-white items-center overflow-hidden",
        "gap-5",
        "group-data-[variant=custom]:border group-data-[variant=custom]:border-text-tertiary group-data-[variant=custom]:rounded-md group-data-[variant=custom]:**:data-[slot=pagination-item]:border-r group-data-[variant=custom]:**:data-[slot=pagination-item]:last:border-none *:border-text-tertiary group-data-[variant=custom]:gap-0 group-data-[variant=custom]:items-stretch",
        className,
      )}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"button">;

function PaginationLink({
  className,
  isActive,
  size = "small",
  ...props
}: PaginationLinkProps) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "contained" : "text",
          size,
        }),
        "rounded-full w-6 h-6 py-2.5 px-1.5",
        `font-bold ${!isActive && "font-normal text-text-secondary"}`,
        "group-data-[variant=custom]:bg-transparent",
        "group-data-[variant=custom]:rounded-none group-data-[variant=custom]:h-full group-data-[variant=custom]:p-0",

        // CUSTOM + ACTIVE
        "group-data-[variant=custom]:data-[active=true]:border group-data-[variant=custom]:data-[active=true]:hover:bg-background-secondary group-data-[variant=custom]:data-[active=true]:text-main-primary",
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="small"
      className={cn("w-8 h-8", className)}
      {...props}
    >
      <ChevronLeftIcon />
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("w-8 h-8", className)}
      {...props}
    >
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-6 items-center justify-center text-text-secondary",
        "group-data-[variant=custom]:items-end group-data-[variant=custom]:h-full",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
