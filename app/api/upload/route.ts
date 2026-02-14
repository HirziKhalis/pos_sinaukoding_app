import { withApiGuard } from '@/lib/api'
import { requireAuth } from '@/lib/auth'
import { put, del } from '@vercel/blob'

export async function POST(request: Request) {
    return withApiGuard(async () => {
        await requireAuth()

        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return new Response('No file uploaded', { status: 400 })
        }

        const blob = await put(file.name, file, {
            access: 'public',
            addRandomSuffix: true,
        })

        return Response.json({
            url: blob.url,
            name: blob.pathname
        })
    })
}

export async function DELETE(request: Request) {
    return withApiGuard(async () => {
        await requireAuth()
        const { url } = await request.json()

        if (!url) {
            return new Response('No URL provided', { status: 400 })
        }

        // Only delete if it's a Vercel Blob URL (don't try to delete Unsplash placeholders)
        if (url.includes('blob.vercel-storage.com')) {
            await del(url)
        }

        return Response.json({ success: true })
    })
}
