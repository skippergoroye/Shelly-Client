"use client";

import { Wallet, TrendingUp, ClipboardList } from "lucide-react";
import { MetricsCard } from "@/components/shared/MetricsCards";
import { useGetTransactionStatsQuery } from "@/redux/features/admin/transactions/adminTransactionApi";

const fmt = (n: number) =>
  `₦${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

export function FinancialLedgerCards() {
  const { data, isLoading } = useGetTransactionStatsQuery();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <MetricsCard
        title="Total Revenue"
        value={isLoading ? "—" : fmt(data?.totalRevenue ?? 0)}
        badgeText="+12.4%"
        badgeClassName="bg-blue-50 text-blue-600"
        icon={<Wallet className="w-5 h-5" />}
        iconContainerClassName="bg-blue-50 text-[#0066FF]"
      />
      <MetricsCard
        title="This Month"
        value={isLoading ? "—" : fmt(data?.thisMonthRevenue ?? 0)}
        badgeText="+8.2%"
        badgeClassName="bg-red-50 text-red-500"
        icon={<TrendingUp className="w-5 h-5" />}
        iconContainerClassName="bg-orange-50 text-orange-500"
      />
      <MetricsCard
        title="Pending"
        value={isLoading ? "—" : fmt(data?.pendingValue ?? 0)}
        badgeText={isLoading ? "—" : `${data?.pendingCount ?? 0} Active`}
        badgeClassName="bg-gray-100 text-gray-500"
        icon={<ClipboardList className="w-5 h-5" />}
        iconContainerClassName="bg-gray-100/70 text-gray-500"
      />
    </div>
  );
}
