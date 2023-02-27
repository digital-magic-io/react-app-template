import * as z from 'zod'
import { DisplayName, EmailAddress } from '@model/common'

export const UserRole = z.enum(['Admin', 'User'])
export type UserRole = z.infer<typeof UserRole>

export const Authentication = z.object({
  username: EmailAddress,
  displayName: DisplayName,
  role: UserRole
})
export type Authentication = z.infer<typeof Authentication>
