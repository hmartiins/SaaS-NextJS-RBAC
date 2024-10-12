import { Role } from '@saas-rbac/auth'

import { api } from './api-client'

interface GetPendingInvitesResponse {
  invites: {
    organization: {
      name: string
    }
    id: string
    createdAt: string
    role: Role
    email: string
    author: {
      name: string | null
      id: string
    } | null
  }[]
}

export async function getPendingInvites() {
  const result = await api
    .get(`pending-invites`)
    .json<GetPendingInvitesResponse>()

  return result
}
