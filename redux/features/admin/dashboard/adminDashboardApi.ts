import { apiSlice } from '../../api/apiSlice';
import { AdminOrder } from '../orders/adminOrderApi';

export interface DashboardStats {
  totalOrders: number;
  revenue: number;
  pendingDeliveries: number;
  activeProducts: number;
}

export interface RevenueChart {
  year: number;
  labels: string[];
  data: number[];
}

export interface ActivityItem {
  type: 'payment' | 'order';
  title: string;
  description: string;
  time: string;
}

export interface ActivityResponse {
  activities: ActivityItem[];
}

export interface DashboardOrdersResponse {
  orders: AdminOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetDashboardOrdersParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const adminDashboardApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['DashboardStats', 'DashboardActivity'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getDashboardStats: builder.query<DashboardStats, void>({
        query: () => '/admin/dashboard/stats',
        providesTags: ['DashboardStats'],
      }),
      getRevenueChart: builder.query<RevenueChart, void>({
        query: () => '/admin/dashboard/revenue-chart',
      }),
      getDashboardActivity: builder.query<ActivityResponse, void>({
        query: () => '/admin/dashboard/activity',
        providesTags: ['DashboardActivity'],
      }),
      getDashboardOrders: builder.query<DashboardOrdersResponse, GetDashboardOrdersParams>({
        query: ({ search, page = 1, limit = 10 }) => ({
          url: '/admin/dashboard/orders',
          params: {
            ...(search ? { search } : {}),
            page,
            limit,
          },
        }),
      }),
      exportDashboard: builder.mutation<void, void>({
        queryFn: async (_arg, _api, _extraOptions, baseQuery) => {
          const result = await baseQuery({
            url: '/admin/dashboard/export',
            responseHandler: (response) => response.blob(),
            cache: 'no-cache',
          });
          if (result.error) return { error: result.error };
          const blob = result.data as Blob;
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'shelly-dashboard-report.csv';
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
  useGetDashboardStatsQuery,
  useGetRevenueChartQuery,
  useGetDashboardActivityQuery,
  useGetDashboardOrdersQuery,
  useExportDashboardMutation,
} = adminDashboardApi;
