// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get token from cookie
  const token = request.cookies.get('access_token')

  // Check if the route should be protected
  if (isProtectedRoute(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

function isProtectedRoute(pathname: string): boolean {
  const protectedPaths = ['/dashboard' , '/temp']
  return protectedPaths.some(path => pathname.startsWith(path))
}

export const config = {
  matcher: ['/dashboard/:path*' , '/temp/:path*']
}