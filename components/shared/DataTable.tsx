"use client";

import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import SubmitButton from "@/components/shared/SubmitButton";

export interface DataTableProps<TData> {
  title: string;
  columns: ColumnDef<TData, any>[];
  data: TData[];
  searchPlaceholder?: string;
  searchable?: boolean;
  pageSize?: number;
  totalCount?: number;
  emptyMessage?: string;
  headerAction?: React.ReactNode;
  footerAction?: React.ReactNode;
  className?: string;
}

// ── Page number builder with ellipsis ─────────────────
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i);
  const pages: (number | "...")[] = [0];
  if (current > 2) pages.push("...");
  const start = Math.max(1, current - 1);
  const end = Math.min(total - 2, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 3) pages.push("...");
  pages.push(total - 1);
  return pages;
}

function DataTable<TData>({
  title,
  columns,
  data,
  searchPlaceholder = "Search...",
  searchable = true,
  pageSize = 5,
  totalCount,
  emptyMessage = "No data found.",
  headerAction,
  footerAction,
  className,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const filteredCount = table.getFilteredRowModel().rows.length;
  const displayTotal = totalCount ?? filteredCount;
  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const pageNumbers = useMemo(() => getPageNumbers(pageIndex, pageCount), [pageIndex, pageCount]);
  const visibleRows = table.getRowModel().rows;

  return (
    <Card className={`relative overflow-hidden p-0 rounded-xl shadow-sm ${className ?? ""}`}>
      {/* ── Card Header ─────────────────────────────── */}
      <div className="px-6 py-2 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-light-grey bg-background">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {headerAction}
        </div>

        {searchable && (
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-description pointer-events-none" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-3 bg-dark-grey text-xs text-foreground placeholder:text-description border border-light-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
          </div>
        )}
      </div>

      {/* ── Table ──────────────────────────────────── */}
      <div className="w-full overflow-x-auto border-b border-light-grey">
        <Table className="w-full min-w-170 border-collapse">
          <TableHeader className="p-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-light-grey bg-dark-grey hover:bg-dark-grey">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 px-6 text-[11px] font-bold text-description uppercase tracking-wide whitespace-nowrap"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {visibleRows.length > 0 ? (
              visibleRows.map((row, i) => (
                <TableRow
                  key={row.id}
                  className={`border-b border-light-grey transition-colors duration-150 hover:bg-inner-background ${
                    i % 2 === 0 ? "bg-background" : "bg-dark-grey/30"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-15 px-6 py-0 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-40 text-center text-sm text-description">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="w-8 h-8 text-light-grey" />
                    <p className="font-medium">{emptyMessage}</p>
                    {globalFilter && (
                      <button
                        onClick={() => setGlobalFilter("")}
                        className="text-xs text-primary underline underline-offset-2 hover:opacity-80 cursor-pointer"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Footer / Pagination ───────────────────── */}
      <div className="px-6 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xs text-description font-medium">
          Showing <span className="font-semibold text-foreground">{visibleRows.length}</span> of{" "}
          <span className="font-semibold text-foreground">{displayTotal}</span> entries
        </span>

        <div className="flex items-center gap-3">
          {footerAction}

          {pageCount > 1 && (
            <div className="flex items-center gap-1">
              {/* ← Prev */}
              <SubmitButton
                type="button"
                disabled={!table.getCanPreviousPage()}
                clickFn={() => table.previousPage()}
                className="w-8 h-8 p-0 flex items-center justify-center rounded-lg border border-light-grey bg-background text-description hover:bg-inner-background hover:text-foreground transition-colors shadow-none disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </SubmitButton>

              {/* Page numbers */}
              {pageNumbers.map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-8 h-8 flex items-center justify-center text-xs text-description select-none"
                  >
                    ···
                  </span>
                ) : (
                  <SubmitButton
                    key={page}
                    type="button"
                    clickFn={() => table.setPageIndex(page)}
                    className={`w-8 h-8 p-0 flex items-center justify-center rounded-lg text-xs font-semibold transition-all shadow-none cursor-pointer ${
                      page === pageIndex
                        ? "bg-primary text-white border border-primary hover:opacity-90"
                        : "bg-background text-foreground border border-light-grey hover:bg-inner-background"
                    }`}
                  >
                    {page + 1}
                  </SubmitButton>
                ),
              )}

              {/* → Next */}
              <SubmitButton
                type="button"
                disabled={!table.getCanNextPage()}
                clickFn={() => table.nextPage()}
                className="w-8 h-8 p-0 flex items-center justify-center rounded-lg border border-light-grey bg-background text-description hover:bg-inner-background hover:text-foreground transition-colors shadow-none disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </SubmitButton>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default DataTable;
