import { withApiGuard } from '@/lib/api'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    return withApiGuard(async () => {
        const user = await requireAuth()

        const body = await request.json()
        const { items } = body

        if (!items || items.length === 0) {
            return new Response('No items', { status: 400 })
        }

        const productIds = items.map((i: any) => i.productId)

        const products = await prisma.product.findMany({
            where: {
                id: { in: productIds },
                isActive: true,
            },
        })

        // Validate stock + calculate total
        let total = 0

        for (const item of items) {
            const product = products.find(p => p.id === item.productId)

            if (!product) {
                return new Response('Product not found', { status: 404 })
            }

            if (product.stock < item.quantity) {
                return new Response('Insufficient stock', { status: 400 })
            }

            total += product.price * item.quantity
        }

        // 🔒 Transaction: order + items + stock update
        const order = await prisma.$transaction(async (tx) => {
            const createdOrder = await tx.order.create({
                data: {
                    cashierId: user.userId,
                    total,
                },
            })

            for (const item of items) {
                const product = products.find(p => p.id === item.productId)!

                await tx.orderItem.create({
                    data: {
                        orderId: createdOrder.id,
                        productId: product.id,
                        quantity: item.quantity,
                        price: product.price,
                    },
                })

                await tx.product.update({
                    where: { id: product.id },
                    data: {
                        stock: { decrement: item.quantity },
                    },
                })
            }

            return createdOrder
        })

        return Response.json(order, { status: 201 })
    })
}

export async function GET() {
    return withApiGuard(async () => {
        const user = await requireAuth()

        const orders = await prisma.order.findMany({
            where: user.role === 'ADMIN'
                ? {}
                : { cashierId: user.userId },
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
            orderBy: { createdAt: 'desc' },
        })

        return Response.json(orders)
    })
}
