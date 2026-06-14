"use client";

import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import dynamic from "next/dynamic";
import LoadingBar from "@/components/common/LoadingBar";

const VerifyContent = dynamic(() => import("./_components/VerifyContent"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      <LoadingBar loadingText="Verifying your payment…" />
    </div>
  ),
});

export default function VerifyPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <VerifyContent />
      </div>
      <Footer />
    </div>
  );
}
