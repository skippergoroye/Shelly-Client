import React from "react";
import { toast } from "sonner";





export interface ToastNotificationProps {
  title: string;
  description: string;
  type?: "success" | "error" | "info";
}

const ToastNotification = ({
  title,
  description,
  type = "success",
}: ToastNotificationProps) => {
  const toastType = type === "success" ? toast.success : toast.error;

  toastType(title, {
    description: <span className="text-xs  font-light">{description}</span>,
    // action: {
    //   label: "X",
    //   onClick: () => {},
    // },
    // duration: 5000,
  });

  return null;
};

export default ToastNotification;
