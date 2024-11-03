import { cookies as serverCookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookies = await serverCookies()

  const redirectURL = request.nextUrl.clone()

  redirectURL.pathname = '/auth/sign-in'

  cookies.delete('token')

  return NextResponse.redirect(redirectURL)
}
