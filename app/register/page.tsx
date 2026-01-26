'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, role: 'CASHIER' }),
        })

        const data = await res.json()
        setLoading(false)

        if (!res.ok) {
            setError(data.message || 'Registration failed')
            return
        }

        setSuccess('Account created successfully! Redirecting to login...')
        setTimeout(() => {
            router.push('/login')
        }, 2000)
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

            {/* Register Card */}
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-400 text-sm">Join us and start managing your store efficiently!</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 text-xs p-3 rounded-xl mb-6 text-center">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 text-green-600 text-xs p-3 rounded-xl mb-6 text-center">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username/Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 ml-1">
                                Email / Username
                            </label>
                            <input
                                type="email"
                                placeholder="Email address"
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
                            </div>
                        </div>
                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 ml-1">
                                Confirm Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                className="w-full pl-5 pr-12 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300 text-gray-900"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#3b71f3] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-blue-500/30 hover:bg-[#2a5bd7] active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 mt-4"
                        >
                            {loading ? 'Creating account...' : 'Register'}
                        </button>

                        {/* Login Link */}
                        <div className="text-center text-sm pt-4">
                            <span className="text-gray-400">Already have an account? </span>
                            <Link href="/login" className="text-[#3b71f3] font-semibold hover:underline">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
