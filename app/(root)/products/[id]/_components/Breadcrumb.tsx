'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbProps {
  items: Array<{ label: string; href: string }>
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-1 text-sm text-gray-600 py-4 px-4 max-w-7xl mx-auto">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <Link href={item.href} className="hover:text-gray-900">
            {item.label}
          </Link>
          {index < items.length - 1 && <ChevronRight size={16} className="text-gray-400" />}
        </div>
      ))}
    </div>
  )
}
