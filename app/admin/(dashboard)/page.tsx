import { DashboardHeader } from "./_components/DashboardHeader";
import { KpiCards } from "./_components/KpiCards";
import { RevenueTrends } from "./_components/RevenueTrends";
import { ArtisansInsight } from "./_components/ArtisansInsight";
import { RecentTransactions } from "./_components/RecentTransactions";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 mx-auto pb-12">
   
      <DashboardHeader />

   
      <KpiCards />

   
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <RevenueTrends />

     
        <ArtisansInsight />
      </div>

    
      <RecentTransactions />
    </div>
  );
}
