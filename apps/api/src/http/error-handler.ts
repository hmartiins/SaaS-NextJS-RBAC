import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRequestError, UnauthorizedRequestError } from './_errors'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedRequestError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  console.error(error)

  // TODO: send error to some observability service (e.g. Sentry, Datadog, etc.)
  return reply.status(500).send({
    message: 'Internal server error',
  })
}
