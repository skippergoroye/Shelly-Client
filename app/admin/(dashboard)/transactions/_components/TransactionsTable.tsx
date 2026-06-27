"use client";

import { CreditCard, Landmark, Zap, Eye } from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import DataTable, { FilterField, FilterValues } from "@/components/shared/DataTable";
import { DateRange } from "@/components/common/DateFilter";
import { TransactionRow, MethodType, TxnStatus, useTransactions } from "../_hooks/useTransactions";

// ── Method icon map ────────────────────────────────────
const METHOD_ICON: Record<MethodType, React.ReactNode> = {
  card:   <CreditCard className="w-3.5 h-3.5 text-gray-400 shrink-0" />,
  wire:   <Landmark className="w-3.5 h-3.5 text-gray-400 shrink-0" />,
  stripe: <Zap className="w-3.5 h-3.5 text-gray-400 shrink-0" />,
};

// ── Status styles ──────────────────────────────────────
const STATUS_STYLES: Record<TxnStatus, string> = {
  Paid:    "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed:  "bg-red-100 text-red-600",
};

// ── Filter fields ──────────────────────────────────────
const FILTER_FIELDS: FilterField[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Paid",    value: "paid"    },
      { label: "Pending", value: "pending" },
      { label: "Failed",  value: "failed"  },
    ],
  },
  { key: "search", label: "Transaction ID", type: "text", placeholder: "e.g. TRX-89021" },
];

// ── Column definitions ─────────────────────────────────
const columns: ColumnDef<TransactionRow, any>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ getValue }) => (
      <span className="font-bold text-[#0066FF] text-xs">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      const txn = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200/50 shrink-0">
            {txn.customerInit}
          </div>
          <span className="font-bold text-xs text-gray-800">{txn.customerName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => (
      <span className="text-xs font-semibold text-gray-800">
        ₦{getValue<number>().toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-500 font-medium">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "methodLabel",
    header: "Method",
    cell: ({ row }) => {
      const { methodType, methodLabel } = row.original;
      return (
        <div className="flex items-center gap-1.5">
          {METHOD_ICON[methodType]}
          <span className="text-xs text-gray-500 font-medium">{methodLabel}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<TxnStatus>();
      return (
        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${STATUS_STYLES[status]}`}>
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Link href={`/admin/transactions/${row.original._id}`}>
        <span className="flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors p-1.5 hover:bg-blue-50 rounded cursor-pointer">
          <Eye className="w-4 h-4" />
        </span>
      </Link>
    ),
  },
];

// ── Component ──────────────────────────────────────────
const TransactionsTable = () => {
  const { rows, total, isFetching, refetch, applyFilters } = useTransactions();

  const handleFilters = (values: FilterValues, dateRange: DateRange) => {
    applyFilters(
      String(values.status ?? ""),
      String(values.search ?? ""),
      dateRange.startDate ?? "",
    );
  };

  return (
    <DataTable<TransactionRow>
      title="Financial Ledger"
      columns={columns}
      data={rows}
      searchPlaceholder="Search by transaction ID…"
      pageSize={10}
      totalCount={total}
      emptyMessage={isFetching ? "Loading transactions…" : "No matching transactions found."}
      hasDateFilter
      dateFilterLabel="Transaction Date"
      filterFields={FILTER_FIELDS}
      onApplyFilters={handleFilters}
      onRefresh={refetch}
      isRefreshing={isFetching}
    />
  );
};

export default TransactionsTable;
