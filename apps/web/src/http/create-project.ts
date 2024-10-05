import { api } from './api-client'

interface CreateProjectRequest {
  org: string
  name: string
  description: string | null
}

type CreateOrganizationResponse = void

export async function createProject({
  org,
  name,
  description,
}: CreateProjectRequest): Promise<CreateOrganizationResponse> {
  await api.post(`organizations/${org}/projects`, {
    json: {
      org,
      name,
      description,
    },
  })
}
