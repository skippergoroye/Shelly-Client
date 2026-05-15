'use client'

import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const reviews = [
  {
    id: 1,
    author: 'James D.',
    verified: true,
    time: '2 days ago',
    rating: 5,
    title: 'Exceptional Quality',
    content:
      '"The quality of the cashmere is unparalleled. It\'s incredibly soft yet has a nice weight to it. The camel color is exactly as pictured - rich and elegant. Perfect for the professional environment."',
  },
  {
    id: 2,
    author: 'Eleanor L.',
    verified: true,
    time: '1 week ago',
    rating: 5,
    title: 'Beautiful fit',
    content:
      '"Beautiful coat. The tailoring is sharp. I would suggest sizing down if you want a more fitted look as it is a bit generous on the shoulders. Overall, very happy with my purchase."',
  },
]

export function Reviews({ productId }: { productId: string }) {
  return (
    <div className="border-t border-gray-200 pt-8 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-gray-600 text-sm">4.9 / 5.0 based on 48 reviews</span>
          </div>
        </div>
        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
          Write a Review
        </Button>
      </div>

      {/* Reviews list */}
      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{review.author}</p>
                  {review.verified && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      Verified Buyer
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">{review.time}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="font-semibold text-gray-900 mb-2">{review.title}</p>
            <p className="text-gray-600 text-sm">{review.content}</p>
          </div>
        ))}
      </div>

      {/* See all reviews link */}
      <div className="text-center mt-8">
        <a href="#" className="text-blue-600 font-semibold hover:underline">
          See All 48 Reviews
        </a>
      </div>
    </div>
  )
}
