import React, { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from 'lucide-react';


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



const ORDER_STATUSES: Order["orderStatus"][] = ["Processing", "Pending", "Shipped", "Delivered"];


// ── Order status styles ────────────────────────────────
const ORDER_STATUS_STYLES: Record<Order["orderStatus"], string> = {
  Processing: "border-blue-200 text-blue-700",
  Pending:    "border-yellow-200 text-yellow-700",
  Shipped:    "border-purple-200 text-purple-700",
  Delivered:  "border-green-200 text-green-700",
};

const ORDER_STATUS_OPTION_STYLES: Record<Order["orderStatus"], string> = {
  Processing: "text-blue-700 bg-blue-50 hover:bg-blue-100",
  Pending:    "text-yellow-700 bg-yellow-50 hover:bg-yellow-100",
  Shipped:    "text-purple-700 bg-purple-50 hover:bg-purple-100",
  Delivered:  "text-green-700 bg-green-50 hover:bg-green-100",
};

const OrderStatusCell = ({ initialStatus }: { initialStatus: Order["orderStatus"] }) => {
      const [open, setOpen] = useState(false);
      const [status, setStatus] = useState<Order["orderStatus"]>(initialStatus);
  return (
     <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-medium bg-white transition-colors hover:bg-gray-50 ${ORDER_STATUS_STYLES[status]}`}
            >
              {status}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-1" align="start">
            <div className="flex flex-col gap-0.5">
              {ORDER_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatus(s); setOpen(false); }}
                  className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-xs font-medium text-left transition-colors ${
                    s === status
                      ? ORDER_STATUS_OPTION_STYLES[s]
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Check className={`w-3 h-3 shrink-0 ${s === status ? "opacity-100" : "opacity-0"}`} />
                  {s}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
  )
}

export default OrderStatusCell