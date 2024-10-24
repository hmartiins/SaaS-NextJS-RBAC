import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/resend'
import { forgotPasswordEmailTemplate } from '@/utils/email-templates/forgot-password'

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recovery',
    {
      schema: {
        tags: ['auth'],
        summary: 'Request password recovery.',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        // We don't want people to know if an email is registered or not
        return reply.status(201).send()
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      })

      await sendEmail({
        to: ['hmartins224@gmail.com'],
        subject: 'Password recovery',
        html: forgotPasswordEmailTemplate({
          name: userFromEmail.name!,
          avatarUrl: userFromEmail.avatarUrl,
          passwordRecoveryLink: `${process.env.FRONT_URL}/auth/password/recovery/${code}`,
        }),
      })

      return reply.status(201).send()
    },
  )
}
