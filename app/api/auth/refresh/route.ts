// app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refresh_token')

  if (!refreshToken) {
    return NextResponse.json(
      { error: 'No refresh token' },
      { status: 401 }
    )
  }

  try {
    const response = await fetch(`https://discussionapi.goreeva.com/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken.value }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error('Refresh failed')
    }

    const newResponse = NextResponse.json({ success: true })
    
    newResponse.cookies.set('access_token', data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1800
    })

    return newResponse
  } catch (error) {
    const response = NextResponse.json(
      { error: 'Refresh failed' },
      { status: 401 }
    )
    
    // Clear auth cookies
    response.cookies.delete('access_token')
    response.cookies.delete('refresh_token')
    
    return response
  }
}