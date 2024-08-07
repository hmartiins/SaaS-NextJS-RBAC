import { Role } from '@prisma/client'
import { defineAbilityFor, userSchema } from '@saas-rbac/auth'

export function getUserPermissions(userId: string, role: Role) {
  const authUser = userSchema.parse({
    id: userId,
    role,
  })
  const ability = defineAbilityFor(authUser)

  return ability
}
