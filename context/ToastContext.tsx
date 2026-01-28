'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import Toast, { ToastType } from '@/components/ui/Toast'

interface ToastItem {
    id: string
    message: string
    type: ToastType
    duration?: number
}

interface ToastContextType {
    toast: (message: string, type?: ToastType, duration?: number) => void
    success: (message: string) => void
    error: (message: string) => void
    warning: (message: string) => void
    info: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const addToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substring(2, 9)
        setToasts((prev) => [...prev, { id, message, type, duration }])
    }, [])

    const success = (msg: string) => addToast(msg, 'success')
    const error = (msg: string) => addToast(msg, 'error')
    const warning = (msg: string) => addToast(msg, 'warning')
    const info = (msg: string) => addToast(msg, 'info')

    return (
        <ToastContext.Provider value={{ toast: addToast, success, error, warning, info }}>
            {children}
            {/* Toast Container */}
            <div className="fixed top-8 right-8 z-[200] flex flex-col items-end">
                {toasts.map((t) => (
                    <Toast
                        key={t.id}
                        {...t}
                        onClose={removeToast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
