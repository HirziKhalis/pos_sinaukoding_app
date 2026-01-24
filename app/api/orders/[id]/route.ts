import { withApiGuard } from '@/lib/api'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = {
    params: Promise<{ id: string }>
}

export async function GET(
    _: Request,
    { params }: Params
) {
    return withApiGuard(async () => {
        const { id } = await params   // ✅ THIS IS THE FIX

        const user = await requireAuth()

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                cashier: {
                    select: { id: true, email: true },
                },
                items: {
                    include: {
                        product: {
                            select: { id: true, name: true },
                        },
                    },
                },
            },
        })

        if (!order) {
            return new Response('Order not found', { status: 404 })
        }

        if (
            user.role !== 'ADMIN' &&
            order.cashierId !== user.userId
        ) {
            return new Response('Forbidden', { status: 403 })
        }

        return Response.json(order)
    })
}
