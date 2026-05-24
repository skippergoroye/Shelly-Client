"use client";

import { Download, Plus } from "lucide-react";
import Link from "next/link";
import SubmitButton from "@/components/shared/SubmitButton";

export function InventoryHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-bold text-gray-900 mb-1">Product Inventory</h1>
        <p className="text-sm text-gray-500">Manage your footwear catalog and monitor stock levels.</p>
      </div>
      
      <div className="flex items-center gap-3 cursor-pointer">
        <SubmitButton type="button" className="h-10 px-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-md flex items-center gap-2 text-sm shadow-sm transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </SubmitButton>
        <Link href="/admin/inventory/add">
          <SubmitButton type="button" className="h-10 px-4 bg-[#0A58CA] hover:bg-[#084298] text-white font-medium rounded-md flex items-center gap-2 text-sm shadow-sm transition-colors">
            <Plus className="w-4 h-4" />
            Add Product
          </SubmitButton>
        </Link>
      </div>
    </div>
  );
}