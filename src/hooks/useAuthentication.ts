import * as React from 'react'
import { Handler, hasValue } from '@digital-magic/ts-common-utils'
import { HttpError } from '@digital-magic/react-common/lib/api'
import { RequestErrorHandler } from '@api/types'
import { AuthenticationRequest } from '@api/endpoints/auth/types'
import { useAuthenticate, useGetAuthentication, useInvalidateAuthentication } from '@api/endpoints/auth/requests'
import { useDefaultPublicErrorHandler } from '@hooks/useDefaultPublicErrorHandler'
import { useAuthStore } from './useAuthStore'

type ResponseParams = {
  login: Handler<AuthenticationRequest>
  logout: Handler<void>
  isAuthenticated: boolean
}

export const useAuthentication = (): ResponseParams => {
  const { setAuth, invalidate } = useAuthStore()
  const defaultErrorHandler = useDefaultPublicErrorHandler()

  const onAuthError: RequestErrorHandler = (e) => {
    if (e.name === HttpError && (e.httpStatus === 401 || e.httpStatus === 403)) {
      invalidateAuthState()
    } else {
      return defaultErrorHandler(e)
    }
  }

  const authentication = useGetAuthentication({ onError: onAuthError, onSuccess: setAuth })
  const authenticate = useAuthenticate({ onError: onAuthError })
  const invalidateAuth = useInvalidateAuthentication({ onError: onAuthError })

  const isAuthenticated = React.useMemo(() => hasValue(authentication.data), [authentication.data])

  const invalidateAuthState = React.useCallback(() => {
    if (isAuthenticated) {
      invalidate()
    }
  }, [invalidate, isAuthenticated])

  const login: ResponseParams['login'] = React.useCallback(
    (request) => {
      authenticate.mutate(request)
    },
    [authenticate]
  )

  const logout: ResponseParams['logout'] = React.useCallback(() => {
    invalidateAuthState()
    invalidateAuth.mutate()
  }, [invalidateAuthState, invalidateAuth])

  //console.log('useAuthentication render')

  return { isAuthenticated, login, logout }
}
