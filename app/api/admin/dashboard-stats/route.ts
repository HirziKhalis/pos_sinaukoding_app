import { withApiGuard } from '@/lib/api'
import { requireRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { startOfDay, endOfDay, subDays, format } from 'date-fns'

export async function GET() {
    return withApiGuard(async () => {
        await requireRole('ADMIN')

        // 1. Basic Metrics
        const totalOrders = await prisma.order.count()
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: {
                            select: { category: true }
                        }
                    }
                }
            }
        })

        const totalOmzet = orders.reduce((sum, o) => sum + o.total, 0)

        const categoryCounts: Record<string, number> = {
            FOOD: 0,
            BEVERAGE: 0,
            DESSERT: 0
        }
        let allMenuOrders = 0

        orders.forEach(order => {
            order.items.forEach(item => {
                const cat = item.product.category
                categoryCounts[cat] = (categoryCounts[cat] || 0) + item.quantity
                allMenuOrders += item.quantity
            })
        })

        // 2. Chart Data (Last 10 days)
        const last10Days = Array.from({ length: 10 }).map((_, i) => {
            const date = subDays(new Date(), 9 - i)
            return {
                date,
                label: format(date, 'EEE'),
                fullDate: format(date, 'yyyy-MM-dd'),
                FOOD: 0,
                BEVERAGE: 0,
                DESSERT: 0
            }
        })

        // Optimized chart data fetching
        const startDate = startOfDay(last10Days[0].date)
        const endDate = endOfDay(last10Days[9].date)

        const ordersInRange = await prisma.order.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: { category: true }
                        }
                    }
                }
            }
        })

        ordersInRange.forEach(order => {
            const orderDate = format(order.createdAt, 'yyyy-MM-dd')
            const dayEntry = last10Days.find(d => d.fullDate === orderDate)

            if (dayEntry) {
                order.items.forEach(item => {
                    const product = item.product
                    if (!product) return

                    const cat = product.category
                    const price = Number(item.price) || 0
                    const quantity = Number(item.quantity) || 0
                    const lineTotal = price * quantity

                    if (cat === 'FOOD') dayEntry.FOOD += lineTotal
                    if (cat === 'BEVERAGE') dayEntry.BEVERAGE += lineTotal
                    if (cat === 'DESSERT') dayEntry.DESSERT += lineTotal
                })
            }
        })

        return Response.json({
            metrics: {
                totalOrders,
                totalOmzet,
                allMenuOrders,
                foodCount: categoryCounts.FOOD,
                beverageCount: categoryCounts.BEVERAGE,
                dessertCount: categoryCounts.DESSERT
            },
            chartData: last10Days.map(d => ({
                day: d.label,
                food: d.FOOD,
                beverage: d.BEVERAGE,
                dessert: d.DESSERT
            }))
        })
    })
}
