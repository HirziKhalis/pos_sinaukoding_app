'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!token) {
            setError('Invalid token. Please use the link from your email.')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            })

            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Failed to reset password')
            }

            setSuccess('Password reset successfully! Redirecting to login...')
            setTimeout(() => router.push('/login'), 2000)
        } catch (err: any) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    if (!token) {
        return (
            <div className="text-center">
                <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6">
                    Invalid or missing token. Please request a new password reset link.
                </div>
                <Link href="/forgot-password" className="text-[#3b71f3] font-bold hover:underline">
                    Go to Forgot Password
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 w-full max-w-[480px]">
            {/* Logo Section */}
            <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20"
                    style={{ background: "linear-gradient(to right, #4C3BCF, #3572EF)" }}>
                    <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-[#3b71f3] font-bold text-xl tracking-tight">PadiPos</span>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
                <p className="text-gray-400 text-sm">Enter your new password below.</p>
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
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 ml-1">
                        New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Min. 6 characters"
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300 text-gray-900"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 ml-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Re-enter password"
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300 text-gray-900"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !!success}
                    className="w-full bg-[#3b71f3] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-blue-500/30 hover:bg-[#2a5bd7] active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 mt-4"
                >
                    {loading ? 'Resetting...' : 'Set New Password'}
                </button>
            </form>
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-200">
            <div
                className="absolute inset-0 z-0 bg-[length:100%_100%] bg-center bg-contain opacity-80"
                style={{
                    backgroundImage: 'url("/images/auth/login-bg.png")',
                    filter: 'brightness(0.8)'
                }}
            />

            <div className="relative z-10 w-full flex justify-center px-4">
                <Suspense fallback={<div className="bg-white p-8 rounded-2xl shadow-xl">Loading...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    )
}
