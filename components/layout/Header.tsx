'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OrderArchiveModal from '@/components/cashier/OrderArchiveModal'

export default function Header() {
    const router = useRouter()
    const [isArchiveOpen, setIsArchiveOpen] = useState(false)
    const [user, setUser] = useState<{ role: string, name: string }>({ role: '', name: 'John Doe' })

    useEffect(() => {
        const cookies = document.cookie.split('; ')
        const roleCookie = cookies.find(row => row.startsWith('role='))
        const nameCookie = cookies.find(row => row.startsWith('user_name=')) // Fallback if name is in cookie

        if (roleCookie) {
            setUser(prev => ({ ...prev, role: roleCookie.split('=')[1] }))
        }
    }, [])

    async function handleLogout() {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
            })

            if (res.ok) {
                router.push('/login')
                router.refresh()
            }
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <header className="h-18 bg-white border-b flex items-center justify-between px-6">
            <div className="flex items-center flex-1">
                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </div>
                    <input
                        className="w-full bg-[#f8faff] border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
                        placeholder="Enter the keyword here..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Order Archive */}
                {user.role === 'CASHIER' && (
                    <button
                        onClick={() => setIsArchiveOpen(true)}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8H3V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2Z" /><path d="M10 12h4" /><path d="M3 8v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8" /></svg>
                        </div>
                        <span className="text-xs font-semibold">Order Archive</span>
                    </button>
                )}

                {/* Vertical Divider */}
                <div className="w-px h-8 bg-gray-100 mx-2" />

                {/* User Profile */}
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-900 leading-none">{user.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium mt-1 capitalize">{user.role?.toLowerCase() || 'User'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden ring-2 ring-gray-50">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-9 h-9 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Logout"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                </button>
            </div>

            <OrderArchiveModal
                isOpen={isArchiveOpen}
                onClose={() => setIsArchiveOpen(false)}
            />
        </header>
    )
}

