"use client";

import React, { useRef, useState } from "react";
import { ImagePlus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  heroImage: string | null;
  onHeroImageChange: (src: string | null) => void;
  subImages: (string | null)[];
  onSubImagesChange: (images: (string | null)[]) => void;
  onHeroFileChange?: (file: File | null) => void;
  onSubFileChange?: (index: number, file: File | null) => void;
  className?: string;
}

export default function ImageUploader({
  heroImage,
  onHeroImageChange,
  subImages,
  onSubImagesChange,
  onHeroFileChange,
  onSubFileChange,
  className,
}: ImageUploaderProps) {
  const heroInputRef = useRef<HTMLInputElement>(null);
  const subInputRef = useRef<HTMLInputElement>(null);
  const [activeSubSlot, setActiveSubSlot] = useState<number | null>(null);

  const handleHeroClick = () => {
    heroInputRef.current?.click();
  };

  const handleSubClick = (index: number) => {
    setActiveSubSlot(index);
    subInputRef.current?.click();
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onHeroFileChange?.(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        onHeroImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeSubSlot !== null) {
      onSubFileChange?.(activeSubSlot, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const nextSub = [...subImages];
        nextSub[activeSubSlot] = reader.result as string;
        onSubImagesChange(nextSub);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleHeroDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onHeroFileChange?.(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        onHeroImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubDrop = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onSubFileChange?.(index, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const nextSub = [...subImages];
        nextSub[index] = reader.result as string;
        onSubImagesChange(nextSub);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cn("bg-white dark:bg-card border border-light-grey rounded-2xl p-6 shadow-sm flex flex-col gap-6", className)}>
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={heroInputRef}
        accept="image/*"
        onChange={handleHeroChange}
        className="hidden"
      />
      <input
        type="file"
        ref={subInputRef}
        accept="image/*"
        onChange={handleSubChange}
        className="hidden"
      />

      <h2 className="text-xl font-bold text-foreground tracking-tight">Product Photography</h2>

      {/* Hero Shot Upload Container */}
      <div
        onClick={handleHeroClick}
        onDragOver={handleDragOver}
        onDrop={handleHeroDrop}
        className="relative flex flex-col items-center justify-center border border-dashed border-[#848f9f]/40 bg-input-background hover:bg-gray-50/50 dark:hover:bg-dark-grey/50 cursor-pointer rounded-xl aspect-[1.4] w-full transition-all duration-200 overflow-hidden"
      >
        {heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="Hero shot preview" className="object-cover w-full h-full" />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="p-3 bg-white dark:bg-dark-grey rounded-xl border border-light-grey mb-3">
              <ImagePlus className="h-6 w-6 text-description" />
            </div>
            <span className="font-semibold text-foreground text-base">Click or drag high-res hero shot</span>
            <span className="text-xs text-description mt-1">recommended: 2000 × 2000px PNG</span>
          </div>
        )}
        {heroImage && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onHeroImageChange(null);
            }}
            className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Grid for sub-images */}
      <div className="grid grid-cols-3 gap-4">
        {subImages.map((src, index) => (
          <div
            key={index}
            onClick={() => handleSubClick(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleSubDrop(index, e)}
            className="relative flex items-center justify-center border border-dashed border-[#848f9f]/40 bg-input-background hover:bg-gray-50/50 dark:hover:bg-dark-grey/50 cursor-pointer rounded-xl aspect-square w-full transition-all duration-200 overflow-hidden"
          >
            {src ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Product gallery preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextSub = [...subImages];
                    nextSub[index] = null;
                    onSubImagesChange(nextSub);
                  }}
                  className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-black/85 text-white rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <Plus className="h-6 w-6 text-[#848f9f]/60" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
