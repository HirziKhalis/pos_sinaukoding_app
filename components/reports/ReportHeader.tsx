'use client'

import { format } from 'date-fns'

export default function ReportHeader() {
    return (
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Sales Report</h1>

            <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100/50">
                    Today, {format(new Date(), 'EEEE dd MMMM yyyy')}
                </span>
            </div>
        </div>
    )
}
