'use client'

import { useState, useEffect, useCallback } from 'react'
import ReportHeader from '@/components/reports/ReportHeader'
import MetricsGrid from '@/components/reports/MetricsGrid'
import FiltersBar from '@/components/reports/FiltersBar'
import OrdersTable from '@/components/reports/OrdersTable'

export default function SalesReportPage() {
    const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // 30 days ago
    const [endDate, setEndDate] = useState<Date | null>(new Date())
    const [category, setCategory] = useState('ALL')
    const [orderType, setOrderType] = useState('ALL')

    const [metrics, setMetrics] = useState<any | null>(null)
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchReportData = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (startDate) params.append('startDate', startDate.toISOString())
            if (endDate) params.append('endDate', endDate.toISOString())
            if (category !== 'ALL') params.append('category', category)
            if (orderType !== 'ALL') params.append('orderType', orderType)

            const res = await fetch(`/api/reports/sales?${params.toString()}`)
            if (res.ok) {
                const data = await res.json()
                setMetrics(data.metrics)
                setOrders(data.orders)
            }
        } catch (error) {
            console.error('Failed to fetch report data:', error)
        } finally {
            setLoading(false)
        }
    }, [startDate, endDate, category, orderType])

    useEffect(() => {
        fetchReportData()
    }, [fetchReportData])

    return (
        <div className="p-8 space-y-8 bg-[#f8faff] min-h-full">
            <ReportHeader />
            <MetricsGrid metrics={metrics} />
            <FiltersBar
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                category={category}
                setCategory={setCategory}
                orderType={orderType}
                setOrderType={setOrderType}
                onSearch={fetchReportData}
            />
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b71f3]"></div>
                </div>
            ) : (
                <OrdersTable orders={orders} />
            )}
        </div>
    )
}
