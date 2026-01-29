'use client'

import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}

const formatCompactNumber = (number: number) => {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(0) + 'k'
    }
    return number.toString()
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-xl min-w-[200px]">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">{label}</p>
                <div className="space-y-2">
                    {payload.map((entry: any, index: number) => {
                        const dataKey = entry.dataKey
                        const originalValue = entry.payload?.[dataKey]
                        const displayValue = Number(originalValue) || Number(entry.value) || 0

                        return (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                <span className="text-sm font-bold text-gray-600">{entry.name}:</span>
                                <span className="text-sm font-black text-gray-900 ml-auto">
                                    {formatCurrency(displayValue)}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    return null
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/admin/dashboard-stats')
            if (res.ok) {
                const data = await res.json()
                setStats(data)
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="p-8 space-y-8 animate-pulse text-gray-900">
                <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                <div className="grid grid-cols-6 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-100 rounded-2xl" />
                    ))}
                </div>
                <div className="h-[500px] bg-gray-100 rounded-[32px]" />
            </div>
        )
    }

    const metricsData = [
        {
            label: 'Total Orders',
            value: (stats?.metrics?.totalOrders || 0).toString(),
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
        },
        {
            label: 'Total Omzet',
            value: formatCurrency(stats?.metrics?.totalOmzet || 0),
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4Z" /></svg>
        },
        {
            label: 'All Menu Orders',
            value: (stats?.metrics?.allMenuOrders || 0).toString(),
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
        },
        {
            label: 'Foods',
            value: (stats?.metrics?.foodCount || 0).toString(),
            showDetail: true,
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18v-2a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v2Z" /><path d="M12 15V3" /><path d="m8 7 4-4 4 4" /></svg>
        },
        {
            label: 'Beverages',
            value: (stats?.metrics?.beverageCount || 0).toString(),
            showDetail: true,
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" /></svg>
        },
        {
            label: 'Desserts',
            value: (stats?.metrics?.dessertCount || 0).toString(),
            showDetail: true,
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.8V10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3.8" /><path d="M4 17h16" /><path d="M10 8V5c0-1.1.9-2 2-2s2 .9 2 2v3" /></svg>
        },
    ]

    return (
        <div className="p-8 space-y-8 bg-[#f8faff] min-h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h1>
                <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100/50">
                    Today, {format(new Date(), 'EEEE dd MMMM yyyy')}
                </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-6 gap-6">
                {metricsData.map((m) => (
                    <div
                        key={m.label}
                        className="relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-start gap-3 hover:shadow-md transition-shadow cursor-default"
                    >
                        <div className="text-[#3b71f3] bg-blue-50/50 w-10 h-10 rounded-xl flex items-center justify-center">
                            {m.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-300 mb-1 uppercase tracking-widest leading-none">{m.label}</p>
                            <p className="text-xl font-black text-gray-900 leading-none tracking-tight">{m.value}</p>
                        </div>
                        {m.showDetail && (
                            <div className="absolute bottom-4 right-4 text-blue-200">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white border border-gray-100 rounded-[32px] p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#3b71f3]" />

                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Total Omzet</h2>
                        <p className="text-sm font-bold text-gray-400 mt-1">Daily revenue performance by category</p>
                    </div>
                </div>

                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={stats?.chartData || []}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            barGap={8}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }}
                                tickFormatter={(value) => formatCompactNumber(value)}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: '#f8faff' }}
                                allowEscapeViewBox={{ x: true, y: true }}
                            />
                            <Legend
                                iconType="circle"
                                wrapperStyle={{ paddingTop: '50px' }}
                                formatter={(value) => <span className="text-xs font-bold text-gray-600 capitalize">{value}</span>}
                            />
                            <Bar
                                dataKey="food"
                                name="Food"
                                fill="#1e4eb0"
                                radius={[4, 4, 0, 0]}
                                barSize={12}
                                isAnimationActive={false}
                            />
                            <Bar
                                dataKey="beverage"
                                name="Beverage"
                                fill="#3b71f3"
                                radius={[4, 4, 0, 0]}
                                barSize={12}
                                isAnimationActive={false}
                            />
                            <Bar
                                dataKey="dessert"
                                name="Dessert"
                                fill="#d0e0ff"
                                radius={[4, 4, 0, 0]}
                                barSize={12}
                                isAnimationActive={false}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
