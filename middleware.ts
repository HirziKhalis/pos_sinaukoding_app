import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value
  const role = req.cookies.get('role')?.value

  const pathname = req.nextUrl.pathname

  // Not logged in
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Admin-only area
  if (pathname.startsWith('/dashboard/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
