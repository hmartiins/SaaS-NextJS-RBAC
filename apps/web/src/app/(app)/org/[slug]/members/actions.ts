'use server'

import { Role, roleSchema } from '@saas-rbac/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createInvite } from '@/http/create-invite'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'

const inviteSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  role: roleSchema,
})

export async function createInviteAction(data: FormData) {
  const result = inviteSchema.safeParse(Object.fromEntries(data))
  const currentOrg = getCurrentOrg()!

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, role } = result.data

  try {
    await createInvite({
      org: currentOrg,
      email,
      role,
    })

    revalidateTag(`${currentOrg}/invites`)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(error)

    return {
      success: false,
      message: 'An unexpected error occurred. Please, try again later.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully create the invite',
    errors: null,
  }
}

export async function removeMemberAction(memberId: string) {
  const currentOrg = getCurrentOrg()

  await removeMember({
    org: currentOrg!,
    memberId,
  })

  revalidateTag(`${currentOrg}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = getCurrentOrg()

  await updateMember({
    org: currentOrg!,
    memberId,
    role,
  })

  revalidateTag(`${currentOrg}/members`)
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = getCurrentOrg()

  await revokeInvite({
    org: currentOrg!,
    inviteId,
  })

  revalidateTag(`${currentOrg}/invites`)
}