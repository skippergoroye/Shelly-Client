"use client";

import { Pencil, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import DataTable, { FilterField, FilterValues } from "@/components/shared/DataTable";
import { DateRange } from "@/components/common/DateFilter";
import SubmitButton from "@/components/shared/SubmitButton";
import { Product } from "../_data/products";
import { useProducts } from "../_hooks/useProducts";

// ── Stock status styles ────────────────────────────────
const STOCK_STATUS_STYLES: Record<Product["stockStatus"], { dot: string; text: string }> = {
  "In Stock":     { dot: "bg-green-500",  text: "text-gray-700" },
  "Low Stock":    { dot: "bg-yellow-500", text: "text-gray-700" },
  "Out of Stock": { dot: "bg-red-500",    text: "text-gray-700" },
};

// ── Filter fields ──────────────────────────────────────
const FILTER_FIELDS: FilterField[] = [
  {
    key: "stockStatus",
    label: "Stock Status",
    type: "select",
    options: [
      { label: "In Stock",     value: "In Stock" },
      { label: "Low Stock",    value: "Low Stock" },
      { label: "Out of Stock", value: "Out of Stock" },
    ],
  },
  { key: "category", label: "Category", type: "text", placeholder: "e.g. Bespoke Casual" },
  { key: "name",     label: "Product",  type: "text", placeholder: "e.g. Volt Derby"     },
];

// ── Component ──────────────────────────────────────────
const ProductTable = () => {
  const {
    products,
    totalResults,
    isFetching,
    pageSize,
    page,
    setPage,
    setPageSize,
  } = useProducts();

  const columns: ColumnDef<Product, any>[] = [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                  N/A
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-gray-800">{product.name}</span>
              <span className="text-[10px] text-gray-400 font-medium">SKU: {product.sku}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ getValue }) => (
        <span className="text-xs text-gray-500 font-medium">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ getValue }) => (
        <span className="text-xs font-bold text-[#0066FF]">
          ${getValue<number>().toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      accessorKey: "stockStatus",
      header: "Stock Status",
      cell: ({ row }) => {
        const { stockStatus, stock } = row.original;
        const styles = STOCK_STATUS_STYLES[stockStatus];
        const label =
          stockStatus === "Out of Stock"
            ? "Out of Stock"
            : `${stock} ${stockStatus}`;
        return (
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full shrink-0 ${styles.dot}`} />
            <span className={`text-xs font-medium ${styles.text}`}>{label}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Link href={`/admin/products/${row.original.id}`}>
            <span className="flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors p-1.5 hover:bg-blue-50 rounded cursor-pointer">
              <Pencil className="w-3.5 h-3.5" />
            </span>
          </Link>
          <SubmitButton
            type="button"
            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded cursor-pointer bg-transparent border-0 shadow-none h-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </SubmitButton>
        </div>
      ),
    },
  ];

  const handleFilters = (values: FilterValues, dateRange: DateRange) => {
    console.log("Applied filters:", values, dateRange);
  };

  return (
    <DataTable<Product>
      title="Product Catalog"
      columns={columns}
      data={products}
      searchPlaceholder="Search products..."
      pageSize={pageSize}
      totalCount={totalResults}
      emptyMessage={isFetching ? "Loading products…" : "No matching products found."}
      filterFields={FILTER_FIELDS}
      onApplyFilters={handleFilters}
    />
  );
};

export default ProductTable;
