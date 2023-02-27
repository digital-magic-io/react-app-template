import * as z from 'zod'
import { EmailAddress, Password } from '@model/common'

export const AuthenticationRequest = z.object({
  username: EmailAddress,
  password: Password
})
export type AuthenticationRequest = z.infer<typeof AuthenticationRequest>
