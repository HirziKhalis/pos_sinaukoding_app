export default function TransactionDetail() {
    return (
        <div className="space-y-8">
            {/* Order Info Card */}
            <div className="bg-[#f8faff] rounded-3xl p-8 space-y-4">
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-gray-400">No Order <span className="text-gray-900 ml-2">ORDR#1234567890</span></p>
                    <p className="text-xs font-semibold text-gray-400">Order Date <span className="text-gray-900 ml-2">Rabu, 18/09/2024 12:30:00</span></p>
                    <p className="text-xs font-semibold text-gray-400">Customer Name <span className="text-gray-900 ml-2">Anisa</span></p>
                    <p className="text-sm font-bold text-gray-900 mt-2">Dine-in • No.Meja 02</p>
                </div>

                {/* Dashed Line Separator */}
                <div className="border-t border-dashed border-gray-200 my-6" />

                {/* Items */}
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="text-lg font-black text-gray-900">Gado-gado Spesial</h4>
                        <p className="text-sm font-bold text-gray-400 mt-1">1 x Rp 20.000</p>
                    </div>
                    <span className="text-lg font-black text-gray-900">Rp 20.000</span>
                </div>

                {/* Dashed Line Separator */}
                <div className="border-t border-dashed border-gray-200 my-6" />

                {/* Calculation */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-400">Sub Total</span>
                        <span className="text-gray-900">Rp 20.000</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-400">Tax</span>
                        <span className="text-gray-900">Rp 5.000</span>
                    </div>
                </div>

                {/* Dashed Line Separator */}
                <div className="border-t border-dashed border-gray-200 my-6" />

                {/* Grand Total */}
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-gray-900">Total</span>
                    <span className="text-3xl font-black text-[#3b71f3]">Rp 25.000</span>
                </div>

                {/* Payment Info */}
                <div className="space-y-2 pt-4">
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-400">Diterima</span>
                        <span className="text-gray-900">Rp 50.000</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-400">Kembalian</span>
                        <span className="text-gray-900 font-black">Rp 25.000</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

