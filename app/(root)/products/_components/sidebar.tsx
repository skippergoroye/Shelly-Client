'use client'

import { useState } from 'react'
import { Truck, ShieldCheck, RotateCcw, Award, Sparkles, Copy, Check } from 'lucide-react'

interface SidebarProps {
  onCategoryChange?: (category: string | null) => void
}

export function Sidebar({ onCategoryChange }: SidebarProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('BESPOKE20')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <aside className="w-full lg:w-64 flex flex-col gap-6 h-fit">
      {/* Promo Banner Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white p-6 border border-blue-800 shadow-md">
        {/* Decorative background blurs */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-24 h-24 bg-blue-500/30 rounded-full blur-lg pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold tracking-widest uppercase w-fit">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            Limited Offer
          </div>

          <div>
            <h3 className="text-xl font-bold font-serif leading-tight">
              The Bespoke Series Sale
            </h3>
            <p className="text-xs text-blue-100 mt-2 leading-relaxed">
              Use this exclusive code at checkout to claim your 20% discount on all hand-finished editions.
            </p>
          </div>

          {/* Code box */}
          <div className="flex items-center justify-between bg-black/20 border border-white/20 p-2.5 mt-1 backdrop-blur-sm">
            <code className="text-sm font-mono font-bold tracking-wider text-yellow-300">
              BESPOKE20
            </code>
            <button
              onClick={handleCopy}
              className="text-xs flex items-center gap-1 font-semibold text-white hover:text-yellow-300 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-300 animate-bounce" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges Card */}
      <div className="bg-white p-6 border border-gray-300 flex flex-col gap-6">
        <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase pb-2 border-b border-gray-100">
          Our Guarantees
        </h3>

        <div className="flex flex-col gap-5">
          {/* Trust Badge 1 */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">
                Complimentary Shipping
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mt-1">
                Enjoy free worldwide shipping and tracking on every order.
              </p>
            </div>
          </div>

          {/* Trust Badge 2 */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">
                Secure SSL Checkout
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mt-1">
                All transactions are fully encrypted and protected.
              </p>
            </div>
          </div>

          {/* Trust Badge 3 */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">
                30-Day Exchanges
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mt-1">
                Hassle-free sizing exchanges or returns within 30 days.
              </p>
            </div>
          </div>

          {/* Trust Badge 4 */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">
                London Atelier Finish
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mt-1">
                Crafted to perfection using ancestral methods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}