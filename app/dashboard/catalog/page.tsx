'use client'

import { useState, useEffect } from 'react'
import CategoryTabs from '@/components/cashier/CategoryTabs'
import MenuCard from '@/components/cashier/MenuCard'
import ManageMenuPanel from '@/components/admin/ManageMenuPanel'

export default function CatalogPage() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/menus')
                const data = await res.json()
                setProducts(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className="flex h-full bg-[#f8faff]">
            {/* Menu Section */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                <CategoryTabs />

                <div className="flex items-center justify-between mb-8 mt-4">
                    <h2 className="text-2xl font-bold text-gray-900">List Menu</h2>
                    <p className="text-xs text-gray-400 font-medium tracking-wide">
                        Total <span className="text-gray-900 font-bold">{products.length} Menu</span>
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 animate-pulse">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-80 bg-gray-100 rounded-[32px]" />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <MenuCard key={product.id} mode="ADMIN" product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-dashed border-gray-100">
                        <p className="text-gray-400 font-bold mb-1">No menus found</p>
                        <p className="text-gray-300 text-sm">Add your first item using the panel on the right.</p>
                    </div>
                )}
            </div>

            {/* Admin Action Panel */}
            <ManageMenuPanel />
        </div>
    )
}


