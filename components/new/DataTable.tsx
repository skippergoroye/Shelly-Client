"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import TextInput from "./TextInput";
import Pagination from "./Pagination";
import FilterSidebar from "./FilterSidebar";
import Icon from "@/public/icons";

import EmptyState from "./EmptyState";
import DateFilter, { DateRange } from "./DateFilter";
import { usePathname } from "next/navigation";
import {
  exportAllData,
  exportCurrentPageData,
  formatAmount,
} from "@/app/lib/utils";
import ExportDropdown, { ExportFormat } from "./ExportDropdown";

export interface ColumnDef<T> {
  key: keyof T & string;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface SearchField {
  key: string;
  label: string;
  placeholder?: string;
}

export interface DataTableProps<T> {
  title: string;
  description: string;
  columns: ColumnDef<T>[];
  data: T[];
  searchFields: SearchField[];
  rowsPerPageOptions?: number[];
  totalCount?: number;
  page: number;
  rowsPerPage: number;
  exportEndpoint: string;
  dateField?: string;
  dateFilterLabel?: string;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (size: number) => void;
  onDateChange?: (dateRange: DateRange) => void;
  exportFilterMap?: Record<string, string>;
  onApplyFilters: (
    filters: Record<string, string>,
    dateRange: DateRange,
  ) => void;
  actionRenderer?: (row: T) => React.ReactNode;
  rawData?: { [key: string]: any }[];
  hasDateFilter?: boolean;
}

interface TableState {
  dateRange: DateRange;
  appliedFilters: Record<string, string>;
  globalSearch: string;
}

function DataTable<T>({
  title,
  description,
  columns,
  data,
  searchFields,
  rowsPerPageOptions = [10, 20, 50],
  totalCount: controlledTotal,
  page: controlledPage,
  rowsPerPage: controlledRowsPerPage,
  exportEndpoint,
  dateField,
  dateFilterLabel,
  exportFilterMap,
  onPageChange,
  onRowsPerPageChange,
  onDateChange,
  onApplyFilters,
  actionRenderer,
  rawData,
  hasDateFilter = true,
}: DataTableProps<T>) {
  const pathname = usePathname();
  const currentPathname = pathname.split("/").slice(-1)[0];

  const [state, setState] = useState<TableState>({
    dateRange: { startDate: null, endDate: null },
    appliedFilters: {},
    globalSearch: "",
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const [exportPageOpen, setExportPageOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const exportPageRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!exportPageOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        exportPageRef.current &&
        !exportPageRef.current.contains(e.target as Node)
      ) {
        setExportPageOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [exportPageOpen]);

  useEffect(() => {
    if (!exportModalOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [exportModalOpen]);

  const handleExportPage = (format: ExportFormat) => {
    exportCurrentPageData(
      (rawData ?? initialTableData) as { [key: string]: any }[],
      pathname.split("/").slice(-1)[0],
      format,
    );
    setExportPageOpen(false);
  };

  const handleExportAll = async (format: ExportFormat) => {
    const filters = exportFilterMap
      ? Object.fromEntries(
          Object.entries(state.appliedFilters).map(([k, v]) => [
            exportFilterMap[k] ?? k,
            v,
          ]),
        )
      : state.appliedFilters;
    await exportAllData(
      currentPathname,
      exportEndpoint,
      format,
      state.dateRange,
      dateField,
      filters,
    );
    setExportModalOpen(false);
  };

  const formik = useFormik<Record<string, string>>({
    initialValues: searchFields.reduce<Record<string, string>>(
      (acc, f) => ({ ...acc, [f.key]: "" }),
      {},
    ),
    onSubmit: (values) => {
      setState((prev) => ({
        ...prev,
        appliedFilters: values,
      }));
      onApplyFilters?.(formik.values, state.dateRange);
      setFilterOpen(false);
    },
  });

  const FilterOrExportButton = ({
    icon,
    label,
    onClick,
  }: {
    icon: string;
    label: string;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 h-10 px-4 rounded-sm border border-plain-button text-sm font-medium hover:bg-inner-background transition-colors cursor-pointer"
    >
      <Icon name={icon} />
      {label}
    </button>
  );

  const handleRefresh = () => {
    formik.resetForm();
    setState({
      dateRange: { startDate: null, endDate: null },
      appliedFilters: {},
      globalSearch: "",
    });
    onDateChange?.({ startDate: null, endDate: null });
    onApplyFilters({}, { startDate: null, endDate: null });
    onPageChange?.(1);
  };

  const filtered = useMemo(() => {
    if (!state.globalSearch) return data;
    const q = state.globalSearch.toLowerCase();
    return data.filter((row) => {
      const record = row as Record<string, unknown>;
      return Object.values(record).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(q),
      );
    });
  }, [data, state.globalSearch]);

  const totalCount = controlledTotal ?? filtered.length;
  const page = controlledPage ?? 1;
  const rowsPerPage = controlledRowsPerPage ?? rowsPerPageOptions[0];
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const initialTableData = filtered;

  const appliedFilterCount =
    Object.values(state.appliedFilters).filter(Boolean).length +
    (state.dateRange.startDate ? 1 : 0);
  const filterCount = appliedFilterCount >= 1 ? `(${appliedFilterCount})` : "";

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-background border border-light-grey">
        <div className="border-b border-light-grey px-6 py-5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">{title}</h2>
            <Icon
              name="refresh"
              className="cursor-pointer"
              onClick={handleRefresh}
              tooltip="Refresh"
              animateOnClick
            />
          </div>
          <p className="text-sm text-description mt-1">{description}</p>
        </div>

        <div className="flex justify-between items-center gap-3 px-6 py-4">
          <div className="relative">
            <Icon name="search" className="absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search"
              value={state.globalSearch}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  globalSearch: e.target.value,
                }))
              }
              className="pl-9 h-10 rounded-sm border border-light-grey placeholder:text-[#848F9F] bg-inner-background text-sm w-64 focus:outline-none focus:ring focus:ring-primary/40"
            />
          </div>

          <div className="flex items-center gap-3">
            <div ref={exportPageRef} className="relative">
              <FilterOrExportButton
                icon="export"
                label="Export Page Data"
                onClick={() => setExportPageOpen((prev) => !prev)}
              />
              <ExportDropdown
                isOpen={exportPageOpen}
                onClose={() => setExportPageOpen(false)}
                onExport={handleExportPage}
              />
            </div>

            <div ref={exportRef} className="relative">
              <FilterOrExportButton
                icon="export"
                label="Export All Data"
                onClick={() => setExportModalOpen((prev) => !prev)}
              />
              <ExportDropdown
                isOpen={exportModalOpen}
                onClose={() => setExportModalOpen(false)}
                onExport={handleExportAll}
              />
            </div>

            <FilterOrExportButton
              icon="filter"
              label={`Filters ${filterCount}`}
              onClick={() => setFilterOpen(true)}
            />
          </div>
        </div>

        {initialTableData.length === 0 ? (
          <div className="flex justify-center items-center py-16 border-y border-light-grey">
            <EmptyState
              title="No result was found"
              description="Review the query entered to be sure it was correct"
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-dark-grey border-y border-light-grey">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-6 py-3.5 text-left font-semibold whitespace-nowrap select-none"
                    >
                      {col.label}
                    </th>
                  ))}
                  {actionRenderer && (
                    <th className="px-6 py-3.5 text-left font-semibold whitespace-nowrap select-none">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {initialTableData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-light-grey last:border-b-0 hover:bg-inner-background transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                        {col.render
                          ? col.render(row[col.key], row)
                          : col.key === "amount"
                            ? formatAmount(
                                row[col.key] as string | number | null,
                              )
                            : row[col.key] == null
                              ? "--"
                              : String(row[col.key])}
                      </td>
                    ))}
                    {actionRenderer && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {actionRenderer(row)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination
          totalCount={totalCount}
          page={safePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={(p) => onPageChange?.(p)}
          onRowsPerPageChange={(r) => onRowsPerPageChange?.(r)}
        />
      </div>

      <FilterSidebar
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onCancel={() => setFilterOpen(false)}
        onApply={formik.handleSubmit}
      >
        {hasDateFilter && (
          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-sm font-medium">{dateFilterLabel}</label>
            <DateFilter
              value={state.dateRange}
              onFilterChange={(range) => {
                setState((prev) => ({ ...prev, dateRange: range }));
                onDateChange?.(range);
              }}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          {searchFields.map((field) => (
            <TextInput
              key={field.key}
              label={field.label}
              name={field.key}
              placeholder={field.placeholder ?? `Search ${field.label}`}
              formik={formik}
              hasClear
            />
          ))}
        </div>
      </FilterSidebar>
    </div>
  );
}

export default DataTable;
