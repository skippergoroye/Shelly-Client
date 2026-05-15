"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useAppDispatch } from "@/redux/app/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import ToastNotification from "@/components/shared/ToastNotification";

interface ProductCardProps {
  id: string;
  title: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  alt: string;
  badge?: string;
  badgeColor?: string;
  originalPrice?: number;
}

export function ProductCard({
  id,
  title,
  name,
  category,
  price,
  rating,
  image,
  alt,
  badge,
  badgeColor,
  originalPrice,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        quantity: 1,
        images: image,
        category,
        rating,
      }),
    );
    ToastNotification({
      title: `${name} added to cart!`,
      description: "Item has been added to your cart.",
      type: "success",
    });
  };

  return (
    <div className="bg-white border border-[color:var(--outline-variant)] rounded-xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">
      <div className="aspect-[4/5] relative overflow-hidden">
        <Image
          src={image}
          alt="not available"
          width={300}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {badge && (
          <div
            className={`absolute top-3 left-3 ${badgeColor} text-white px-3 py-1 rounded-full text-label-sm font-semibold`}
          >
            {badge}
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[color:var(--outline)] hover:text-red-500 transition-colors"
        >
          <Heart size={20} />
        </Button>

        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[color:var(--primary-container)] text-[color:var(--on-primary)] gap-2 rounded-lg"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-2 flex-1">
        <div className="flex justify-between items-start">
          <span className="text-body-sm text-[color:var(--on-surface-variant)]">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <Star
              size={16}
              className="text-[color:var(--tertiary)] fill-[color:var(--tertiary)]"
            />
            <span className="text-label-sm">{rating}</span>
          </div>
        </div>

        <h3 className="text-label-md text-[color:var(--on-surface)] group-hover:text-[color:var(--primary)] transition-colors">
          {title}
        </h3>

        <p className="text-h3 text-[color:var(--primary-container)]">
          ₦{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
