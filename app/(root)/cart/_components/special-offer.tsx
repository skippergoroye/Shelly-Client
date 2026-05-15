'use client';

import Image from 'next/image';

export default function SpecialOffer() {
  return (
    <div className="bg-blue-600 rounded-xl p-8 flex items-center gap-8">
      {/* Content */}
      <div className="flex-1 text-white">
        <div className="inline-block bg-white bg-opacity-30 text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
          SPECIAL OFFER
        </div>
        <h3 className="text-3xl font-bold mb-3">Add the Premium Care Kit</h3>
        <p className="text-blue-100 leading-relaxed">
          Extend the life of your luxury items with our artisan maintenance kit. Includes organic cleaners and microfiber cloths.
        </p>
        <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors w-full sm:w-auto">
          Add to Cart - NGN45.00
        </button>
      </div>

      {/* Image */}
      <div className="flex-shrink-0 hidden sm:block">
        <Image
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop"
          alt="Premium Care Kit"
          width={200}
          height={200}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
