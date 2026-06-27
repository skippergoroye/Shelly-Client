'use client';

import { ShoppingBag, CreditCard, Truck, Box } from 'lucide-react';
import { MetricsCard } from '@/components/shared/MetricsCards';
import { useGetDashboardStatsQuery } from '@/redux/features/admin/dashboard/adminDashboardApi';

const fmt = (n: number) => `₦${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

export function KpiCards() {
  const { data, isLoading } = useGetDashboardStatsQuery();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <MetricsCard
        title="Total Orders"
        value={isLoading ? '—' : (data?.totalOrders ?? 0).toLocaleString()}
        badgeText="+12.5%"
        badgeClassName="bg-red-50 text-red-600"
        icon={<ShoppingBag className="w-5 h-5" />}
        iconContainerClassName="bg-blue-50 text-[#0066FF]"
      />
      <MetricsCard
        title="Revenue"
        value={isLoading ? '—' : fmt(data?.revenue ?? 0)}
        badgeText="+8.2%"
        badgeClassName="bg-blue-50 text-blue-600"
        icon={<CreditCard className="w-5 h-5" />}
        iconContainerClassName="bg-gray-100/70 text-gray-500"
      />
      <MetricsCard
        title="Pending Deliveries"
        value={isLoading ? '—' : (data?.pendingDeliveries ?? 0).toLocaleString()}
        badgeText="Stable"
        badgeClassName="bg-gray-100 text-gray-500"
        icon={<Truck className="w-5 h-5" />}
        iconContainerClassName="bg-orange-50 text-orange-600"
      />
      <MetricsCard
        title="Active Products"
        value={isLoading ? '—' : (data?.activeProducts ?? 0).toLocaleString()}
        badgeText="Active"
        badgeClassName="bg-blue-50 text-blue-600"
        icon={<Box className="w-5 h-5" />}
        iconContainerClassName="bg-gray-100/70 text-gray-500"
      />
    </div>
  );
}
