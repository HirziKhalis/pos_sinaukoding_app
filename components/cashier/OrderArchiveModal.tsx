'use client'

import { useState, useEffect } from 'react'
import ReceiptModal from './ReceiptModal'

type OrderArchiveModalProps = {
    isOpen: boolean
    onClose: () => void
}

export default function OrderArchiveModal({ isOpen, onClose }: OrderArchiveModalProps) {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [orderType, setOrderType] = useState('all')
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [isReceiptOpen, setIsReceiptOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            fetchOrders()
        }
    }, [isOpen])

    async function fetchOrders() {
        setLoading(true)
        try {
            const res = await fetch('/api/orders')
            const data = await res.json()
            setOrders(data)
        } catch (error) {
            console.error('Failed to fetch orders:', error)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = orderType === 'all' || order.orderType === orderType
        return matchesSearch && matchesType
    })

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-8 flex items-center justify-between border-b border-gray-50 bg-white sticky top-0 z-10">
                    <h2 className="text-2xl font-black text-[#2D3036] tracking-tight">Order Archive</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Filters */}
                <div className="p-8 bg-white border-b border-gray-50 flex gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-300">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#f8faff] border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-300"
                            placeholder="Enter the keyword here..."
                        />
                    </div>
                    <div className="relative w-48">
                        <select
                            value={orderType}
                            onChange={(e) => setOrderType(e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-400 appearance-none"
                        >
                            <option value="all">Select type order</option>
                            <option value="DINE_IN">Dine-in</option>
                            <option value="TAKE_AWAY">Take Away</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                    <button className="bg-[#3b71f3] text-white px-8 rounded-2xl font-black text-sm shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-[0.98] transition-all">
                        Search
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-8 bg-[#f8faff]/50 custom-scrollbar">
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-28 bg-white rounded-3xl border border-gray-100 animate-pulse" />
                            ))}
                        </div>
                    ) : filteredOrders.length > 0 ? (
                        <div className="space-y-4">
                            {filteredOrders.map((order) => (
                                <div key={order.id} className="bg-white rounded-3xl border border-gray-100 p-6 flex items-center justify-between group hover:border-blue-200 transition-all shadow-sm">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 text-[11px] font-bold tracking-tight uppercase">
                                            <span className="text-gray-300">No Order <span className="text-gray-900 font-black">{order.orderNumber}</span></span>
                                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                            <span className="text-[#3b71f3]">{order.orderType === 'DINE_IN' ? 'Dine-in' : 'Take Away'}</span>
                                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                            <span className="text-gray-900">{order.customerName}</span>
                                            {order.tableNumber && (
                                                <>
                                                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                                    <span className="text-gray-900">No.{order.tableNumber}</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="text-xl font-black text-gray-900 tracking-tight">
                                            Rp {order.total.toLocaleString('id-ID')}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="text-[11px] font-bold text-gray-300">{new Date(order.createdAt).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '')}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedOrder(order)
                                                setIsReceiptOpen(true)
                                            }}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-[#3b71f3] group-hover:bg-[#3b71f3] group-hover:text-white transition-all shadow-sm"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-50 text-gray-200">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 8H3V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2Z" /><path d="M10 12h4" /><path d="M3 8v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8" /></svg>
                            </div>
                            <p className="text-gray-400 font-bold mb-1">No orders found</p>
                            <p className="text-gray-300 text-sm">Try dynamic search or filtering.</p>
                        </div>
                    )}
                </div>
            </div>

            <ReceiptModal
                isOpen={isReceiptOpen}
                onClose={() => setIsReceiptOpen(false)}
                order={selectedOrder}
            />
        </div>
    )
}
