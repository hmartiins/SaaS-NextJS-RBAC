'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { passwordRecoveryAction } from './actions'

export default function ResetPasswordPage() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const code = searchParams.get('code') ?? ''

  const [{ success, errors, message }, handleSubmitAction, isPending] =
    useFormState(
      (data: FormData) => passwordRecoveryAction(data, code),
      () => {
        router.push('/auth/sign-in')
      },
    )

  return (
    <form onSubmit={handleSubmitAction} className="space-y-4">
      {success === true && message && (
        <Alert variant={'success'}>
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === false && message && (
        <Alert variant={'destructive'}>
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="password">New Password</Label>
        <Input type="password" name="password" id="password" />

        {errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirm a new Password</Label>
        <Input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
        />

        {errors?.password_confirmation && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password_confirmation[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>Reset password</>
        )}
      </Button>
    </form>
  )
}
