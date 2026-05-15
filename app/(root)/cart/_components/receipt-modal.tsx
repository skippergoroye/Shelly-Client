"use client";

import { useRouter } from "next/navigation";
import CustomModal from "@/components/shared/CustomModal";
import { CartItem } from "@/redux/features/cart/cartSlice";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function ReceiptModal({
  isOpen,
  onClose,
  orderNumber,
  orderDate,
  items,
  subtotal,
  shipping,
  tax,
  total,
}: ReceiptModalProps) {
  const router = useRouter();

  const handleContinueShopping = () => {
    onClose();
    router.push("/products");
  };

  return (
    <CustomModal
      className="bg-white"
      isOpen={isOpen}
      onClose={onClose}
      title="Order Confirmed!"
      description="Thank you for your order. We've received it and are preparing it for shipment."
      size="large"
      footer={
        <button
          onClick={handleContinueShopping}
          className="w-full cursor-pointer sm:w-auto bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      }
    >
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Items Ordered
          </h3>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center rounded-2xl border border-slate-200 p-4"
              >
                <img
                  src={item.images}
                  alt={item.name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    {item.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-slate-900">
                  NGN{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CustomModal>
  );
}