'use client'

import { useState } from 'react'

type Product = {
    id: string
    name: string
    price: number
    stock: number
}

type CartItem = {
    product: Product
    quantity: number
}

export default function CheckoutClient({
    products,
}: {
    products: Product[]
}) {
    const [cart, setCart] = useState<CartItem[]>([])

    function addToCart(product: Product) {
        setCart((prev) => {
            const existing = prev.find(
                (item) => item.product.id === product.id
            )

            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prev, { product, quantity: 1 }]
        })
    }

    function total() {
        return cart.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        )
    }

    return (
        <div className="grid grid-cols-3 gap-4 h-full">
            {/* Products */}
            <div className="col-span-2">
                <h2 className="text-xl font-bold mb-4">Products</h2>
                <div className="grid grid-cols-3 gap-4">
                    {products.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => addToCart(p)}
                            className="border rounded p-3 hover:bg-gray-50"
                        >
                            <div className="font-semibold">{p.name}</div>
                            <div className="text-sm text-gray-500">
                                ${(p.price / 100).toFixed(2)}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Cart */}
            <div className="border rounded p-4">
                <h2 className="text-xl font-bold mb-4">Order</h2>

                {cart.length === 0 && (
                    <p className="text-gray-400">No items selected</p>
                )}

                {cart.map((item) => (
                    <div
                        key={item.product.id}
                        className="flex justify-between mb-2"
                    >
                        <span>
                            {item.product.name} × {item.quantity}
                        </span>
                        <span>
                            ${(item.product.price * item.quantity / 100).toFixed(2)}
                        </span>
                    </div>
                ))}

                <hr className="my-3" />

                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(total() / 100).toFixed(2)}</span>
                </div>

                <button
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                    disabled={cart.length === 0}
                >
                    Pay
                </button>
            </div>
        </div>
    )
}
