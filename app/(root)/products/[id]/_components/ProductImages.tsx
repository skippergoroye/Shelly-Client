'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useGetProductByIdQuery } from '@/redux/features/cart/cartApi'
import RouteLoadingScreen from '@/components/shared/RouteLoadingScreen'

interface ProductImagesProps {
  productId: string
}

export function ProductImages({ productId }: ProductImagesProps) {
  const [selected, setSelected] = useState(0)
  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId)

  if (isLoading) return <RouteLoadingScreen />

  if (isError || !product) {
    return (
      <div className="flex-1 bg-gray-100 rounded-lg min-h-100 flex items-center justify-center text-gray-500">
        Failed to load images.
      </div>
    )
  }

  const images = product.images

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 w-20">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`rounded-lg overflow-hidden border-2 transition-colors ${
              selected === index ? 'border-blue-600' : 'border-gray-200'
            }`}
          >
            <Image
              src={image}
              alt={`${product.name} view ${index + 1}`}
              width={80}
              height={100}
              className="w-full h-24 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 rounded-lg overflow-hidden bg-gray-100">
        {images[selected] ? (
          <Image
            src={images[selected]}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
    </div>
  )
}
