'use client'

import Marquee from 'react-fast-marquee'

interface Testimonial {
  quote: string
  author: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'Uncompromising clarity in design and fit.',
    author: 'DAVID K.',
  },
  {
    quote: 'The only footwear that keeps up with my pace.',
    author: 'SARAH M.',
  },
  {
    quote: 'Uncompromising clarity in design and fit.',
    author: 'DAVID K.',
  },
  {
    quote: 'The only footwear that keeps up with my pace.',
    author: 'SARAH M.',
  },
]

export function TestimonialMarquee() {
  return (
  <div className="sticky top-0 left-0 right-0 z-50 w-full bg-[color:var(--primary)] h-14 flex items-center">
  <Marquee
    gradient={false}
    speed={50}
    pauseOnHover
    className="overflow-hidden"
  >
    <div className="flex gap-12 pr-12">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="whitespace-nowrap font-serif text-lg italic text-white"
        >
          "{testimonial.quote}" — {testimonial.author}
        </div>
      ))}
    </div>
  </Marquee>
</div>
  )
}
