type MenuCardProps = {
    mode?: 'ADMIN' | 'CASHIER'
    product: {
        id: string
        name: string
        description?: string | null
        price: number
        imageUrl?: string | null
        category: string
    }
    onEdit?: (product: any) => void
    onAdd?: (product: any) => void
    onClick?: (product: any) => void
}

export default function MenuCard({ mode = 'CASHIER', product, onEdit, onAdd, onClick }: MenuCardProps) {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all group overflow-hidden h-fit">
            <div
                className="cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation()
                    onClick?.(product)
                }}
            >
                {/* Image Container with Badge */}
                <div className="relative h-44 bg-gray-50 rounded-2xl mb-4 overflow-hidden">
                    <img
                        src={product.imageUrl || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                        className="absolute top-3 right-3 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                        style={{ background: "linear-gradient(to right, #4C3BCF, #3572EF)" }}
                    >
                        {product.category.toLowerCase()}
                    </div>
                </div>

                {/* Content */}
                <div className="h-28 overflow-hidden mb-2">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-[11px] text-gray-400 line-clamp-3 leading-relaxed">
                        {product.description || "No description available."}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <div>
                    <span className="text-[#3b71f3] font-black text-sm">Rp {product.price.toLocaleString('id-ID')}</span>
                    <span className="text-[10px] text-gray-400 font-medium ml-1">/portion</span>
                </div>
                {mode === 'CASHIER' ? (
                    <button
                        onClick={() => onAdd?.(product)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-[#3b71f3] hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </button>
                ) : (
                    <button
                        onClick={() => onEdit?.(product)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-all"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                    </button>
                )}
            </div>
        </div>
    )
}



