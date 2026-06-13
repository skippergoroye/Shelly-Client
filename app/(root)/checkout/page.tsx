"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import LoadingBar from "@/components/common/LoadingBar";


const CheckoutForm = dynamic(() => import("./_components/checkout-form"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[60vh] flex flex-col justify-center items-center bg-background">
      <LoadingBar loadingText="Loading Checkout..." />
    </div>
  ),
});

export default function CheckoutPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <CheckoutForm />
      </div>
      <Footer />
    </div>
  );
}
