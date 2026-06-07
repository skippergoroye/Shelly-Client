'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {

  const handlePageChange = (newPage: number) => {
    if (
      !Number.isNaN(newPage) &&
      newPage >= 1 &&
      newPage <= totalPages
    ) {
      onPageChange(newPage)
    }
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 7

    if (!totalPages || totalPages < 1) {
      return []
    }

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }

        pages.push('...')
        pages.push(totalPages)

      } else if (currentPage >= totalPages - 3) {
        pages.push(1)
        pages.push('...')

        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }

      } else {
        pages.push(1)
        pages.push('...')

        for (
          let i = currentPage - 1;
          i <= currentPage + 1;
          i++
        ) {
          pages.push(i)
        }

        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages.filter(
      (p) =>
        p === '...' ||
        (typeof p === 'number' && !Number.isNaN(p))
    )
  }

  const pages = getPageNumbers()

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {/* Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      {/* Numbers */}
      {pages.map((p, index) => {
        if (p === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="text-gray-600 px-2"
            >
              ...
            </span>
          )
        }

        const pageNumber = Number(p)

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`w-10 h-10 rounded font-semibold transition-colors ${
              currentPage === pageNumber
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {String(pageNumber)}
          </button>
        )
      })}

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  )
}