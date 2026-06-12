"use client";

import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable, { FilterField, FilterValues } from "@/components/shared/DataTable";
import { DateRange } from "@/components/common/DateFilter";
import SubmitButton from "@/components/shared/SubmitButton";
import { STATUS_STYLES } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────
export interface Order {
  id: string;
  customerInit?: string;
  customerName: string;
  customerAvatar?: string;
  address: string;
  status: "Shipped" | "Processing" | "Pending";
  date: string;
}

// ── Sample data ────────────────────────────────────────
const INITIAL_ORDERS: Order[] = [
  {
    id: "#HR-8821",
    customerInit: "JW",
    customerName: "Julian Wyvern",
    address: "22 Baker St, London",
    status: "Shipped",
    date: "Oct 24, 2024",
  },
  {
    id: "#HR-8822",
    customerInit: "EM",
    customerName: "Elena Moretti",
    address: "Via del Corso, Rome",
    status: "Processing",
    date: "Oct 25, 2024",
  },
  {
    id: "#HR-8823",
    customerName: "Marcus Chen",
    customerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    address: "15 Orchard Rd, SG",
    status: "Pending",
    date: "Oct 25, 2024",
  },
  {
    id: "#HR-8824",
    customerInit: "SR",
    customerName: "Sofia Rossi",
    address: "5th Ave, New York",
    status: "Shipped",
    date: "Oct 26, 2024",
  },
];



// ── Filter fields ─────────────────────────────────────
const FILTER_FIELDS: FilterField[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Shipped", value: "Shipped" },
      { label: "Processing", value: "Processing" },
      { label: "Pending", value: "Pending" },
    ],
  },
  { key: "customerName", label: "Customer", type: "text", placeholder: "e.g. Julian" },
  { key: "address", label: "Address", type: "text", placeholder: "e.g. Baker St" },
];

// ── Column definitions ────────────────────────────────
const columns: ColumnDef<Order, any>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <Link
        href={`/admin/orders/${row.original.id.replace("#", "")}`}
        className="font-bold text-[#0066FF] text-xs hover:underline"
      >
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex items-center gap-3">
          {order.customerAvatar ? (
            <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-100 shrink-0">
              <img
                src={order.customerAvatar}
                alt={order.customerName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200/50 shrink-0">
              {order.customerInit}
            </div>
          )}
          <span className="font-bold text-xs text-gray-800">
            {order.customerName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-400 font-medium">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<Order["status"]>();
      return (
        <span
          className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold tracking-wide ${STATUS_STYLES[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-400 font-medium">
        {getValue<string>()}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <div className="">
        <SubmitButton
          type="button"
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-50 rounded cursor-pointer bg-transparent border-0 shadow-none h-auto"
        >
          <MoreVertical className="w-4 h-4" />
        </SubmitButton>
      </div>
    ),
  },
];

// ── Component ──────────────────────────────────────────
export function RecentTransactions() {
  const handleFilters = (values: FilterValues, dateRange: DateRange) => {
    console.log("Applied filters:", values, dateRange);
  };

  return (
    <DataTable<Order>
      title="Recent Orders"
      columns={columns}
      data={INITIAL_ORDERS}
      searchPlaceholder="Search orders..."
      pageSize={2}
      totalCount={1284}
      emptyMessage="No matching orders found."
      hasDateFilter
      dateFilterLabel="Order Date"
      filterFields={FILTER_FIELDS}
      onApplyFilters={handleFilters}
    />
  );
}
