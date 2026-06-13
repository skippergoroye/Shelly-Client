"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import DataTable, { FilterField, FilterValues } from "@/components/shared/DataTable";
import { DateRange } from "@/components/common/DateFilter";
import OrderStatusCell from "./OrderStatusCell";
import { Order, INITIAL_ORDERS } from "../_data/orders";

// ── Payment badge styles ───────────────────────────────
const PAYMENT_STYLES: Record<Order["paymentStatus"], string> = {
  PAID:     "bg-green-100 text-green-700",
  AWAITING: "bg-yellow-100 text-yellow-700",
  FAILED:   "bg-red-100 text-red-600",
};

// ── Filter fields ──────────────────────────────────────
const FILTER_FIELDS: FilterField[] = [
  {
    key: "orderStatus",
    label: "Order Status",
    type: "select",
    options: [
      { label: "Processing", value: "Processing" },
      { label: "Pending",    value: "Pending"    },
      { label: "Shipped",    value: "Shipped"    },
      { label: "Delivered",  value: "Delivered"  },
    ],
  },
  {
    key: "paymentStatus",
    label: "Payment",
    type: "select",
    options: [
      { label: "Paid",     value: "PAID"     },
      { label: "Awaiting", value: "AWAITING" },
      { label: "Failed",   value: "FAILED"   },
    ],
  },
  { key: "customerName", label: "Customer", type: "text", placeholder: "e.g. Julian" },
];

// ── Column definitions ─────────────────────────────────
const columns: ColumnDef<Order, any>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ getValue }) => (
      <span className="font-bold text-[#0066FF] text-xs">{getValue<string>()}</span>
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
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 shrink-0">
              <img
                src={order.customerAvatar}
                alt={order.customerName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border border-gray-200/50 shrink-0 ${order.customerInitBg ?? "bg-gray-100 text-gray-500"}`}>
              {order.customerInit}
            </div>
          )}
          <span className="font-bold text-xs text-gray-800">{order.customerName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "streetAddress",
    header: "Address",
    cell: ({ row }) => {
      const { streetAddress, city, state } = row.original;
      return (
        <span className="text-xs text-gray-500 font-medium">{`${streetAddress}, ${city}`}</span>
      );
    },
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-600 font-medium">{getValue<string>()}</span>
    ),
  },
 
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ getValue }) => {
      const status = getValue<Order["paymentStatus"]>();
      return (
        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${PAYMENT_STYLES[status]}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
    cell: ({ getValue }) => (
      <OrderStatusCell initialStatus={getValue<Order["orderStatus"]>()} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Link href={`/admin/orders/${row.original.uid}`}>
        <span className="flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors p-1.5 hover:bg-blue-50 rounded cursor-pointer">
          <Eye className="w-4 h-4" />
        </span>
      </Link>
    ),
  },
];

// ── Component ──────────────────────────────────────────
interface OrdersTableProps {
  statusFilter?: Order["orderStatus"];
}

const OrdersTable = ({ statusFilter }: OrdersTableProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleFilters = (values: FilterValues, dateRange: DateRange) => {
    console.log("Applied filters:", values, dateRange);
  };

  const data = statusFilter
    ? INITIAL_ORDERS.filter((o) => o.orderStatus === statusFilter)
    : INITIAL_ORDERS;

  return (
    <DataTable<Order>
      title="Order Management"
      columns={columns}
      data={data}
      searchPlaceholder="Search orders..."
      pageSize={10}
      totalCount={data.length}
      emptyMessage="No matching orders found."
      hasDateFilter
      dateFilterLabel="Order Date"
      filterFields={FILTER_FIELDS}
      onApplyFilters={handleFilters}
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
    />
  );
};

export default OrdersTable;
