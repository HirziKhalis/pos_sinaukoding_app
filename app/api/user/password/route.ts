import { withApiGuard } from '@/lib/api'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { compare, hash } from 'bcryptjs'

export async function PATCH(request: Request) {
    return withApiGuard(async () => {
        const authUser = await requireAuth()
        const { currentPassword, newPassword } = await request.json()

        if (!currentPassword || !newPassword) {
            return new Response('Current and new password are required', { status: 400 })
        }

        if (newPassword.length < 6) {
            return new Response('New password must be at least 6 characters', { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id: authUser.userId }
        })

        if (!user) {
            return new Response('User not found', { status: 404 })
        }

        const isValid = await compare(currentPassword, user.passwordHash)

        if (!isValid) {
            return new Response('Incorrect current password', { status: 400 })
        }

        const passwordHash = await hash(newPassword, 10)

        await prisma.user.update({
            where: { id: user.id },
            data: { passwordHash }
        })

        return Response.json({ success: true })
    })
}
