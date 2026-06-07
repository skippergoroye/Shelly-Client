import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, FormProvider as Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { usePaystackPayment } from "react-paystack";
import {
  Lock,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import { RootState } from "@/redux/app/store";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { cn, parseNameAndSize } from "@/lib/utils";

import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import ToastNotification from "@/components/shared/ToastNotification";

const CheckoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "WhatsApp number is required"),
  mobile: z.string().min(1, "Mobile number is required"),
});

type CheckoutFormValues = z.infer<typeof CheckoutSchema>;

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { items: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  const [isPaying, setIsPaying] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      email: "",
      phone: "",
      mobile: "",
    },
  });

  // Calculate prices (using the same logic as Cart page)
  const subtotal = totalPrice;
  const shippingCost = 0;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  // Paystack Initialization
  const baseConfig = {
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    currency: "NGN",
  };

  const initializePayment = usePaystackPayment(baseConfig);

  const handlePaymentSuccess = (reference: any, values: CheckoutFormValues) => {
    const orderNumber = reference?.reference || `ORD-${Date.now()}`;
    // Estimate delivery 7 days from now
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 7);
    const estimatedDelivery = estDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const orderData = {
      orderNumber,
      orderDate: new Date().toLocaleDateString(),
      estimatedDelivery,
      items: cartItems.map((item) => ({ ...item })),
      subtotal,
      shipping: shippingCost,
      tax,
      total,
    };

    localStorage.setItem("shelly_last_order", JSON.stringify(orderData));
    dispatch(clearCart());
    router.push("/checkout/success");
  };


  const onSubmit = (values: CheckoutFormValues) => {
    if (total <= 0) {
      ToastNotification({
        title: "Empty Cart",
        description: "Your cart is empty.",
        type: "error",
      });
      return;
    }

    setIsPaying(true);

    const paymentConfig = {
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
      email: values.email,
      amount: Math.round(total * 100), // convert to kobo
      currency: "NGN",
      reference: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };

    initializePayment({
      config: paymentConfig,
      onSuccess: (reference: any) => {
        setIsPaying(false);
        handlePaymentSuccess(reference, values);
      },
      onClose: () => {
        setIsPaying(false);
        ToastNotification({
          title: "Payment Cancelled",
          description: "You closed the payment window.",
          type: "error",
        });
      },
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container-max px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Please add products to your cart before proceeding to checkout.</p>
        <SubmitButton
          type="button"
          clickFn={() => router.push("/products")}
          className="bg-[color:var(--primary)] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded cursor-pointer"
        >
          Go to Shop
        </SubmitButton>
      </div>
    );
  }

  return (
    <div className="container-max px-6 md:px-12 py-12">
      {/* Back Button */}
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-[color:var(--primary)] hover:underline mb-8 transition-colors text-lg font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>

      {/* Title */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--primary)] ">Secure Checkout</h1>
        <p className="text-black text-lg mt-1">Refining your artisanal selection.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-3 space-y-10">
              
              {/* Delivery Address Section */}
              <div>
                <h2 className="text-xl font-bold text-[color:var(--primary)]  mb-6">Delivery Address</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Julian"
                      variant="h-11 shadow-sm w-full"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Everett"
                      variant="h-11 shadow-sm w-full"
                    />
                  </div>

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="streetAddress"
                    label="Street Address"
                    placeholder="1280 Savile Row, Mayfair"
                    variant="h-11 shadow-sm w-full"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="city"
                      label="City"
                      placeholder="London"
                      variant="h-11 shadow-sm w-full"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Lagos"
                      variant="h-11 shadow-sm w-full"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-[color:var(--primary)]  mb-6">Contact Information</h2>

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email Address"
                    placeholder="julian@bespoke.com"
                    variant="h-11 shadow-sm w-full"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="phone"
                      label="WhatsApp Number"
                      placeholder="+234 800 000 0000"
                      type="tel"
                      variant="h-11 shadow-sm w-full"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="mobile"
                      label="Mobile Number"
                      placeholder="+234 800 000 0001"
                      type="tel"
                      variant="h-11 shadow-sm w-full"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-[color:var(--primary)] text-white border-0 rounded p-6 sticky top-8 space-y-6 shadow-md">
                <h2 className="text-lg font-bold border-b border-blue-500/40 pb-4 text-white">Order Summary</h2>

                {/* Cart Items list */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {cartItems.map((item) => {
                    const { baseName, size } = parseNameAndSize(item.name);
                    return (
                      <div key={item.id} className="flex gap-4 items-center">
                        <Image
                          src={item.images}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded object-cover border-2 border-white animate-fade-in"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm truncate">{baseName}</h3>
                          <p className="text-xs text-blue-200 truncate mt-0.5">
                            {item.category} {size ? `/ Size ${size.replace("EU ", "")}` : ""} / Bespoke
                          </p>
                          <p className="text-xs text-blue-200 mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-white text-sm">
                          NGN{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <hr className="border-blue-500/40" />

                {/* Subtotal / Shipping / Tax breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-blue-100">
                    <span>Subtotal</span>
                    <span className="font-medium text-white">
                      NGN{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-blue-100">
                    <span>Technical Shipping</span>
                    <span className="font-bold text-white">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between text-blue-100">
                    <span>Value Added Tax (8%)</span>
                    <span className="font-medium text-white">
                      NGN{tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <hr className="border-blue-500/40" />

                {/* Total */}
                <div className="flex justify-between items-center text-xl font-bold text-white">
                  <span>Total</span>
                  <span className="text-white">
                    NGN{total.toFixed(2)}
                  </span>
                </div>

                {/* Submit Button */}
                <SubmitButton
                  isLoading={isPaying}
                  loadingText="Processing..."
                  className="w-full bg-white hover:bg-gray-100 text-[color:var(--primary)] font-bold py-5.5 rounded flex items-center justify-center gap-2 text-sm tracking-wider uppercase cursor-pointer transition-colors"
                >
                  <ShieldCheck className="w-4.5 h-4.5 text-[color:var(--primary)]" /> PLACE ORDER
                </SubmitButton>

                {/* Security Badge */}
                <p className="text-xs text-blue-200 text-center flex items-center justify-center gap-1.5 mt-2">
                  <Lock className="w-3.5 h-3.5 text-blue-300" />
                  256-bit SSL Encrypted Transaction
                </p>
              </div>
            </div>

          </div>
        </form>
      </Form>

    
    </div>
  );
}
