'use client';

import Link from 'next/link';
import { Eye } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/shared/DataTable';
import { STATUS_STYLES } from '@/lib/utils';
import { useGetDashboardOrdersQuery } from '@/redux/features/admin/dashboard/adminDashboardApi';
import { AdminOrder } from '@/redux/features/admin/orders/adminOrderApi';

// ── Display row ────────────────────────────────────────
interface OrderRow {
  _id: string;
  ref: string;
  customerName: string;
  customerInit: string;
  fulfillmentStatus: string;
  date: string;
}

function toRow(o: AdminOrder): OrderRow {
  const firstName = o.firstName ?? '';
  const lastName = o.lastName ?? '';
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase() || '?';
  return {
    _id: o._id,
    ref: o.orderNumber ? `#${o.orderNumber}` : o.reference,
    customerName: `${firstName} ${lastName}`.trim() || 'Unknown',
    customerInit: initials,
    fulfillmentStatus: o.fulfillmentStatus ?? 'pending',
    date: new Date(o.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}

// ── Status map ─────────────────────────────────────────
const STATUS_MAP: Record<string, string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
};

// ── Column definitions ────────────────────────────────
const columns: ColumnDef<OrderRow, unknown>[] = [
  {
    accessorKey: 'ref',
    header: 'Order ID',
    cell: ({ row }) => (
      <Link
        href={`/admin/orders/${row.original._id}`}
        className="font-bold text-[#0066FF] text-xs hover:underline"
      >
        {row.original.ref}
      </Link>
    ),
  },
  {
    accessorKey: 'customerName',
    header: 'Customer',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200/50 shrink-0">
          {row.original.customerInit}
        </div>
        <span className="font-bold text-xs text-gray-800">{row.original.customerName}</span>
      </div>
    ),
  },
  {
    accessorKey: 'fulfillmentStatus',
    header: 'Status',
    cell: ({ getValue }) => {
      const raw = getValue<string>();
      const label = STATUS_MAP[raw] ?? raw;
      return (
        <span
          className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold tracking-wide ${STATUS_STYLES[label as keyof typeof STATUS_STYLES] ?? 'bg-gray-100 text-gray-500'}`}
        >
          {label}
        </span>
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-400 font-medium">{getValue<string>()}</span>
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <Link href={`/admin/orders/${row.original._id}`}>
        <span className="flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors p-1.5 hover:bg-blue-50 rounded cursor-pointer">
          <Eye className="w-4 h-4" />
        </span>
      </Link>
    ),
  },
];

// ── Component ──────────────────────────────────────────
export function RecentTransactions() {
  const { data, isFetching, refetch } = useGetDashboardOrdersQuery({ limit: 10 });
  const rows = (data?.orders ?? []).map(toRow);

  return (
    <DataTable<OrderRow>
      title="Recent Orders"
      columns={columns}
      data={rows}
      searchPlaceholder="Search orders..."
      pageSize={10}
      totalCount={data?.total ?? 0}
      emptyMessage={isFetching ? 'Loading orders…' : 'No orders found.'}
      onRefresh={refetch}
      isRefreshing={isFetching}
    />
  );
}
