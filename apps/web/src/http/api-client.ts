import { env } from '@saas/env'
import ky from 'ky'

function getCookieClient(name: string) {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
    if (match) {
      return decodeURIComponent(match[2])
    }
  }

  return undefined
}

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let token: string | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')
          const cookieStore = await serverCookies()

          token = cookieStore.get('token')?.value
        } else {
          token = getCookieClient('token')
        }

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
