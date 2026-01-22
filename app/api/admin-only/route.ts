import { requireRole } from '@/lib/auth'

export async function GET() {
    try {
        await requireRole('ADMIN')
        return Response.json({ message: 'OK' })
    } catch (err) {
        if (err instanceof Response) return err
        return new Response('Server error', { status: 500 })
    }
}

