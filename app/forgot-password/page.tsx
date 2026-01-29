'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        // Simulate API call for now or implement if route exists
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (!res.ok) throw new Error('Failed to send request')

            setSuccess('If an account exists for this email, you will receive a password reset link shortly.')
        } catch (err) {
            setError('Something went wrong. Please try again later.')
        } finally {
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

            {/* Forgot Password Card */}
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h1>
                        <p className="text-gray-400 text-sm">Enter your email address and we'll send you a link to reset your password.</p>
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
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300 text-gray-900"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !!success}
                            className="w-full bg-[#3b71f3] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-blue-500/30 hover:bg-[#2a5bd7] active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 mt-4"
                        >
                            {loading ? 'Sending link...' : 'Send Reset Link'}
                        </button>

                        {/* Back to Login Link */}
                        <div className="text-center text-sm pt-4">
                            <Link href="/login" className="text-[#3b71f3] font-semibold hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
