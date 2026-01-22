import { requireAuth } from '@/lib/auth'

export async function GET() {
    const user = await requireAuth()

    return Response.json({
        message: 'You are authenticated',
        user,
    })
}
