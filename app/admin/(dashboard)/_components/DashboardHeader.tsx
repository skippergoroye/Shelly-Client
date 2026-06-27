'use client';

import { FileDown } from 'lucide-react';
import SubmitButton from '@/components/shared/SubmitButton';
import { PageHeader } from '@/components/common/PageHeader';
import { useExportDashboardMutation } from '@/redux/features/admin/dashboard/adminDashboardApi';
import ToastNotification from '@/components/shared/ToastNotification';

export function DashboardHeader() {
  const [exportDashboard, { isLoading: isExporting }] = useExportDashboardMutation();

  const handleExport = async () => {
    try {
      await exportDashboard().unwrap();
    } catch {
      ToastNotification({
        title: 'Export Failed',
        description: 'Could not download dashboard report.',
        type: 'error',
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <PageHeader
        title="Dashboard Overview"
        description="Real-time artisan metrics and shop performance."
      />
      <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
        <SubmitButton
          type="button"
          clickFn={handleExport}
          isLoading={isExporting}
          loadingText="Exporting…"
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-xs font-bold text-white rounded-lg shadow-md shadow-blue-500/10 transition-all cursor-pointer h-auto border-0"
        >
          <FileDown className="w-4 h-4" />
          Export Report
        </SubmitButton>
      </div>
    </div>
  );
}
