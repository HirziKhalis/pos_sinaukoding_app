'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/context/ToastContext'
import AccountSection from '@/components/settings/AccountSection'
import PasswordSection from '@/components/settings/PasswordSection'
import AppearanceSection from '@/components/settings/AppearanceSection'

export default function SettingsPage() {
    const { success, error: showError } = useToast()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me')
            if (res.ok) {
                const data = await res.json()
                setUser(data)
            }
        } catch (err) {
            console.error('Failed to fetch user:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: user.name
                }),
            })

            if (!res.ok) throw new Error('Failed to save changes')

            const updatedUser = await res.json()
            setUser(updatedUser)
            success('Changes saved successfully!')
            // Optional: refresh to update header
            window.location.reload()
        } catch (err: any) {
            showError(err.message || 'Something went wrong')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="p-8 space-y-8 animate-pulse">
                <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                <div className="space-y-12">
                    <div className="h-64 bg-gray-100 rounded-3xl" />
                    <div className="h-64 bg-gray-100 rounded-3xl" />
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 space-y-12 bg-[#f8faff] min-h-full">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Settings</h1>

            <div className="space-y-12 max-w-6xl pb-24">
                <AccountSection
                    user={user}
                    onUserUpdate={setUser}
                    onNameChange={(newName) => setUser({ ...user, name: newName })}
                />
                <PasswordSection />
                <AppearanceSection />
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-6 flex justify-end z-10 px-12">
                <button
                    disabled={saving}
                    onClick={handleSave}
                    className={`bg-[#3b71f3] text-white px-12 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] ${saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                        }`}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    )
}
