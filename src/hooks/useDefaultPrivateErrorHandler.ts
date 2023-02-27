import { RequestErrorHandler, RequestErrorMapper } from '@api/types'
import { defaultRequestErrorMapper } from '@api/utils'
import { useDefaultPublicErrorHandler } from '@hooks/useDefaultPublicErrorHandler'
import { useAuthentication } from '@hooks/useAuthentication'
import { HttpError } from '@digital-magic/react-common/lib/api'

export const useDefaultPrivateErrorHandler = (
  requestErrorMapper: RequestErrorMapper = defaultRequestErrorMapper
): RequestErrorHandler => {
  const defaultErrorHandler = useDefaultPublicErrorHandler(requestErrorMapper)
  const { logout } = useAuthentication()

  return (e) => {
    if (e.name === HttpError && e.httpStatus === 401) {
      logout()
    } else {
      defaultErrorHandler(e)
    }
  }
}
