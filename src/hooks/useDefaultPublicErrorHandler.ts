import { useTranslation } from 'react-i18next'
import { hasValue } from '@digital-magic/ts-common-utils'
import { isClientErrorTranslation } from '@digital-magic/react-common/lib/errors'
import { RequestErrorHandler, RequestErrorMapper } from '@api/types'
import { defaultRequestErrorMapper } from '@api/utils'
import { useSnackbarContext } from '@context/SnackbarContext'

export const useDefaultPublicErrorHandler = (
  requestErrorMapper: RequestErrorMapper = defaultRequestErrorMapper
): RequestErrorHandler => {
  const snackbar = useSnackbarContext()
  const { t } = useTranslation()

  return (e) => {
    const error = requestErrorMapper(e)
    if (isClientErrorTranslation(error)) {
      if (hasValue(error.messageOpts)) {
        snackbar.open({ message: t(error.messageKey, error.messageOpts) })
      } else {
        snackbar.open({ message: t(error.messageKey) })
      }
    } else {
      snackbar.open({ message: error.message })
    }
  }
}
