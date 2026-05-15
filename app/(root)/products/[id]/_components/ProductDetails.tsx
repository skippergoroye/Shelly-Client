'use client'

import { useState } from 'react'
import { Star, Heart, ShoppingCart, Truck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetProductByIdQuery } from '@/redux/features/cart/cartApi'
import RouteLoadingScreen from '@/components/shared/RouteLoadingScreen'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/features/cart/cartSlice'
import ToastNotification from '@/components/shared/ToastNotification'

const colors = [
  { name: 'Camel Beige', value: 'bg-amber-100' },
  { name: 'Black', value: 'bg-black' },
  { name: 'Dark Green', value: 'bg-emerald-900' },
]

const sizes = ['XS', 'S', 'M', 'L', 'XL']

interface ProductDetailsProps {
  productId: string
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const dispatch = useDispatch()

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId)

  if (isLoading) return <RouteLoadingScreen />

  if (isError || !product) {
    return (
      <div className="text-gray-500">
        Failed to load product details.
      </div>
    )
  }

  const handleAddToCart = async () => {
    try {
      setIsAdding(true)

      dispatch(
        addToCart({
          id: productId,
          name: product.title,
          price: product.price,
          quantity: 1,
          images: product.images?.[0] ?? product.thumbnail,
          category: product.category,
          rating: product.rating,
        })
      )

      ToastNotification({
        title: `${product.title} added to cart!`,
        description: 'Item has been added to your cart.',
        type: 'success',
      })
    } catch (error) {
      ToastNotification({
        title: 'Error',
        description: 'Failed to add item to cart.',
        type: 'error',
      })
    } finally {
      setTimeout(() => {
        setIsAdding(false)
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="inline-block w-fit">
        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
          {product.availabilityStatus.toUpperCase()}
        </span>
      </div>

      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {product.title}
        </h1>

        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-blue-600">
            NGN{product.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.round(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300'
                }
              />
            ))}

            <span className="text-gray-600 text-sm ml-2">
              ({product.reviews.length} Reviews)
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">
        {product.description}
      </p>

      {/* Color */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Color: {colors[selectedColor].name}
        </label>

        <div className="flex gap-3">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(index)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor === index
                  ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900'
                  : 'border-gray-300'
              } ${color.value}`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-900">
            Select Size
          </label>

          <a
            href="#"
            className="text-blue-600 text-xs font-semibold hover:underline"
          >
            Size Guide
          </a>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(sizes.indexOf(size))}
              className={`py-2 px-4 rounded-lg border-2 font-semibold transition-all ${
                selectedSize === sizes.indexOf(size)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-900 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Button
        size="lg"
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <ShoppingCart size={20} />

        {isAdding ? 'Adding...' : 'Add to Cart'}
      </Button>

      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold hover:border-gray-400 transition-colors"
      >
        <Heart
          size={20}
          fill={isWishlisted ? 'currentColor' : 'none'}
        />

        Save to Wishlist
      </button>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <Truck size={20} className="text-gray-700" />

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Free Shipping
            </p>

            <p className="text-xs text-gray-600">
              On orders over NGN500
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Shield size={20} className="text-gray-700" />

          <div>
            <p className="text-sm font-semibold text-gray-900">
              {product.warrantyInformation}
            </p>

            <p className="text-xs text-gray-600">
              {product.returnPolicy}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}