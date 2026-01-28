'use client'

import { useState, useEffect } from 'react'
import CategoryTabs from '@/components/cashier/CategoryTabs'
import MenuCard from '@/components/cashier/MenuCard'
import ManageMenuPanel from '@/components/admin/ManageMenuPanel'

export default function CatalogPage() {
    const [products, setProducts] = useState<any[]>([])
    const [editingProduct, setEditingProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('all')

    const fetchProducts = async () => {
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

    useEffect(() => {
        fetchProducts()
    }, [])

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => {
            const cat = p.category.toLowerCase()
            const active = activeCategory.toLowerCase()
            return cat === active || cat === active.replace(/s$/, '')
        })

    return (
        <div className="flex h-full bg-[#f8faff]">
            {/* Menu Section */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                <CategoryTabs
                    activeCategory={activeCategory}
                    onSelect={(id) => setActiveCategory(id)}
                />

                <div className="flex items-center justify-between mb-8 mt-4">
                    <h2 className="text-2xl font-bold text-gray-900">List Menu</h2>
                    <p className="text-xs text-gray-400 font-medium tracking-wide">
                        Total <span className="text-gray-900 font-bold">{filteredProducts.length} Menu</span>
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 animate-pulse">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-80 bg-gray-100 rounded-[32px]" />
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <MenuCard
                                key={product.id}
                                mode="ADMIN"
                                product={product}
                                onEdit={(p) => setEditingProduct(p)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-dashed border-gray-100">
                        <p className="text-gray-400 font-bold mb-1">No menus found</p>
                        <p className="text-gray-300 text-sm">Add your first item using the panel on the right.</p>
                    </div>
                )}
            </div>

            <ManageMenuPanel
                editingProduct={editingProduct}
                onClose={() => setEditingProduct(null)}
                onSuccess={fetchProducts}
            />
        </div>
    )
}


