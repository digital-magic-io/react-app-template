import * as z from 'zod'
import { Username, Password } from '@model/common'

export const AuthenticationRequest = z.object({
  username: Username,
  password: Password
})
export type AuthenticationRequest = z.infer<typeof AuthenticationRequest>
