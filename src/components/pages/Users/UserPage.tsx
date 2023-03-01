import * as React from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Username } from '@model/common'
import { allRoles, UserRole } from '@model/auth'
import { User, UserCreatedResponse } from '@api/endpoints/users/types'
import { useCreateUser, useDeleteUser, useGetUser, useUpdateUser } from '@api/endpoints/users/requests'
import { useDefaultPublicErrorHandler } from '@hooks/useDefaultPublicErrorHandler'
import { useEnumTranslation } from '@hooks/Translation/useEnumTranslation'
import { Form, FormSelectField, FormTextField, useFormTyped } from '@controls/Form'
import { Box, CircularProgress, Typography } from '@mui/material'
import { Page } from '@layout/Page'
import { ValueLabel } from '@controls/SelectField'
import { CurriedHandler, Handler, hasValue } from '@digital-magic/ts-common-utils'
import { ButtonWithConfirmation } from '@controls/ButtonWithConfirmation'
import { Button } from '@controls/Button'
import { routes } from '@constants/routes'
import { HtmlMouseButtonEventHandler } from '@digital-magic/react-common'

type Params = Readonly<{
  username: Username
}>

const UserPage: React.FC = () => {
  const params = useParams<Params>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const defaultErrorHandler = useDefaultPublicErrorHandler()
  const { roleTranslation } = useEnumTranslation()

  const onCreateUserSuccess: Handler<UserCreatedResponse> = (user) => {
    navigate(generatePath(routes.UserEdit, { username: user.username } /*, { replace: true }*/))
  }

  // TODO: Sometimes navigation moves away after getUser is re-fetched due to queryKey invalidation (maybe we have to disable query on deletion?)
  const onDeleteUserSuccess: Handler<void> = () => {
    navigate(routes.Users)
  }

  const createUser = useCreateUser({ onError: defaultErrorHandler, onSuccess: onCreateUserSuccess })
  const updateUser = useUpdateUser({ onError: defaultErrorHandler })
  const deleteUser = useDeleteUser({ onError: defaultErrorHandler, onSuccess: onDeleteUserSuccess })

  // TODO: Empty value never be used, because in case of undefined - query will be disabled (but there could be more elegant solution, maybe assert?)
  const getUser = useGetUser(params.username ?? '', {
    onError: defaultErrorHandler,
    enabled: hasValue(params.username)
  })

  const isLoading: boolean = createUser.isLoading || updateUser.isLoading || deleteUser.isLoading || getUser.isLoading

  const form = useFormTyped({
    resolver: User,
    onSubmit: (data) => (hasValue(params.username) ? updateUser.mutate(data) : createUser.mutate(data))
  })

  const roleOptions: ReadonlyArray<ValueLabel<UserRole>> = React.useMemo(
    () =>
      allRoles.map((role) => ({
        label: roleTranslation(role),
        value: role
      })),
    [roleTranslation]
  )

  const onDeleteUserClick: CurriedHandler<Username, boolean> = (username) => (confirmResult) => {
    if (confirmResult) {
      deleteUser.mutate(username)
    }
  }

  const onRefreshClick: HtmlMouseButtonEventHandler = (e) => {
    e.preventDefault()
    void getUser.refetch()
  }

  React.useEffect(() => {
    if (getUser.data) {
      form.reset(getUser.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUser.data])

  return (
    <Page>
      <Typography variant="h1">{params.username ? t('pages.user.edit.title') : t('pages.user.new.title')}</Typography>
      {/* TODO: Remove console output - it is for debug purposes */}
      <Form f={form} onInvalid={(e) => console.log(e)}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box display="flex" flexDirection="column" rowGap={2} mb={4}>
            <FormTextField
              name={form.names.username}
              label={t('pages.user.form.fields.username')}
              disabled={isLoading}
            />
            <FormTextField
              name={form.names.displayName}
              label={t('pages.user.form.fields.displayName')}
              disabled={isLoading}
            />
            <FormTextField
              type="password"
              name={form.names.password}
              label={t('pages.user.form.fields.password')}
              disabled={isLoading}
            />
            <FormSelectField
              name={form.names.role}
              options={roleOptions}
              label={t('pages.user.form.fields.role')}
              disabled={isLoading}
            />
            <Box display="flex" columnGap={2} mt={2}>
              <Button type="submit" disabled={isLoading}>
                {t('global.buttons.submit')}
              </Button>
              {hasValue(params.username) && (
                <>
                  <Button disabled={isLoading} onClick={onRefreshClick}>
                    {t('global.buttons.refresh')}
                  </Button>
                  <ButtonWithConfirmation
                    color="error"
                    disabled={isLoading}
                    onConfirmResult={onDeleteUserClick(params.username)}
                    confirmTitle={t('global.consents.delete.title')}
                    confirmMessage={t('global.consents.delete.message')}
                  >
                    {t('global.buttons.delete')}
                  </ButtonWithConfirmation>
                </>
              )}
            </Box>
          </Box>
        )}
      </Form>
    </Page>
  )
}

export default UserPage
