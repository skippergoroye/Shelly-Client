'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Plus } from 'lucide-react';

interface UploadImage {
  id: string;
  src: string | null;
}

export function ProductPhotography() {
  const [images, setImages] = useState<UploadImage[]>([
    {
      id: '1',
      src: null,
    },
    { id: '2', src: null },
    { id: '3', src: null },
    { id: '4', src: null },
  ]);

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) =>
          prev.map((img) => (img.id === id ? { ...img, src: reader.result as string } : img))
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (id: string, e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) =>
          prev.map((img) => (img.id === id ? { ...img, src: reader.result as string } : img))
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="m bg-gray-50 p-8">
      <div className="w-full rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Product Photography</h1>
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop('main', e)}
          className="mb-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 py-20 px-4"
        >
          <Camera className="mb-3 h-12 w-12 text-gray-400" />
          <p className="text-center text-lg font-medium text-gray-700">Click or drag high-res hero shot</p>
          <p className="mt-1 text-sm text-gray-400">recommended: 2000 × 2000px PNG</p>
        </div>


        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image.id} className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(image.id, e)}
                className="hidden"
                id={`upload-${image.id}`}
              />
              <label
                htmlFor={`upload-${image.id}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(image.id, e)}
                className="block cursor-pointer"
              >
                {image.src ? (
                  <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-200">
                    <Image
                      src={image.src}
                      alt={`Product ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}