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
    <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 sticky top-8">
      <h2 className="text-xl font-bold text-black mb-6">Order Summary</h2>

      {/* Summary Items */}
      <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span className="font-medium">
            {mounted ? `NGN${subtotal.toFixed(2)}` : "NGN0.00"}
          </span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span className="font-medium text-green-600">
            {mounted ? "FREE" : "—"}
          </span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Estimated Tax</span>
          <span className="font-medium">
            {mounted ? `NGN${tax.toFixed(2)}` : "NGN0.00"}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6 text-xl font-bold">
        <span>Total</span>
        <span className="text-blue-600">
          {mounted ? `NGN${total.toFixed(2)}` : "NGN0.00"}
        </span>
      </div>

      {/* Checkout Button */}
      {total > 0 ? (
        <Link
          href="/checkout"
          className="block w-full mb-4 bg-[color:var(--primary)] hover:bg-blue-700 text-white font-bold py-3.5 rounded text-center transition-colors cursor-pointer"
        >
          Proceed to Checkout →
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="w-full bg-gray-300 text-white font-bold py-3.5 rounded mb-4 cursor-not-allowed"
        >
          Proceed to Checkout →
        </button>
      )}

      {/* Security Message */}
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-6 p-3 bg-white rounded-lg border border-gray-200">
        <ShieldCheckIcon className="w-5 h-5 flex-shrink-0 text-green-600" />
        <span>Secure checkout powered by Paystack.</span>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button className="bg-blue-200 hover:bg-blue-300 text-blue-600 font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
            Apply
          </button>
        </div>
      </div>

      {/* Help Link */}
      <div className="text-sm text-gray-600">
        Need help?{" "}
        <a
          href="#"
          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
        >
          Contact Support
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}