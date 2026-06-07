'use client';

import Image from 'next/image';
import { Minus, Plus, BookmarkIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface CartItemsProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  onQuantityChange?: (newQuantity: number) => void;
  onSaveForLater?: () => void;
  onRemove?: () => void;
}

/** Extracts the EU size from a name like "Air Max (EU 42)" → { baseName: "Air Max", size: "EU 42" } */
function parseNameAndSize(title: string): { baseName: string; size: string | null } {
  const match = title.match(/^(.+?)\s*\(EU\s*(\d+)\)$/);
  if (match) {
    return { baseName: match[1].trim(), size: `EU ${match[2]}` };
  }
  return { baseName: title, size: null };
}

export default function CartItems({
  id,
  image,
  title,
  description,
  price,
  quantity: initialQuantity,
  onQuantityChange,
  onSaveForLater,
  onRemove,
}: CartItemsProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { baseName, size } = parseNameAndSize(title);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Image
            src={image}
            alt={baseName}
            width={120}
            height={120}
            className="rounded-lg object-cover w-full sm:w-[120px] h-[220px] sm:h-[120px]"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          {/* Title + Price */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-black">
                {baseName}
              </h3>

              <p className="text-gray-600 text-sm">{description}</p>

              {/* Size Badge */}
              {size && (
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Size:
                  </span>
                  <span className="inline-flex items-center justify-center h-7 min-w-[28px] px-2 border border-blue-600 bg-blue-600 text-white text-[11px] font-bold rounded-sm">
                    {size}
                  </span>
                </div>
              )}
            </div>

            <div className="text-lg font-bold text-blue-600 whitespace-nowrap">
              NGN{price.toFixed(2)}
            </div>
          </div>

          {/* Quantity + Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
            {/* Quantity Control */}
            <div className="flex items-center border border-gray-300 rounded-lg w-fit">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                className="w-12 text-center border-x border-gray-300 bg-white outline-none"
              />

              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Save for Later */}
              <button
                onClick={onSaveForLater}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
              >
                <BookmarkIcon className="w-4 h-4" />
                Save for Later
              </button>

              {/* Remove */}
              <button
                onClick={onRemove}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}