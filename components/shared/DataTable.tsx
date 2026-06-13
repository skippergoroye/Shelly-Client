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
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, RotateCcw } from "lucide-react";
import SubmitButton from "@/components/shared/SubmitButton";
import { FilterSheet } from "@/components/common/FilterSheet";
import { DateRange } from "@/components/common/DateFilter";
import { getPageNumbers } from "@/lib/utils";

const EMPTY_RANGE: DateRange = { startDate: null, endDate: null };

export type FilterFieldType = "text" | "select";

export interface FilterField {
  key: string;
  label: string;
  type: FilterFieldType;
  options?: { label: string; value: string }[];
  placeholder?: string;
}

export type FilterValues = Record<string, string>;

// ── Public props ───────────────────────────────────────
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
  filterFields?: FilterField[];
  hasDateFilter?: boolean;
  dateFilterLabel?: string;
  onApplyFilters?: (values: FilterValues, dateRange: DateRange) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}







// ── DataTable ──────────────────────────────────────────
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
  filterFields,
  hasDateFilter = false,
  dateFilterLabel = "Date Range",
  onApplyFilters,
  onRefresh,
  isRefreshing = false,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [appliedValues, setAppliedValues] = useState<FilterValues>({});
  const [dateRange, setDateRange] = useState<DateRange>(EMPTY_RANGE);
  const [appliedDateRange, setAppliedDateRange] = useState<DateRange>(EMPTY_RANGE);

  const handleApply = (values: FilterValues) => {
    setAppliedValues(values);
    setAppliedDateRange(dateRange);
    onApplyFilters?.(values, dateRange);
    setFilterOpen(false);
  };

  const handleReset = () => {
    setAppliedValues({});
    setDateRange(EMPTY_RANGE);
    setAppliedDateRange(EMPTY_RANGE);
    onApplyFilters?.({}, EMPTY_RANGE);
    setFilterOpen(false);
  };

  const hasFilters = (filterFields && filterFields.length > 0) || hasDateFilter;
  const activeFilterCount =
    Object.values(appliedValues).filter(Boolean).length +
    (appliedDateRange.startDate ? 1 : 0);

  const filteredData = useMemo(() => {
    let result = data;

    const hasActiveFieldFilters = Object.values(appliedValues).some(Boolean);
    if (hasActiveFieldFilters) {
      result = result.filter((row) => {
        const record = row as Record<string, unknown>;
        return Object.entries(appliedValues).every(([key, value]) => {
          if (!value) return true;
          const field = filterFields?.find((f) => f.key === key);
          const cell = String(record[key] ?? "").toLowerCase();
          return field?.type === "select"
            ? cell === value.toLowerCase()
            : cell.includes(value.toLowerCase());
        });
      });
    }

    if (appliedDateRange.startDate && appliedDateRange.endDate) {
      const start = new Date(appliedDateRange.startDate).getTime();
      const end = new Date(appliedDateRange.endDate).getTime();
      result = result.filter((row) => {
        const record = row as Record<string, unknown>;
        const dateValue = Object.values(record).find((v) => {
          if (typeof v !== "string") return false;
          const t = new Date(v).getTime();
          return !isNaN(t) && t >= start && t <= end;
        });
        return !!dateValue;
      });
    }

    return result;
  }, [data, appliedValues, appliedDateRange, filterFields]);

  const table = useReactTable({
    data: filteredData,
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
    <>
      <Card className={`relative overflow-hidden p-0 rounded-xl shadow-sm ${className ?? ""}`}>
        <div className="px-6 py-2 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-light-grey bg-background">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            {onRefresh && (
              <SubmitButton
                type="button"
                clickFn={onRefresh}
                className="p-0 h-auto bg-transparent border-0 shadow-none text-primary hover:opacity-70 hover:bg-transparent transition-opacity"
                aria-label="Reload data"
              >
                <RotateCcw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </SubmitButton>
            )}
            {headerAction}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {searchable && (
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.75 h-3.75 text-description pointer-events-none" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-dark-grey text-xs text-foreground placeholder:text-description border border-light-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                />
              </div>
            )}


            {hasFilters && (
              <SubmitButton
                type="button"
                clickFn={() => setFilterOpen(true)}
                className="relative h-9 px-3 flex items-center gap-1.5 rounded-lg border border-light-grey bg-dark-grey text-xs font-medium text-description hover:text-foreground hover:bg-inner-background transition-colors shadow-none shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </SubmitButton>
            )}
          </div>
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
                <SubmitButton
                  type="button"
                  disabled={!table.getCanPreviousPage()}
                  clickFn={() => table.previousPage()}
                  className="w-8 h-8 p-0 flex items-center justify-center rounded-lg border border-light-grey bg-background text-description hover:bg-inner-background hover:text-foreground transition-colors shadow-none disabled:opacity-35 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </SubmitButton>

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

      {/* ── Filter Sheet (outside Card to avoid overflow clipping) ── */}
      {hasFilters && (
        <FilterSheet
          open={filterOpen}
          onOpenChange={setFilterOpen}
          fields={filterFields ?? []}
          onApply={handleApply}
          onReset={handleReset}
          hasDateFilter={hasDateFilter}
          dateFilterLabel={dateFilterLabel}
          dateRange={dateRange}
          onDateChange={setDateRange}
          activeFilterCount={activeFilterCount}
        />
      )}
    </>
  );
}

export default DataTable;