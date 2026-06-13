import Link from "next/link";
import { Plus } from "lucide-react";
import SubmitButton from "@/components/shared/SubmitButton";
import { PageHeader } from "@/components/common/PageHeader";
import TransactionsTable from "./_components/TransactionsTable";

const Transactions = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="Financial Ledger" description="Real-time oversight of bespoke craftsmanship sales." />

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          {/* <Link href="/admin/products/add-new-product"> */}


              <SubmitButton
              type="button"
              className="flex items-center justify-center px-4 py-2 bg-primary text-xs font-bold text-white rounded-lg shadow-md shadow-blue-500/10 transition-all cursor-pointer h-auto border-0"
            >
              <Plus />
              Filter
            </SubmitButton>
            <SubmitButton
              type="button"
              className="flex items-center justify-center px-4 py-2 bg-primary text-xs font-bold text-white rounded-lg shadow-md shadow-blue-500/10 transition-all cursor-pointer h-auto border-0"
            >
              <Plus />
              Export CSV
            </SubmitButton>
          {/* </Link> */}
        </div>
      </div>

      <div></div>

      <TransactionsTable />
    </div>
  );
};

export default Transactions;
