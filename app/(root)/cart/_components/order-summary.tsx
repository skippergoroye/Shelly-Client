"use client";

import { useEffect, useState } from "react";
import { ShieldCheckIcon, ExternalLink } from "lucide-react";
import Link from "next/link";

interface OrderSummaryProps {
  totalPrice?: number;
  email?: string;
  onPaymentSuccess?: (reference: any) => void;
}

export default function OrderSummary({
  totalPrice = 0,
  email = "",
  onPaymentSuccess,
}: OrderSummaryProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = totalPrice;
  const shippingCost = 0;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="bg-[color:var(--surface)] border border-[color:var(--outline-variant)] rounded-xl px-6 sticky top-8">
      <h2 className="text-xl font-bold text-[color:var(--on-surface)] mb-6">Order Summary</h2>

      {/* Summary Items */}
      <div className="space-y-4 mb-6 border-b border-[color:var(--outline-variant)] pb-6">
        <div className="flex justify-between text-[color:var(--on-surface-variant)]">
          <span>Subtotal</span>
          <span className="font-medium">
            {mounted ? `NGN${subtotal.toFixed(2)}` : "NGN0.00"}
          </span>
        </div>

        <div className="flex justify-between text-[color:var(--on-surface-variant)]">
          <span>Shipping</span>
          <span className="font-medium text-green-600">
            {mounted ? "FREE" : "—"}
          </span>
        </div>

        <div className="flex justify-between text-[color:var(--on-surface-variant)]">
          <span>Estimated Tax</span>
          <span className="font-medium">
            {mounted ? `NGN${tax.toFixed(2)}` : "NGN0.00"}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6 text-xl font-bold">
        <span>Total</span>
        <span className="text-[color:var(--primary)]">
          {mounted ? `NGN${total.toFixed(2)}` : "NGN0.00"}
        </span>
      </div>

      {/* Checkout Button */}
      {!mounted || total <= 0 ? (
        <button
          type="button"
          disabled={!mounted || total <= 0}
          className={`w-full font-bold py-3.5 rounded mb-4 transition-colors ${
            !mounted || total <= 0
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-[color:var(--primary)] hover:bg-blue-700 text-white cursor-pointer"
          }`}
        >
          Proceed to Checkout →
        </button>
      ) : (
        <Link
          href="/checkout"
          className="block w-full mb-4 bg-[color:var(--primary)] hover:bg-blue-700 text-white font-bold py-3.5 rounded text-center transition-colors cursor-pointer"
        >
          Proceed to Checkout →
        </Link>
      )}

      {/* Security Message */}
      <div className="flex items-center gap-2 text-[color:var(--on-surface-variant)] text-sm mb-6 p-3 bg-[color:var(--background)] rounded-lg border border-[color:var(--outline-variant)]">
        <ShieldCheckIcon className="w-5 h-5 flex-shrink-0 text-green-600" />
        <span>Secure checkout powered by Paystack.</span>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[color:var(--on-surface-variant)] mb-2">
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            className="w-full border border-[color:var(--outline-variant)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20 bg-[color:var(--background)] text-[color:var(--on-surface)]"
          />
          <button className="bg-[color:var(--primary)]/20 hover:bg-[color:var(--primary)]/30 text-[color:var(--primary)] font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
            Apply
          </button>
        </div>
      </div>

      {/* Help Link */}
      <div className="text-sm text-[color:var(--on-surface-variant)]">
        Need help?{" "}
        <a
          href="#"
          className="text-[color:var(--primary)] hover:text-[color:var(--primary)] font-medium inline-flex items-center gap-1"
        >
          Contact Support
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}