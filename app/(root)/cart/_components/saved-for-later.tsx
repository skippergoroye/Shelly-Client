'use client';

import Image from 'next/image';

interface SavedItem {
  id: string;
  image: string;
  title: string;
  price: number;
}

interface SavedForLaterProps {
  items: SavedItem[];
  onMoveToCart?: (id: string) => void;
}

export default function SavedForLater({ items, onMoveToCart }: SavedForLaterProps) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-black mb-6">Saved for Later</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative w-full aspect-square bg-gray-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-blue-600 font-bold text-lg mb-4">NGN{item.price.toFixed(2)}</p>
              <button
                onClick={() => onMoveToCart?.(item.id)}
                className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
