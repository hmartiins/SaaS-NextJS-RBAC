import { api } from './api-client'

interface PasswordRecoveryRequest {
  password: string
  code: string
}

export async function passwordReset({
  code,
  password,
}: PasswordRecoveryRequest) {
  await api
    .post('password/reset', {
      json: {
        code,
        password,
      },
    })
    .json()
}
