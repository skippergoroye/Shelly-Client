"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useVerifyPaymentQuery } from "@/redux/features/orders/orderApi";
import LoadingBar from "@/components/common/LoadingBar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function VerifyContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") ?? "";
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: order, isLoading, isError } = useVerifyPaymentQuery(reference, {
    skip: !reference,
  });

  useEffect(() => {
    if (!order) return;

    // Merge API order data with the pending cart snapshot saved before redirect
    const raw = localStorage.getItem("shelly_pending_order");
    const pending = raw ? JSON.parse(raw) : {};

    const successData = {
      orderNumber: order.reference ?? reference,
      orderDate: pending.orderDate ?? new Date().toLocaleDateString(),
      estimatedDelivery: pending.estimatedDelivery ?? "7–10 business days",
      items: pending.items ?? [],
      subtotal: order.subtotal ?? pending.subtotal ?? 0,
      shipping: 0,
      tax: order.vat ?? pending.tax ?? 0,
      total: order.total ?? pending.total ?? 0,
    };

    localStorage.setItem("shelly_last_order", JSON.stringify(successData));
    localStorage.removeItem("shelly_pending_order");

    dispatch(clearCart());
    router.replace("/checkout/success");
  }, [order, reference, dispatch, router]);

  if (!reference) {
    return (
      <div className="container-max px-6 py-24 text-center">
        <p className="text-[color:var(--on-surface-variant)] text-lg mb-6">No payment reference found.</p>
        <Link href="/products" className="inline-flex items-center gap-2 text-[color:var(--primary)] font-semibold hover:underline">
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <LoadingBar loadingText="Verifying your payment…" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-max px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Verification Failed</h1>
        <p className="text-[color:var(--on-surface-variant)] mb-8">
          We could not verify your payment. If money was deducted, please contact support with reference: <strong>{reference}</strong>
        </p>
        <Link href="/products" className="inline-flex items-center gap-2 text-[color:var(--primary)] font-semibold hover:underline">
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      <LoadingBar loadingText="Payment confirmed! Redirecting…" />
    </div>
  );
}
