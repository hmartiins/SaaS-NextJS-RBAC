import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().default(3333),

    JWT_SECRET: z.string(),

    GITHUB_OAUTH_CLIENT_ID: z.string(),
    GITHUB_OAUTH_CLIENT_SECRET: z.string(),
    GITHUB_OAUTH_REDIRECT_URI: z.string().url(),

    FRONT_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.SERVER_PORT,

    JWT_SECRET: process.env.JWT_SECRET,

    GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    GITHUB_OAUTH_REDIRECT_URI: process.env.GITHUB_OAUTH_REDIRECT_URI,

    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

    FRONT_URL: process.env.FRONT_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  emptyStringAsUndefined: true,
})
