import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'

export async function getOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Get details from organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              organization: z.object({
                id: z.string().uuid(),
                ownerId: z.string().uuid(),
                name: z.string(),
                slug: z.string(),
                domain: z.string().nullable(),
                shouldAttachUsersByDomain: z.boolean(),
                avatarUrl: z.string().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params
        const { organization } = await request.getUserMembership(slug)

        return {
          organization,
        }
      },
    )
}