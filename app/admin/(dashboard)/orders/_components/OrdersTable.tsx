"use client";

import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import DataTable from "@/components/shared/DataTable";
import OrderStatusCell from "./OrderStatusCell";
import {
  useGetAdminOrdersQuery,
  AdminOrder,
  FulfillmentStatus,
} from "@/redux/features/admin/orders/adminOrderApi";

// ── Payment badge styles ──────────────────────────────
const PAYMENT_STYLES: Record<string, string> = {
  paid:     "bg-green-100 text-green-700",
  failed:   "bg-red-100 text-red-600",
  pending:  "bg-yellow-100 text-yellow-700",
};

// ── Display row shape ────────────────────────────────
interface OrderRow {
  _id: string;
  reference: string;
  customerName: string;
  customerInit: string;
  itemCount: string;
  total: number;
  paymentStatus: string;
  fulfillmentStatus: FulfillmentStatus;
}

function toRow(o: AdminOrder): OrderRow {
  const firstName = o.firstName ?? "";
  const lastName = o.lastName ?? "";
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";
  return {
    _id: o._id,
    reference: o.orderNumber ? `#${o.orderNumber}` : o.reference,
    customerName: `${firstName} ${lastName}`.trim() || "Unknown",
    customerInit: initials,
    itemCount: `${(o.items ?? []).reduce((s, i) => s + i.quantity, 0)} item(s)`,
    total: o.total ?? 0,
    paymentStatus: o.paymentStatus ?? "unknown",
    fulfillmentStatus: o.fulfillmentStatus ?? "pending",
  };
}

// ── Column definitions ────────────────────────────────
const columns: ColumnDef<OrderRow, any>[] = [
  {
    accessorKey: "reference",
    header: "Order Ref",
    cell: ({ getValue }) => (
      <span className="font-bold text-[#0066FF] text-xs">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border border-gray-200/50 shrink-0 bg-gray-100 text-gray-500">
          {row.original.customerInit}
        </div>
        <span className="font-bold text-xs text-gray-800">{row.original.customerName}</span>
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ getValue }) => (
      <span className="text-xs font-bold text-gray-800">
        ₦{getValue<number>().toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </span>
    ),
  },
  {
    accessorKey: "itemCount",
    header: "Items",
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-600 font-medium">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ getValue }) => {
      const status = getValue<string>();
      return (
        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${PAYMENT_STYLES[status] ?? "bg-gray-100 text-gray-500"}`}>
          {status.toUpperCase()}
        </span>
      );
    },
  },
  {
    accessorKey: "fulfillmentStatus",
    header: "Status",
    cell: ({ row }) => (
      <OrderStatusCell
        orderId={row.original._id}
        initialStatus={row.original.fulfillmentStatus}
      />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Link href={`/admin/orders/${row.original._id}`}>
        <span className="flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors p-1.5 hover:bg-blue-50 rounded cursor-pointer">
          <Eye className="w-4 h-4" />
        </span>
      </Link>
    ),
  },
];

// ── Component ─────────────────────────────────────────
interface OrdersTableProps {
  statusFilter?: string;
}

const OrdersTable = ({ statusFilter }: OrdersTableProps) => {
  const { data, isLoading, isFetching, refetch } = useGetAdminOrdersQuery({
    status: statusFilter ? statusFilter.toLowerCase() : "all",
    limit: 50,
  });

  const rows: OrderRow[] = (data?.orders ?? []).map(toRow);

  return (
    <DataTable<OrderRow>
      title="Order Management"
      columns={columns}
      data={rows}
      searchPlaceholder="Search orders..."
      pageSize={10}
      totalCount={data?.total ?? rows.length}
      emptyMessage={isLoading ? "Loading orders…" : "No matching orders found."}
      onRefresh={refetch}
      isRefreshing={isFetching}
    />
  );
};

export default OrdersTable;
