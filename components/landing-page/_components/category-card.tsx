'use client';

import Image from 'next/image';

interface CategoryCardProps {
  title: string;
  description?: string;
  image: string;
  badge?: string;
  className?: string;
}

export function CategoryCard({
  title,
  description,
  image,
  badge,
  className = '',
}: CategoryCardProps) {
  return (
    <div className={`relative group overflow-hidden rounded-xl cursor-pointer ${className}`}>
      <Image
        alt={title}
        src={image}
        width={400}
        height={300}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute bottom-6 left-6 text-white">
        {badge && (
          <span className="text-label-sm bg-[color:var(--primary)]/90 px-2 py-1 rounded-sm mb-2 inline-block">
            {badge}
          </span>
        )}
        <h3 className="text-h2 mb-2">{title}</h3>
        {description && <p className="text-body-sm text-white/80">{description}</p>}
      </div>
    </div>
  );
}
