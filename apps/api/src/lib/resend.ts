import { env } from '@saas/env'
import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)

interface SendEmailOptions {
  subject: string
  html: string
  to: string[]
}

export async function sendEmail({ html, subject, to }: SendEmailOptions) {
  const { error } = await resend.emails.send({
    from: 'SaaS NextJS <onboarding@resend.dev>',
    to,
    subject,
    html,
  })

  if (error) {
    return console.error({ error })
  }
}
