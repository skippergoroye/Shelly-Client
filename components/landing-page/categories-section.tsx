'use client'

import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'

import ImgOne from '../../public/img/shoe-one.png'
import ImgTwo from '../../public/img/shoe-two.png'
import ImgThree from '../../public/img/shoe-three.png'
import ImgFour from '../../public/img/shoe-four.png'

interface Product {
  id: string
  brand: string
  name: string
  price: number
  image: StaticImageData
}

const products: Product[] = [
  {
    id: '1',
    brand: 'OXFORD',
    name: 'The Cobalt Archer',
    price: 1250,
    image: ImgOne,
  },
  {
    id: '2',
    brand: 'CHELSEA',
    name: 'Midnight Stealth',
    price: 1400,
    image: ImgTwo,
  },
  {
    id: '3',
    brand: 'SNEAKER',
    name: 'Aero-Kinetic Low',
    price: 890,
    image: ImgThree,
  },
  {
    id: '4',
    brand: 'BROGUE',
    name: 'Heritage Wingtip',
    price: 1150,
    image: ImgFour,
  },
]

export default function CategorySection() {
  const [addedToCart, setAddedToCart] = useState<string | null>(null)

  const handleAddToCart = (productId: string) => {
    setAddedToCart(productId)

    setTimeout(() => {
      setAddedToCart(null)
    }, 2000)
  }

  return (
    <div className="w-full bg-white px-6 py-12">
    <section className="container-max px-6 md:px-12  w-full bg-white px-6 py-12">
      <div className="mx-auto max-w-7xl bg-white">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-600">
              CURATED EDITIONS
            </p>
            <h1 className="mt-2 text-4xl font-bold text-[color:var(--primary)]">
              The Seasonal Collection
            </h1>
          </div>

          <a
            href="#"
            className="text-sm font-semibold text-[color:var(--primary)] underline"
          >
            View All
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden border border-gray-300 bg-white"
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover p-2"
                  width={500}
                  height={500}
                  priority={product.id === '1'}
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col p-5">
                <p className="text-xs font-bold tracking-wider text-gray-600">
                  {product.brand}
                </p>

                <h3 className="mt-3 text-lg font-bold text-black">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm font-semibold text-blue-600">
                  ${product.price}
                </p>

                <button
                  onClick={() => handleAddToCart(product.id)}
                  className={`mt-4 w-full rounded px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 ${
                    addedToCart === product.id
                      ? 'bg-green-500'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {addedToCart === product.id
                    ? 'Added to Cart'
                    : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}