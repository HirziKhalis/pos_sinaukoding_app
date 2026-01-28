import { withApiGuard } from '@/lib/api'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    return withApiGuard(async () => {
        const user = await requireAuth()

        const body = await request.json()
        const { items, customerName, tableNumber, orderType, subTotal, tax, total, receivedAmount, changeAmount } = body

        if (!items || items.length === 0) {
            return new Response('No items', { status: 400 })
        }

        if (!customerName) {
            return new Response('Customer name is required', { status: 400 })
        }

        const productIds = items.map((i: any) => i.productId)

        const products = await prisma.product.findMany({
            where: {
                id: { in: productIds },
                isActive: true,
            },
        })

        // Generate Order Number: ORDR#YYYYMMDDHHMMSS
        const orderNumber = `ORDR#${new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)}`

        // 🔒 Transaction: order + items + stock update
        const order = await prisma.$transaction(async (tx) => {
            const createdOrder = await tx.order.create({
                data: {
                    orderNumber,
                    customerName,
                    tableNumber: String(tableNumber || ''),
                    orderType: orderType || 'DINE_IN',
                    subTotal: Number(subTotal || 0),
                    tax: Number(tax || 0),
                    total: Number(total || 0),
                    receivedAmount: Number(receivedAmount || total),
                    changeAmount: Number(changeAmount || 0),
                    cashierId: user.userId,
                },
            })

            for (const item of items) {
                const product = products.find(p => p.id === item.productId)
                if (!product) throw new Error(`Product ${item.productId} not found`)
                if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`)

                await tx.orderItem.create({
                    data: {
                        orderId: createdOrder.id,
                        productId: product.id,
                        quantity: Number(item.quantity),
                        price: Number(product.price),
                    },
                })

                await tx.product.update({
                    where: { id: product.id },
                    data: {
                        stock: { decrement: Number(item.quantity) },
                    },
                })
            }

            // Return full order details for receipt
            return await tx.order.findUnique({
                where: { id: createdOrder.id },
                include: {
                    items: {
                        include: {
                            product: {
                                select: { name: true }
                            }
                        }
                    }
                }
            })
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
