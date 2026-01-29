import { withApiGuard } from '@/lib/api'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
    return withApiGuard(async () => {
        const payload = await requireAuth()

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                imageUrl: true,
                createdAt: true,
            }
        })

        if (!user) {
            return new Response('User not found', { status: 404 })
        }

        return Response.json(user)
    })
}
