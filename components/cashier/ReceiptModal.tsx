'use client'

import React, { useRef } from 'react'

type ReceiptModalProps = {
    isOpen: boolean
    onClose: () => void
    order: any | null
}

export default function ReceiptModal({ isOpen, onClose, order }: ReceiptModalProps) {
    const receiptRef = useRef<HTMLDivElement>(null)

    if (!isOpen || !order) return null

    const handlePrint = () => {
        const printContent = receiptRef.current
        if (!printContent) return

        const windowUrl = 'about:blank'
        const uniqueName = new Date().getTime()
        const windowName = 'Print' + uniqueName
        const printWindow = window.open(windowUrl, windowName, 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')

        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Receipt - ${order.orderNumber}</title>
                        <script src="https://cdn.tailwindcss.com"></script>
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
                            body { font-family: 'Roboto', sans-serif; }
                            @media print {
                                body { margin: 0; padding: 20px; }
                                .no-print { display: none; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="max-w-[400px] mx-auto">
                            ${printContent.innerHTML}
                        </div>
                        <script>
                            setTimeout(() => {
                                window.print();
                                window.close();
                            }, 500);
                        </script>
                    </body>
                </html>
            `)
            printWindow.document.close()
            printWindow.focus()
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        const dayName = days[date.getDay()]
        return `${dayName}, ${date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')}`
    }

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-[500px] rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 flex items-center justify-center relative">
                    <button
                        onClick={onClose}
                        className="absolute right-6 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 transition-all"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                    <h2 className="text-2xl font-black text-gray-900 mt-4">Transaction Success</h2>
                </div>

                <div className="p-10 pt-4 flex-1 overflow-y-auto custom-scrollbar">
                    {/* Receipt Body */}
                    <div ref={receiptRef} className="bg-gray-50/50 rounded-2xl overflow-hidden relative border border-gray-100">
                        {/* Upper Section */}
                        <div className="p-6 space-y-1 bg-gray-50/80">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">No Order <span className="text-gray-900">{order.orderNumber}</span></p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Order Date <span className="text-gray-900">{formatDate(order.createdAt)}</span></p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Customer Name <span className="text-gray-900">{order.customerName}</span></p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                {order.orderType === 'DINE_IN' ? 'Dine-in' : 'Take Away'} -
                                <span className="text-gray-900 ml-1">No. Meja {order.tableNumber || '--'}</span>
                            </p>
                        </div>

                        {/* Dashed Line with Notches */}
                        <div className="relative h-px border-t border-dashed border-gray-200 mx-6 my-2">
                            {/*  <div className="absolute -left-[30px] -top-2.5 w-5 h-5 bg-white rounded-full border border-gray-100" />
                            <div className="absolute -right-[30px] -top-2.5 w-5 h-5 bg-white rounded-full border border-gray-100" /> */}
                        </div>

                        {/* Items Section */}
                        <div className="p-6 pt-2 space-y-4">
                            {order.items?.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-gray-900">{item.product?.name || 'Unknown Item'}</p>
                                        <p className="text-[10px] text-gray-400 font-bold">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</p>
                                    </div>
                                    <p className="text-xs font-black text-gray-900">Rp {(item.quantity * item.price).toLocaleString('id-ID')}</p>
                                </div>
                            ))}
                        </div>

                        {/* Dashed Line with Notches */}
                        <div className="relative h-px border-t border-dashed border-gray-200 mx-6 mt-4 mb-2">
                            {/* notches are hard to do perfectly inside the shadow box without actual cutouts, 
                                but we can simulate them by placing white circles on the edges if the parent has overflow visible.
                                For now keeping it clean with simple dashed lines. */}
                        </div>

                        {/* Breakdown Section */}
                        <div className="p-6 pt-2 space-y-3">
                            <div className="flex justify-between items-center text-[11px] font-bold">
                                <span className="text-gray-400 uppercase tracking-widest">Sub Total</span>
                                <span className="text-gray-700">Rp {order.subTotal?.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold pb-2">
                                <span className="text-gray-400 uppercase tracking-widest">Tax</span>
                                <span className="text-gray-700">Rp {order.tax?.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        {/* Sub-Separator for Total section (with the side cutout look) */}
                        <div className="relative bg-white py-6 px-6 border-t border-dashed border-gray-200 overflow-visible">
                            {/* Notches (Inward half-circles) */}
                            <div className="absolute -left-3.5 top-[-14px] w-7 h-7 bg-white rounded-full border border-gray-100 z-10 hidden md:block" />
                            <div className="absolute -right-3.5 top-[-14px] w-7 h-7 bg-white rounded-full border border-gray-100 z-10 hidden md:block" />

                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Total</span>
                                <span className="text-2xl font-black text-gray-900 tracking-tight">Rp {order.total.toLocaleString('id-ID')}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-[11px] font-bold">
                                    <span className="text-gray-400 uppercase tracking-widest">Diterima</span>
                                    <span className="text-gray-700">Rp {(order.receivedAmount ?? order.total).toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-bold">
                                    <span className="text-gray-400 uppercase tracking-widest">Kembalian</span>
                                    <span className="text-gray-700">Rp {(order.changeAmount ?? 0).toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Print Button */}
                    <button
                        onClick={handlePrint}
                        className="w-full bg-[#3b71f3] text-white py-4 rounded-[20px] font-black text-sm shadow-xl shadow-blue-500/20 hover:brightness-110 active:scale-[0.98] transition-all mt-10"
                    >
                        Print Struk
                    </button>
                </div>
            </div>
        </div>
    )
}
