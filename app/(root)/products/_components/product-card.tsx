"use client";

import { Badge } from "@/components/ui/badge";
import SubmitButton from "@/components/shared/SubmitButton";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useState } from "react";
import Link from "next/link";
import ToastNotification from "@/components/shared/ToastNotification";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string;
  rating: number;
  badge?: "NEW" | "SALE";
  badgeColor?: "bg-blue-600" | "bg-orange-600";
}

export function ProductCard({
  id,
  name,
  category,
  price,
  originalPrice,
  images,
  rating,
  badge,
  badgeColor = "bg-blue-600",
}: ProductCardProps) {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number>(40);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);

      dispatch(
        addToCart({
          id: `${id}-${selectedSize}`,
          name: `${name} (EU ${selectedSize})`,
          price,
          quantity: 1,
          images,
          category,
          rating,
        }),
      );

      ToastNotification({
        title: `${name} (EU ${selectedSize}) added!`,
        description: "Item has been added to your cart.",
        type: "success",
      });
    } catch (error) {
      ToastNotification({
        title: "Error",
        description: "Failed to add item to cart.",
        type: "error",
      });
    } finally {
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-white border border-gray-300 overflow-hidden flex flex-col justify-between h-full">
      <Link href={`/products/${id}`}>
        <div className="cursor-pointer">
          <div className="relative w-full aspect-square bg-[#faf8ff] overflow-hidden group">
            {images ? (
              <Image
                src={images}
                alt={name}
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 p-2 bg-[#faf8ff]"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No image</span>
              </div>
            )}

            {badge && (
              <Badge
                className={`absolute top-3 left-3 ${badgeColor} text-white uppercase text-[10px] font-bold px-2 py-0.5`}
              >
                {badge}
              </Badge>
            )}
          </div>

          <div className="p-5 flex flex-col">
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              {category}
            </p>

            <h3 className="mt-3 text-lg font-bold text-gray-900 leading-tight">
              {name}
            </h3>

            <div className="mt-2 flex items-baseline space-x-2">
              {originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  £{Math.round(originalPrice).toLocaleString()}
                </span>
              )}

              <span className="text-sm font-semibold text-blue-600">
                £{Math.round(price).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5 flex flex-col gap-4">
        {/* Size Selection */}
        <div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
            Size (EU)
          </span>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 9 }, (_, i) => 38 + i).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 text-[11px] font-bold transition-all border flex items-center justify-center cursor-pointer ${
                  selectedSize === size
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-700 bg-white hover:border-gray-400"
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
          className="w-full px-4 py-5.5 bg-[color:var(--primary)] text-sm font-semibold text-white transition-colors duration-200"
        >
          {isAdding ? "Added to Cart" : "Add to Cart"}
        </SubmitButton>
      </div>
    </div>
  );
}