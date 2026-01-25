export default function MenuCard() {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all group">
            {/* Image Container with Badge */}
            <div className="relative h-44 bg-gray-50 rounded-2xl mb-4 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop"
                    alt="Gado-gado"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-[#3b71f3] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Food
                </div>
            </div>

            {/* Content */}
            <h3 className="font-bold text-gray-900 mb-1">Gado-gado Special</h3>
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                Vegetables, egg, tempe, tofu, ketupat, peanut sauce, and kerupuk.
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-[#3b71f3] font-bold">Rp 20.000</span>
                    <span className="text-[10px] text-gray-400 font-medium ml-1">/portion</span>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                </button>
            </div>
        </div>
    )
}

