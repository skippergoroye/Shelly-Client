"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import LoadingBar from "@/components/shared/LoadingBar";

const OrderSuccessContent = dynamic(() => import("./_components/order-success-content"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[60vh] flex flex-col justify-center items-center bg-background">
      <LoadingBar loadingText="Loading your order..." />
    </div>
  ),
});

export default function OrderSuccessPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <OrderSuccessContent />
      </div>
      <Footer />
    </div>
  );
}
