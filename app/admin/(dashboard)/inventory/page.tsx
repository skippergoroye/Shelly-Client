"use client";

import React, { useMemo, useState } from "react";
import { Download, Plus, CheckCircle2, AlertTriangle, Info, MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/ui/dataTable";

export type InventoryItem = {
  model: string;
  sku: string;
  category: string;
  price: number;
  stockLevel: number;
  stockLevelPercentage: number;
  status: "In Stock" | "Low Stock" | "Reorder Soon";
  imageColor: string;
  imageClipPath: string;
};

const mockData: InventoryItem[] = [
  {
    model: "Nike Air Max 270",
    sku: "NIKE-AM270-001",
    category: "Sneakers",
    price: 150.00,
    stockLevel: 42,
    stockLevelPercentage: 42,
    status: "In Stock",
    imageColor: "bg-red-500",
    imageClipPath: "polygon(0% 60%, 20% 50%, 60% 50%, 100% 80%, 100% 100%, 0% 100%)",
  },
  {
    model: "Classic Timberland Boot",
    sku: "TIMB-CLS-6IN",
    category: "Boots",
    price: 190.00,
    stockLevel: 5,
    stockLevelPercentage: 5,
    status: "Low Stock",
    imageColor: "bg-yellow-700",
    imageClipPath: "polygon(20% 20%, 60% 10%, 80% 50%, 80% 100%, 20% 100%)",
  },
  {
    model: "Adidas Ultraboost 22",
    sku: "ADID-UB22-WHT",
    category: "Sneakers",
    price: 180.00,
    stockLevel: 124,
    stockLevelPercentage: 90,
    status: "In Stock",
    imageColor: "bg-gray-300",
    imageClipPath: "polygon(0% 60%, 20% 50%, 60% 50%, 100% 80%, 100% 100%, 0% 100%)",
  },
  {
    model: "Luxury Leather Oxford",
    sku: "LXRY-OXF-BRN",
    category: "Formal",
    price: 295.00,
    stockLevel: 18,
    stockLevelPercentage: 18,
    status: "Reorder Soon",
    imageColor: "bg-[#3e2723]",
    imageClipPath: "polygon(10% 40%, 40% 30%, 90% 60%, 90% 100%, 10% 100%)",
  },
];

export default function InventoryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data] = useState<InventoryItem[]>(mockData);

  const columns: ColumnDef<InventoryItem>[] = useMemo(
    () => [
      {
        accessorKey: "model",
        header: "SHOE MODEL",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200 p-1">
                <div 
                  className={`w-full h-full rounded-md opacity-80 ${item.imageColor}`} 
                  style={{ clipPath: item.imageClipPath }}
                ></div>
              </div>
              <span className="font-bold text-gray-900 w-32 md:w-auto break-words">{item.model}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => {
          const sku = row.original.sku;
          return (
            <span className="text-gray-500 font-medium break-all max-w-[80px] inline-block leading-tight">
              {sku.split('-').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && "-"}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </span>
          );
        },
      },
      {
        accessorKey: "category",
        header: "CATEGORY",
        cell: ({ row }) => {
          const category = row.original.category;
          let badgeClass = "bg-gray-100 text-gray-700";
          if (category === "Sneakers") badgeClass = "bg-[#EBF3FF] text-[#0A58CA]";
          else if (category === "Boots") badgeClass = "bg-orange-100 text-orange-700";
          return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeClass}`}>
              {category}
            </span>
          );
        },
      },
      {
        accessorKey: "price",
        header: "PRICE",
        cell: ({ row }) => {
          const price = parseFloat(row.getValue("price"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price);
          return <span className="text-gray-900 font-medium">{formatted}</span>;
        },
      },
      {
        accessorKey: "stockLevel",
        header: "STOCK LEVEL",
        cell: ({ row }) => {
          const item = row.original;
          let textColor = "text-[#0A58CA]";
          let barColor = "bg-[#0A58CA]";
          if (item.status === "Low Stock") {
            textColor = "text-red-600";
            barColor = "bg-red-600";
          }
          return (
            <div className="flex flex-col gap-1.5 w-24">
              <span className={`text-xs font-bold ${textColor}`}>{item.stockLevel} Units</span>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${barColor}`} style={{ width: `${item.stockLevelPercentage}%` }}></div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ row }) => {
          const status = row.original.status;
          if (status === "In Stock") {
            return (
              <div className="flex items-center gap-1.5 text-[#0A58CA] font-bold text-xs">
                <CheckCircle2 className="w-[14px] h-[14px]" />
                In Stock
              </div>
            );
          }
          if (status === "Low Stock") {
            return (
              <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 font-bold text-xs px-2.5 py-1 rounded-md whitespace-nowrap">
                <AlertTriangle className="w-[14px] h-[14px]" />
                Low Stock
              </div>
            );
          }
          return (
            <div className="flex items-center gap-1.5 text-gray-600 font-bold text-xs whitespace-nowrap">
              <Info className="w-[14px] h-[14px]" />
              Reorder<br />Soon
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: () => {
          return (
            <div className="text-right">
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 mb-1">Product Inventory</h1>
          <p className="text-sm text-gray-500">Manage your footwear catalog and monitor stock levels.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-md flex items-center gap-2 text-sm shadow-sm transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="h-10 px-4 bg-[#0A58CA] hover:bg-[#084298] text-white font-medium rounded-md flex items-center gap-2 text-sm shadow-sm transition-colors">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Total SKU</p>
          <h3 className="text-[28px] font-bold text-[#0A58CA]">1,284</h3>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Out of Stock</p>
          <h3 className="text-[28px] font-bold text-red-600">12</h3>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Low Stock</p>
          <h3 className="text-[28px] font-bold text-orange-600">48</h3>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Inventory Value</p>
          <h3 className="text-[28px] font-bold text-gray-900">$242.5k</h3>
        </div>
      </div>

      {/* Inventory Table powered by your Custom UI DataTable */}
      <DataTable
        columns={columns}
        data={data}
        loading={isLoading}
        emptyDataMessage="No inventory found."
      />
    </div>
  );
}
