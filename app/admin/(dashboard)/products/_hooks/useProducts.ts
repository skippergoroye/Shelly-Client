import { useState, useCallback, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetProductsQuery } from "@/redux/features/admin/products/adminProductApi";

export interface Product {
  id: string;
  sku: string;
  name: string;
  image?: string;
  category: string;
  price: number;
  stock: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  description?: string;
  sizes?: string[];
}

function deriveStockStatus(stock: number): Product["stockStatus"] {
  if (stock === 0) return "Out of Stock";
  if (stock <= 5) return "Low Stock";
  return "In Stock";
}

export const useProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data: rawProducts = [], isFetching, isError, refetch } = useGetProductsQuery();

  const allProducts = useMemo<Product[]>(() => {
    const mapped = rawProducts.map((p) => ({
      id: p._id,
      sku: `SHLY-${p._id.slice(-4).toUpperCase()}`,
      name: p.name,
      image: p.images[0] ?? undefined,
      category: p.category,
      price: p.price,
      stock: p.stock,
      stockStatus: deriveStockStatus(p.stock),
      description: p.description,
      sizes: p.sizes.map(String),
    }));

    if (!debouncedSearch) return mapped;

    const term = debouncedSearch.toLowerCase();
    return mapped.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }, [rawProducts, debouncedSearch]);

  const totalResults = allProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const startIndex = totalResults === 0 ? 0 : (page - 1) * pageSize;
  const products = allProducts.slice(startIndex, startIndex + pageSize);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setPage(1);
  }, []);

  return {
    searchQuery,
    setSearchQuery: handleSearchChange,
    page,
    setPage,
    pageSize,
    setPageSize: handlePageSizeChange,
    products,
    totalResults,
    isFetching,
    isError,
    totalPages,
    refetch,
  };
};
