export default function AppearanceSection() {
    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Appearance</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Select label="Preferance Mode" options={['Light Mode']} />
                <Select label="Font Size" options={['16 px']} />
                <Select label="Zoom Display" options={['100 (Normal)']} />
            </div>
        </section>
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

