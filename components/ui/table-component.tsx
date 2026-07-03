import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import TableEmptyState from "@/assets/icons/TableEmptyState";

export type Header<T> = {
  label: string;
  headerRender?: React.ReactNode;
  render: (row: T) => React.ReactNode;
  align?: ColumnAlign;
  skeletonWidth?: string;
  width?: string;
  sticky?: boolean;
  stickyShadow?: boolean;
};

type TableComponentProps<T> = {
  headers: Header<T>[];
  data: T[];
  emptyText?: string | React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  className?: string;
  minRowCount?: number;
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    onPageChange: (newOffset: number) => void;
    variant?: "default" | "custom";
  };
  compactEmptyState?: boolean;
};

export type ColumnAlign = "left" | "center" | "right";

const alignClassMap: Record<ColumnAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function TableComponent<T>({
  headers,
  data,
  emptyText = "No Records Found",
  footer,
  loading,
  className,
  pagination,
  minRowCount = 10,
  compactEmptyState,
}: TableComponentProps<T>) {
  const { total = 0, limit = 10 } = pagination || {};
  const pageSize = limit;
  const totalPages = pagination ? Math.ceil(total / limit) : 0;
  const isSinglePage = totalPages <= 1;

  const stickyPositions = React.useMemo(() => {
    let currentLeft = 0;
    return headers.map((h) => {
      if (!h.sticky) return 0;
      const leftVal = currentLeft;
      const w = h.width ? parseFloat(h.width) : 150;
      currentLeft += w;
      return leftVal;
    });
  }, [headers]);

  const paginationHeight = pagination?.variant === "custom" ? "3.5rem" : "0rem";
  const minTableHeight = `calc(2.8175rem + 1rem + ${minRowCount * 3.5}rem + ${paginationHeight})`;

  const renderPagination = () => {
    if (!pagination) return null;

    const {
      total,
      limit,
      offset,
      onPageChange,
      variant = "default",
    } = pagination;
    if (total === 0) return null;
    const totalPages = Math.ceil(total / limit);
    if (totalPages <= 1) return null;
    const currentPage = Math.floor(offset / limit) + 1;

    const handlePageChange = (newOffset: number) => {
      if (newOffset >= 0 && newOffset < total) {
        onPageChange(newOffset);
      }
    };

    const renderPageNumbers = () => {
      const pages = [];
      const showEllipsis = totalPages > 7;

      if (!showEllipsis) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 4) {
          pages.push(1, 2, 3, 4, 5, "ellipsis", totalPages);
        } else if (currentPage >= totalPages - 3) {
          pages.push(
            1,
            "ellipsis",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
          );
        } else {
          pages.push(
            1,
            "ellipsis",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "ellipsis",
            totalPages,
          );
        }
      }

      return pages.map((page, index) => (
        <PaginationItem key={index}>
          {page === "ellipsis" ? (
            <PaginationEllipsis />
          ) : (
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => handlePageChange(((page as number) - 1) * limit)}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          )}
        </PaginationItem>
      ));
    };

    const start = offset + 1;
    const end = Math.min(offset + limit, total);

    if (variant === "custom") {
      return (
        <div className="border-t border-divider-main flex items-center justify-between">
          <div className="text-xs">
            Showing{" "}
            <span className="font-bold">
              {start} - {end}
            </span>{" "}
            of <span className="font-bold">{total}</span> results
          </div>
          <Pagination variant="custom" className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(offset - limit)}
                  className={
                    offset === 0
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {renderPageNumbers()}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(offset + limit)}
                  className={
                    offset + limit >= total
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      );
    }

    return (
      <div className="py-4 px-6 border-t border-divider-main bg-white flex items-center justify-center">
        <Pagination variant="default">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(offset - limit)}
                className={
                  offset === 0
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {renderPageNumbers()}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(offset + limit)}
                className={
                  offset + limit >= total
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "font-roboto border border-divider-main rounded-xl bg-white flex flex-col overflow-hidden",
        className,
      )}
      style={
        !isSinglePage
          ? { minHeight: minTableHeight, maxWidth: "100%" }
          : { height: "auto", maxWidth: "100%" }
      }
    >
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <Table className="min-w-full table-auto border-separate border-spacing-0">
          <TableHeader className="bg-container-main sticky top-0 z-20">
            <TableRow className="border-b border-divider-main h-11.25">
              {headers.map((h, index) => {
                const align = h.align ?? (index === 0 ? "left" : "center");
                return (
                  <TableHead
                    key={index}
                    style={{
                      width: h.width,
                      minWidth: h.sticky
                        ? h.width
                        : h.width || `max(${h.label.length + 4}ch, 10px)`,
                      maxWidth: h.sticky ? h.width : undefined,
                      left: h.sticky
                        ? `${stickyPositions[index]}px`
                        : undefined,
                    }}
                    className={cn(
                      "font-bold text-[12px] py-0 px-3 align-middle whitespace-nowrap border-b border-divider-main",
                      alignClassMap[align],
                      index === headers.length - 1 && "text-center",
                      h.sticky && "sticky z-30 bg-container-main",
                    )}
                  >
                    {h.headerRender ? h.headerRender : h.label}
                    {h.sticky && h.stickyShadow && (
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: 0,
                          boxShadow: "0 0 12px 2px rgba(133, 134, 153, 0.22)",
                          clipPath: "inset(0px -30px 0px 0px)",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {loading ? (
              Array.from({ length: minRowCount }).map((_, rowIndex) => (
                <TableRow
                  key={`skeleton-${rowIndex}`}
                  className="text-xs h-14 border-divider-main group"
                >
                  {headers.map((h, colIndex) => {
                    const isLastColumn = colIndex === headers.length - 1;
                    const align =
                      h.align ?? (colIndex === 0 ? "left" : "center");
                    return (
                      <TableCell
                        key={`skeleton-cell-${colIndex}`}
                        style={{
                          width: h.width,
                          minWidth: h.sticky
                            ? h.width
                            : h.width || `max(${h.label.length + 4}ch, 10px)`,
                          maxWidth: h.sticky ? h.width : undefined,
                          left: h.sticky
                            ? `${stickyPositions[colIndex]}px`
                            : undefined,
                        }}
                        className={cn(
                          "py-0 px-3 align-middle whitespace-nowrap border-b border-divider-main",
                          alignClassMap[align],
                          isLastColumn && "text-center",
                          h.sticky && "sticky z-10 bg-white",
                        )}
                      >
                        <Skeleton
                          className={cn(
                            "h-4 rounded",
                            align === "center" && "mx-auto",
                            align === "right" && "ml-auto",
                          )}
                          style={{
                            width: h.skeletonWidth || "100%",
                          }}
                        />
                        {h.sticky && h.stickyShadow && (
                          <div
                            style={{
                              position: "absolute",
                              right: 0,
                              top: 0,
                              bottom: 0,
                              width: 0,
                              boxShadow:
                                "0 0 12px 2px rgba(133, 134, 153, 0.22)",
                              clipPath: "inset(0px -30px 0px 0px)",
                              pointerEvents: "none",
                            }}
                          />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : !Array.isArray(data) || data.length === 0 ? (
              <TableRow className="border-none">
                <TableCell
                  colSpan={headers.length}
                  className={cn("bg-white", compactEmptyState ? "py-6" : "p-0")}
                  style={
                    !compactEmptyState
                      ? { height: `${minRowCount * 3.5}rem` }
                      : {}
                  }
                >
                  <div className="w-full flex flex-col justify-center items-center">
                    <TableEmptyState
                      className={cn(compactEmptyState && "h-36 w-36")}
                    />
                    <p>No records available to show</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="text-xs h-14 border-divider-main hover:bg-container-main/30 group"
                  >
                    {headers.map((h, colIndex) => {
                      const align =
                        h.align ?? (colIndex === 0 ? "left" : "center");
                      return (
                        <TableCell
                          key={colIndex}
                          style={{
                            width: h.width,
                            minWidth: h.sticky
                              ? h.width
                              : h.width || `max(${h.label.length + 4}ch, 10px)`,
                            maxWidth: h.sticky ? h.width : undefined,
                            left: h.sticky
                              ? `${stickyPositions[colIndex]}px`
                              : undefined,
                          }}
                          className={cn(
                            "py-0 px-3 align-middle whitespace-nowrap border-b border-divider-main",
                            alignClassMap[align],
                            colIndex === headers.length - 1 && "text-center",
                            h.sticky && "sticky z-10 bg-white",
                          )}
                        >
                          {h.render(row)}
                          {h.sticky && h.stickyShadow && (
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: 0,
                                boxShadow:
                                  "0 0 12px 2px rgba(133, 134, 153, 0.22)",
                                clipPath: "inset(0px -30px 0px 0px)",
                                pointerEvents: "none",
                              }}
                            />
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
                {/* Pad rows for absolute vertical stability */}
                {!isSinglePage &&
                  data.length < pageSize &&
                  Array.from({ length: pageSize - data.length }).map((_, i) => (
                    <TableRow
                      key={`pad-${i}`}
                      className="border-none h-14 hover:bg-white"
                    >
                      <TableCell colSpan={headers.length} />
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>

          {footer && (
            <TableFooter className="bg-container-main">{footer}</TableFooter>
          )}
        </Table>
      </div>

      {!loading && pagination && !isSinglePage && (
        <>
          {pagination.variant === "custom" ? (
            <div className="bg-container-main h-14 flex items-center px-6">
              <div className="w-full">{renderPagination()}</div>
            </div>
          ) : (
            renderPagination()
          )}
        </>
      )}
    </div>
  );
}

export { TableComponent };
