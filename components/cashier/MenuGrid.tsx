'use client'

import { useState, useEffect } from 'react'
import MenuCard from './MenuCard'

export default function MenuGrid() {
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

    if (loading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-80 bg-gray-100 rounded-[32px]" />
                ))}
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-dashed border-gray-100">
                <p className="text-gray-400 font-bold mb-1">No items available</p>
                <p className="text-gray-300 text-sm">Ask your admin to add some delicious menus!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {products.map((product) => (
                <MenuCard key={product.id} mode="CASHIER" product={product} />
            ))}
        </div>
    )
}
