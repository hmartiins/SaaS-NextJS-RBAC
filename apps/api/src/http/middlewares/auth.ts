import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { prisma } from '@/lib/prisma'

import { UnauthorizedRequestError } from '../routes/_errors'

export const auth = fastifyPlugin(async function (app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch {
        throw new UnauthorizedRequestError('Invalid auth token')
      }
    }

    request.getUserMembership = async (slug: string) => {
      const userId = await request.getCurrentUserId()
      const member = await prisma.member.findFirst({
        where: {
          userId,
          organization: {
            slug,
          },
        },
        include: {
          organization: true,
        },
      })

      if (!member) {
        throw new UnauthorizedRequestError(
          'You`re not a member of this organization',
        )
      }

      const { organization, ...membership } = member

      return { organization, membership }
    }
  })
})
