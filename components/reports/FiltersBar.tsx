export default function FiltersBar() {
    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-end gap-6 mb-8 shadow-sm">
            <div className="flex-1 max-w-[240px]">
                <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Start</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Select date"
                        className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-300"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-300">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-[240px]">
                <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Finish</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Select date"
                        className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-300"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-300">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Category</label>
                <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-300">
                        <option>Select category</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Order Type</label>
                <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-300">
                        <option>Select order type</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                </div>
            </div>

            <button className="bg-[#3b71f3] text-white px-12 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#2a5bd7] active:scale-[0.98] transition-all">
                Search
            </button>

            <button className="h-[52px] w-[52px] flex items-center justify-center border border-gray-200 rounded-2xl text-gray-400 hover:bg-gray-50 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
            </button>
        </div>
    )
}

