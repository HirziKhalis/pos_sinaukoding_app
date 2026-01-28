'use client'

import { useState } from 'react'

type OrderPanelProps = {
    cart: any[]
    onUpdateQuantity: (id: string, delta: number) => void
    onRemove: (id: string) => void
    onPay: (details: any) => void
}

export default function OrderPanel({ cart, onUpdateQuantity, onRemove, onPay }: OrderPanelProps) {
    const [orderType, setOrderType] = useState<'DINE_IN' | 'TAKE_AWAY'>('DINE_IN')
    const [customerName, setCustomerName] = useState('')
    const [tableNumber, setTableNumber] = useState('')

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = Math.round(subtotal * 0.1)
    const total = subtotal + tax

    return (
        <aside className="w-[450px] bg-white border-l p-8 flex flex-col h-full shadow-[-10px_0_30px_rgba(0,0,0,0.02)] relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black text-[#2D3036] tracking-tight">List Order</h2>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-[#3b71f3] shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                </div>
            </div>
            <p className="text-[11px] text-gray-300 mb-8 font-bold uppercase tracking-widest">No Order <span className="text-gray-400">#ORDR1234567890</span></p>

            {/* Toggle Buttons */}
            <div className="flex gap-4 mb-8 bg-gray-50/50 p-1.5 rounded-[20px]">
                <button
                    onClick={() => setOrderType('DINE_IN')}
                    className={`flex-1 py-3.5 rounded-[16px] font-black text-xs transition-all ${orderType === 'DINE_IN'
                        ? 'bg-[#3b71f3] text-white shadow-lg shadow-blue-500/20'
                        : 'text-gray-300 hover:text-gray-400'
                        }`}
                >
                    Dine in
                </button>
                <button
                    onClick={() => setOrderType('TAKE_AWAY')}
                    className={`flex-1 py-3.5 rounded-[16px] font-black text-xs transition-all ${orderType === 'TAKE_AWAY'
                        ? 'bg-[#3b71f3] text-white shadow-lg shadow-blue-500/20'
                        : 'bg-white border border-gray-100 text-gray-300 hover:text-gray-400'
                        }`}
                >
                    Take Away
                </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-5 gap-4 mb-8">
                <div className="col-span-3 space-y-2.5">
                    <label className="text-[11px] font-black text-gray-400 ml-1 uppercase tracking-widest leading-none">Customer Name</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Anisa"
                        className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-300"
                    />
                </div>
                <div className="col-span-2 space-y-2.5">
                    <label className="text-[11px] font-black text-gray-400 ml-1 uppercase tracking-widest leading-none">No. Table</label>
                    <div className="relative">
                        <select
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 appearance-none"
                        >
                            <option value="">Select</option>
                            {[...Array(20)].map((_, i) => (
                                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                    {String(i + 1).padStart(2, '0')}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 custom-scrollbar space-y-6">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-200"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                        </div>
                        <p className="text-gray-400 font-bold text-sm mb-1">No Menu Selected</p>
                        <p className="text-gray-300 text-[11px]">Choose some delicious items from the left menu.</p>
                    </div>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="flex gap-4 group relative">
                            <button
                                onClick={() => onRemove(item.id)}
                                className="absolute -right-1 -top-1 w-6 h-6 bg-red-50 text-red-400 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /></svg>
                            </button>
                            <div className="w-20 h-20 rounded-[20px] bg-gray-50 overflow-hidden flex-shrink-0">
                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-black text-gray-900 truncate mb-0.5">{item.name}</h4>
                                <p className="text-[#3b71f3] font-black text-xs mb-3">Rp {item.price.toLocaleString('id-ID')}</p>
                                <div className="flex items-center gap-2">
                                    <button className="p-1 text-gray-300 hover:text-[#3b71f3] transition-colors">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                    </button>
                                    <p className="text-[10px] text-gray-400 font-medium truncate italic leading-none">Without egg and tofu</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                    className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-[#3b71f3] transition-all"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14" /></svg>
                                </button>
                                <span className="text-sm font-black text-gray-900 w-4 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-[#3b71f3] transition-all"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Price Breakdown */}
            <div className="mt-8 space-y-4 pt-8 border-t border-dashed border-gray-100">
                <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-gray-400">Sub Total</span>
                    <span className="text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-gray-400">Tax</span>
                    <span className="text-gray-900">Rp {tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <span className="text-lg font-black text-gray-900">Total</span>
                    <span className="text-2xl font-black text-gray-900 tracking-tight">Rp {total.toLocaleString('id-ID')}</span>
                </div>
            </div>

            {/* Pay Button */}
            <button
                disabled={cart.length === 0}
                onClick={() => onPay({ orderType, customerName, tableNumber, total })}
                className={`w-full py-5 rounded-[24px] font-black text-sm mt-8 transition-all active:scale-[0.98] ${cart.length > 0
                    ? 'bg-[#3b71f3] text-white shadow-xl shadow-blue-500/20 hover:brightness-110'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
            >
                Pay
            </button>
        </aside>
    )
}



