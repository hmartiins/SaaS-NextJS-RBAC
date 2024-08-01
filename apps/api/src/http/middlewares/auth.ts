import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { UnauthorizedRequestError } from '../_errors'

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
  })
})
