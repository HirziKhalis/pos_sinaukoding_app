'use client'

import React from 'react'

const metrics = [
    {
        label: 'Total Orders',
        value: '500',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
    },
    {
        label: 'Total Omzet',
        value: 'Rp 10.000.000',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4Z" /></svg>
    },
    {
        label: 'All Menu Orders',
        value: '1000',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
    },
    {
        label: 'Foods',
        value: '500',
        showDetail: true,
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18v-2a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v2Z" /><path d="M12 15V3" /><path d="m8 7 4-4 4 4" /></svg>
    },
    {
        label: 'Beverages',
        value: '300',
        showDetail: true,
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" /></svg>
    },
    {
        label: 'Desserts',
        value: '200',
        showDetail: true,
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.8V10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3.8" /><path d="M4 17h16" /><path d="M10 8V5c0-1.1.9-2 2-2s2 .9 2 2v3" /></svg>
    },
]

const chartData = [
    { day: 'Mon', food: 40, beverage: 160, dessert: 30 },
    { day: 'Tue', food: 60, beverage: 100, dessert: 10 },
    { day: 'Wed', food: 80, beverage: 260, dessert: 25 },
    { day: 'Thu', food: 110, beverage: 160, dessert: 70 },
    { day: 'Fri', food: 140, beverage: 210, dessert: 15 },
    { day: 'Sat', food: 80, beverage: 160, dessert: 50 },
    { day: 'Sun', food: 40, beverage: 100, dessert: 15 },
    { day: 'Mon', food: 80, beverage: 160, dessert: 30 },
    { day: 'Tue', food: 80, beverage: 270, dessert: 25 },
    { day: 'Wed', food: 40, beverage: 160, dessert: 70 },
]

export default function AdminDashboard() {
    return (
        <div className="p-8 space-y-8 bg-[#f8faff] min-h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-[11px] font-medium text-gray-400">Today, Senin 30 September 2024</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-6 gap-6">
                {metrics.map((m) => (
                    <div
                        key={m.label}
                        className="relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-start gap-3"
                    >
                        <div className="text-blue-500 bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center">
                            {m.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">{m.label}</p>
                            <p className="text-xl font-black text-gray-900 leading-none">{m.value}</p>
                        </div>
                        {m.showDetail && (
                            <div className="absolute bottom-4 right-4 text-blue-400">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white border border-gray-100 rounded-[32px] p-10 shadow-sm">
                {/* Chart Header */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-bold text-gray-900">Total Omzet</h2>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                                type="text" placeholder="Start date"
                                className="bg-white border border-gray-100 rounded-2xl px-5 py-3 text-xs w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/10 placeholder:text-gray-300"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="text" placeholder="Finish date"
                                className="bg-white border border-gray-100 rounded-2xl px-5 py-3 text-xs w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/10 placeholder:text-gray-300"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                            </div>
                        </div>
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-100 rounded-2xl px-5 py-3 text-xs w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-gray-300">
                                <option>Select Category</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bar Chart Root */}
                <div className="relative h-[400px] w-full flex items-end">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[11px] font-bold text-gray-300 -translate-x-12 pb-8">
                        <span>300k</span>
                        <span>250k</span>
                        <span>200k</span>
                        <span>150k</span>
                        <span>100k</span>
                        <span>50k</span>
                        <span>0</span>
                    </div>

                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pb-8 pointer-events-none">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="w-full border-t border-dashed border-gray-100" />
                        ))}
                    </div>

                    {/* Bars Container */}
                    <div className="flex-1 flex justify-around items-end h-full px-4 relative z-10 pb-8">
                        {chartData.map((d, i) => (
                            <div key={i} className="flex flex-col items-center group relative h-full justify-end w-12">
                                <div className="flex items-end gap-1 px-1 h-full">
                                    <div
                                        className="w-3.5 bg-[#1e4eb0] rounded-t-sm transition-all duration-500 group-hover:brightness-110"
                                        style={{ height: `${(d.food / 300) * 100}%` }}
                                    />
                                    <div
                                        className="w-3.5 bg-[#3b71f3] rounded-t-sm transition-all duration-500 group-hover:brightness-110"
                                        style={{ height: `${(d.beverage / 300) * 100}%` }}
                                    />
                                    <div
                                        className="w-3.5 bg-[#d0e0ff] rounded-t-sm transition-all duration-500 group-hover:brightness-110"
                                        style={{ height: `${(d.dessert / 300) * 100}%` }}
                                    />
                                </div>
                                <span className="absolute -bottom-7 text-[11px] font-bold text-gray-400">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-10 mt-12">
                    <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 bg-[#1e4eb0] rounded-sm" />
                        <span className="text-xs font-bold text-gray-600">Food</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 bg-[#3b71f3] rounded-sm" />
                        <span className="text-xs font-bold text-gray-600">Beverage</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 bg-[#d0e0ff] rounded-sm" />
                        <span className="text-xs font-bold text-gray-600">Dessert</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
