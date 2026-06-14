import { apiSlice } from "../api/apiSlice";

export interface CheckoutItem {
  productId: string;
  quantity: number;
  size: number;
}

export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  email: string;
  whatsappNumber: string;
  mobileNumber: string;
  streetAddress: string;
  city: string;
  state: string;
}

export interface CheckoutRequest {
  items: CheckoutItem[];
  customer: CheckoutCustomer;
  promoCode?: string;
}

export interface CheckoutResponse {
  authorizationUrl: string;
  reference: string;
  orderId: string;
}

export interface VerifyOrderResponse {
  _id: string;
  reference: string;
  status: string;
  customer: CheckoutCustomer;
  items: { productId: string; quantity: number; size: number; price: number }[];
  subtotal: number;
  vat: number;
  total: number;
  createdAt: string;
}

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation<CheckoutResponse, CheckoutRequest>({
      query: (body) => ({
        url: "/orders/checkout",
        method: "POST",
        body,
      }),
    }),
    verifyPayment: builder.query<VerifyOrderResponse, string>({
      query: (reference) => `/orders/verify/${reference}`,
    }),
  }),
});

export const { useCheckoutMutation, useVerifyPaymentQuery } = orderApi;
