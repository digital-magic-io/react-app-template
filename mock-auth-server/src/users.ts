import { AuthInfo, AuthRequest } from './types'

export let users: Array<AuthInfo & AuthRequest> = [
  {
    username: 'test@test.com',
    password: 'test1234',
    displayName: 'Test User',
    role: 'User'
  }
]
