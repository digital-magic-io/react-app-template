import {
  UseApiMutationAdditionalOptions,
  UseApiQueryAdditionalOptions
} from '@digital-magic/react-common/lib/api/types'
import { GenericRequestErrorHandler, GenericRequestErrorMapper } from '@digital-magic/react-common/lib/api'
import { ApiErrorPayload } from './errors'

export type RequestErrorHandler = GenericRequestErrorHandler<ApiErrorPayload>
export type RequestErrorMapper = GenericRequestErrorMapper<ApiErrorPayload>

export type ApiMutationOpts<TData, TVariables, TContext = unknown> = UseApiMutationAdditionalOptions<
  ApiErrorPayload,
  TData,
  TVariables,
  TContext
>

export type ApiQueryOpts<TData> = UseApiQueryAdditionalOptions<ApiErrorPayload, TData>
