'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { useState } from 'react'
import type { CheckedState } from '@radix-ui/react-checkbox'

const colors = [
  { name: 'black', hex: '#000000' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'blue', hex: '#2563EB' },
  { name: 'light gray', hex: '#D1D5DB' },
  { name: 'brown', hex: '#92400E' },
]

interface SidebarProps {
  onCategoryChange?: (category: string | null) => void
}

export function Sidebar({ onCategoryChange }: SidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [inStockOnly, setInStockOnly] = useState(false)

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategories === category ? null : category
    setSelectedCategories(newCategory)
    onCategoryChange?.(newCategory)
  }

  const handleStockChange = (checked: CheckedState) => {
    setInStockOnly(checked === true)
  }

  return (
    <aside className="w-56 bg-white rounded-lg p-6">
    
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">
          Category
        </h3>

        <div className="space-y-3">
          {['fragrances', 'beauty', 'furniture', 'groceries', 'Tech Gear'].map(
            (category) => (
              <label
                key={category}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Checkbox
                  checked={selectedCategories === category}
                  onCheckedChange={() => handleCategoryChange(category)}
                  className="rounded-sm"
                />

                <span className="text-gray-700 text-sm">{category}</span>
              </label>
            )
          )}
        </div>
      </div>

   
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">
          Price Range
        </h3>

        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={1000}
          step={50}
          className="mb-3"
        />

        <div className="flex justify-between text-xs text-gray-600">
          <span>NGN{priceRange[0]}</span>
          <span>NGN{priceRange[1]}+</span>
        </div>
      </div>

    
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">
          Color
        </h3>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-all cursor-pointer"
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

    
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">
          Rating
        </h3>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <Checkbox
                checked={selectedRating === rating}
                onCheckedChange={() =>
                  setSelectedRating(
                    selectedRating === rating ? null : rating
                  )
                }
                className="rounded-sm"
              />

              <div className="flex items-center space-x-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-yellow-500">
                    ★
                  </span>
                ))}

                <span className="text-gray-600 text-sm ml-1">
                  {rating} up
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">
          Availability
        </h3>

        <label className="flex items-center space-x-3 cursor-pointer">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={handleStockChange}
            className="rounded-sm"
          />

          <span className="text-gray-700 text-sm">
            In Stock Only
          </span>
        </label>
      </div>
    </aside>
  )
}