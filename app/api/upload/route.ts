import { withApiGuard } from '@/lib/api'
import { requireAuth } from '@/lib/auth'
import { put } from '@vercel/blob'

export async function POST(request: Request) {
    return withApiGuard(async () => {
        await requireAuth()

        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return new Response('No file uploaded', { status: 400 })
        }

        // Upload to Vercel Blob
        const blob = await put(file.name, file, {
            access: 'public',
        })

        return Response.json({
            url: blob.url,
            name: blob.pathname
        })
    })
}
