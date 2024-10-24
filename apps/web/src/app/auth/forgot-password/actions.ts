'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { passwordRecovery } from '@/http/password-recovery'

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
})

export async function passwordRecoveryAction(data: FormData) {
  const result = forgotPasswordSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email } = result.data

  try {
    await passwordRecovery({
      email,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json<{ message: string }>()

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
    message:
      'An e-mail with instructions to recover your password has been sent.',
    errors: null,
  }
}
