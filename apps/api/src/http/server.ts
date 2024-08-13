import fastifyCors from '@fastify/cors'
import fastifyJWT from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@saas-rbac/env'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import {
  authenticateWithGithub,
  authenticateWithPassword,
  createAccount,
  createOrganization,
  createProject,
  deleteProject,
  getMembership,
  getOrganization,
  getOrganizations,
  getProfile,
  requestPasswordRecover,
  resetPassword,
  shutdownOrganization,
  transferOrganization,
  updateOrganization,
} from './routes'
import { getProject } from './routes/projects/get-project'
import { getProjects } from './routes/projects/get-projects'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NextJS Saas RBAC',
      description: 'Full-Stack SaaS app with multi-tenant, RBAC, and more',
      version: '1.0.0',
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(authenticateWithPassword)
app.register(createAccount)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)
app.register(authenticateWithGithub)

app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)

app.register(createProject)
app.register(deleteProject)
app.register(getProject)
app.register(getProjects)

app.listen({ port: env.SERVER_PORT }, () => {
  console.log('Server is running 🚀')
})
