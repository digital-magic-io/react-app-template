/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useApiMutation, useApiQuery } from '@digital-magic/react-common/lib/api'
import { apiBaseUrlV1 } from '@constants/configuration'
import { ApiMutationOpts, ApiQueryOpts } from '@api/types'
import { Authentication } from '@model/auth'
import { callOnly, receiveOnly, sendOnly } from '@api/utils'
import { AuthenticationRequest } from '@api/endpoints/auth/types'

const authUrl = `${apiBaseUrlV1}/auth`

const queryKeys = {
  getAuthentication: 'getAuthentication'
}

export const useGetAuthentication = (opts?: ApiQueryOpts<Authentication>) =>
  useApiQuery({
    queryFn: () =>
      receiveOnly({
        method: 'get',
        url: authUrl,
        responseSchema: Authentication
      }),
    queryKey: queryKeys.getAuthentication,
    ...opts
  })

export const useAuthenticate = (opts?: ApiMutationOpts<void, AuthenticationRequest>) =>
  useApiMutation({
    mutationFn: (data) =>
      sendOnly({
        method: 'post',
        url: authUrl,
        requestSchema: AuthenticationRequest,
        data
      }),
    invalidateQueries: [queryKeys.getAuthentication],
    ...opts
  })

export const useInvalidateAuthentication = (opts?: ApiMutationOpts<void, void>) =>
  useApiMutation({
    mutationFn: () =>
      callOnly({
        method: 'delete',
        url: authUrl
      }),
    invalidateQueries: [queryKeys.getAuthentication],
    ...opts
  })
