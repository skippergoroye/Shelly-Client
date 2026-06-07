'use client';

import { PaystackButton } from 'react-paystack';

interface Props {
  email: string;
  amount: number;
  disabled?: boolean;
  onSuccess: (reference: any) => void;
  onClose: () => void;
}

export default function PaystackCheckoutButton({ email, amount, disabled, onSuccess, onClose }: Props) {
  const componentProps = {
    email: "skippergoroye@gmail.com",
    amount,
    currency: 'NGN',
    reference: new Date().getTime().toString(),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    text: 'Proceed to Checkout →',
    onSuccess,
    onClose,
  };

  if (disabled) {
    return (
      <button
        disabled
        className="w-full bg-gray-400 text-white font-bold py-5.5 rounded-lg mb-4 cursor-not-allowed"
      >
        Proceed to Checkout →
      </button>
    );
  }

  return (
    <PaystackButton
      {...componentProps}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2"
    />
  );
}