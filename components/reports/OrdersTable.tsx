'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import TransactionDetail from './TransactionDetail'

const rows = Array.from({ length: 10 })

export default function OrdersTable() {
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-[#f8faff] text-gray-900 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-sm font-bold">No Order</th>
                        <th className="px-6 py-4 text-sm font-bold">Order Date</th>
                        <th className="px-6 py-4 text-sm font-bold">Order Type</th>
                        <th className="px-6 py-4 text-sm font-bold">Category</th>
                        <th className="px-6 py-4 text-sm font-bold">Customer Name</th>
                        <th className="px-6 py-4 text-sm font-bold text-center">Detail</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {rows.map((_, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">ORDR#1234567890</td>
                            <td className="px-6 py-4 text-sm text-gray-400">Rabu, 18/09/2024 12:30:00</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Dine-in</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Foods</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Anisa</td>
                            <td className="px-6 py-4 text-center">
                                <button
                                    onClick={() => setOpen(true)}
                                    className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors inline-flex"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-5 flex justify-between items-center border-t border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 font-medium tracking-tight">Show</span>
                    <div className="relative">
                        <select className="appearance-none bg-white border border-gray-100 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-700 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/10">
                            <option>10</option>
                        </select>
                        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-400">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                    <span className="text-sm text-gray-400 font-medium tracking-tight ml-1">Entries</span>
                </div>

                <div className="flex items-center gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:bg-gray-50 disabled:opacity-50" disabled>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 font-bold text-sm hover:bg-gray-50">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 font-bold text-sm hover:bg-gray-50">3</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 pointer-events-none">...</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Transaction Detail"
            >
                <TransactionDetail />
            </Modal>
        </div>
    )
}

