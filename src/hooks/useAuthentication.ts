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
  const { auth, setAuth, invalidate } = useAuthStore()
  const defaultErrorHandler = useDefaultPublicErrorHandler()
  const [isAuthenticated, setAuthenticated] = React.useState(false)

  const onAuthError: (displayError: boolean) => RequestErrorHandler = (displayError) => (e) => {
    if (e.name === HttpError && (e.httpStatus === 401 || e.httpStatus === 403)) {
      invalidateAuthState()
      if (displayError) {
        defaultErrorHandler(e)
      }
    } else {
      return defaultErrorHandler(e)
    }
  }

  const authentication = useGetAuthentication({ onError: onAuthError(false), onSuccess: setAuth })
  const authenticate = useAuthenticate({
    onError: onAuthError(true)
  })
  const invalidateAuth = useInvalidateAuthentication({ onError: onAuthError(false) })

  const invalidateAuthState = React.useCallback(() => {
    if (isAuthenticated) {
      invalidate()
    }
  }, [invalidate, isAuthenticated])

  const login: ResponseParams['login'] = React.useCallback(
    (request) => {
      return authenticate.mutate(request)
    },
    [authenticate]
  )

  const logout: ResponseParams['logout'] = React.useCallback(() => {
    invalidateAuthState()
    return invalidateAuth.mutate()
  }, [invalidateAuthState, invalidateAuth])

  React.useEffect(() => {
    if (hasValue(authentication.data) && hasValue(auth)) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }, [authentication.data, auth])

  //console.log('useAuthentication render')

  return { isAuthenticated, login, logout }
}
