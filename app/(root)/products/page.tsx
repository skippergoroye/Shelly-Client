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
    <div className="flex flex-col min-h-screen bg-[color:var(--background)]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[color:var(--on-surface)] tracking-tight mb-4 font-sans">
            The Bespoke Series
          </h1>
          <p className="text-[color:var(--on-surface-variant)] text-[17px] max-w-2xl leading-relaxed">
            A curated selection of technical footwear, blending ancestral construction with
            modern high-energy aesthetics. Each pair is finished by hand in our London
            atelier.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-8">
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
