'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useGetProductsQuery } from '@/redux/features/cart/cartApi';

const Hero = () => {
  const { data } = useGetProductsQuery({ limit: 12, skip: 0 });

  const heroImage = useMemo(() => {
    const products = data?.products || [];
    if (!products.length) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW-Erd6ZVipuUAGAxfkrgYGUF9P0n67FhTjD9C_Nummc4oyxYP1yHV2vpsZciB-LzqBPi65vXTnfP9lf5d5-YGZilFTPxvKI61QIVTsEUQ0H-WfsTkG1zHoqoyNYfn1MbSa2xwk2tHgPtL0qdUEszhkHKgmdhW7TLhqrZIUcefIJa3WsQblAPbzBerbht4iiydLb8HH-rLrAZGnPZIgFQ5czMOJHe864mWQHJ87P2yJyZ_kaeWHIFQE5HBTAuCvi0uEZwUBlXhJQ';
    }

    const randomProduct = products[Math.floor(Math.random() * products.length)];
    return randomProduct?.images?.[0] ?? randomProduct?.thumbnail ?? products[0]?.images?.[0] 
  }, [data]);

  return (
    <section className="bg-white overflow-hidden">
      <div className="container-max px-6 md:px-12 py-20 flex flex-col md:flex-row items-center gap-12">

        <div className="flex-1 space-y-6">

          <div className="inline-flex items-center bg-[color:var(--secondary-container)] text-[color:var(--on-secondary-container)] px-3 py-2 rounded-full w-fit">
            <span className="text-label-sm">Summer Collection 2024</span>
          </div>

          <h1 className="text-h1 text-[color:var(--foreground)] max-w-xl">
            Redefining Modern Elegance in Every Detail.
          </h1>


          <p className="text-body-lg text-[color:var(--on-surface-variant)] max-w-lg">
            Experience the perfect fusion of luxury and performance with our curated selection of premium lifestyle essentials.
          </p>


          <div className="flex flex-wrap gap-3 pt-4 cursor-pointer">

            <Link href="/products">
              <Button className="cursor-pointer bg-[color:var(--primary-container)] text-[color:var(--on-primary)] hover:bg-[color:var(--primary)] h-12 px-10 gap-2 shadow-lg shadow-[color:var(--primary-container)]/20">
                Shop Now
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/products">
            <Button
              variant="outline"
              className="cursor-pointer bg-white border-[color:var(--outline-variant)] text-[color:var(--on-surface)] h-12 px-10 hover:bg-[color:var(--surface-container-high)]"
            >
              Explore Collections
            </Button>
            </Link>
          </div>
        </div>


        <div className="flex-1 relative flex justify-center">
          <div className="w-full max-w-sm md:max-w-lg h-[400px] rounded-xl overflow-hidden shadow-2xl relative z-10">
            <Image
              alt="Luxury Lifestyle Product"
              src={heroImage}
              width={480}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-[color:var(--outline-variant)] z-20 hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[color:var(--primary-fixed)] rounded-full flex items-center justify-center">
                <CheckCircle size={24} className="text-[color:var(--primary)]" />
              </div>
              <div>
                <p className="text-label-md font-semibold">Trusted by 2M+</p>
                <p className="text-body-sm text-[color:var(--on-surface-variant)]">Verified Global Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero