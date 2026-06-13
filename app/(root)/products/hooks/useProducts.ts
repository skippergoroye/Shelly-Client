import { useState, useMemo } from 'react'
import { PublicApiProduct, useGetProductsQuery } from '@/redux/features/cart/cartApi'
import { useDebounce } from '@/hooks/useDebounce'

export interface StorefrontProduct {
  id: string
  name: string
  category: string
  price: number
  images: string
  sizes: string[]
}

const transformProduct = (p: PublicApiProduct): StorefrontProduct => ({
  id: p._id,
  name: p.name,
  category: p.category,
  price: p.price,
  images: p.images[0] ?? '',
  sizes: p.sizes.map(String),
})

const PAGE_SIZE = 10

export const useProducts = (selectedCategory?: string) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data: rawProducts = [], isLoading, error } = useGetProductsQuery()

  const allProducts = useMemo<StorefrontProduct[]>(() => {
    let mapped = rawProducts.map(transformProduct)

    if (selectedCategory) {
      mapped = mapped.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase()
      mapped = mapped.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      )
    }

    return mapped
  }, [rawProducts, selectedCategory, debouncedSearch])

  const totalProducts = allProducts.length
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const products = allProducts.slice(startIndex, startIndex + PAGE_SIZE)

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
