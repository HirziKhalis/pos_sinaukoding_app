const categories = [
    {
        id: 'all',
        name: 'All Menu',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
    },
    {
        id: 'foods',
        name: 'Foods',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18v-2a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v2Z" /><path d="M12 15V3" /><path d="m8 7 4-4 4 4" /></svg>
    },
    {
        id: 'beverages',
        name: 'Beverages',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" /></svg>
    },
    {
        id: 'dessert',
        name: 'Dessert',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.8V10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3.8" /><path d="M4 17h16" /><path d="M10 8V5c0-1.1.9-2 2-2s2 .9 2 2v3" /><path d="M8 17v-3.2c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2V17" /><circle cx="12" cy="17" r="1" /></svg>
    },
]

export default function CategoryTabs() {
    return (
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, index) => (
                <button
                    key={cat.id}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl min-w-[160px] transition-all border ${index === 0
                            ? 'bg-[#3b71f3] border-[#3b71f3] text-white shadow-lg shadow-blue-500/25'
                            : 'bg-white border-gray-100 text-gray-400 hover:border-blue-200'
                        }`}
                >
                    <div className={`${index === 0 ? 'text-white' : 'text-gray-300'}`}>
                        {cat.icon}
                    </div>
                    <span className="font-semibold text-base">{cat.name}</span>
                </button>
            ))}
        </div>
    )
}

