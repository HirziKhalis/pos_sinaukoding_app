import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create a unique filename
        const fileExtension = file.name.split('.').pop()
        const fileName = `${randomUUID()}.${fileExtension}`

        // Define paths
        const publicDir = join(process.cwd(), 'public')
        const uploadDir = join(publicDir, 'uploads')
        const filePath = join(uploadDir, fileName)

        // Write the file
        await writeFile(filePath, buffer)

        // Return the relative URL
        const imageUrl = `/uploads/${fileName}`
        return NextResponse.json({ imageUrl })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
    }
}
