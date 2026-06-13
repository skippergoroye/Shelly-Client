"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { INITIAL_ORDERS, Order } from "../_data/orders";
import { cn } from "@/lib/utils";
import OrderOverView from "../_components/OrderOverView";

const PAYMENT_STYLES: Record<Order["paymentStatus"], string> = {
  PAID:     "bg-green-100 text-green-700",
  AWAITING: "bg-yellow-100 text-yellow-700",
  FAILED:   "bg-red-100 text-red-600",
};

const STATUS_STYLES: Record<Order["orderStatus"], string> = {
  Processing: "bg-blue-100 text-blue-700",
  Pending:    "bg-yellow-100 text-yellow-700",
  Shipped:    "bg-purple-100 text-purple-700",
  Delivered:  "bg-green-100 text-green-700",
};





export default function OrderOverviewPage() {
  const params = useParams();
  const uid = params.id as string;
  const order = INITIAL_ORDERS.find((o) => o.uid === uid);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-description">Order not found.</p>
        <Link href="/admin/orders" className="text-primary text-sm font-medium hover:underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full  mx-auto font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-light-grey">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-description uppercase mb-1">
            <Link href="/admin/orders" className="hover:text-foreground transition-colors">
              Orders
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{order.id}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Order Overview</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className={cn("inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide", STATUS_STYLES[order.orderStatus])}>
              {order.orderStatus}
            </span>
            <span className={cn("inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide", PAYMENT_STYLES[order.paymentStatus])}>
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Single box with all OrderOverViews */}
      <div className="rounded-lg bg-background border border-light-grey divide-y divide-light-grey">
        <OrderOverView
          title="Order Details"
          copyText={[
            `Order ID: ${order.id}`,
            `Order Date: ${order.orderDate}`,
            `Est. Delivery: ${order.estimatedDelivery}`,
            `Items: ${order.items}`,
            `Total: ₦${order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
          ].join("\n")}
          fields={[
            { label: "Order ID",      value: order.id },
            { label: "Order Date",    value: order.orderDate },
            { label: "Est. Delivery", value: order.estimatedDelivery },
            { label: "Items",         value: order.items },
            { label: "Total",         value: `₦${order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
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
            `WhatsApp: ${order.phone}`,
            `Mobile: ${order.mobile}`,
          ].join("\n")}
          fields={[
            { label: "Email Address",   value: order.email },
            { label: "WhatsApp Number", value: order.phone },
            { label: "Mobile Number",   value: order.mobile },
          ]}
        />
      </div>
    </div>
  );
}
