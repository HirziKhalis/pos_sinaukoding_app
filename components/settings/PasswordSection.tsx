'use client'

import { useState } from 'react'
import { useToast } from '@/context/ToastContext'

export default function PasswordSection() {
    const { success, error: showError } = useToast()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async () => {
        if (!formData.currentPassword || !formData.newPassword) {
            showError('Please fill in both fields')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/user/password', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Failed to update password')
            }

            success('Password updated successfully')
            setFormData({ currentPassword: '', newPassword: '' })
        } catch (err: any) {
            showError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Password</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <div className="space-y-2">
                    <label className="block text-[11px] font-black text-gray-400 ml-1 uppercase tracking-widest leading-none">
                        Current Password
                    </label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-white border border-gray-100/50 rounded-xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-gray-700 placeholder:text-gray-300"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-[11px] font-black text-gray-400 ml-1 uppercase tracking-widest leading-none">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-white border border-gray-100/50 rounded-xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-gray-700 placeholder:text-gray-300"
                    />
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#3b71f3] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Updating...' : 'Change Password'}
            </button>
        </section>
    )
}
