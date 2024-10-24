import { api } from './api-client'

interface PasswordRecoveryRequest {
  email: string
}

export async function passwordRecovery({ email }: PasswordRecoveryRequest) {
  await api
    .post('password/recovery', {
      json: {
        email,
      },
    })
    .json()
}
