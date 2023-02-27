import create from 'zustand'
import { Authentication } from '@model/auth'
import { Handler, hasValue, OptionalType } from '@digital-magic/ts-common-utils'

type State = Readonly<{
  auth: OptionalType<Authentication>
}>

type Actions = Readonly<{
  setAuth: Handler<Authentication>
  invalidate: Handler<void>
  //isAuthenticated: Lazy<boolean>
}>

export const useAuthStore = create<State & Actions>()((set) => ({
  auth: undefined,
  //isAuthenticated: () => hasValue(get().auth),
  setAuth: (auth: Authentication) =>
    set(() => ({
      auth
    })),
  invalidate: () =>
    set(() => ({
      auth: undefined
    }))
}))

// TODO: Example how to export actions as a separate functions (remove it if not used)
export const setAuth = (auth: Authentication): void => useAuthStore.setState(() => ({ auth }))
export const invalidate = (): void => useAuthStore.setState(() => ({ auth: undefined }))
export const isAuthenticated = (): boolean => hasValue(useAuthStore.getState().auth)
