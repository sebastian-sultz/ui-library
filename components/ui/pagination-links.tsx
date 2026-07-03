"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { ReactNode, useCallback, useTransition } from "react";

import { cn } from "@/lib/utils";

export interface PaginationWithLinksProps {
  totalCount: number;
  pageSize: number;
  page: number;
  pageSearchParam?: string;
  variant?: "default" | "custom";
  onPageChange?: (page: number) => void;
}

export function PaginationWithLinks({
  totalCount,
  page,
  pageSize,
  pageSearchParam = "page",
  variant = "default",
  onPageChange,
}: PaginationWithLinksProps) {
  const [isPending, startTransition] = useTransition();

  const totalPageCount = Math.ceil(totalCount / pageSize);

  const goToPage = useCallback(
    (newPage: number) => {
      startTransition(() => {
        if (onPageChange) {
          onPageChange(newPage);
        } else if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.set(pageSearchParam, String(newPage));
          window.location.href = url.pathname + url.search;
        }
      });
    },
    [pageSearchParam, onPageChange]
  );

  const PageButton = (num: number) => {
    const isActive = num === page;

    return (
      <PaginationItem key={num}>
        <PaginationLink
          isActive={isActive}
          onClick={() => goToPage(num)}
          className={cn(
            "cursor-pointer",
            isPending && "pointer-events-none opacity-50",
          )}
        >
          {num}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const renderNumbers = () => {
    const items: ReactNode[] = [];

    const total = totalPageCount;
    const current = page;

    // CASE 1: total <= 7 → show all pages
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => PageButton(i + 1));
    }

    // CASE 2: current near beginning (1–4)
    if (current <= 4) {
      items.push(PageButton(1));
      items.push(PageButton(2));
      items.push(PageButton(3));
      items.push(PageButton(4));
      items.push(PageButton(5));
      items.push(
        <PaginationItem key="right-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
      items.push(PageButton(total));
      return items;
    }

    // CASE 3: current near end (last 3)
    if (current >= total - 2) {
      items.push(PageButton(1));
      items.push(
        <PaginationItem key="left-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
      items.push(PageButton(total - 4));
      items.push(PageButton(total - 3));
      items.push(PageButton(total - 2));
      items.push(PageButton(total - 1));
      items.push(PageButton(total));
      return items;
    }

    // CASE 4: middle
    items.push(PageButton(1));
    items.push(
      <PaginationItem key="left-ellipsis">
        <PaginationEllipsis />
      </PaginationItem>
    );
    items.push(PageButton(current - 1));
    items.push(PageButton(current));
    items.push(PageButton(current + 1));
    items.push(
      <PaginationItem key="right-ellipsis">
        <PaginationEllipsis />
      </PaginationItem>
    );
    items.push(PageButton(total));

    return items;
  };

  const isFirst = page === 1;
  const isLast = page === totalPageCount;

  return (
    <Pagination variant={variant}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={isFirst || isPending}
            tabIndex={isFirst ? -1 : undefined}
            className={cn(
              isFirst && "pointer-events-none opacity-50",
              isPending && "pointer-events-none opacity-50",
            )}
            onClick={() => !isFirst && goToPage(page - 1)}
          />
        </PaginationItem>
        {renderNumbers()}
        <PaginationItem>
          <PaginationNext
            aria-disabled={isLast || isPending}
            tabIndex={isLast ? -1 : undefined}
            className={cn(
              isLast && "pointer-events-none opacity-50",
              isPending && "pointer-events-none opacity-50",
            )}
            onClick={() => !isLast && goToPage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
