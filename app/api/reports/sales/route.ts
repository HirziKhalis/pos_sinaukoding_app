import { withApiGuard } from '@/lib/api'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { startOfDay, endOfDay } from 'date-fns'

export async function GET(request: Request) {
    return withApiGuard(async () => {
        const user = await requireAuth()
        if (user.role !== 'ADMIN') {
            return new Response('Unauthorized', { status: 403 })
        }

        const { searchParams } = new URL(request.url)
        const startDateParam = searchParams.get('startDate')
        const endDateParam = searchParams.get('endDate')
        const category = searchParams.get('category')
        const orderType = searchParams.get('orderType')

        const startDate = startDateParam ? startOfDay(new Date(startDateParam)) : startOfDay(new Date())
        const endDate = endDateParam ? endOfDay(new Date(endDateParam)) : endOfDay(new Date())

        const whereClause: any = {
            createdAt: {
                gte: startDate,
                lte: endDate,
            },
        }

        if (orderType && orderType !== 'ALL') {
            whereClause.orderType = orderType
        }

        if (category && category !== 'ALL') {
            // Filter based on items having products of a specific category
            whereClause.items = {
                some: {
                    product: {
                        category: category
                    }
                }
            }
        }

        const orders = await prisma.order.findMany({
            where: whereClause,
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                category: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // Calculate Metrics
        const totalOrders = orders.length
        const totalOmzet = orders.reduce((sum, order) => sum + order.total, 0)

        // Calculate category breakdown
        const categorySales: Record<string, number> = {
            FOOD: 0,
            BEVERAGE: 0,
            DESSERT: 0
        }

        let allMenuSales = 0
        orders.forEach(order => {
            order.items.forEach(item => {
                const cat = item.product.category
                categorySales[cat] = (categorySales[cat] || 0) + item.quantity
                allMenuSales += item.quantity
            })
        })

        return Response.json({
            metrics: {
                totalOrders,
                totalOmzet,
                allMenuSales,
                foodSales: categorySales.FOOD,
                beverageSales: categorySales.BEVERAGE,
                dessertSales: categorySales.DESSERT
            },
            orders
        })
    })
}
