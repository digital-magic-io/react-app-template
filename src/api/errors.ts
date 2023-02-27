import * as z from 'zod'
import { ApiErrorObject, DefaultPayloadType } from '@digital-magic/react-common/lib/api'

export const ApiErrorCode = z.enum([
  'UnsupportedMediaType',
  'AlreadyExistsError',
  'ConstraintViolationError',
  'NotFoundError'
])
export type ApiErrorCode = z.infer<typeof ApiErrorCode>
export const ApiErrorCustomObject = ApiErrorObject(ApiErrorCode)
export type ApiErrorCustomObject = z.infer<typeof ApiErrorCustomObject>

export type ApiErrorPayload = DefaultPayloadType<ApiErrorCustomObject>
