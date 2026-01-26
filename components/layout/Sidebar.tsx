'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [role, setRole] = useState<'ADMIN' | 'CASHIER' | null>(null)
    const pathname = usePathname()

    useEffect(() => {
        const cookies = document.cookie.split('; ')
        const roleCookie = cookies.find(row => row.startsWith('role='))
        if (roleCookie) {
            setRole(roleCookie.split('=')[1] as 'ADMIN' | 'CASHIER')
        }
    }, [])

    const adminItems = [
        {
            name: 'Dashboard',
            href: '/dashboard/admin',
            icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
            ),
        },
        {
            name: 'Catalog',
            href: '/dashboard/catalog',
            icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <path d="M8 14h8" />
                    <path d="M8 18h5" />
                </svg>
            ),
        },
        {
            name: 'Sales Report',
            href: '/dashboard/reports',
            icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                    <path d="M12 18h.01" />
                    <path d="M9 7h6" />
                    <path d="M9 11h6" />
                    <path d="M9 15h2" />
                    <rect x="10" y="2" width="4" height="2" />
                </svg>
            ),
        },
        {
            name: 'Settings',
            href: '/dashboard/settings',
            icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            ),
        },
    ]

    const cashierItems = [
        {
            name: 'Menu',
            href: '/dashboard',
            icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
            ),
        },
        {
            name: 'Sales Report',
            href: '/dashboard/reports',
            icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                    <path d="M12 18h.01" />
                    <path d="M9 7h6" />
                    <path d="M9 11h6" />
                    <path d="M9 15h2" />
                    <rect x="10" y="2" width="4" height="2" />
                </svg>
            ),
        },
        {
            name: 'Settings',
            href: '/dashboard/settings',
            icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            ),
        },
    ]

    const navItems = role === 'ADMIN' ? adminItems : cashierItems

    return (
        <aside
            className={`bg-white border-r h-full flex flex-col transition-all duration-300 ease-in-out relative ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Collapse Toggle Button - Absolute when Expanded */}
            {!isCollapsed && (
                <button
                    onClick={() => setIsCollapsed(true)}
                    className="absolute -right-4 top-8 w-8 h-8 bg-white border border-[#E8EFFE] rounded-full flex items-center justify-center text-[#3b71f3] hover:bg-[#F5F8FF] transition-all duration-300 shadow-sm hover:shadow-md z-20"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
            )}

            {/* Logo Section */}
            <div className={`flex items-center gap-4 px-6 py-8 h-24 overflow-hidden relative border-b border-gray-50`}>
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20"
                    style={{ background: "linear-gradient(to right, #4C3BCF, #3572EF)" }}
                >
                    <span className="text-white font-bold text-2xl">P</span>
                </div>
                {!isCollapsed && (
                    <span className="text-[#2D3036] font-black text-2xl tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-4 duration-300">
                        PadiPos
                    </span>
                )}
            </div>

            {/* Collapse Toggle Button - Centered in Column when Collapsed */}
            {isCollapsed && (
                <div className="flex w-full justify-center py-6 border-b border-gray-50">
                    <button
                        onClick={() => setIsCollapsed(false)}
                        className="w-10 h-10 bg-white border border-[#E8EFFE] rounded-full flex items-center justify-center text-[#3b71f3] hover:bg-[#F5F8FF] transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 mt-4 px-3 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 py-4 rounded-2xl transition-all group relative overflow-hidden ${isActive
                                ? 'text-[#3b71f3] bg-blue-50/30'
                                : 'text-gray-300 hover:text-gray-500'
                                } ${isCollapsed ? 'px-3 justify-center' : 'px-5'}`}
                        >
                            <div className={`flex-shrink-0 transition-all duration-300 ${isActive ? 'scale-110 text-[#3b71f3]' : 'group-hover:text-gray-500'}`}>
                                {item.icon}
                            </div>

                            {!isCollapsed && (
                                <span className={`text-base font-bold whitespace-nowrap animate-in fade-in slide-in-from-left-4 duration-300`}>
                                    {item.name}
                                </span>
                            )}

                            {/* Active Indicator Line */}
                            {isActive && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-[5px] bg-[#3b71f3] rounded-l-full shadow-[0_0_8px_rgba(59,113,243,0.5)]" />
                            )}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
