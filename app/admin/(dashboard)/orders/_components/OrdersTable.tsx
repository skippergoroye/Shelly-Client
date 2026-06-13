"use client";
import { MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable, { FilterField, FilterValues } from "@/components/shared/DataTable";
import { DateRange } from "@/components/common/DateFilter";
import SubmitButton from "@/components/shared/SubmitButton";
import OrderStatusCell from "./OrderStatusCell";

// ── Types ──────────────────────────────────────────────
export interface Order {
  id: string;
  customerName: string;
  customerAvatar?: string;
  customerInit?: string;
  customerInitBg?: string;
  address: string;
  items: string;
  total: number;
  paymentStatus: "PAID" | "AWAITING" | "FAILED";
  orderStatus: "Processing" | "Pending" | "Shipped" | "Delivered";
}

// ── Sample data ────────────────────────────────────────
const INITIAL_ORDERS: Order[] = [
  {
    id: "#HR-9021",
    customerName: "Julian Draxler",
    customerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    customerInit: "JD",
    address: "Savile Row, London, UK",
    items: "1x Bespoke Oxford",
    total: 1250.0,
    paymentStatus: "PAID",
    orderStatus: "Processing",
  },
  {
    id: "#HR-9022",
    customerName: "Sarah Miller",
    customerInit: "SM",
    customerInitBg: "bg-pink-100 text-pink-600",
    address: "Fifth Ave, New York, NY",
    items: "2x Calfskin Derby",
    total: 2800.0,
    paymentStatus: "AWAITING",
    orderStatus: "Pending",
  },
  {
    id: "#HR-9023",
    customerName: "Robert Chen",
    customerAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    customerInit: "RC",
    address: "Nihonbashi, Tokyo, JP",
    items: "1x Suede Loafer",
    total: 950.0,
    paymentStatus: "PAID",
    orderStatus: "Shipped",
  },
  {
    id: "#HR-9024",
    customerName: "Elena Belova",
    customerInit: "EB",
    customerInitBg: "bg-blue-100 text-blue-600",
    address: "Rue Saint-Honoré, Paris",
    items: "1x Chelsea Boot",
    total: 1400.0,
    paymentStatus: "PAID",
    orderStatus: "Delivered",
  },
];

// ── Payment badge styles ───────────────────────────────
const PAYMENT_STYLES: Record<Order["paymentStatus"], string> = {
  PAID:    "bg-green-100 text-green-700",
  AWAITING: "bg-yellow-100 text-yellow-700",
  FAILED:  "bg-red-100 text-red-600",
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
      { label: "Paid",     value: "PAID"    },
      { label: "Awaiting", value: "AWAITING" },
      { label: "Failed",   value: "FAILED"  },
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
    accessorKey: "address",
    header: "Address",
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-500 font-medium">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-600 font-medium">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ getValue }) => (
      <span className="text-xs font-semibold text-gray-800">
        ${getValue<number>().toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </span>
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
    header: "",
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
interface OrdersTableProps {
  statusFilter?: Order["orderStatus"];
}

const OrdersTable = ({ statusFilter }: OrdersTableProps) => {
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
    />
  );
};

export default OrdersTable;
