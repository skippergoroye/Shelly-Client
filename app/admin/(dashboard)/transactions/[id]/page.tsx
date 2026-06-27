"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAdminTransactionByIdQuery } from "@/redux/features/admin/transactions/adminTransactionApi";
import RouteLoadingScreen from "@/components/shared/RouteLoadingScreen";
import OrderOverView from "../../orders/_components/OrderOverView";

const STATUS_STYLES: Record<string, string> = {
  paid:    "bg-green-100 text-green-700",
  failed:  "bg-red-100 text-red-600",
  pending: "bg-yellow-100 text-yellow-700",
};

const fmt = (n: number) =>
  `₦${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function TransactionDetailPage() {
  const { id } = useParams() as { id: string };
  const { data: txn, isLoading, isError } = useGetAdminTransactionByIdQuery(id);

  if (isLoading) return <RouteLoadingScreen />;

  if (isError || !txn) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-description">Transaction not found.</p>
        <Link href="/admin/transactions" className="text-primary text-sm font-medium hover:underline">
          Back to Transactions
        </Link>
      </div>
    );
  }

  const paidAt = txn.paidAt
    ? new Date(txn.paidAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "—";

  return (
    <div className="w-full mx-auto font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-light-grey">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-description uppercase mb-1">
            <Link href="/admin/transactions" className="hover:text-foreground transition-colors">
              Transactions
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">#{txn.transactionId}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Transaction Overview</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className={cn("inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide", STATUS_STYLES[txn.status])}>
              {capitalize(txn.status)}
            </span>
          </div>
        </div>
      </div>

      {/* Overview sections */}
      <div className="rounded-lg bg-background border border-light-grey divide-y divide-light-grey">
        <OrderOverView
          title="Transaction Details"
          copyText={[
            `Transaction ID: #${txn.transactionId}`,
            `Amount: ${fmt(txn.amount)}`,
            `Status: ${capitalize(txn.status)}`,
            `Date: ${paidAt}`,
          ].join("\n")}
          fields={[
            { label: "Transaction ID",  value: `#${txn.transactionId}` },
            { label: "Amount",          value: fmt(txn.amount) },
            { label: "Status",          value: capitalize(txn.status) },
            { label: "Date",            value: paidAt },
          ]}
        />

        <OrderOverView
          title="Payment Information"
          copyText={[
            `Payment Method: ${txn.paymentMethod ?? "—"}`,
            `Channel: ${capitalize(txn.channel ?? "—")}`,
          ].join("\n")}
          fields={[
            { label: "Payment Method", value: txn.paymentMethod ?? "—" },
            { label: "Channel",        value: capitalize(txn.channel ?? "—") },
          ]}
        />

        <OrderOverView
          title="Customer"
          copyText={`Customer: ${txn.customerName}`}
          fields={[
            { label: "Customer Name", value: txn.customerName },
          ]}
        />
      </div>
    </div>
  );
}
