import AccountSection from '@/components/settings/AccountSection'
import PasswordSection from '@/components/settings/PasswordSection'
import AppearanceSection from '@/components/settings/AppearanceSection'

export default function SettingsPage() {
    return (
        <div className="p-8 space-y-12 bg-[#f8faff] min-h-full">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

            <div className="space-y-12 max-w-6xl">
                <AccountSection />
                <PasswordSection />
                <AppearanceSection />
            </div>

            <button className="bg-[#c4c4c4] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all hover:bg-gray-400">
                Save Changes
            </button>
        </div>
    )
}

