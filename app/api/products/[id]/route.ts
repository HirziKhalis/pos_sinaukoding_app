import { withApiGuard } from '@/lib/api'
import { requireAuth, requireRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = {
    params: Promise<{ id: string }>
}

export async function GET(
    _request: Request,
    { params }: Params
) {
    return withApiGuard(async () => {
        await requireAuth()
        const { id } = await params

        const product = await prisma.product.findUnique({
            where: { id },
        })

        if (!product) {
            return new Response('Product not found', { status: 404 })
        }

        return Response.json(product)
    })
}

export async function PUT(
    request: Request,
    { params }: Params
) {
    return withApiGuard(async () => {
        await requireRole('ADMIN')
        const { id } = await params

        const body = await request.json()
        const { name, description, price, stock, category, imageUrl, isActive } = body

        const product = await prisma.product.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(description !== undefined && { description }),
                ...(price !== undefined && { price }),
                ...(stock !== undefined && { stock }),
                ...(category !== undefined && { category }),
                ...(imageUrl !== undefined && { imageUrl }),
                ...(isActive !== undefined && { isActive }),
            },
        })

        return Response.json(product)
    })
}

export async function DELETE(
    _request: Request,
    { params }: Params
) {
    return withApiGuard(async () => {
        await requireRole('ADMIN')
        const { id } = await params

        await prisma.product.delete({
            where: { id },
        })

        return new Response(null, { status: 204 })
    })
}

