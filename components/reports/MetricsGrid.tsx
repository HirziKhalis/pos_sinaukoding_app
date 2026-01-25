const metrics = [
    {
        label: 'Total Order',
        value: '100',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
    },
    {
        label: 'Total Omzet',
        value: 'Rp 2.000.000',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4Z" /></svg>
    },
    {
        label: 'All Menu Sales',
        value: '100',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
    },
    {
        label: 'Foods',
        value: '25',
        showDetail: true,
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18v-2a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v2Z" /><path d="M12 15V3" /><path d="m8 7 4-4 4 4" /></svg>
    },
    {
        label: 'Beverages',
        value: '50',
        showDetail: true,
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" /></svg>
    },
    {
        label: 'Desserts',
        value: '50',
        showDetail: true,
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.8V10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3.8" /><path d="M4 17h16" /><path d="M10 8V5c0-1.1.9-2 2-2s2 .9 2 2v3" /></svg>
    },
]

export default function MetricsGrid() {
    return (
        <div className="grid grid-cols-6 gap-6 mb-8">
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
    )
}

