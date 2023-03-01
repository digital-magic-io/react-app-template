import * as React from 'react'
import { Handler, OptionalType } from '@digital-magic/ts-common-utils'
import { isHttpError } from '@digital-magic/react-common/lib/api'
import { Authentication, LogoutReason } from '@model/auth'
import { RequestErrorHandler } from '@api/types'
import { AuthenticationRequest } from '@api/endpoints/auth/types'
import { useAuthenticate, useGetAuthentication, useInvalidateAuthentication } from '@api/endpoints/auth/requests'
import { useDefaultPublicErrorHandler } from '@hooks/useDefaultPublicErrorHandler'
import { useAuthStore } from '@stores/useAuthStore'

type HookResult = {
  login: Handler<AuthenticationRequest>
  logout: Handler<void>
  logoutReason: OptionalType<LogoutReason>
}

// TODO: Reducer can be used for better state management?
export const useAuthentication = (): HookResult => {
  const { setAuth, invalidate, logoutReason } = useAuthStore()
  const defaultErrorHandler = useDefaultPublicErrorHandler()
  const [needUserInfo, setNeedUserInfo] = React.useState(false)

  const onAuthError: (reason: OptionalType<LogoutReason>) => RequestErrorHandler = (reason) => (e) => {
    if (isHttpError(e) && (e.httpStatus === 401 || e.httpStatus === 403)) {
      setNeedUserInfo(false)
      invalidate(reason)
    } else {
      return defaultErrorHandler(e)
    }
  }

  const onAuthenticationSuccess = (authInfo: Authentication): void => {
    setAuth(authInfo)
    setNeedUserInfo(true)
  }

  const onInvalidateAuthSuccess = (): void => {
    setNeedUserInfo(false)
    invalidate('SignedOut')
  }

  // TODO: Not every 401/403 means TimedOut - need more precise handling (server must send this reason)
  useGetAuthentication({
    onError: onAuthError('TimedOut'),
    onSuccess: onAuthenticationSuccess,
    enabled: needUserInfo
  })

  const authenticate = useAuthenticate({ onError: onAuthError('InvalidLogin'), onSuccess: () => setNeedUserInfo(true) })
  // eslint-disable-next-line functional/prefer-tacit
  const invalidateAuth = useInvalidateAuthentication({
    onError: onAuthError(undefined),
    onSuccess: onInvalidateAuthSuccess
  })

  const login: HookResult['login'] = React.useCallback((request) => authenticate.mutate(request), [authenticate])
  const logout: HookResult['logout'] = React.useCallback(() => invalidateAuth.mutate(), [invalidateAuth])

  //console.log('useAuthentication render')

  return { login, logout, logoutReason }
}
