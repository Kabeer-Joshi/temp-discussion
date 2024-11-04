// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch('https://discussionapi.goreeva.com/api/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    console.log("IN THE API LOGIN ROUTE , data is ", data)

    if (!response.ok) {
      return NextResponse.json(
        { error: data.detail }, 
        { status: response.status }
      )
    }

    // Create response with cookies
    const newResponse = NextResponse.json(
      { success: true },
      { status: 200 }
    )

    // Set cookies
    newResponse.cookies.set('access_token', data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1800 // 30 minutes
    })

    newResponse.cookies.set('refresh_token', data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1209600 // 14 days
    })

    return newResponse
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}