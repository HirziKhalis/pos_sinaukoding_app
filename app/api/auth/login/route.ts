import { cookies } from 'next/headers'
import { signJwt } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.passwordHash)


  if (!valid) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = signJwt({
    userId: user.id,
    role: user.role,
  })

  const cookieStore = await cookies()

  cookieStore.set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })

  cookieStore.set({
    name: 'role',
    value: user.role, // e.g. ADMIN | CASHIER
    httpOnly: false, // readable by middleware
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })

  return Response.json({
    message: 'Login successful',
    user: {
      email: user.email,
      role: user.role
    }
  })
}
