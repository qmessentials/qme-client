import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session/edge'

export async function middleware(req: NextRequest) {
  console.log(`Middleware called from ${req.url}`)
  const res = NextResponse.next()
  const session = await getIronSession(req, res, {
    cookieName: 'qmessentials_session',
    password: process.env.IRON_SESSION_PASSWORD as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
  const { userId } = session
  console.log(`User ID is ${userId}`)
  if (!userId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`)
  }
  return res
}

export const config = {
  matcher: ['/', '/!auth/login', '/!api/auth/login'],
}
