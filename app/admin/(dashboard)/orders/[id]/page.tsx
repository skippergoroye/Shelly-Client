"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import OrderOverView from "../_components/OrderOverView";
import { useGetAdminOrderByIdQuery } from "@/redux/features/admin/orders/adminOrderApi";
import RouteLoadingScreen from "@/components/shared/RouteLoadingScreen";

const PAYMENT_STYLES: Record<string, string> = {
  paid:    "bg-green-100 text-green-700",
  failed:  "bg-red-100 text-red-600",
  pending: "bg-yellow-100 text-yellow-700",
};

const FULFILLMENT_STYLES: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped:    "bg-purple-100 text-purple-700",
  delivered:  "bg-green-100 text-green-700",
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function OrderOverviewPage() {
  const { id } = useParams() as { id: string };
  const { data: order, isLoading, isError } = useGetAdminOrderByIdQuery(id);

  if (isLoading) return <RouteLoadingScreen />;

  if (isError || !order) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-description">Order not found.</p>
        <Link href="/admin/orders" className="text-primary text-sm font-medium hover:underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  const displayRef = order.orderNumber ? `#${order.orderNumber}` : order.reference;
  const itemsSummary = order.items
    .map((i) => `${i.quantity}x ${i.productName} (EU ${i.size})`)
    .join(", ");

  return (
    <div className="w-full mx-auto font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-light-grey">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-description uppercase mb-1">
            <Link href="/admin/orders" className="hover:text-foreground transition-colors">
              Orders
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{displayRef}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Order Overview</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className={cn("inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide", FULFILLMENT_STYLES[order.fulfillmentStatus])}>
              {capitalize(order.fulfillmentStatus)}
            </span>
            <span className={cn("inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide", PAYMENT_STYLES[order.paymentStatus])}>
              {order.paymentStatus.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Overview sections */}
      <div className="rounded-lg bg-background border border-light-grey divide-y divide-light-grey">
        <OrderOverView
          title="Order Details"
          copyText={[
            `Order: ${displayRef}`,
            `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
            `Items: ${itemsSummary}`,
            `Subtotal: ₦${order.subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
            `Tax (8%): ₦${order.tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
            `Total: ₦${order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
          ].join("\n")}
          fields={[
            { label: "Order",      value: displayRef },
            { label: "Order Date", value: new Date(order.createdAt).toLocaleDateString() },
            { label: "Items",      value: itemsSummary },
            { label: "Subtotal",   value: `₦${order.subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
            { label: "Tax (8%)",   value: `₦${order.tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
            { label: "Total",      value: `₦${order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
          ]}
        />

        <OrderOverView
          title="Delivery Address"
          copyText={[
            `First Name: ${order.firstName}`,
            `Last Name: ${order.lastName}`,
            `Street Address: ${order.streetAddress}`,
            `City: ${order.city}`,
            `State: ${order.state}`,
          ].join("\n")}
          fields={[
            { label: "First Name",     value: order.firstName },
            { label: "Last Name",      value: order.lastName },
            { label: "Street Address", value: order.streetAddress },
            { label: "City",           value: order.city },
            { label: "State",          value: order.state },
          ]}
        />

        <OrderOverView
          title="Contact Information"
          copyText={[
            `Email: ${order.email}`,
            `WhatsApp: ${order.whatsappNumber}`,
            `Mobile: ${order.mobileNumber}`,
          ].join("\n")}
          fields={[
            { label: "Email Address",   value: order.email },
            { label: "WhatsApp Number", value: order.whatsappNumber },
            { label: "Mobile Number",   value: order.mobileNumber },
          ]}
        />
      </div>
    </div>
  );
}
