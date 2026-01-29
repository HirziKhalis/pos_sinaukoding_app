'use client'

import { format } from 'date-fns'

type TransactionDetailProps = {
    order: any | null
}

export default function TransactionDetail({ order }: TransactionDetailProps) {
    if (!order) return null

    return (
        <div className="space-y-8">
            {/* Order Info Card */}
            <div className="bg-[#f8faff] rounded-3xl p-8 space-y-4">
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-gray-400">No Order <span className="text-gray-900 ml-2">{order.orderNumber}</span></p>
                    <p className="text-xs font-semibold text-gray-400">Order Date <span className="text-gray-900 ml-2">{format(new Date(order.createdAt), 'EEEE, dd MMMM yyyy HH:mm:ss')}</span></p>
                    <p className="text-xs font-semibold text-gray-400">Customer Name <span className="text-gray-900 ml-2">{order.customerName}</span></p>
                    <p className="text-sm font-bold text-gray-900 mt-2">
                        {order.orderType === 'DINE_IN' ? 'Dine-in' : 'Take Away'} • No.Meja {order.tableNumber || '--'}
                    </p>
                </div>

                {/* Dashed Line Separator */}
                <div className="border-t border-dashed border-gray-200 my-6" />

                {/* Items */}
                <div className="space-y-6">
                    {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-start">
                            <div>
                                <h4 className="text-lg font-black text-gray-900">{item.product?.name || 'Unknown'}</h4>
                                <p className="text-sm font-bold text-gray-400 mt-1">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</p>
                            </div>
                            <span className="text-lg font-black text-gray-900">Rp {(item.quantity * item.price).toLocaleString('id-ID')}</span>
                        </div>
                    ))}
                </div>

                {/* Dashed Line Separator */}
                <div className="border-t border-dashed border-gray-200 my-6" />

                {/* Calculation */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-400">Sub Total</span>
                        <span className="text-gray-900">Rp {order.subTotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-400">Tax</span>
                        <span className="text-gray-900">Rp {order.tax.toLocaleString('id-ID')}</span>
                    </div>
                </div>

                {/* Dashed Line Separator */}
                <div className="border-t border-dashed border-gray-200 my-6" />

                {/* Grand Total */}
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-gray-900">Total</span>
                    <span className="text-3xl font-black text-[#3b71f3]">Rp {order.total.toLocaleString('id-ID')}</span>
                </div>

                {/* Payment Info */}
                <div className="space-y-2 pt-4">
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-400">Diterima</span>
                        <span className="text-gray-900">Rp {order.receivedAmount.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-400">Kembalian</span>
                        <span className="text-gray-900 font-black">Rp {order.changeAmount.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
