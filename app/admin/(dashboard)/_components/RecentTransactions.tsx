"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MoreVertical, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import SubmitButton from "@/components/shared/SubmitButton";

interface Order {
  id: string;
  customerInit?: string;
  customerName: string;
  customerAvatar?: string;
  address: string;
  status: "Shipped" | "Processing" | "Pending";
  date: string;
}

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
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
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

export function RecentTransactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders] = useState<Order[]>(INITIAL_ORDERS);

  // Filter orders dynamically based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="relative select-none overflow-visible">
     

      {/* Table Header Row */}
      <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-800">
          Recent Orders
        </h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 text-xs text-gray-700 placeholder:text-gray-400 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-200 transition-all font-medium"
          />
        </div>
      </div>

      {/* Table Body Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 tracking-wider uppercase bg-gray-50/40">
              <th className="py-4 px-6">Order ID</th>
              <th className="py-4 px-6">Customer</th>
              <th className="py-4 px-6">Address</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-150 last:border-none hover:bg-gray-50/30 transition-colors"
                >
                  {/* Order ID */}
                  <td className="py-4 px-6 font-bold text-[#0066FF] text-xs">
                    <Link href={`/admin/orders/${order.id.replace("#", "")}`} className="hover:underline">
                      {order.id}
                    </Link>
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-6 text-xs text-gray-800 font-bold">
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
                      <span>{order.customerName}</span>
                    </div>
                  </td>

                  {/* Address */}
                  <td className="py-4 px-6 text-xs text-gray-400 font-medium">
                    {order.address}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold tracking-wide ${
                        order.status === "Shipped"
                          ? "bg-green-50 text-green-700 border border-green-200/50"
                          : order.status === "Processing"
                          ? "bg-blue-50 text-blue-700 border border-blue-200/50"
                          : "bg-orange-50/70 text-orange-700 border border-orange-200/50"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-xs text-gray-400 font-medium">
                    {order.date}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-right">
                    <SubmitButton
                      type="button"
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-50 rounded cursor-pointer bg-transparent border-0 shadow-none h-auto"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </SubmitButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-xs font-semibold text-gray-400"
                >
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Pagination */}
      <div className="p-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-100 text-[10px] font-bold text-gray-400 tracking-wider uppercase bg-gray-50/20">
        <span>Showing {filteredOrders.length} of 1284 entries</span>
        <div className="flex items-center gap-2">
          <SubmitButton
            type="button"
            className="w-6.5 h-6.5 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 rounded text-gray-500 cursor-pointer shadow-sm transition-colors h-auto p-0"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </SubmitButton>
          <SubmitButton
            type="button"
            className="w-6.5 h-6.5 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 rounded text-gray-500 cursor-pointer shadow-sm transition-colors h-auto p-0"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </SubmitButton>
        </div>
      </div>
    </Card>
  );
}
