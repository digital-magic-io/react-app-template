import * as z from 'zod'
import { DisplayName, Username } from '@model/common'

export type LogoutReason = 'SignedOut' | 'InvalidLogin' | 'TimedOut'

export const UserRole = z.enum(['Admin', 'User'])
export type UserRole = z.infer<typeof UserRole>

// TODO: Is there way to just extract all possible enum values array?
export const allRoles: ReadonlyArray<UserRole> = ['Admin', 'User']

export const Authentication = z.object({
  username: Username,
  displayName: DisplayName,
  role: UserRole
})
export type Authentication = z.infer<typeof Authentication>
