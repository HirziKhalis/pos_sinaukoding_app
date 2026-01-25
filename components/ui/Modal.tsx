'use client'

import { ReactNode } from 'react'

type ModalProps = {
    open: boolean
    onClose: () => void
    title?: string
    children: ReactNode
}

export default function Modal({
    open,
    onClose,
    title,
    children,
}: ModalProps) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Modal card */}
            <div className="relative bg-white rounded-[40px] w-full max-w-[640px] p-12 z-10 shadow-2xl animate-in fade-in zoom-in duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-10 top-10 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>

                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">{title}</h2>
                </div>

                {/* Content */}
                {children}
            </div>
        </div>
    )
}

