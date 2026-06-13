


import React from 'react'
import { ShieldX, CircleCheck, Info } from "lucide-react";
import { Toaster } from "sonner";

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "flex items-center gap-3 w-full px-4 h-20 rounded-lg text-sm text-white shadow-lg",
          error: "bg-[#DC2626] border border-[#DC2626]",
          success: "bg-primary border border-primary",
          warning: "bg-yellow-500",
          info: "bg-blue-400",
          title: "font-semibold text-white",
          description: "text-white/80 text-xs",
        },
      }}
      icons={{
        success: <CircleCheck color="white" />,
        error: <ShieldX color="white" />,
        info: <Info color="white" />,
      }}
    />
  )
}

export default ToastProvider


