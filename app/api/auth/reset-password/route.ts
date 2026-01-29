import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const { token, newPassword } = await request.json()

        if (!token || !newPassword) {
            return new Response('Token and new password are required', { status: 400 })
        }

        if (newPassword.length < 6) {
            return new Response('Password must be at least 6 characters', { status: 400 })
        }

        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date() // Must not be expired
                }
            }
        })

        if (!user) {
            return new Response('Invalid or expired token', { status: 400 })
        }

        const passwordHash = await hash(newPassword, 10)

        // Update password and clear token
        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash,
                resetToken: null,
                resetTokenExpiry: null
            }
        })

        return Response.json({ success: true })

    } catch (error) {
        console.error(error)
        return new Response('Internal Server Error', { status: 500 })
    }
}
