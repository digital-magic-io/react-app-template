import * as z from 'zod'
import { Authentication } from '@model/auth'
import { AuthenticationRequest } from '@api/endpoints/auth/types'

export const User = Authentication.extend(AuthenticationRequest.shape)
export type User = z.infer<typeof User>

export const UserList = User.array()
export type UserList = z.infer<typeof UserList>

export const UserCreatedResponse = AuthenticationRequest.pick({ username: true })
export type UserCreatedResponse = z.infer<typeof UserCreatedResponse>
