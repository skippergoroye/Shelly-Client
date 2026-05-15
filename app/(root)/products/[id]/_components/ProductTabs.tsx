'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useGetProductByIdQuery } from '@/redux/features/cart/cartApi'

const tabs = [
  {
    label: 'Material & Care',
    content: (
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700">100% Grade A Mongolian Cashmere</p>
        </div>
        <div className="flex items-start gap-3">
          <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700">100% Pure Silk Lining</p>
        </div>
        <div className="flex items-start gap-3">
          <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700">Dry clean only</p>
        </div>
      </div>
    ),
  },
  {
    label: 'Fit & Measurements',
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Model is wearing:</p>
            <p className="text-gray-900 font-semibold">Size S</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Model height:</p>
            <p className="text-gray-900 font-semibold">6&apos;10" / 178cm</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Length:</p>
            <p className="text-gray-900 font-semibold">45.5" / 115cm</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Key Features',
    content: (
      <div className="space-y-3">
        <p className="text-gray-700">
          Features traditional notch lapels, structured shoulders, and deep welt pockets. The jacket
          features a single vent for effortless movement and a refined drape.
        </p>
      </div>
    ),
  },
]


interface ProductTabsProps {
  productId: string
}

export function ProductTabs({ productId }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0)
    const { data: product, isLoading, isError } = useGetProductByIdQuery(productId)

  if (isLoading) return (
    <div className="border-t border-gray-200 pt-8 animate-pulse space-y-4">
      <div className="h-8 w-40 bg-gray-200 rounded" />
      <div className="flex gap-4">
        {[...Array(3)].map((_, i) => <div key={i} className="h-10 w-32 bg-gray-200 rounded" />)}
      </div>
      <div className="h-24 bg-gray-200 rounded" />
    </div>
  )

  if (isError || !product) return null

  return (
    <div className="border-t border-gray-200 pt-8">
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
