import React from "react";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/ReduxProvider";
import { RefetchProvider } from "@/context/RefetchContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import ToastProvider from "./ToastProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <RefetchProvider>
        <ThemeProvider>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </RefetchProvider>
    </ReduxProvider>
  );
};

export default Providers;
