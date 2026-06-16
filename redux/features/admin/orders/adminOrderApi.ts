import { apiSlice } from "../../api/apiSlice";

export type FulfillmentStatus = "pending" | "processing" | "shipped" | "delivered";

export interface AdminOrderItem {
  productId: string;
  productName: string;
  category: string;
  imageUrl: string;
  price: number;
  quantity: number;
  size: number;
  lineTotal: number;
}

export interface AdminOrder {
  _id: string;
  orderNumber?: string;
  reference: string;
  paymentStatus: string;
  fulfillmentStatus: FulfillmentStatus;
  // customer fields flat on the order
  firstName: string;
  lastName: string;
  email: string;
  whatsappNumber: string;
  mobileNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  items: AdminOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  promoCode?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderStats {
  pendingValue: number;
  activeShipments: number;
  customerSatisfaction: number;
}

export interface OrdersListResponse {
  orders: AdminOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetOrdersParams {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const adminOrderApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Orders", "OrderStats", "Order"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getOrderStats: builder.query<OrderStats, void>({
        query: () => "/admin/orders/stats",
        providesTags: ["OrderStats"],
      }),
      getAdminOrders: builder.query<OrdersListResponse, GetOrdersParams>({
        query: ({ status, search, page = 1, limit = 50 }) => ({
          url: "/admin/orders",
          params: {
            ...(status && status !== "all" ? { status } : {}),
            ...(search ? { search } : {}),
            page,
            limit,
          },
        }),
        providesTags: ["Orders"],
      }),
      getAdminOrderById: builder.query<AdminOrder, string>({
        query: (id) => `/admin/orders/${id}`,
        providesTags: (_result, _err, id) => [{ type: "Order", id }],
      }),
      updateOrderStatus: builder.mutation<AdminOrder, { id: string; fulfillmentStatus: FulfillmentStatus }>({
        query: ({ id, fulfillmentStatus }) => ({
          url: `/admin/orders/${id}/status`,
          method: "PATCH",
          body: { fulfillmentStatus },
        }),
        invalidatesTags: (_result, _err, { id }) => ["Orders", "OrderStats", { type: "Order", id }],
      }),
    }),
  });

export const {
  useGetOrderStatsQuery,
  useGetAdminOrdersQuery,
  useGetAdminOrderByIdQuery,
  useUpdateOrderStatusMutation,
} = adminOrderApi;

// providesTags tells RTK Query which cache tags this query "owns". When another query or mutation calls invalidatesTags: ["OrderStats"], RTK automatically refetches this query in the background.

// In this project it's wired so that when you call updateOrderStatus (the PATCH mutation), it invalidates "OrderStats" — which causes the metrics cards (pending value, active shipments, satisfaction) to automatically re-fetch and show fresh numbers without you having to manually trigger a refetch.

// Without it, the stats cards would stay stale after a status change until the user manually refreshed the page.
