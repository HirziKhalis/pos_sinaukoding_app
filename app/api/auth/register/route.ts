import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return Response.json(
      { error: 'Missing email or password' },
      { status: 400 }
    )
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return Response.json(
      { error: 'User already exists' },
      { status: 409 }
    )
  }

  const passwordHash = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  })

  return Response.json({
    id: user.id,
    email: user.email,
  })
}
