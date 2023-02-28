import axios, { isAxiosError } from 'axios'
import { clientRequestErrorPlainText, clientRequestErrorTranslation } from '@digital-magic/react-common/lib/errors'
import {
  buildRequestError,
  RequestErrorBuilder,
  doReceiveOnly,
  doSendOnly,
  doSendAndReceive,
  doCallOnly,
  doSendFile,
  doSendFileAndReceive,
  isApiError,
  isHttpError
} from '@digital-magic/react-common/lib/api'
import { RequestErrorMapper } from './types'
import { ApiErrorCustomObject, ApiErrorPayload } from './errors'

const buildCustomRequestError: RequestErrorBuilder<ApiErrorPayload> = buildRequestError(
  isAxiosError,
  ApiErrorCustomObject
)

export const callOnly = doCallOnly(axios, buildCustomRequestError)
export const receiveOnly = doReceiveOnly(axios, buildCustomRequestError)
export const sendOnly = doSendOnly(axios, buildCustomRequestError)
export const sendAndReceive = doSendAndReceive(axios, buildCustomRequestError)

export const sendFile = doSendFile(axios, buildCustomRequestError)

export const sendFileAndReceive = doSendFileAndReceive(axios, buildCustomRequestError)

export const defaultRequestErrorMapper: RequestErrorMapper = (e) => {
  if (isApiError(e)) {
    switch (e.payload.code) {
      case 'UnsupportedMediaType':
        return clientRequestErrorTranslation('Unsupported media type', e, 'global.errors.enum.UnsupportedMediaType')
      case 'AlreadyExistsError':
        return clientRequestErrorTranslation('Entity already exists', e, 'global.errors.enum.AlreadyExistsError')
      case 'ConstraintViolationError':
        return clientRequestErrorTranslation(
          'Action is not allowed due to constraint',
          e,
          'global.errors.enum.ConstraintViolationError'
        )
      default:
        return clientRequestErrorTranslation('Unknown API error', e, 'global.errors.enum.UnknownApiError')
    }
  } else if (isHttpError(e)) {
    switch (e.httpStatus) {
      case 400:
        return clientRequestErrorPlainText('API Error: Bad request', e)
      case 401:
        return clientRequestErrorPlainText('API Error: Unauthorized request', e)
      case 404:
        return clientRequestErrorPlainText('API Error: Resource not found', e)
      case 409:
        return clientRequestErrorPlainText('API Error: Action is not allowed due to data conflict', e)
      default:
        return clientRequestErrorPlainText('API Error: Unknown error', e)
    }
  } else {
    return clientRequestErrorPlainText('Unknown error', e)
  }
}
