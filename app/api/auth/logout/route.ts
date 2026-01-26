import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json({ message: 'Logged out' })

    response.cookies.set({
        name: 'auth_token',
        value: '',
        httpOnly: true,
        path: '/',
        maxAge: 0,
    })

    response.cookies.set({
        name: 'role',
        value: '',
        httpOnly: false,
        path: '/',
        maxAge: 0,
    })

    return response
}
