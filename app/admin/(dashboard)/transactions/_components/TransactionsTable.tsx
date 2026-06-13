"use client";

import { useState } from "react";
import { CreditCard, Landmark, Zap, MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable, { FilterField, FilterValues } from "@/components/shared/DataTable";
import { DateRange } from "@/components/common/DateFilter";
import SubmitButton from "@/components/shared/SubmitButton";

// ── Types ──────────────────────────────────────────────
export interface Transaction {
  id: string;
  customerName: string;
  customerAvatar?: string;
  customerInit?: string;
  amount: number;
  date: string;
  methodType: "card" | "wire" | "stripe";
  methodLabel: string;
  status: "Paid" | "Pending" | "Failed" | "Refunded";
}

// ── Sample data ────────────────────────────────────────
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "#TRX-89021",
    customerName: "Julian Sterling",
    customerAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    amount: 2450.0,
    date: "Oct 24, 2024",
    methodType: "card",
    methodLabel: "Amex •••• 4002",
    status: "Paid",
  },
  {
    id: "#TRX-89018",
    customerName: "Elena Rossi",
    customerAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    amount: 1800.0,
    date: "Oct 23, 2024",
    methodType: "wire",
    methodLabel: "Wire Transfer",
    status: "Pending",
  },
  {
    id: "#TRX-88995",
    customerName: "Marcus Thorne",
    customerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    amount: 4200.0,
    date: "Oct 21, 2024",
    methodType: "stripe",
    methodLabel: "Stripe",
    status: "Failed",
  },
  {
    id: "#TRX-88942",
    customerName: "Sofia Vandenberg",
    customerAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120",
    amount: 1250.0,
    date: "Oct 20, 2024",
    methodType: "card",
    methodLabel: "Visa •••• 9912",
    status: "Paid",
  },
];

// ── Method icon map ────────────────────────────────────
const METHOD_ICON: Record<Transaction["methodType"], React.ReactNode> = {
  card:   <CreditCard className="w-3.5 h-3.5 text-gray-400 shrink-0" />,
  wire:   <Landmark className="w-3.5 h-3.5 text-gray-400 shrink-0" />,
  stripe: <Zap className="w-3.5 h-3.5 text-gray-400 shrink-0" />,
};

// ── Status styles ──────────────────────────────────────
const STATUS_STYLES: Record<Transaction["status"], string> = {
  Paid:     "bg-green-100 text-green-700",
  Pending:  "bg-yellow-100 text-yellow-700",
  Failed:   "bg-red-100 text-red-600",
  Refunded: "bg-gray-100 text-gray-600",
};

// ── Filter fields ──────────────────────────────────────
const FILTER_FIELDS: FilterField[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Paid",     value: "Paid"     },
      { label: "Pending",  value: "Pending"  },
      { label: "Failed",   value: "Failed"   },
      { label: "Refunded", value: "Refunded" },
    ],
  },
  {
    key: "methodType",
    label: "Payment Method",
    type: "select",
    options: [
      { label: "Card",          value: "card"   },
      { label: "Wire Transfer", value: "wire"   },
      { label: "Stripe",        value: "stripe" },
    ],
  },
  { key: "customerName", label: "Customer", type: "text", placeholder: "e.g. Julian" },
];

// ── Column definitions ─────────────────────────────────
const columns: ColumnDef<Transaction, any>[] = [
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
          {txn.customerAvatar ? (
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 shrink-0">
              <img
                src={txn.customerAvatar}
                alt={txn.customerName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200/50 shrink-0">
              {txn.customerInit}
            </div>
          )}
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
        ${getValue<number>().toLocaleString("en-US", { minimumFractionDigits: 2 })}
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
      const status = getValue<Transaction["status"]>();
      return (
        <span
          className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${STATUS_STYLES[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <SubmitButton
        type="button"
        className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-50 rounded cursor-pointer bg-transparent border-0 shadow-none h-auto"
      >
        <MoreVertical className="w-4 h-4" />
      </SubmitButton>
    ),
  },
];

// ── Component ──────────────────────────────────────────
const TransactionsTable = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleFilters = (values: FilterValues, dateRange: DateRange) => {
    console.log("Applied filters:", values, dateRange);
  };

  return (
    <DataTable<Transaction>
      title="Financial Ledger"
      columns={columns}
      data={INITIAL_TRANSACTIONS}
      searchPlaceholder="Search transactions..."
      pageSize={10}
      totalCount={2492}
      emptyMessage="No matching transactions found."
      hasDateFilter
      dateFilterLabel="Transaction Date"
      filterFields={FILTER_FIELDS}
      onApplyFilters={handleFilters}
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
    />
  );
};

export default TransactionsTable;
