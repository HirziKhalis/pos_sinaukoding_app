import { cookies } from 'next/headers'
import { verifyJwt } from '@/lib/jwt'
import bcrypt from 'bcryptjs'

export type Role = 'ADMIN' | 'CASHIER'

export type JwtPayload = {
  userId: string
  role: Role
}

export async function requireAuth(): Promise<JwtPayload> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  if (!token) {
    throw new Response('Unauthorized', { status: 401 })
  }

  return verifyJwt<JwtPayload>(token)
}

export async function requireRole(requiredRole: Role): Promise<JwtPayload> {
  const payload = await requireAuth()

  if (payload.role !== requiredRole) {
    throw new Response('Forbidden', { status: 403 })
  }

  return payload
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword)
}
