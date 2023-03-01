/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useApiMutation, useApiQuery } from '@digital-magic/react-common/lib/api'
import { apiBaseUrlV1 } from '@constants/configuration'
import { Username } from '@model/common'
import { ApiMutationOpts, ApiQueryOpts } from '@api/types'
import { callOnly, receiveOnly, sendAndReceive, sendOnly } from '@api/utils'
import { User, UserCreatedResponse, UserList } from '@api/endpoints/users/types'

const usersUrl = `${apiBaseUrlV1}/users`
const userUrl = (username: Username): string => `${usersUrl}/${username}`

const queryKeys = {
  getUsersAll: ['getUsersAll'],
  getUserAny: ['getSingleUser'],
  getUserByUsername: (username: Username) => [...queryKeys.getUserAny, username]
}

export const useGetUsers = (opts?: ApiQueryOpts<UserList>) =>
  useApiQuery({
    queryFn: () =>
      receiveOnly({
        method: 'get',
        url: usersUrl,
        responseSchema: UserList
      }),
    queryKey: queryKeys.getUsersAll,
    ...opts
  })

export const useCreateUser = (opts?: ApiMutationOpts<UserCreatedResponse, User>) =>
  useApiMutation({
    mutationFn: (data) =>
      sendAndReceive({
        method: 'post',
        url: usersUrl,
        requestSchema: User,
        responseSchema: UserCreatedResponse,
        data
      }),
    invalidateQueries: [queryKeys.getUsersAll],
    ...opts
  })

export const useGetUser = (username: Username, opts?: ApiQueryOpts<User>) =>
  useApiQuery({
    queryFn: () =>
      receiveOnly({
        method: 'get',
        url: userUrl(username),
        responseSchema: User
      }),
    queryKey: [...queryKeys.getUserByUsername(username)],
    ...opts
  })

export const useUpdateUser = (opts?: ApiMutationOpts<void, User>) =>
  useApiMutation({
    mutationFn: (data) =>
      sendOnly({
        method: 'put',
        url: userUrl(data.username),
        requestSchema: User,
        data
      }),
    invalidateQueries: [...queryKeys.getUserAny, ...queryKeys.getUsersAll],
    ...opts
  })

export const useDeleteUser = (opts?: ApiMutationOpts<void, Username>) =>
  useApiMutation({
    mutationFn: (username) =>
      callOnly({
        method: 'delete',
        url: userUrl(username)
      }),
    invalidateQueries: [...queryKeys.getUserAny, ...queryKeys.getUsersAll],
    ...opts
  })
