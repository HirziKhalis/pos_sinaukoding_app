'use client'

import { useState, useEffect } from 'react'
import CategoryTabs from '@/components/cashier/CategoryTabs'
import MenuCard from '@/components/cashier/MenuCard'
import OrderPanel from '@/components/cashier/OrderPanel'
import MenuDetailModal from '@/components/cashier/MenuDetailModal'
import { useToast } from '@/context/ToastContext'

export default function DashboardPage() {
  const { success, error: toastError } = useToast()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

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

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => {
      const cat = p.category.toLowerCase()
      const active = activeCategory.toLowerCase()
      return cat === active || cat === active.replace(/s$/, '')
    })

  const addToCart = (product: any, note: string = '') => {
    setCart(currentCart => {
      const cartItemId = `${product.id}-${note}`
      const existing = currentCart.find(item => item.cartItemId === cartItemId)
      if (existing) {
        return currentCart.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...currentCart, { ...product, cartItemId, note, quantity: 1 }]
    })
  }

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(currentCart =>
      currentCart.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQty = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQty }
        }
        return item
      })
    )
  }

  const removeFromCart = (cartItemId: string) => {
    setCart(currentCart => currentCart.filter(item => item.cartItemId !== cartItemId))
  }

  const updateNote = (cartItemId: string, newNote: string) => {
    setCart(currentCart =>
      currentCart.map(item => {
        if (item.cartItemId === cartItemId) {
          return { ...item, note: newNote }
        }
        return item
      })
    )
  }

  const handlePay = async (details: any) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity
          })),
          customerName: details.customerName,
          tableNumber: details.tableNumber,
          orderType: details.orderType,
          subTotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          tax: Math.round(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.1),
          total: details.total,
          receivedAmount: details.total,
          changeAmount: 0
        })
      })

      if (res.ok) {
        success('Order placed successfully!')
        setCart([])
        // Refresh products to update stock
        const refreshRes = await fetch('/api/menus')
        const newData = await refreshRes.json()
        setProducts(newData)
      } else {
        const err = await res.text()
        toastError(`Failed to place order: ${err}`)
      }
    } catch (err) {
      console.error('Payment failed:', err)
      toastError('An error occurred while processing the order.')
    }
  }

  return (
    <div className="flex h-full bg-[#f8faff]">
      {/* Menu Section */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <CategoryTabs
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <div className="flex items-center justify-between mb-8 mt-4">
          <h2 className="text-2xl font-bold text-gray-900">List Menu</h2>
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            Total <span className="text-gray-900 font-bold">{filteredProducts.length} Menu</span>
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-[32px]" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <MenuCard
                key={product.id}
                mode="CASHIER"
                product={product}
                onAdd={addToCart}
                onClick={(p) => {
                  setSelectedProduct(p)
                  setIsDetailOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-dashed border-gray-100">
            <p className="text-gray-400 font-bold mb-1">No menus found</p>
            <p className="text-gray-300 text-sm">Try a different category or search.</p>
          </div>
        )}
      </div>

      {/* Order Panel */}
      <OrderPanel
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onUpdateNote={updateNote}
        onRemove={removeFromCart}
        onPay={handlePay}
      />

      <MenuDetailModal
        isOpen={isDetailOpen}
        product={selectedProduct}
        onClose={() => setIsDetailOpen(false)}
        onAdd={addToCart}
      />
    </div>
  )
}
