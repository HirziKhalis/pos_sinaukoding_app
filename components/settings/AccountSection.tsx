export default function AccountSection() {
    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Account</h2>

            <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-50 flex-shrink-0">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex gap-3">
                    <button className="bg-[#3b71f3] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all">
                        Change Picture
                    </button>
                    <button className="bg-white border border-blue-200 text-[#3b71f3] px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-50 transition-all">
                        Delete Picture
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                <Input label="Email" value="johndoe@gmail.com" />
                <Input label="Username" value="John Doe" />
                <Input label="Role" value="Admin" />

                <Input label="Status" value="Active" />
                <Select label="Language" options={['English']} />
            </div>
        </section>
    )
}

function Input({
    label,
    value,
    disabled,
}: {
    label: string
    value?: string
    disabled?: boolean
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-400 ml-1 leading-none">{label}</label>
            <input
                disabled={disabled}
                defaultValue={value}
                className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-700 placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
            />
        </div>
    )
}

function Select({
    label,
    options,
}: {
    label: string
    options: string[]
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-400 ml-1 leading-none">{label}</label>
            <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-100 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-700">
                    {options.map((o) => (
                        <option key={o}>{o}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
            </div>
        </div>
    )
}

