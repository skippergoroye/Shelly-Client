import React from "react";
import ReduxProvider from "@/redux/ReduxProvider";
import { RefetchProvider } from "@/context/RefetchContext";
import ToastProvider from "./ToastProvider";
import ThemeProviders from "./ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <RefetchProvider>
        <ThemeProviders>
          {children}
          <ToastProvider />
        </ThemeProviders>
      </RefetchProvider>
    </ReduxProvider>
  );
};

export default Providers;
