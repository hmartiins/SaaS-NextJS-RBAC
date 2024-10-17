import { Button } from '@/components/ui/button'

import { SignInForm } from './sign-in-form'

export default function SignInPage() {
  return (
    <>
      <SignInForm />
      <Button onClick={() => console.error('Erro datadog!')}>Gerar Erro</Button>
    </>
  )
}
