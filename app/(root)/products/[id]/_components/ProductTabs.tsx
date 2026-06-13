'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useGetProductByIdQuery } from '@/redux/features/cart/cartApi'

interface ProductTabsProps {
  productId: string
}

export function ProductTabs({ productId }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0)
  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId)

  if (isLoading) {
    return (
      <div className="border-t border-gray-200 pt-8 animate-pulse space-y-4">
        <div className="h-8 w-40 bg-gray-200 rounded" />
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 w-32 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-24 bg-gray-200 rounded" />
      </div>
    )
  }

  if (isError || !product) return null

  const tabs = [
    {
      label: 'Description',
      content: (
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      ),
    },
    {
      label: 'Sizes Available',
      content: (
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700"
            >
              EU {size}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: 'Delivery & Returns',
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Check size={20} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-gray-700">Free shipping on orders over ₦500</p>
          </div>
          <div className="flex items-start gap-3">
            <Check size={20} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-gray-700">30-day hassle-free returns</p>
          </div>
          <div className="flex items-start gap-3">
            <Check size={20} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-gray-700">1 year craftsmanship warranty</p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="border-t border-gray-200 pt-8 mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>

      {/* Tab buttons */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 -mb-px ${
              activeTab === index
                ? 'text-gray-900 border-gray-900'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">{tabs[activeTab].content}</div>
    </div>
  )
}
