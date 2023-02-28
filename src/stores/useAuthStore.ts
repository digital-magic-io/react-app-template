import { create } from 'zustand'
import { Authentication, LogoutReason } from '@model/auth'
import { Handler, OptionalType } from '@digital-magic/ts-common-utils'

type State = Readonly<{
  auth: OptionalType<Authentication>
  logoutReason: OptionalType<LogoutReason>
  isAuthenticated: boolean
}>

type Actions = Readonly<{
  setAuth: Handler<Authentication>
  invalidate: Handler<OptionalType<LogoutReason>>
}>

// TODO: Maybe we can use computed value isAuthenticated here (need more library investigation)
export const useAuthStore = create<State & Actions>()((set) => ({
  auth: undefined,
  logoutReason: undefined,
  isAuthenticated: false,
  setAuth: (auth) =>
    set(() => ({
      auth,
      logoutReason: undefined,
      isAuthenticated: true
    })),
  invalidate: (logoutReason) =>
    set(() => ({
      auth: undefined,
      logoutReason,
      isAuthenticated: false
    }))
}))

// TODO: Example how to export actions as a separate functions (remove it if not used)
export const setAuth = (auth: Authentication): void =>
  useAuthStore.setState(() => ({
    auth,
    logoutReason: undefined,
    isAuthenticated: true
  }))
export const invalidate = (logoutReason: LogoutReason): void =>
  useAuthStore.setState(() => ({
    auth: undefined,
    logoutReason,
    isAuthenticated: false
  }))
export const isAuthenticated = (): boolean => useAuthStore.getState().isAuthenticated
