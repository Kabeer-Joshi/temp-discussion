// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Clear cookies
  response.cookies.delete('access_token')
  response.cookies.delete('refresh_token')
  
  return response
}