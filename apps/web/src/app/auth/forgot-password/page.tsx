'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { passwordRecoveryAction } from './actions'

export default function ForgotPasswordPage() {
  const [{ success, errors, message }, handleSubmitAction, isPending] =
    useFormState(passwordRecoveryAction, () => {})

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
        <Label htmlFor="email">E-mail</Label>
        <Input type="email" name="email" id="email" />

        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>Recover password</>
        )}
      </Button>

      <Button variant={'link'} className="w-full" size={'sm'} asChild>
        <Link href={'/auth/sign-in'}>Back to Sign in</Link>
      </Button>
    </form>
  )
}
