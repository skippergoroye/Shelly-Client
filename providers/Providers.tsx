import React from "react";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/ReduxProvider";
import { RefetchProvider } from "@/context/RefetchContext";
import ToastProvider from "./ToastProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <RefetchProvider>
        {children}
        <ToastProvider />
      </RefetchProvider>
    </ReduxProvider>
  );
};

export default Providers;
