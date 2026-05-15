
'use client';

import { categories } from '@/constants';
import { ExternalLink } from 'lucide-react';
import { CategoryCard } from './_components/category-card';



const CategorySection = () => {
  return (
     <section className="container-max px-6 md:px-12 py-20">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-h2 text-[color:var(--foreground)]">Curated Categories</h2>
          <p className="text-body-md text-[color:var(--on-surface-variant)]">Explore our diverse ranges of premium goods</p>
        </div>
        <a href="#" className="text-[color:var(--primary)] text-label-md flex items-center gap-2 hover:underline">
          View All Categories <ExternalLink size={18} />
        </a>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[600px]">
        {/* Large Featured Category */}
        <CategoryCard
          title={categories[0].title}
          description={categories[0].description}
          badge={categories[0].badge}
          image={categories[0].image}
          className="md:col-span-2 md:row-span-2"
        />

        {/* Second Large Category */}
        <CategoryCard
          title={categories[1].title}
          description={categories[1].description}
          image={categories[1].image}
          className="md:col-span-2 md:row-span-1"
        />

        {/* Small Categories */}
        <CategoryCard title={categories[2].title} image={categories[2].image} />
        <CategoryCard title={categories[3].title} image={categories[3].image} />
      </div>
    </section>
  )
}

export default CategorySection