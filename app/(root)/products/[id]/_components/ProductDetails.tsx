'use client'

import { useState } from 'react'
import { ShoppingCart, Truck, Shield } from 'lucide-react'
import { useGetProductByIdQuery } from '@/redux/features/cart/cartApi'
import RouteLoadingScreen from '@/components/shared/RouteLoadingScreen'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/features/cart/cartSlice'
import ToastNotification from '@/components/shared/ToastNotification'
import SubmitButton from '@/components/shared/SubmitButton'

interface ProductDetailsProps {
  productId: string
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const dispatch = useDispatch()

  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId)

  if (isLoading) return <RouteLoadingScreen />

  if (isError || !product) {
    return (
      <div className="text-(--on-surface-variant)">
        Failed to load product details.
      </div>
    )
  }

  const sizes = product.sizes.map(String)
  const activeSize = selectedSize ?? sizes[0] ?? ''
  const isInStock = product.stock > 0

  const handleAddToCart = () => {
    setIsAdding(true)
    dispatch(
      addToCart({
        id: `${productId}-${activeSize}`,
        productId,
        name: `${product.name} (EU ${activeSize})`,
        price: product.price,
        quantity: 1,
        images: product.images[0] ?? '',
        category: product.category,
        rating: 0,
      })
    )
    ToastNotification({
      title: `${product.name} (EU ${activeSize}) added!`,
      description: 'Item has been added to your cart.',
      type: 'success',
    })
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Availability badge */}
      <div className="inline-block w-fit">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            isInStock
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {isInStock ? 'IN STOCK' : 'OUT OF STOCK'}
        </span>
      </div>

      <div>
        <h1 className="text-4xl font-bold text-[color:var(--on-surface)] mb-4">
          {product.name}
        </h1>
        <span className="text-3xl font-bold text-[color:var(--primary)]">
          ₦{product.price.toLocaleString()}
        </span>
      </div>

      <p className="text-[color:var(--on-surface-variant)] text-sm leading-relaxed">
        {product.description}
      </p>

      {/* Size picker */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-[color:var(--on-surface)]">
            Select Size (EU)
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`py-2 px-4 rounded-lg border-2 font-semibold transition-all ${
                activeSize === size
                  ? 'bg-[color:var(--primary)] text-white border-[color:var(--primary)]'
                  : 'border-[color:var(--outline-variant)] text-[color:var(--on-surface)] hover:border-[color:var(--outline)]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <SubmitButton
        type="button"
        clickFn={handleAddToCart}
        isLoading={isAdding}
        disabled={!isInStock}
        className="w-full bg-[color:var(--primary)] hover:bg-[color:var(--primary)]/80 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 shadow-none"
      >
        <ShoppingCart size={20} />
        {isAdding ? 'Adding…' : 'Add to Cart'}
      </SubmitButton>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[color:var(--outline-variant)]">
        <div className="flex items-center gap-3">
          <Truck size={20} className="text-[color:var(--on-surface-variant)]" />
          <div>
            <p className="text-sm font-semibold text-[color:var(--on-surface)]">Free Shipping</p>
            <p className="text-xs text-[color:var(--on-surface-variant)]">On orders over ₦500</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-[color:var(--on-surface-variant)]" />
          <div>
            <p className="text-sm font-semibold text-[color:var(--on-surface)]">1 Year Warranty</p>
            <p className="text-xs text-[color:var(--on-surface-variant)]">30-day returns</p>
          </div>
        </div>
      </div>
    </div>
  )
}
