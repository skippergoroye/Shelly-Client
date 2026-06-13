import { Calendar } from "lucide-react";
import SubmitButton from "@/components/shared/SubmitButton";
import { PageHeader } from "@/components/common/PageHeader";

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <PageHeader title="Dashboard Overview" description="Real-time artisan metrics and shop performance." />
      <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
        <SubmitButton
          type="button"
          className="flex items-center gap-2 px-3.5 py-2 border border-gray-200/80 bg-gray-50/50 hover:bg-gray-50 text-xs font-bold text-gray-700 rounded-lg shadow-sm transition-all cursor-pointer h-auto"
        >
          <Calendar className="w-4 h-4 text-gray-500" />
          Last 30 Days
        </SubmitButton>
        <SubmitButton
          type="button"
          className="flex items-center justify-center px-4 py-2 bg-primary text-xs font-bold text-white rounded-lg shadow-md shadow-blue-500/10 transition-all cursor-pointer h-auto border-0"
        >
          Export Report
        </SubmitButton>
      </div>
    </div>
  );
}
