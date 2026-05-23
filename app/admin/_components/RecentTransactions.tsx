"use client";

import { MoreVertical } from "lucide-react";
import DataTable from "@/components/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import SubmitButton from "@/components/shared/SubmitButton";

type Transaction = {
  id: string;
  init: string;
  initColor: string;
  name: string;
  date: string;
  total: string;
  status: string;
  statusColor: string;
};

const data: Transaction[] = [
  { 
    id: "#LX-8890", 
    init: "JS", 
    initColor: "bg-[#DDE5F4] text-[#0A58CA]", 
    name: "Julianne Smith", 
    date: "Oct 24, 2023", 
    total: "$2,450.00", 
    status: "COMPLETED", 
    statusColor: "bg-[#D1FADF] text-[#039855]" 
  },
  { 
    id: "#LX-8891", 
    init: "MR", 
    initColor: "bg-[#FCECDA] text-[#B54708]", 
    name: "Marcus Reed", 
    date: "Oct 24, 2023", 
    total: "$890.00", 
    status: "PENDING", 
    statusColor: "bg-[#FEF0C7] text-[#B54708]" 
  },
  { 
    id: "#LX-8892", 
    init: "EL", 
    initColor: "bg-[#DDE5F4] text-[#0A58CA]", 
    name: "Elena Laurent", 
    date: "Oct 23, 2023", 
    total: "$12,100.00", 
    status: "COMPLETED", 
    statusColor: "bg-[#D1FADF] text-[#039855]" 
  },
  { 
    id: "#LX-8893", 
    init: "DB", 
    initColor: "bg-[#FEE4E2] text-[#D92D20]", 
    name: "David Brooks", 
    date: "Oct 23, 2023", 
    total: "$450.00", 
    status: "CANCELLED", 
    statusColor: "bg-[#FEE4E2] text-[#D92D20]" 
  },
];

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-bold text-gray-700 py-2">Order ID</div>,
    cell: ({ row }) => <span className="font-medium text-[#0A58CA]">{row.original.id}</span>,
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold text-gray-700 py-2">Customer</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 py-1">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${row.original.initColor}`}>
          {row.original.init}
        </div>
        <span className="font-medium text-gray-800">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: () => <div className="font-bold text-gray-700 py-2">Date</div>,
    cell: ({ row }) => <span className="text-gray-600">{row.original.date}</span>,
  },
  {
    accessorKey: "total",
    header: () => <div className="font-bold text-gray-700 py-2">Total</div>,
    cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.total}</span>,
  },
  {
    accessorKey: "status",
    header: () => <div className="font-bold text-gray-700 py-2">Status</div>,
    cell: ({ row }) => (
      <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${row.original.statusColor}`}>
        {row.original.status}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="font-bold text-gray-700 text-right py-2">Actions</div>,
    cell: () => (
      <div className="flex justify-end pr-2">
        <SubmitButton type="button" className="text-gray-500 hover:text-gray-700 transition-colors bg-transparent hover:bg-transparent border-0 shadow-none p-0 h-auto">
          <MoreVertical className="w-5 h-5" />
        </SubmitButton>
      </div>
    ),
  },
];

export function RecentTransactions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-8">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-[22px] font-bold text-gray-900">Recent Transactions</h3>
        <SubmitButton type="button" className="text-sm font-medium text-[#0A58CA] hover:text-blue-800 flex items-center gap-1 transition-colors bg-transparent hover:bg-transparent border-0 shadow-none p-0 h-auto">
          View All <span className="text-lg leading-none">›</span>
        </SubmitButton>
      </div>
      
      <div className="p-0 [&_th]:border-b [&_th]:border-gray-200 [&_td]:border-b [&_td]:border-gray-100 [&_td]:py-4 [&_th]:px-6 [&_td]:px-6">
        <DataTable columns={columns} data={data} className="border-0 rounded-none shadow-none" />
      </div>

      <div className="p-6 bg-[#F8FAFC] flex items-center justify-between border-t border-gray-100">
        <p className="text-sm text-gray-500 font-medium">Showing {data.length} of 24 transactions</p>
        <div className="flex items-center gap-3">
          <SubmitButton type="button" className="px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border border-gray-200 rounded-md hover:bg-gray-50 transition-colors h-auto">
            Previous
          </SubmitButton>
          <SubmitButton type="button" className="px-4 py-2 text-sm font-medium text-white bg-[#0A3D91] hover:bg-[#082f70] rounded-md transition-colors shadow-sm h-auto">
            Next
          </SubmitButton>
        </div>
      </div>
    </div>
  );
}


