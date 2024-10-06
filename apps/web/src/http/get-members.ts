import { Role } from '@saas-rbac/auth'

import { api } from './api-client'

interface GetMembersResponse {
  members: {
    userId: string
    name: string | null
    avatarUrl: string | null
    email: string
    id: string
    role: Role
  }[]
}

export async function getMembers(org: string) {
  const result = await api
    .get(`organizations/${org}/members`)
    .json<GetMembersResponse>()

  return result
}
