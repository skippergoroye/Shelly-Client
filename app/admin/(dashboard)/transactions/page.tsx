"use client";

import { FileDown } from "lucide-react";
import SubmitButton from "@/components/shared/SubmitButton";
import { PageHeader } from "@/components/common/PageHeader";
import TransactionsTable from "./_components/TransactionsTable";
import { FinancialLedgerCards } from "./_components/Financial-ledger-Cards";
import { useExportTransactionsMutation } from "@/redux/features/admin/transactions/adminTransactionApi";
import ToastNotification from "@/components/shared/ToastNotification";

const Transactions = () => {
  const [exportTransactions, { isLoading: isExporting }] = useExportTransactionsMutation();

  const handleExport = async () => {
    try {
      await exportTransactions().unwrap();
    } catch {
      ToastNotification({ title: "Export Failed", description: "Could not download transactions CSV.", type: "error" });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="Financial Ledger" description="Real-time oversight of bespoke craftsmanship sales." />

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <SubmitButton
            type="button"
            clickFn={handleExport}
            isLoading={isExporting}
            loadingText="Exporting…"
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-xs font-bold text-white rounded-lg shadow-md shadow-blue-500/10 transition-all cursor-pointer h-auto border-0"
          >
            <FileDown className="w-4 h-4" />
            Export CSV
          </SubmitButton>
        </div>
      </div>

      <FinancialLedgerCards />

      <TransactionsTable />
    </div>
  );
};

export default Transactions;
