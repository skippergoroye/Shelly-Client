import { useState } from 'react'
import { useGetProductsQuery, useSearchProductsQuery, useGetProductsByCategoryQuery } from '@/redux/features/cart/cartApi'
import { useDebounce } from '@/hooks/useDebounce'

interface TransformedProduct {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  images: string
  rating: number
  badge?: 'NEW' | 'SALE'
  badgeColor?: 'bg-blue-600' | 'bg-orange-600'
}

const transformProduct = (product: any): TransformedProduct => ({
  id: product.id.toString(),
  name: product.title,
  category: product.category,
  price: product.price,
  originalPrice: product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : undefined,
  images: product.images[0],
  rating: product.rating,
  badge: product.discountPercentage > 0 ? 'SALE' : undefined,
  badgeColor: product.discountPercentage > 0 ? 'bg-orange-600' : undefined,
})

export const useProducts = (selectedCategory?: string) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const limit = 10
  const skip = (currentPage - 1) * limit

  // Fetch paginated products
  const { data: paginatedData, isLoading: paginatedLoading, error: paginatedError } = useGetProductsQuery({ limit, skip })

  // Fetch search results
  const { data: searchResults } = useSearchProductsQuery(debouncedSearchTerm, {
    skip: !debouncedSearchTerm,
  })

  // Fetch products by category
  const { data: categoryData, isLoading: categoryLoading, error: categoryError } = useGetProductsByCategoryQuery(selectedCategory || '', {
    skip: !selectedCategory,
  })

  // Determine which products to display and loading state
  let rawProducts = []
  let isLoading = paginatedLoading
  let error = paginatedError

  if (debouncedSearchTerm && searchResults?.products) {
    rawProducts = searchResults.products
  } else if (selectedCategory && categoryData?.products) {
    rawProducts = categoryData.products
    isLoading = categoryLoading
    error = categoryError
  } else {
    rawProducts = paginatedData?.products || []
    isLoading = paginatedLoading
    error = paginatedError
  }

  const products = rawProducts.map(transformProduct)
  let totalProducts = paginatedData?.total || 0
  
  if (debouncedSearchTerm && searchResults?.total) {
    totalProducts = searchResults.total
  } else if (selectedCategory && categoryData?.total) {
    totalProducts = categoryData.total
  }

  const totalPages = Math.ceil(totalProducts / limit)

  return {
    products,
    totalProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
  }
}