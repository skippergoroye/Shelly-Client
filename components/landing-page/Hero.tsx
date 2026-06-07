'use client';

import Image from 'next/image';

import SubmitButton from '@/components/shared/SubmitButton';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import HeroImg from "../../public/img/hero-Img.png"

const Hero = () => {
 

  return (
    <section className="relative w-full h-[90vh] flex items-center bg-[#faf8ff] overflow-hidden">
   
      <div className="absolute inset-0 z-0">
        <Image
          alt="Bespoke Luxury Footwear"
          src={HeroImg}
          fill
          className="object-cover object-[center_right] md:object-right"
          priority
        />
      
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#faf8ff] via-[#faf8ff]/20 to-transparent z-10" />
        {/* High-opacity light overlay for text legibility (mobile) */}
        <div className="absolute inset-0 md:hidden bg-[#faf8ff]/90 z-10" />
      </div>

      {/* Hero Content */}
      <div className="container-max w-full px-6 md:px-12 py-16 md:py-24 relative z-20">
        <div className="max-w-xl space-y-6">
          <h1 className="text-h1 text-[color:var(--foreground)] tracking-tight font-bold leading-tight">
            Crafted for You.
            <br />
            Built to Last.
          </h1>

          <p className="text-body-lg text-[color:var(--on-surface-variant)] max-w-lg leading-relaxed font-medium">
            Bespoke footwear designed at the intersection of artisanal heritage and technical superiority. Every stitch, a commitment to precision.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/products">
              <SubmitButton type="button" className="cursor-pointer bg-[color:var(--primary)] text-[color:var(--on-primary)] hover:bg-[color:var(--primary)] h-12 px-8 gap-2 shadow-lg shadow-[color:var(--primary-container)]/20 font-semibold rounded-md">
                Shop Now
                <ArrowRight size={20} />
              </SubmitButton>
            </Link>
            <Link href="/products">
              <SubmitButton
                type="button"
                variant="outline"
                className="cursor-pointer bg-white border-[color:var(--outline-variant)] text-[color:var(--on-surface)] h-12 px-8 hover:bg-[color:var(--surface-container-high)] font-semibold rounded-md"
              >
                Explore Collections
              </SubmitButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero