'use client'

import React from 'react'

type MenuDetailModalProps = {
    product: any | null
    isOpen: boolean
    onClose: () => void
}

export default function MenuDetailModal({ product, isOpen, onClose }: MenuDetailModalProps) {
    if (!isOpen || !product) return null

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-[500px] rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 flex items-center justify-center border-b border-gray-50 bg-white relative">
                    <h2 className="text-lg font-bold text-gray-900">Detail Menu</h2>
                    <button
                        onClick={onClose}
                        className="absolute right-6 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 transition-all"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    {/* Image Area */}
                    <div className="h-60 w-full rounded-2xl overflow-hidden bg-gray-50">
                        <img
                            src={product.imageUrl || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        {/* Category Badge */}
                        <div
                            className="inline-block px-3 py-1 rounded-lg text-white text-[10px] font-black uppercase tracking-wider"
                            style={{ background: "linear-gradient(to right, #4C3BCF, #3572EF)" }}
                        >
                            {product.category}
                        </div>

                        {/* Title & Description */}
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                {product.description || "No description available for this item."}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="pt-2">
                            <span className="text-xl font-black text-[#3b71f3]">Rp {product.price?.toLocaleString('id-ID')}</span>
                            <span className="text-gray-400 text-sm font-medium ml-1">/portion</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
