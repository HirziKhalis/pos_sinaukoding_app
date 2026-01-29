import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email) {
            return new Response('Email is required', { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            // Return success even if user not found to prevent enumeration attacks
            return Response.json({ success: true, message: 'If an account exists, a link has been sent.' })
        }

        // Generate Token
        const token = randomBytes(32).toString('hex')
        const expiry = new Date(Date.now() + 3600000) // 1 hour from now

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: token,
                resetTokenExpiry: expiry
            }
        })

        // SIMULATE SENDING EMAIL (Log to console for Dev)
        const resetLink = `${new URL(request.url).origin}/reset-password?token=${token}`
        console.log('===========================================================')
        console.log('                   PASSWORD RESET LINK                     ')
        console.log('===========================================================')
        console.log(`To: ${email}`)
        console.log(`Link: ${resetLink}`)
        console.log('===========================================================')

        return Response.json({ success: true, message: 'Reset link sent to console (dev mode).' })

    } catch (error) {
        console.error(error)
        return new Response('Internal Server Error', { status: 500 })
    }
}
