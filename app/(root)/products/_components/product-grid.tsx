"use client";
import { ProductCard } from "./product-card";
import { Search } from "lucide-react";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomFormField";
import { useForm } from "react-hook-form";
import { ProductGridProps } from "../types";

export function ProductGrid({
  products,
  totalProducts,
  currentPage,
  searchTerm,
  onSearchChange,
  onSortChange,
}: ProductGridProps) {
  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(currentPage * 10, totalProducts);

  const form = useForm({
    defaultValues: {
      search: "",
    },
  });

  return (
    <div className="flex-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <p className="text-(--on-surface-variant) text-sm">
          Showing {startIndex}–{endIndex} of {totalProducts} products
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex-1 sm:w-64">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="search"
              placeholder="Search products..."
              variant="h-[40px] w-full bg-[color:var(--surface)]"
              leftIcon={<Search size={16} className="text-primary" />}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-(--on-surface-variant)">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
