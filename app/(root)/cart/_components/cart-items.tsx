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
            alt={title}
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
                {title}
              </h3>

              <p className="text-gray-600 text-sm">
                {description}
              </p>
            </div>

            <div className="text-lg font-bold text-blue-600">
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
                  handleQuantityChange(
                    parseInt(e.target.value) || 1
                  )
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