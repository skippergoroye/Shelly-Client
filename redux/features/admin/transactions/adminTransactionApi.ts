import { apiSlice } from "../../api/apiSlice";

export interface TransactionStats {
  totalRevenue: number;
  thisMonthRevenue: number;
  pendingValue: number;
  pendingCount: number;
}

export interface ApiTransaction {
  _id: string;
  transactionId: string;
  customerName: string;
  amount: number;
  paymentMethod: string;
  channel: string;
  status: "paid" | "pending" | "failed";
  paidAt: string;
}

export interface TransactionsListResponse {
  transactions: ApiTransaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetTransactionsParams {
  status?: string;
  search?: string;
  date?: string;
  page?: number;
  limit?: number;
}

export const adminTransactionApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Transactions", "TransactionStats"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTransactionStats: builder.query<TransactionStats, void>({
        query: () => "/admin/transactions/stats",
        providesTags: ["TransactionStats"],
      }),
      getAdminTransactions: builder.query<TransactionsListResponse, GetTransactionsParams>({
        query: ({ status, search, date, page = 1, limit = 10 }) => ({
          url: "/admin/transactions",
          params: {
            ...(status && status !== "all" ? { status } : {}),
            ...(search ? { search } : {}),
            ...(date ? { date } : {}),
            page,
            limit,
          },
        }),
        providesTags: ["Transactions"],
      }),
      getAdminTransactionById: builder.query<ApiTransaction, string>({
        query: (id) => `/admin/transactions/${id}`,
      }),
      exportTransactions: builder.mutation<void, void>({
        queryFn: async (_arg, _api, _extraOptions, baseQuery) => {
          const result = await baseQuery({
            url: "/admin/transactions/export",
            responseHandler: (response) => response.blob(),
            cache: "no-cache",
          });
          if (result.error) return { error: result.error };
          const blob = result.data as Blob;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "shelly-transactions.csv";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          return { data: undefined };
        },
      }),
    }),
  });

export const {
  useGetTransactionStatsQuery,
  useGetAdminTransactionsQuery,
  useGetAdminTransactionByIdQuery,
  useExportTransactionsMutation,
} = adminTransactionApi;
