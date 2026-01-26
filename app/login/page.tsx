'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Invalid email or password')
                setLoading(false)
                return
            }

            // Redirect based on role
            if (data.user?.role === 'ADMIN') {
                router.push('/dashboard/admin')
            } else {
                router.push('/dashboard/checkout')
            }
        } catch (err) {
            setError('Connection failed. Please check your internet.')
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center md:justify-start bg-gray-200">
            <div
                className="absolute inset-0 z-0 bg-[length:100%_100%] bg-center bg-contain opacity-80"
                style={{
                    backgroundImage: 'url("/images/auth/login-bg.png")',
                    filter: 'brightness(0.8)'
                }}
            />

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-[480px] px-4 md:ml-32">
                <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12">
                    {/* Logo Section */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20"
                            style={{ background: "linear-gradient(to right, #4C3BCF, #3572EF)" }}>
                            <span className="text-white font-bold text-xl">P</span>
                        </div>
                        <span className="text-[#3b71f3] font-bold text-xl tracking-tight">PadiPos</span>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                        <p className="text-gray-400 text-sm">Please enter your username and password here!</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 text-xs p-3 rounded-xl mb-6 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300 text-gray-900"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="w-full pl-5 pr-12 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300 text-gray-900"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    )}
                                </button>
                            </div>
                            <div className="flex justify-end pr-1">
                                <Link
                                    href="/forgot-password"
                                    className="text-[10px] text-gray-400 hover:text-blue-500 transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#3b71f3] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-blue-500/30 hover:bg-[#2a5bd7] active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 mt-4"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        {/* Register Link */}
                        <div className="text-center text-sm pt-4">
                            <span className="text-gray-400">Don't have an account? </span>
                            <Link href="/register" className="text-[#3b71f3] font-semibold hover:underline">
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
