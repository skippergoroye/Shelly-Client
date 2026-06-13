'use client'

import { useState } from 'react'
import SubmitButton from '@/components/shared/SubmitButton'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/features/cart/cartSlice'
import ToastNotification from '@/components/shared/ToastNotification'
import { useGetProductsQuery } from '@/redux/features/cart/cartApi'
import Link from 'next/link'
import RouteLoadingScreen from '@/components/shared/RouteLoadingScreen'

export default function CategorySection() {
  const dispatch = useDispatch()
  const [addedToCart, setAddedToCart] = useState<string | null>(null)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})

  const { data: rawProducts = [], isLoading } = useGetProductsQuery()
  const products = rawProducts.slice(0, 4)

  const getSizeForProduct = (productId: string, defaultSize: string) =>
    selectedSizes[productId] ?? defaultSize

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }))
  }

  const handleAddToCart = (product: typeof products[number]) => {
    const sizes = product.sizes.map(String)
    const size = getSizeForProduct(product._id, sizes[0] ?? '40')

    dispatch(
      addToCart({
        id: `home-${product._id}-${size}`,
        name: `${product.name} (EU ${size})`,
        price: product.price,
        quantity: 1,
        images: product.images[0] ?? '',
        category: product.category,
        rating: 0,
      })
    )

    ToastNotification({
      title: `${product.name} (EU ${size}) added!`,
      description: 'Item has been added to your cart.',
      type: 'success',
    })

    setAddedToCart(product._id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  if (isLoading) return <RouteLoadingScreen />

  return (
    <div className="w-full bg-background px-6 py-12">
      <section className="container-max px-6 md:px-12 w-full bg-background py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest text-(--on-surface-variant)">
                CURATED EDITIONS
              </p>
              <h1 className="mt-2 text-4xl font-bold text-primary">
                The Seasonal Collection
              </h1>
            </div>

            <Link
              href="/products"
              className="text-sm font-semibold text-primary underline"
            >
              View All
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const sizes = product.sizes.map(String)
              const selectedSize = getSizeForProduct(product._id, sizes[0] ?? '40')
              const image = product.images[0]

              return (
                <div
                  key={product._id}
                  className="overflow-hidden border border-(--outline-variant) bg-[color:var(--surface)]"
                >
                  {/* Product Image */}
                  <Link href={`/products/${product._id}`}>
                    <div className="aspect-square overflow-hidden bg-[color:var(--surface)]">
                      {image ? (
                        <img
                          src={image}
                          alt={product.name}
                          className="h-full w-full object-cover p-2"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-100">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex flex-col p-5">
                    <p className="text-xs font-bold tracking-wider text-[color:var(--on-surface-variant)]">
                      {product.category.toUpperCase()}
                    </p>

                    <h3 className="mt-3 text-lg font-bold text-[color:var(--on-surface)]">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-[color:var(--primary)]">
                      ₦{product.price.toLocaleString()}
                    </p>

                    {/* Size Picker */}
                    <div className="mt-4">
                      <span className="text-[10px] font-bold text-[color:var(--on-surface-variant)] uppercase tracking-widest block mb-2">
                        Size (EU)
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => handleSizeSelect(product._id, size)}
                            className={`w-8 h-8 text-[11px] font-bold transition-all border flex items-center justify-center cursor-pointer ${
                              selectedSize === size
                                ? 'bg-[color:var(--primary)] text-white border-[color:var(--primary)]'
                                : 'border-[color:var(--outline-variant)] text-[color:var(--on-surface-variant)] bg-[color:var(--surface)] hover:border-[color:var(--outline)]'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <SubmitButton
                      type="button"
                      clickFn={() => handleAddToCart(product)}
                      className="mt-4 w-full px-4 py-5.5 bg-[color:var(--primary)] text-sm font-semibold text-white transition-colors duration-200"
                    >
                      {addedToCart === product._id ? 'Added to Cart' : 'Add to Cart'}
                    </SubmitButton>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
