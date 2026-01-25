export default function PasswordSection() {
    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Password</h2>

            <div className="max-w-sm space-y-2">
                <label className="block text-sm font-bold text-gray-400 ml-1 leading-none">Password</label>
                <input
                    type="password"
                    defaultValue="********"
                    className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-700"
                />
            </div>

            <button className="bg-[#3b71f3] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all">
                Change Password
            </button>
        </section>
    )
}

