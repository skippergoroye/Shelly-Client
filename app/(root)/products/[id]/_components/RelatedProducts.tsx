'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState } from 'react'

const products = [
  {
    id: 1,
    name: 'Merino Wool Turtleneck',
    price: 245.00,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
  },
  {
    id: 2,
    name: 'Tailored Wool Trousers',
    price: 395.00,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
  },
  {
    id: 3,
    name: 'Heritage Leather Boots',
    price: 625.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  },
  {
    id: 4,
    name: 'Luxe Silk Scarf',
    price: 185.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
  },
]

export function RelatedProducts({ productId }: { productId: string }) {
  const [wishlisted, setWishlisted] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    setWishlisted((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="border-t border-gray-200 pt-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete the Look</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={350}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <Heart
                  size={20}
                  className={wishlisted.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-900'}
                />
              </button>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
            <p className="text-gray-600 text-sm mt-1">₦{product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
