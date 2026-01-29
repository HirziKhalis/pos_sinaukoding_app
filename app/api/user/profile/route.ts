import { withApiGuard } from '@/lib/api'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request) {
    return withApiGuard(async () => {
        const payload = await requireAuth()
        const { imageUrl, name } = await request.json()

        const updateData: any = {}
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl
        if (name !== undefined) updateData.name = name

        const user = await prisma.user.update({
            where: { id: payload.userId },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                imageUrl: true
            }
        })

        return Response.json(user)
    })
}
