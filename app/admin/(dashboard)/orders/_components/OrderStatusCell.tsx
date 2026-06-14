"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useUpdateOrderStatusMutation,
  FulfillmentStatus,
} from "@/redux/features/admin/orders/adminOrderApi";
import ToastNotification from "@/components/shared/ToastNotification";

const STATUSES: FulfillmentStatus[] = ["pending", "processing", "shipped", "delivered"];

const STATUS_STYLES: Record<FulfillmentStatus, string> = {
  pending:    "border-yellow-200 text-yellow-700",
  processing: "border-blue-200 text-blue-700",
  shipped:    "border-purple-200 text-purple-700",
  delivered:  "border-green-200 text-green-700",
};

const STATUS_OPTION_STYLES: Record<FulfillmentStatus, string> = {
  pending:    "text-yellow-700 bg-yellow-50 hover:bg-yellow-100",
  processing: "text-blue-700 bg-blue-50 hover:bg-blue-100",
  shipped:    "text-purple-700 bg-purple-50 hover:bg-purple-100",
  delivered:  "text-green-700 bg-green-50 hover:bg-green-100",
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

interface OrderStatusCellProps {
  orderId: string;
  initialStatus: FulfillmentStatus;
}

const OrderStatusCell = ({ orderId, initialStatus }: OrderStatusCellProps) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<FulfillmentStatus>(initialStatus);
  const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation();

  const handleSelect = async (next: FulfillmentStatus) => {
    if (next === status || isLoading) return;
    setOpen(false);
    const prev = status;
    setStatus(next); // optimistic
    try {
      await updateStatus({ id: orderId, fulfillmentStatus: next }).unwrap();
    } catch {
      setStatus(prev); // rollback
      ToastNotification({ title: "Update Failed", description: "Could not update order status.", type: "error" });
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          disabled={isLoading}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-medium bg-white transition-colors hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed ${STATUS_STYLES[status]}`}
        >
          {capitalize(status)}
          <ChevronDown className="w-3 h-3 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1" align="start">
        <div className="flex flex-col gap-0.5">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => handleSelect(s)}
              className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-xs font-medium text-left transition-colors ${
                s === status ? STATUS_OPTION_STYLES[s] : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Check className={`w-3 h-3 shrink-0 ${s === status ? "opacity-100" : "opacity-0"}`} />
              {capitalize(s)}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OrderStatusCell;
