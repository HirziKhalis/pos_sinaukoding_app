'use client'

import { useState, useRef } from 'react'
import { useToast } from '@/context/ToastContext'

type UserData = {
    id: string
    email: string
    name: string | null
    role: string
    imageUrl: string | null
}

type AccountSectionProps = {
    user: UserData | null
    onUserUpdate: (updatedUser: UserData) => void
    onNameChange: (newName: string) => void
}

export default function AccountSection({ user, onUserUpdate, onNameChange }: AccountSectionProps) {
    const { success, error: showError } = useToast()
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!uploadRes.ok) throw new Error('Upload failed')
            const { url } = await uploadRes.json()

            const profileRes = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: url }),
            })

            if (!profileRes.ok) throw new Error('Profile update failed')

            const updatedUser = await profileRes.json()
            onUserUpdate(updatedUser)
            success('Profile picture updated successfully!')
        } catch (err: any) {
            showError(err.message || 'Something went wrong')
        } finally {
            setUploading(false)
        }
    }

    const handleDeletePicture = async () => {
        try {
            const profileRes = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: null }),
            })

            if (!profileRes.ok) throw new Error('Failed to delete picture')

            const updatedUser = await profileRes.json()
            onUserUpdate(updatedUser)
            success('Profile picture removed')
        } catch (err: any) {
            showError(err.message)
        }
    }

    const initials = user?.name
        ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : (user?.email?.[0]?.toUpperCase() || 'U')

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Account</h2>

            <div className="flex items-center gap-8">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center flex-shrink-0">
                        {user?.imageUrl ? (
                            <img
                                src={user.imageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-2xl font-black text-gray-300">{initials}</span>
                        )}

                        {uploading && (
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="bg-[#3b71f3] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {uploading ? 'Uploading...' : 'Change Picture'}
                        </button>
                        <button
                            onClick={handleDeletePicture}
                            className="bg-white border border-blue-200 text-[#3b71f3] px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-50 transition-all active:scale-[0.98]"
                        >
                            Delete Picture
                        </button>
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 ml-1 uppercase tracking-widest leading-none">
                        JPG, GIF or PNG. Max size of 800K
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                <Input label="Email" value={user?.email || ''} disabled />
                <Input
                    label="Full Name"
                    value={user?.name || ''}
                    onChange={(e) => onNameChange(e.target.value)}
                />
                <Input label="Role" value={user?.role || ''} disabled />

                <Input label="Status" value="Active" disabled />
                <Select label="Language" options={['English']} />
            </div>
        </section>
    )
}

function Input({
    label,
    value,
    disabled,
    onChange
}: {
    label: string
    value: string
    disabled?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className="space-y-2">
            <label className="block text-[11px] font-black text-gray-400 ml-1 uppercase tracking-widest leading-none">{label}</label>
            <input
                disabled={disabled}
                value={value}
                onChange={onChange}
                className="w-full bg-white border border-gray-100/50 rounded-xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-gray-700 placeholder:text-gray-300 disabled:bg-gray-50/50 disabled:text-gray-400"
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
            <label className="block text-[11px] font-black text-gray-400 ml-1 uppercase tracking-widest leading-none">{label}</label>
            <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-100/50 rounded-xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-gray-700">
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
