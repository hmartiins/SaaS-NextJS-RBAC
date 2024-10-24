'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { passwordReset } from '@/http/password-reset'

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Please, should have at least 6 characters.' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match.',
    path: ['password_confirmation'],
  })

export async function passwordRecoveryAction(data: FormData, code: string) {
  const result = resetPasswordSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { password } = result.data

  try {
    await passwordReset({
      password,
      code,
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
    message: null,
    errors: null,
  }
}
