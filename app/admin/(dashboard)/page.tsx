import { DashboardHeader } from "../_components/DashboardHeader";
import { KpiCards } from "../_components/KpiCards";
import { RevenueTrends } from "../_components/RevenueTrends";
import { TopCategories } from "../_components/TopCategories";
import { RecentTransactions } from "../_components/RecentTransactions";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <DashboardHeader />

      {/* KPI Cards */}
      <KpiCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trends */}
        <RevenueTrends />

        {/* Top Categories */}
        <TopCategories />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
}
