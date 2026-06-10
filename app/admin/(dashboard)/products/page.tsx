import React from 'react'
import Link from 'next/link'
import SubmitButton from '@/components/shared/SubmitButton'

const Products = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link href="/admin/products/add-new-product">
          <SubmitButton type="button">Add Product</SubmitButton>
        </Link>
      </div>
    </div>
  )
}

export default Products