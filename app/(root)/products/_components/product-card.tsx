"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
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

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);

      dispatch(
        addToCart({
          id,
          name,
          price,
          quantity: 1,
          images,
          category,
          rating,
        }),
      );

      ToastNotification({
        title: `${name} added to cart!`,
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
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${id}`}>
        <div className="cursor-pointer">
          <div className="relative w-full aspect-square bg-gray-100 overflow-hidden group">
            {images ? (
              <Image
                src={images}
                alt={name}
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No image</span>
              </div>
            )}

            {badge && (
              <Badge
                className={`absolute top-3 left-3 ${badgeColor} text-white uppercase text-xs font-bold px-2 py-1`}
              >
                {badge}
              </Badge>
            )}
          </div>

          <div className="p-4">
            <div className="mb-2">
              <h3 className="font-bold text-gray-900 text-sm">{name}</h3>

              <div className="flex items-center space-x-1 mt-1">
                <div className="flex text-yellow-500">
                  {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                    <span key={i} className="text-xs">
                      ★
                    </span>
                  ))}
                </div>

                <span className="text-xs text-gray-600 ml-1">
                  {rating}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-3">{category}</p>

            <div className="flex items-baseline space-x-2 mb-4">
              {originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  NGN{originalPrice.toFixed(2)}
                </span>
              )}

              <span className="text-lg font-bold text-blue-600">
                NGN{price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4" />

          <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
        </Button>
      </div>
    </div>
  );
}