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
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-600 text-sm">
          Showing {startIndex}–{endIndex} of {totalProducts} products
        </p>

        <div className="flex gap-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="search"
            placeholder="Search products..."
            variant="h-[40px] w-full bg-white"
            leftIcon={<Search size={16} className="text-blue-500" />}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <div className="flex items-center space-x-3">
            <label htmlFor="sort" className="text-gray-600 text-sm font-medium">
              Sort by:
            </label>

            <select
              id="sort"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="newest"
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
