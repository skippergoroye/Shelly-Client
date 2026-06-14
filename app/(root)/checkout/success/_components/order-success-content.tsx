"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Download, Package, ArrowRight, ArrowLeft } from "lucide-react";
import SubmitButton from "@/components/shared/SubmitButton";
import { parseNameAndSize } from "@/lib/utils";

interface OrderItem {
  id: string;
  name: string;
  images: string;
  price: number;
  quantity: number;
  category: string;
}

interface OrderData {
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderSuccessContent() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("shelly_last_order");
    if (stored) {
      try {
        setOrder(JSON.parse(stored));
      } catch {
        // invalid data
      }
    }
  }, []);

  if (!mounted) return null;

  if (!order) {
    return (
      <div className="container-max px-6 py-24 text-center">
        <p className="text-gray-500 text-lg mb-6">No recent order found.</p>
        <Link href="/products" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const handleDownload = () => {
    const lines = [
      `ORDER RECEIPT — Shelly Collections`,
      `Order Number: ${order.orderNumber}`,
      `Order Date: ${order.orderDate}`,
      `Est. Delivery: ${order.estimatedDelivery}`,
      ``,
      `ITEMS:`,
      ...order.items.map((item) => {
        const { baseName, size } = parseNameAndSize(item.name);
        return `  • ${baseName}${size ? ` (${size})` : ""} x${item.quantity} — NGN${(item.price * item.quantity).toFixed(2)}`;
      }),
      ``,
      `Subtotal:    NGN${order.subtotal.toFixed(2)}`,
      `Shipping:    FREE`,
      `Tax (8%):    NGN${order.tax.toFixed(2)}`,
      `TOTAL:       NGN${order.total.toFixed(2)}`,
      ``,
      `Thank you for shopping with Shelly Collections!`,
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${order.orderNumber}-receipt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-max px-6 md:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-8">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-primary hover:underline transition-colors text-lg font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
              <CheckCircle2 className="w-5 h-5 fill-primary text-white" />
              Order Confirmed
            </div>
          </div>

          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-(--on-surface) leading-tight tracking-tight">
              Your Bespoke
              <br />
              Journey Begins.
            </h1>
            <p className="text-(--on-surface-variant) mt-5 text-base leading-relaxed max-w-lg">
              Thank you for choosing Shelly Collections. Our master artisans have been notified and are preparing to
              craft your custom selection with technical precision.
            </p>
          </div>

          <hr className="border-(--outline-variant)" />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold text-(--on-surface-variant) uppercase tracking-widest mb-1">
                Order Number
              </p>
              <p className="text-2xl font-extrabold text-(--on-surface)">#{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-(--on-surface-variant) uppercase tracking-widest mb-1">
                Est. Delivery
              </p>
              <p className="text-2xl font-extrabold text-(--on-surface)">{order.estimatedDelivery}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <SubmitButton
              clickFn={() => router.push("/products")}
              type="button"
              className="bg-primary hover:bg-blue-700 text-white font-bold px-8 py-5 rounded flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Package className="w-4 h-4" /> Track Order Status
            </SubmitButton>
            <SubmitButton
              clickFn={handleDownload}
              type="button"
              className="border border-(--outline-variant) hover:border-(--outline) bg-white text-(--on-surface) font-semibold px-8 py-5 rounded flex items-center gap-2 transition-colors cursor-pointer text-sm"
            >
              <Download className="w-4 h-4" /> Download Invoice
            </SubmitButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-(--surface) border border-(--outline-variant) rounded-xl p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-(--on-surface)">Order Summary</h2>

            <div className="space-y-4 max-h-65 overflow-y-auto pr-1">
              {order.items.map((item) => {
                const { baseName, size } = parseNameAndSize(item.name);
                return (
                  <div key={item.id} className="flex gap-4 items-center">
                    <Image
                      src={item.images}
                      alt={baseName}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded object-cover border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-(--on-surface) text-sm truncate">{baseName}</h3>
                      <p className="text-xs text-(--on-surface-variant) mt-0.5 truncate">
                        {item.category}
                        {size ? ` / Size ${size.replace("EU ", "")}` : ""} / Bespoke
                      </p>
                      <p className="text-primary font-bold text-sm mt-1">
                        NGN{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <hr className="border-(--outline-variant)" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-(--on-surface-variant)">
                <span>Subtotal</span>
                <span className="font-medium text-(--on-surface)">NGN{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-(--on-surface-variant)">
                <span>Shipping (Express)</span>
                <span className="font-bold text-primary">FREE</span>
              </div>
              <div className="flex justify-between text-(--on-surface-variant)">
                <span>Tax</span>
                <span className="font-medium text-(--on-surface)">NGN{order.tax.toFixed(2)}</span>
              </div>
            </div>

            <hr className="border-(--outline-variant)" />

            <div className="flex justify-between items-center text-xl font-extrabold text-(--on-surface)">
              <span>Total</span>
              <span>NGN{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
