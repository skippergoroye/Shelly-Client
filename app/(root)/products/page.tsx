"use client";

import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/landing-page/Navbar";
import { useState } from "react";
import { Sidebar } from "./_components/sidebar";
import { Pagination } from "./_components/pagination";
import { ProductGrid } from "./_components/product-grid";
import { useGetProductsQuery } from "@/redux/features/cart/cartApi";
import { useProducts } from "./hooks/useProducts";
import ScreenLoader from "@/components/shared/ScreenLoader";
import RouteLoadingScreen from "@/components/shared/RouteLoadingScreen";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    products,
    totalProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
  } = useProducts(selectedCategory || undefined);



  if (isLoading) return <RouteLoadingScreen />;

  
  // if (isLoading) return <ScreenLoader open={isLoading} />;
  // if (isLoading) return <div>Loading products...</div>;
  if (error){
    //  console.log("products", error)
    return <div>Error loading products</div>;

  } 


 
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Shop All</h1>
          <p className="text-gray-600 text-base">
            Discover our curated selection of high-end essentials designed for modern life.
          </p>
        </div> */}

        <div className="flex gap-8">
          <Sidebar onCategoryChange={setSelectedCategory} />

          <ProductGrid
            products={products}
            totalProducts={totalProducts}
            currentPage={currentPage}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSortChange={(value) => console.log('Sort:', value)}
          />
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Products;
