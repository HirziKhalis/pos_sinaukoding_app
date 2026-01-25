export default function OrderPanel() {
    return (
        <aside className="w-[400px] bg-white border-l p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900">List Order</h2>
                <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20L12 2Z" /></svg>
                </div>
            </div>
            <p className="text-[10px] text-gray-400 mb-6 font-medium">No Order <span className="font-bold">#ORDR1234567890</span></p>

            {/* Toggle Buttons */}
            <div className="flex gap-4 mb-6">
                <button className="flex-1 bg-[#3b71f3] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20">
                    Dine in
                </button>
                <button className="flex-1 bg-white border border-gray-100 text-gray-300 py-3 rounded-xl font-bold text-sm hover:border-blue-200 transition-colors">
                    Take Away
                </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 ml-1">Customer Name</label>
                    <input
                        type="text"
                        placeholder="Customer Name"
                        className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-200"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 ml-1">No. Table</label>
                    <div className="relative">
                        <select className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-300 appearance-none">
                            <option>Select No. Table</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Empty State / Items */}
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
                <p className="text-sm font-semibold">No Menu Selected</p>
            </div>

            {/* Footer */}
            <button className="w-full bg-[#c4c4c4] text-white py-4 rounded-2xl font-bold text-lg cursor-not-allowed mt-auto">
                Pay
            </button>
        </aside>
    )
}

