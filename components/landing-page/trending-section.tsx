'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from './_components/product-card';
import { useTrendingProducts } from './hooks/useTrendingProducts';


const TrendingSection = () => {
    const { transformedProducts } = useTrendingProducts();

    return (
        <section className="bg-[color:var(--surface-container-low)] py-20">
            <div className="container-max px-6 md:px-12">

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <h2 className="text-h2 text-[color:var(--foreground)]">Trending Products</h2>

                    <Tabs defaultValue="popular">
                        <TabsList className="bg-[color:var(--surface-container-high)] p-1 rounded-lg">
                            <TabsTrigger value="popular" className="px-6 py-2 rounded-md text-label-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                Popular
                            </TabsTrigger>
                            <TabsTrigger value="newest" className="px-6 py-2 text-label-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                Newest
                            </TabsTrigger>
                            <TabsTrigger value="sale" className="px-6 py-2 text-label-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                On Sale
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {transformedProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingSection;