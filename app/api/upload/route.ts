import { withApiGuard } from '@/lib/api'
import { requireAuth } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
    return withApiGuard(async () => {
        await requireAuth()

        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return new Response('No file uploaded', { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Ensure the directory exists
        const uploadDir = join(process.cwd(), 'public/uploads')
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (err) {
            // Directory might already exist
        }

        const uniqueFileName = `${uuidv4()}-${file.name.replace(/\s+/g, '-')}`
        const path = join(uploadDir, uniqueFileName)

        await writeFile(path, buffer)

        return Response.json({
            url: `/uploads/${uniqueFileName}`,
            name: uniqueFileName
        })
    })
}
