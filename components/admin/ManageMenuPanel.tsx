'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useToast } from '@/context/ToastContext'

type ManageMenuPanelProps = {
    editingProduct?: any
    onClose?: () => void
    onSuccess?: () => void
}

export default function ManageMenuPanel({ editingProduct, onClose, onSuccess }: ManageMenuPanelProps) {
    const { success, error: toastError, warning } = useToast()
    const [isAdding, setIsAdding] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'FOOD',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop'
    })

    const fileInputRef = useRef<HTMLInputElement>(null)

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setLoading(true)
        const uploadData = new FormData()
        uploadData.append('file', file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData,
            })

            if (res.ok) {
                const { imageUrl } = await res.json()
                setFormData(prev => ({ ...prev, imageUrl }))
                success('Image uploaded successfully!')
            } else {
                toastError('Failed to upload image')
            }
        } catch (error) {
            console.error('Upload failed:', error)
            toastError('An error occurred during upload')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (editingProduct) {
            setIsAdding(true)
            setFormData({
                name: editingProduct.name,
                description: editingProduct.description || '',
                price: editingProduct.price.toString(),
                stock: editingProduct.stock?.toString() || '0',
                category: editingProduct.category,
                imageUrl: editingProduct.imageUrl || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop'
            })
        } else {
            setIsAdding(false)
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                category: 'FOOD',
                imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop'
            })
        }
    }, [editingProduct])

    const categories = [
        { label: 'Foods', value: 'FOOD' },
        { label: 'Beverages', value: 'BEVERAGE' },
        { label: 'Desserts', value: 'DESSERT' }
    ]

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        try {
            const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/menus'
            const method = editingProduct ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseInt(formData.price),
                    stock: parseInt(formData.stock),
                })
            })

            if (res.ok) {
                success(editingProduct ? 'Menu updated successfully!' : 'Menu created successfully!')
                if (onClose) onClose()
                if (onSuccess) onSuccess()
            } else {
                const errData = await res.json().catch(() => ({}))
                toastError(errData.error || 'Failed to save menu')
            }
        } catch (error) {
            console.error('Failed to save menu:', error)
            toastError('An error occurred while saving')
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete() {
        if (!editingProduct) return
        if (!confirm('Are you sure you want to delete this menu?')) return

        setLoading(true)
        try {
            const res = await fetch(`/api/products/${editingProduct.id}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                success('Menu deleted successfully!')
                if (onClose) onClose()
                if (onSuccess) onSuccess()
            } else {
                toastError('Failed to delete menu')
            }
        } catch (error) {
            console.error('Failed to delete menu:', error)
            toastError('An error occurred while deleting')
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        if (onClose) onClose()
        setIsAdding(false)
    }

    return (
        <aside className="w-[450px] bg-white border-l p-8 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-[#2D3036] tracking-tight">
                    {editingProduct ? 'Edit Menu' : isAdding ? 'Fill Information' : 'Add Menu'}
                </h2>
                <button
                    onClick={() => (isAdding || editingProduct) ? handleClose() : setIsAdding(true)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${(isAdding || editingProduct)
                        ? 'bg-red-50 text-red-500 shadow-red-500/10'
                        : 'bg-[#3b71f3] text-white shadow-blue-500/20 hover:scale-105'
                        }`}
                >
                    <svg
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        className={`transition-transform duration-300 ${(isAdding || editingProduct) ? 'rotate-45' : ''}`}
                    >
                        <path d="M5 12h14" /><path d="M12 5v14" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {(isAdding || editingProduct) ? (
                    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
                        {/* Menu Image Preview / Choice */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-400 ml-1 uppercase tracking-wider">Menu Picture</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-blue-400', 'bg-blue-50/20') }}
                                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50/20') }}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50/20')
                                    const file = e.dataTransfer.files?.[0]
                                    if (file) {
                                        const event = { target: { files: [file] } } as any
                                        handleFileChange(event)
                                    }
                                }}
                                className={`relative h-60 w-full rounded-[32px] overflow-hidden transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer border-2 border-dashed ${formData.imageUrl && !formData.imageUrl.includes('unsplash')
                                    ? 'border-gray-100 bg-gray-50'
                                    : 'border-[#3b71f3]/40 bg-white hover:border-[#3b71f3] hover:bg-blue-50/10'
                                    }`}
                            >
                                {formData.imageUrl && !formData.imageUrl.includes('unsplash') ? (
                                    <>
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="bg-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-xl scale-90 group-hover:scale-100 transition-transform">Change Image</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center text-center p-6">
                                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b71f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                                                <path d="M12 12v9" />
                                                <path d="m16 16-4-4-4 4" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500 font-bold text-sm mb-1">Drag and Drop your file here or</p>
                                        <div className="mt-4 px-8 py-3 bg-[#3b71f3] text-white rounded-2xl text-xs font-black shadow-lg shadow-blue-500/20 group-hover:brightness-110 transition-all">
                                            Choose File
                                        </div>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>

                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-400 ml-1 uppercase tracking-wider leading-none">Menu Name</label>
                            <input
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Gado-gado Special"
                                className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-400 ml-1 uppercase tracking-wider leading-none">Description</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="List of ingredients..."
                                className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 resize-none"
                            />
                        </div>

                        {/* Price & Stock Row */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-400 ml-1 uppercase tracking-wider leading-none">Price (Rp)</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="20000"
                                    className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-black text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-400 ml-1 uppercase tracking-wider leading-none">Initial Stock</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.stock}
                                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                    placeholder="100"
                                    className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Category Select */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-400 ml-1 uppercase tracking-wider leading-none">Category</label>
                            <div className="flex gap-4">
                                {categories.map(cat => (
                                    <button
                                        key={cat.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, category: cat.value })}
                                        className={`flex-1 py-3.5 rounded-2xl text-xs font-bold transition-all border ${formData.category === cat.value
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                                            : 'bg-white border-gray-100 text-gray-400 hover:border-blue-200'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {editingProduct && (
                                <button
                                    onClick={handleDelete}
                                    disabled={loading}
                                    type="button"
                                    className="flex-1 bg-red-50 text-red-500 py-5 rounded-3xl font-black text-sm hover:bg-red-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    Delete
                                </button>
                            )}
                            <button
                                disabled={loading}
                                type="submit"
                                className={`${editingProduct ? 'flex-[2]' : 'w-full'} bg-[#1e4eb0] text-white py-5 rounded-3xl font-black text-sm shadow-xl shadow-blue-900/10 hover:bg-[#1a44a0] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50`}
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                        {editingProduct ? 'Update Menu' : 'Save Menu'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div
                        onClick={() => setIsAdding(true)}
                        className="h-full border-2 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center text-center p-10 group cursor-pointer hover:bg-blue-50/20 hover:border-blue-200 transition-all"
                    >
                        <div className="w-24 h-24 bg-gray-50 group-hover:bg-blue-50 rounded-full flex items-center justify-center mb-6 transition-colors">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300 group-hover:text-[#3b71f3] transition-colors"><path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" /></svg>
                        </div>
                        <p className="text-gray-400 font-bold text-lg mb-2">Build your menu</p>
                        <p className="text-gray-300 text-sm max-w-[200px]">Click here or the plus button to add a new delicious item.</p>
                    </div>
                )}
            </div>
        </aside>
    )
}
