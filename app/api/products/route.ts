import { withApiGuard } from '@/lib/api'
import { requireAuth, requireRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
    return withApiGuard(async () => {
        await requireAuth()

        const products = await prisma.product.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        })

        return Response.json(products)
    })
}

export async function POST(request: Request) {
    return withApiGuard(async () => {
        await requireRole('ADMIN')

        const body = await request.json()
        const { name, price, stock } = body

        if (!name || price == null || stock == null) {
            return new Response('Missing fields', { status: 400 })
        }

        const product = await prisma.product.create({
            data: {
                name,
                price,
                stock,
            },
        })

        return Response.json(product, { status: 201 })
    })
}

