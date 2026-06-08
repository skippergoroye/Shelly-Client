"use client";

import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  title: string;
  columns: ColumnDef<T, any>[];
  data: T[];
  searchPlaceholder?: string;
  pageSize?: number;
  totalCount?: number;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  searchFields?: (keyof T & string)[];
}

function DataTable<T>({
  title,
  columns,
  data,
  searchPlaceholder = "Search...",
  pageSize = 10,
  totalCount,
  loading,
  emptyMessage = "No data available.",
  className,
  searchFields,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter((row) => {
      if (searchFields) {
        return (searchFields as string[]).some((key) => {
          const val = (row as Record<string, unknown>)[key];
          return String(val ?? "").toLowerCase().includes(q);
        });
      }
      return Object.values(row as Record<string, unknown>).some((v) =>
        String(v ?? "").toLowerCase().includes(q),
      );
    });
  }, [data, searchQuery, searchFields]);

  const totalRows = totalCount ?? filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const safePage = Math.min(page, totalPages);
  const startRow = (safePage - 1) * pageSize + 1;
  const endRow = Math.min(safePage * pageSize, totalRows);
  const paginatedData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card
      className={cn(
        "overflow-hidden select-none",
        "[&:not(:has(.card-header))]:pt-0",
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[color:var(--outline-variant)] px-6 py-5">
        <h3 className="text-sm font-bold text-[color:var(--foreground)]">
          {title}
        </h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--on-surface-variant)]" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-3 py-1.5 bg-[color:var(--inner-background)] text-xs text-[color:var(--foreground)] placeholder:text-[color:var(--on-surface-variant)] border border-[color:var(--outline-variant)] rounded-lg focus:outline-none focus:border-[color:var(--primary)] transition-all font-medium"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="p-8 space-y-3">
          {Array.from({ length: pageSize }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-full rounded-md animate-pulse bg-[color:var(--surface-container)]"
            />
          ))}
        </div>
      ) : table.getRowModel().rows.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="py-4 px-6 text-[10px] font-bold text-[color:var(--on-surface-variant)] tracking-wider uppercase bg-[color:var(--dark-grey)]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-[color:var(--outline-variant)] last:border-none hover:bg-[color:var(--inner-background)] transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 px-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-xs font-semibold text-[color:var(--on-surface-variant)]">
            {emptyMessage}
          </p>
        </div>
      )}

      {/* Footer / Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[color:var(--outline-variant)] px-6 py-5 text-[10px] font-bold text-[color:var(--on-surface-variant)] tracking-wider uppercase bg-[color:var(--dark-grey)]/30">
        <span>
          Showing {totalRows > 0 ? `${startRow}–${endRow}` : "0"} of{" "}
          {totalRows} entries
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className="flex items-center justify-center w-7 h-7 border border-[color:var(--outline-variant)] bg-[color:var(--background)] hover:bg-[color:var(--inner-background)] rounded text-[color:var(--on-surface-variant)] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className="flex items-center justify-center w-7 h-7 border border-[color:var(--outline-variant)] bg-[color:var(--background)] hover:bg-[color:var(--inner-background)] rounded text-[color:var(--on-surface-variant)] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default DataTable;
