'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import TransactionDetail from './TransactionDetail'
import { format } from 'date-fns'

type OrdersTableProps = {
    orders: any[]
}

export default function OrdersTable({ orders }: OrdersTableProps) {
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
    const [open, setOpen] = useState(false)

    const handleDetailClick = (order: any) => {
        setSelectedOrder(order)
        setOpen(true)
    }

    return (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-[#f8faff] text-gray-900 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-sm font-bold">No Order</th>
                        <th className="px-6 py-4 text-sm font-bold">Order Date</th>
                        <th className="px-6 py-4 text-sm font-bold">Order Type</th>
                        <th className="px-6 py-4 text-sm font-bold">Customer Name</th>
                        <th className="px-6 py-4 text-sm font-bold text-right">Total</th>
                        <th className="px-6 py-4 text-sm font-bold text-center">Detail</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-400 font-bold">
                                No orders found for the selected filters.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{order.orderNumber}</td>
                                <td className="px-6 py-4 text-sm text-gray-400">
                                    {format(new Date(order.createdAt), 'EEEE, dd/MM/yyyy HH:mm:ss')}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {order.orderType === 'DINE_IN' ? 'Dine-in' : 'Take Away'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{order.customerName}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-bold text-right">
                                    Rp {order.total.toLocaleString('id-ID')}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleDetailClick(order)}
                                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors inline-flex"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination Placeholder */}
            {orders.length > 0 && (
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
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 pointer-events-none" disabled>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 pointer-events-none opacity-50">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>
            )}

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Transaction Detail"
            >
                <TransactionDetail order={selectedOrder} />
            </Modal>
        </div>
    )
}
